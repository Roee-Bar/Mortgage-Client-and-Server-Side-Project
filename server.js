const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db.js');
const session = require('express-session');
const mailer = require('./mailer.js');
const app = express();
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const signupVal = require('./server-scripts/signup.js')

// cheeks if the user is logged in
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect('/login'); // User is not authenticated, redirect to login page
  }
}

// Lets save session data at the user and server
app.use(session({
  secret: 's56d4fgs6fg54dd56s6sd5f4sdfasxc46548',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Function to generate a random password
function generateRandomPassword(length = 8) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Handle Reset Password form submission
app.post('/newpass', async function (req, res) {
  const { password, rpassword } = req.body;
  if (password !== rpassword) {
    res.redirect('/newpass?result=notmatch');
    return;
  }

  // Reset password
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  db.resetPassword(hashedPassword, req.session.userId.toLowerCase(), function (err) {
    if (err) {
      res.redirect('/newpass?result=false');
    } else {
      res.redirect('/newpass?result=true');
    }
  });
});

// Handle Recover Password form submission
app.post('/restore', function (req, res) {
  const { username } = req.body;

  // Validate email
  db.validateEmail(username.toLowerCase(), async function (err, row) {
    if (err || !row) {
      res.redirect('/restore?result=false');
    } else {
      const randomPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      db.resetPassword(hashedPassword, username.toLowerCase(), function (err) {
        if (err) {
          res.redirect('/restore?result=false');
        } else {
          mailer.restorePassword(username.toLowerCase(), randomPassword);
          res.redirect(`/restore?result=true&email=${username}`);
        }
      });
    }
  });
});

app.post('/contact', function (req, res) {
  const { fname, lname, phone, email, selection, subject } = req.body;

  // Send email
  mailer.contactForm(fname, lname, phone, email, selection, subject, function (err) {
    if (err) {
      renderTemplate(req, res, 'contact', { result: false });
    } else {
      renderTemplate(req, res, 'contact', { result: true });
    }
  });
});

app.post('/takebigloan', function (req, res) {
  const { fname, lname, phone, email, selection, subject } = req.body;

  // Send email
  mailer.contactForm(fname, lname, phone, email, selection, subject, function (err) {
    if (err) {
      renderTemplate(req, res, 'takebigloan', { result: false });
    } else {
      renderTemplate(req, res, 'takebigloan', { result: true });
    }
  });
});

// Handle mortgage form submission
app.post('/wheregetmort', function (req, res) {
  const { purpose, bank, loanAmount, citizenship } = req.body;
  if (!req.session.userId) {
    req.session.loginRedirect = '/wheregetmort';
    renderTemplate(req, res, 'login', { success: "nl" });// nl - not logged
    // res.redirect('/login?from=wheregetmort');
  } else {
    db.submitMortgageRequest(req.session.userId.toLowerCase(), purpose, bank, loanAmount, citizenship, function (err) {
      if (err) {
        console.log(err);
        // Handle error appropriately, e.g., render the mortgage form again with an error message
        renderTemplate(req, res, 'wheregetmort', { error: 'An error occurred while processing your request' });
      } else {
        // Mortgage request submitted successfully
        renderTemplate(req, res, 'wheregetmort', { success: true });
      }
    });
  }
});

// Handle mortgage form submission
app.post('/takemortgage', function (req, res) {
  const { rtmethod, bank, loanAmount, citizenship } = req.body;
  if (!req.session.userId) {
    req.session.loginRedirect = '/takemortgage';
    renderTemplate(req, res, 'login', { success: "nl" });// nl - not logged
  } else {
    db.submitnloaneRequest(req.session.userId.toLowerCase(), rtmethod, bank, loanAmount, citizenship, function (err) {
      if (err) {
        console.log(err);
        // Handle error appropriately, e.g., render the mortgage form again with an error message
        renderTemplate(req, res, 'takemortgage', { error: 'An error occurred while processing your request' });
      } else {
        // Mortgage request submitted successfully
        renderTemplate(req, res, 'takemortgage', { success: true });
      }
    });
  }
});

// Handle login form submission //#### TO DO , CHANGE IT TO EJS HANDLE!
app.post('/login', function (req, res) {
  const { username, password } = req.body;
  // Validate login credentials
  db.validateLogin(username.toLowerCase(), async function (err, row) {
    if (err || !row) {
      renderTemplate(req, res, 'login', { validEmail: 'false' });
    } else {
      try {
        const hashedPassword = row.password;
        // Compare hashed password with the provided password
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
          req.session.userId = username;
          if (req.session.loginRedirect) {
            res.redirect(req.session.loginRedirect);
          } else {
            res.redirect('/');
          }
        } else {
          renderTemplate(req, res, 'login', { validPassword: 'false' });
        }
      } catch (error) {
        return res.status(500).send('בעיה טכנית, נסה שוב עם סיסמה שונה');
      }
    }
  });
});

// Handle signup form submission
app.post('/signup', async function (req, res) {
  const { fname, lname, password, rpassword, email, phone } = req.body;
  if ((signupVal.validate(fname, lname, email, password, rpassword, phone)) != true) {
    renderTemplate(req, res, 'signup', { valresult: signupVal.validate(fname, lname, email, password, rpassword, phone) });
  }
  else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    db.createUser(fname, lname, email.toLowerCase(), phone, hashedPassword, function (err, _row) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT' && err.errno === 19) {
          if (err.message.includes('phone_number')) {
            res.redirect('/signup?error=Phone number already exists');
          }
          if (err.message.includes('email')) {
            res.redirect('/signup?error=Email already exists');
          }
        } else {
          res.redirect('/signup?error=An error occurred');
        }
      } else {
        res.redirect(`/signup?show=true&email=${email}&password=${password}`);
      }
    });
  }
});

// Index page
app.get('/', function (req, res) {
  renderTemplate(req, res, 'index');
});

// where should i get a one loan page
app.get('/takemortgage', function (req, res) {
  const isLoginRedirect = !!req.session.loginRedirect;
  req.session.loginRedirect = null;
  renderTemplate(req, res, 'takemortgage', { success: "no result", loginRedirect: isLoginRedirect });
});

// where should i get a mortgage page
app.get('/wheregetmort', function (req, res) {
  const isLoginRedirect = !!req.session.loginRedirect;
  req.session.loginRedirect = null;
  renderTemplate(req, res, 'wheregetmort', { success: "no result", loginRedirect: isLoginRedirect });
});

// where should i get a fewloans page
app.get('/takefewloans', function (req, res) {
  renderTemplate(req, res, 'takefewloans', { success: "no result" });
});

// where should i get a bigloan page
app.get('/takebigloan', function (req, res) {
  renderTemplate(req, res, 'takebigloan', { result: "no result" });
});

// Contact page
app.get('/contact', function (req, res) {
  renderTemplate(req, res, 'contact', { result: "no result" });
});

// Login page
app.get('/login', function (req, res) {
  if (req.session.userId)
    renderTemplate(req, res, 'index');
  else
    renderTemplate(req, res, 'login');
});

// Signup page
app.get('/signup', function (req, res) {
  if (req.session.userId)
    renderTemplate(req, res, 'index');
  else
    renderTemplate(req, res, 'signup');
});

// Change Password page
app.get('/newpass', requireAuth, function (req, res) {
  renderTemplate(req, res, 'newpass');
});

// Recover password page
app.get('/restore', function (req, res) {
  if (req.session.userId)
    renderTemplate(req, res, 'index');
  else
    renderTemplate(req, res, 'restore');
});

// Logout
app.get('/logout', function (req, res) {
  if (req.session.userId) {
    req.session.destroy();
  }
  res.redirect('/');
});

// Function to render templates
function renderTemplate(req, res, templateName, templateData = {}) {
  let templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
  if (req.session.userId) {
    db.getFname(req.session.userId.toLowerCase(), function (err, row) {
      if (err) {
        res.status(500).send('Error retrieving user data');
      } else {
        templateData.firstname = row.firstname;
        templateData.currentPage = templateName;
        render(templatePath, templateData, res);
      }
    });
  } else {
    templateData.firstname = "אורח";
    templateData.currentPage = templateName;
    render(templatePath, templateData, res);
  }
}

// Function to render templates after fetching sidebar data
function render(templatePath, templateData, res) {
  ejs.renderFile(templatePath, templateData, function (err, renderedHtml) {
    if (err) {
      console.error(err);
      res.status(500).send('Error rendering template');
    } else {
      res.send(renderedHtml);
    }
  });
}

// Close database connection when the server is shutting down
process.on('SIGINT', () => {
  db.closeConnection(() => {
    console.log('Database connection closed.');
    process.exit();
  });
});

// Start the server on port 3005
app.listen(3005, function () {
  console.log('Server is running on http://localhost:3005');
});