const sqlite3 = require('sqlite3').verbose();

//Establishing SQLite database connection to a file named "database.db"
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create users table if it doesn't exist
        //createUsersTable();
        //requestsTable();
        //nloan_requestsTable();
    }
});

/*
// Function to create users table
function createUsersTable() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT,
                lastname TEXT,
                email TEXT UNIQUE,
                password TEXT,
                phone_number TEXT 
            )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully.');
        }
    });
}
//Function to create mortgage requests table
function requestsTable() {
    db.run(`CREATE TABLE mortgage_requests (
        request_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        purpose TEXT NOT NULL,
        bank TEXT NOT NULL,
        loan_amount INTEGER NOT NULL,
        citizenship TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id))`
    );
}

function nloan_requestsTable() {
    db.run(`CREATE TABLE nloan_requestsTable (
        request_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        rtmethod TEXT NOT NULL,
        bank TEXT NOT NULL,
        loan_amount INTEGER NOT NULL,
        citizenship TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id))`
    );
}*/

// Function to insert a new user into the database
function createUser(firstname, lastname, email, phone, password, callback) {
    db.run(`INSERT INTO users (firstname, lastname, email, password, phone_number) VALUES (?, ?, ?, ?, ?)`, [firstname, lastname, email, password, phone], callback);
}

// Function to validate login credentials
function validateLogin(email, callback) {
    db.get(`SELECT * FROM users WHERE email = ? `, [email,], callback);
}

// Function to validate email-restore(password) credentials
function validateEmail(email, callback) {
    db.get(`SELECT password FROM users WHERE email = ?`, [email], callback);
}

// Function to validate email-restore(password) credentials
function getFname(email, callback) {
    db.get(`SELECT firstname FROM users WHERE email = ?`, [email], callback);
}

// Function to validate email-restore(password) credentials
function resetPassword(newpass, email, callback) {
    db.get(`UPDATE users set password = ? WHERE email = ?`, [newpass, email], callback);
}

// Function to insert a new mortgage request into the database
function submitMortgageRequest(id, purpose, bank, loanAmount, citizenship, callback) {
    db.run(`INSERT INTO mortgage_requests (user_id, purpose, bank, loan_amount, citizenship) VALUES (?, ?, ?, ?, ?)`, [id, purpose, bank, loanAmount, citizenship], callback);
}

// Function to insert a new mortgage request into the database
function submitnloaneRequest(id, rtmethod, bank, loanAmount, citizenship, callback) {
    db.run(`INSERT INTO nloan_requestsTable (user_id, rtmethod, bank, loan_amount, citizenship) VALUES (?, ?, ?, ?, ?)`, [id, rtmethod, bank, loanAmount, citizenship], callback);
}

// Exporting functions to make them accessible from other files
module.exports = {
    createUser,
    validateLogin,
    validateEmail,
    resetPassword,
    submitMortgageRequest,
    getFname: getFname,
    submitnloaneRequest: submitnloaneRequest,
    closeConnection: (callback) => db.close((err) => {
        if (err) {
            console.error('Error closing database connection:', err.message);
        } else {
            console.log('Closed the database connection.');
        }
        callback();
    })
};



