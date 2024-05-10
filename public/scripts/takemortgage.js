function mortgageForm() {
    const rtmethod = document.getElementById("rtmethod").value;
    const bank = document.getElementById("bank").value;
    const loanAmount = document.getElementById("loanAmount").value;
    const citizenship = document.getElementById("citizenship").value;

    localStorage.setItem('rtmethod', rtmethod);
    localStorage.setItem('bank', bank);
    localStorage.setItem('loanAmount', loanAmount);
    localStorage.setItem('citizenship', citizenship);
}

function loadMortgageForm() {
    const rtmethod = localStorage.getItem('rtmethod');
    const bank = localStorage.getItem('bank');
    const loanAmount = localStorage.getItem('loanAmount');
    const citizenship = localStorage.getItem('citizenship');

    document.getElementById("rtmethod").value = rtmethod;
    document.getElementById("bank").value = bank;
    document.getElementById("loanAmount").value = loanAmount;
    document.getElementById("citizenship").value = citizenship;
}

function cleanLocalStorage() {
    localStorage.removeItem('rtmethod');
    localStorage.removeItem('bank');
    localStorage.removeItem('loanAmount');
    localStorage.removeItem('citizenship');
}
