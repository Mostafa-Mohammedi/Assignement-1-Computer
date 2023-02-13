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
let computerApi = [];

/**
 * Fetch data api and send the data to the computerApi array
 */
fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => computerApi = data)
    .then(computers => addComputersData(computerApi))
    .catch(error => {
        console.error('Error fetching data:', error);
    });

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

/**
 * Method for disabling the button so the user cant loan more than once
 * Check if loan is more then o it will disable the loan button
 * Show the pay full button
 */

function disableButton() {
    if (Number(loanBank.innerText) > 0) {
        loan.disabled = true;
        payFullLoan.style.visibility = "visible";
        payFullLoan.disabled = false;
    }
};

/**
 * Method for increasing the pay when user work  
 */
function payINcrease() {
    let payincrease = Number(pay.innerText) + salary;
    pay.innerHTML = payincrease;

}
/**
 * Method for transfering money from the pay to the bank.
 * If user has loan the money will be deducted from the pay
 */

function transferPay() {
    let bankDepositCalc = Number(bankDeposit.innerText);
    let totalBalanCalc = Number(totalBalance.innerText);
    let totalTransfer = Number(pay.innerText) + Number(bankDeposit.innerText);
    let payTransfer = (Number(pay.innerText) * 0.1);
    if (Number(loanBank.innerText) > 0) {
        bankDepositCalc += (totalTransfer - payTransfer);
        bankDeposit.innerHTML = (totalTransfer - payTransfer);
        loanBank.innerHTML = (Number(loanBank.innerText) - payTransfer);
        totalBalance.innerHTML = Number(bankDeposit.innerHTML) + Number(loanBank.innerHTML);
        pay.innerHTML = 0;
        if (loanBank.innerText <= 0) {
            loan.disabled = false;
        }
    }

    else {
        bankDepositCalc += totalTransfer;
        totalBalanCalc += Number(pay.innerText);

        bankDeposit.innerHTML = totalTransfer;
        totalBalance.innerHTML = totalBalanCalc;
        pay.innerHTML = 0;
    }

}

/**
 * Method for paying down the loan
 * Disabled the payfull loan
 * Check the difference and calculate the difference and show the output 
 */

function payLoanDown() {
    let payWork = Number(pay.innerText);
    let bankDep = Number(bankDeposit.innerText);
    let sum = payWork - Number(loanBank.innerText);
    if (Number(loanBank.innerText) > 0 && sum > 0) {
        pay.innerHTML = 0;
        loanBank.innerHTML = 0;
        bankDeposit.innerHTML = bankDep + sum;
        totalBalance.innerHTML = bankDeposit.innerText;
        loan.disabled = false;
        payFullLoan.style.visibility = "hidden";
        payFullLoan.disabled = true;
    }

}

/**
 * Method for taking the APi data and displaying the data.
 * Add the initial value
 * @param {*} computers 
 */

const addComputersData = (computers) => {
    computers.forEach(x => addComputersDataToSelect(x));
    dataSpec.innerText = computerApi[0].description;
    img.src = `https://hickory-quilled-actress.glitch.me/${computerApi[0].image}`;
    price.innerHTML = computerApi[0].price;
    laptopHeader.innerHTML = computerApi[0].title;

    for (let index = 0; index < computerApi[0].specs.length; index++) {
        console.log(computerApi[0].specs[index]);
        const p = document.createElement("p");
        p.innerText = computerApi[0].specs[index];
        def.appendChild(p);
    }
}

loan.addEventListener("click", askLoan);
work.addEventListener("click", payINcrease);
bank.addEventListener("click", transferPay);
payFullLoan.addEventListener("click", payLoanDown);
