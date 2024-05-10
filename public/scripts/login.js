//Login Form

/// Attach an event listener to the email input field - update in real time
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

function validateEmail(email) {
    // Basic email validation using the provided pattern attribute
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return " example@gmail.com בבקשה הכנס אימייל בפורמט תקין";
    }
    return "נראה טוב!";
}



