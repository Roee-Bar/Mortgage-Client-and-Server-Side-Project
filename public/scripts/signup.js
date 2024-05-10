//SignUp form
//
// Attach an event listener to the email input field - update in real time
document.getElementById("email").addEventListener("input", async function () {
    // Validate email whenever the input changes
    const email = this.value;
    const emailValidationResult = validateEmail(email);
    const emailError = document.getElementById("emailError");
    emailError.innerText = emailValidationResult;

    // Handle the class based on validation result
    if (emailError.innerText === "נראה טוב!") {
        emailError.classList.remove("error");
        emailError.classList.add("success");
    } else {
        emailError.classList.remove("success");
        emailError.classList.add("error");
    }
});

// Attach an event listener to the phone number input field - update in real time
document.getElementById("phone").addEventListener("input", function () {
    // Validate phone number whenever the input changes
    const phoneNumber = this.value;
    const phoneNumberValidationResult = validatePhoneNumber(phoneNumber);
    const phoneNumberError = document.getElementById("phoneError");
    phoneNumberError.innerText = phoneNumberValidationResult;

    // Handle the class based on validation result
    if (phoneNumberError.innerText === "נראה טוב!") {
        phoneNumberError.classList.remove("error");
        phoneNumberError.classList.add("success");
    } else {
        phoneNumberError.classList.remove("success");
        phoneNumberError.classList.add("error");
    }
});

// Password matching check
document.getElementById("password").addEventListener("input", function () {
    let password = document.getElementById("confirm-password").value;
    const rpassword = this.value;
    const passValResult = validatePasswords(rpassword, password);
    const passwordErr = document.getElementById("confirmPasswordError");
    passwordErr.innerText = passValResult;

    // Handle the class based on validation result
    if (passwordErr.innerText === "נראה טוב!") {
        passwordErr.classList.remove("error");
        passwordErr.classList.add("success");
    } else {
        passwordErr.classList.remove("success");
        passwordErr.classList.add("error");
    }
});

// Password matching check
document.getElementById("confirm-password").addEventListener("input", function () {
    let rpassword = document.getElementById("password").value;
    const password = this.value;
    const passValResult = validatePasswords(password, rpassword);
    const passwordErr = document.getElementById("confirmPasswordError");
    passwordErr.innerText = passValResult;

    // Handle the class based on validation result
    if (passwordErr.innerText === "נראה טוב!") {
        passwordErr.classList.remove("error");
        passwordErr.classList.add("success");
    } else {
        passwordErr.classList.remove("success");
        passwordErr.classList.add("error");
    }
});

function validateEmail(email) {
    // Basic email validation using the provided pattern attribute
    if (!/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)) {
        return " example@gmail.com בבקשה הכנס אימייל בפורמט תקין";
    }
    return "נראה טוב!";
}

function validatePhoneNumber(phoneNumber) {
    // Check if the cleaned phone number matches the desired pattern
    if (phoneNumber.length != 10) {
        return "מספר הפלאפון צריך להכיל 10 ספרות";
    }
    if (!/^0[0-9]{9}$/.test(phoneNumber)) {
        return "מספר הפאלפון צריך להתחיל ב 0"
    }

    return "נראה טוב!";
}

function validatePasswords(password, rpassword) {
    if (password != rpassword)
        return "הסיסמאות לא תואמות"
    return "נראה טוב!";
}



