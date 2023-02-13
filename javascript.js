// global variable 
const bankDeposit = document.getElementById("bank-deposit");
const loanBank = document.getElementById("loan-bank");
const totalBalance = document.getElementById("totalBalance");
const loan = document.getElementById("loan");
const payFullLoan = document.getElementById("pay-full-loan");
const pay = document.getElementById("pay");
const bank = document.getElementById("bank");
const work = document.getElementById("work");
const dataOutput = document.getElementById("get-data-api");
const dataSpec = document.getElementById("data-output");
const laptopHeader = document.getElementById("laptop-header");
const def = document.getElementById("default");
const img = document.getElementById("img");
const price = document.getElementById("price");
const buy = document.getElementById("buy");

const salary = 100;
payFullLoan.style.visibility = 'hidden';
payFullLoan.disabled = true;

/**
 * Method for asking the user for loan
 * uses the prompt method for getting a user insput.
 * takes the value and sends it to the calculatrLoan method  
 */
function askLoan() {

    const loanSum = Number(
        prompt(`enter sum that you wanna loan remember you canot loan more than 
        ${Number(bankDeposit.innerText)}`, 0 + " kr"));
        calculateLoan(loanSum);
};

/**
 * Method for calculate loan.¨
 * Task the parameter from the askLoan method and check if it is null or NaN.
 * Check if the loan isnt more than twice as the total balance
 * calls the disabledButton to disable the button. 
 * @param {*} loan take the user loan as a parameter
 */
function calculateLoan(loan) {

    const totalLoan = Number(bankDeposit.innerText) * 2;
    if (loan != null || loan != NaN) {
        if (loan <= totalLoan) {
            loanBank.innerHTML = String(loan.toFixed(2));
            totalBalance.innerHTML = String((loan + Number(bankDeposit.innerText)).toFixed(2));
            disableButton();

        } else {
            alert(`you cannot loan more then ${totalLoan}`);
        }
    } 

};

loan.addEventListener("click", askLoan);
