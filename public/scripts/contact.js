function contactForm() {
  // Email and Password Regex for validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Accessing form data
  var name = document.getElementById('name');
  var subject = document.getElementById('subject');
  var validation = document.getElementById('validation');
  var errors = "";
  var validate = true;
  var email = document.getElementById('email');
  var phone = document.getElementById('phone');

  //.test compares email field with regex.
  if (!emailRegex.test(email.value)) {
    errors += '<p style="color:red;">Please enter a valid email address.</p>';
    email.focus();
    validate = false;
  }

  if (!fname.value) {
    errors += '<p style="color:red;">Enter a name</p>';
    name.focus();
    validate = false;
  }

  if (!subject.value) {
    errors += '<p style="color:red;">Enter a subject</p>';
    subject.focus();
    validate = false;
  }

  if (phone.value.length != 10) {
    errors += '<p style="color:red;">Enter a phone</p>';
    phone.focus();
    validate = false;
  }


  if (!validate) {
    validation.innerHTML = errors;
    rules.innerHTML = `<p>*Valid email address</p>
                            <p>*Enter a name</p>
                            <p>*Enter a subject</p>
                            <p> Enter correct phone</p>`;
    return false;
  }



}