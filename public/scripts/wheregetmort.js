function mortgageForm() {
    const purpose = document.getElementById("purpose").value;
    const bank = document.getElementById("bank").value;
    const loanAmount = document.getElementById("loanAmount").value;
    const citizenship = document.getElementById("citizenship").value;

    localStorage.setItem('purpose', purpose);
    localStorage.setItem('bank', bank);
    localStorage.setItem('loanAmount', loanAmount);
    localStorage.setItem('citizenship', citizenship);
}

function loadMortgageForm() {
    const purpose = localStorage.getItem('purpose');
    const bank = localStorage.getItem('bank');
    const loanAmount = localStorage.getItem('loanAmount');
    const citizenship = localStorage.getItem('citizenship');

    document.getElementById("purpose").value = purpose;
    document.getElementById("bank").value = bank;
    document.getElementById("loanAmount").value = loanAmount;
    document.getElementById("citizenship").value = citizenship;
}

function cleanLocalStorage() {
    localStorage.removeItem('purpose');
    localStorage.removeItem('bank');
    localStorage.removeItem('loanAmount');
    localStorage.removeItem('citizenship');
}
