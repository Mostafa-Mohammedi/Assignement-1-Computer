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
    if (Number(loanBank.innerText) >= 0 && sum >= 0) {
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
        const p = document.createElement("p");
        p.innerText = computerApi[0].specs[index];
        def.appendChild(p);
    }
}

/**
 * Method for showing the selected data from the API from title
 * @param {*} computer takes the API data as a parameter
 * @returns the computer value
 */
const addComputersDataToSelect = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    dataOutput.appendChild(computerElement);
    return computerElement.value
}

/**
 * Method for taking the selected value and returning the specs and image values 
 */
function handleComputerDataChange() {
    const selectedId = this.value;
    const selectedComputer = computerApi.find(computer => computer.id == selectedId);
    img.src = `https://hickory-quilled-actress.glitch.me/${selectedComputer.image}`;
    if(selectedComputer.id == 5){
        img.src= "https://hickory-quilled-actress.glitch.me/assets/images/5.png";
    }
    laptopHeader.innerHTML = selectedComputer.title;
    price.innerHTML = selectedComputer.price;
    if (selectedComputer) {
        dataSpec.innerText = selectedComputer.description;
        def.innerHTML = "";
        selectedComputer.specs.forEach(spec => {
            const p = document.createElement("p");
            p.innerText = spec;
            def.appendChild(p);
        });
    }
}

/**
 * Method for buying the computer 
 * check if the total balance is sufficient enough  
 */
function buyComputer(){
    let priceBuy = Number(price.innerText);
    let totalBalanCalc = Number(totalBalance.innerText);
    let bankDepositAmount = Number(bankDeposit.innerText);
    if(totalBalanCalc >= priceBuy){
        let rest = Number(bankDeposit.innerText) - priceBuy;
        if(rest < 0){
            bankDeposit.innerHTML = 0;
            totalBalance.innerHTML = Number(loanBank.innerText) + rest;
            loanBank.innerHTML =  Number(loanBank.innerText) + rest;
            alert("you have bought a new Computer")
        }else{
            bankDepositAmount -= priceBuy;
            bankDeposit.innerHTML = bankDepositAmount;
            totalBalance.innerHTML = bankDepositAmount + Number(loanBank.innerText);
            alert("you have bought a new Computer");
        }
 
    }
    else {
        alert("you cannot buy the computer insufficient amount in total balance")
    }
};

loan.addEventListener("click", askLoan);
work.addEventListener("click", payINcrease);
bank.addEventListener("click", transferPay);
payFullLoan.addEventListener("click", payLoanDown);
dataOutput.addEventListener("change", handleComputerDataChange);
buy.addEventListener("click", buyComputer);