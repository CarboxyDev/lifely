// DEV NOTES
// Cleaned code on 1 Sept 2021

function bank(){
	let html = `<br>${buttons.bankAccount}<br><br>${buttons.loanServices}<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Bank",
		html:html,
		showConfirmButton:false
	});
};



function bankAccount(){
	let loanStatus;
	let bal = BANK.balance;

	if (hasLoan){
		loanStatus = `Loan Status : <i class="t-red">HAS LOAN</i>`;
	}
	else {
		loanStatus = `Loan Status : <i class="t-green">NO LOAN</i>`;
	};
	
	if (BANK.balance < 0){
		bal = `<span class="t-red">$${BANK.balance}</span>`;
	};

	let html = `<br><br>
	Account Holder : ${USER.name}<br>
	Bank Account ID : ${BANK.id}<br>
	Transactions : ${BANK.transactions}<br>
	Current Debt : <b>$${BANK.loan}</b><br><br>

	<h4>BANK BALANCE  : <b>$${bal}</b></h4><br><br>
	
	${loanStatus}<br><br><br>
	${buttons.deposit}&nbsp;&nbsp;&nbsp;
	${buttons.withdraw}
	<br><br>`;
	
	Swal.fire({
		heightAuto:false,
		title:`Bank Account`,
		html:html,
		showConfirmButton:false,
		showCloseButton:true
	});
};



function loanServices(){
	let html = `<br><h4>Current Debt : <b>$${BANK.loan}</b>
	<br><br><hr>
	<button onclick="loan()" class="w3-btn w3-red w3-large w3-round">Take Loan</button>
	<button onclick="repayLoan()" class="w3-btn w3-green w3-large w3-round">Repay Loan</button>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Loan Services",
		html:html,
		confirmButtonText:"Return To Bank"
	}).then((result) => {
		if (result.value){
			bank();
		};
	});
};



function loan(){
	let maxLoanableAmt;

	if (hasJob){
		maxLoanableAmt = Math.floor(USER.job.salary*12)*4 - BANK.loan;
	}
	else {
		maxLoanableAmt = 20000 - BANK.loan;
	};

	let html = ` <br>
	Bank Balance : <b>$${BANK.balance}</b><br>
	Current Debt : <b>$${BANK.loan}</b><br>
	Annual Salary : <b>$${Math.floor(USER.job.salary*12)}</b><br><br>

	Maximum Loanable Amount : <b>$${maxLoanableAmt}</b><br><br>`;
	
	Swal.fire({
		heightAuto:false,
		title:`${USER.country} Loan Services`,
		html:html,
		position:top,
		showCancelButton:true,
		confirmButtonText:"Proceed",
		cancelButtonText:"Not today"
	}).then((result) => {
		if (result.value){
			loanBankMoney(maxLoanableAmt);
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			bank();
		};
	});
};


function loanBankMoney(maxLoanableAmt){
	let html = `<br>
	You are in the process of taking a loan.<br>
	The requested amount shall be added to your bank balance.<br>
	Loan Interest Rate : <b>2% / Month</b><br><br> `;

	Swal.fire({
		heightAuto:false,
		title:"Loan Services",
		html:html,
		showCancelButton:true,
		cancelButtonText:"Cancel",
		confirmButtonText:"Authorize",
		input:"text",
		inputValue:10000,
		inputValidator: (val) => {

			let isNum = /^\d+$/.test(val);
			
			if (isNum && val < 2500){
				return "Minimum Loan Amount is $2500";
			}
			else if (!isNum){
				return "Please enter a number";
			}
			else if (!val){
				return "Please enter a valid amount";
			}
			else if (isNum && val > maxLoanableAmt){
				return `Maximum loan allowed is $${maxLoanableAmt}`;
			}
			else if (isNum && val >= 2500){
				processBankLoan(val);
			}
			else {
				return "Please input a valid amount";
			};
		},
	});
};




function processBankLoan(amount){
	amount = parseInt(amount);
	BANK.balance += amount;
	BANK.loan += amount;
	hasLoan = true;
	message(`Your loan of $${amount} has been processed`);
	message(`You've received the loaded amount in your bank account`);

	let html = `Amount Loaned : <b>$${amount}</b><br>
	The loaned amount has been added to your bank balance.<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Loan Alloted",
		icon:"success",
		html:html,
		confirmButtonText:"Proceed",
		allowOutsideClick:false,
	}).then((result) => {
		if (result.value){
			loanCertificate(amount);
		};
	});
};



function loanCertificate(amount){
	let html = `
	<h3> ${USER.country} National Bank </h3><br><hr><br>

	This certifcate is to certify that <b>${USER.name}</b> ,
	a client of ${USER.country} National Bank has taken a loan
	of amount - <b>$${amount}</b> at an interest rate of
	<b>2%</b> of the total amount / month.<br><br>
	<hr>
	<u>It must be understood that the client will need to repay the
	said loan in as many installment as required on will.</u>
	<br><br>
	<hr>
	The alloted loan has been added to the client's 
	<b>${USER.country} National Bank Account</b> balance.
	<br><br>
	By proceeding , you agree to all the <b>Terms & Conditions</b>
	of ${USER.country} National Bank.<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Loan Certificate",
		html:html,
		confirmButtonText:"Sign",
		allowOutsideClick:false,
		footer:"Note : Use the Repay Button under Loan Services to repay"
	});
};



function repayLoan(){
	if (hasLoan){
		let html = `<br>You are in the process repaying your outstanding debt.<br>
		The repayment amount shall be deducted from your bank balance.<br>
		<br>Current Debt : <b>$${BANK.loan}</b><br>`;

		Swal.fire({
			heightAuto:false,
			title:"Loan Services",
			html:html,
			showCancelButton:true,
			cancelButtonText:"Cancel",
			confirmButtonText:"Repay",
			input:"text",
			inputValue:2500,
			inputValidator: (val) => {
				let isNum = /^\d+$/.test(val);
				if (isNum && val < 2500){
					return "Minimum Repayment Amount is $2500";
				}
				else if (!isNum){
					return "Please input a number only";
				}
				else if (!val){
					return "Please input an amount";
				}
				else if (val >= 2500 && BANK.balance >= val){
					repayAmount(val);
				}
				else if (val >= 2500 && BANK.balance < val){
					return "You don't have that much money in bank";
				}
				else {
					return "Please input a valid amount";
				};
			},
		});

	}
	else {
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You don't have any loans!",
			confirmButtonText:"Okay"
		}).then((result) => {
			if (result.value){
				bank();
			};
		});
	};
};



function repayAmount(amount){
	amount = parseInt(amount);
	if (amount > BANK.loan){
		amount = BANK.loan;
	}

	message(`You repaid $${amount} in due loans`);
	BANK.balance -= amount;
	BANK.loan -= amount;
	if (BANK.loan <= 0){
		hasLoan = false;
	};

	let html = `<br>Debt Paid : <b>$${amount}</b><br>
	Remaining Debt : <b>$${BANK.loan}</b><br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"Repaid Loan",
		html:html,
		confirmButtonText:"Great"
	});
};



function deposit(){
	let html = `<br><h4>BANK BALANCE : <b>$${BANK.balance}</b></h4><br><br><br>
	The amount in bank is increased at <b>1%</b> /month<br>
	<h5> Depositing money </h5>`;

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} National Bank`,
		html:html,
		confirmButtonText:"Confirm Deposit",
		showCancelButton:true,
		cancelButtonText:"Cancel",
		input:"text",
		inputValue:500,
		inputValidator: (val) => {
			let isNum = /^\d+$/.test(val);
			
			if (isNum && val < 500){
				return "Minimum Deposit is $500";
			}
			else if (isNum && val >= money){
				return "You don't have that much money";
			}
			else if (!isNum){
				return "Please input a number only";
			}
			else if (!val){
				return "Please input an amount";
			}
			else if (isNum && val >= 500){
				depositMoney(val);
			}
			else {
				return "Please input a valid amount";
			};
		},
	});
};



function depositMoney(amount){
	amount = parseInt(amount);
	money -= amount;
	message(`You deposited $${amount} to your bank acount`);
	BANK.balance += amount;
	BANK.transactions += 1;
	display();
	
	let html = `<br>
	You deposited money to your ${USER.country} National Bank account.<br><br>
	Amount Deposited : <b>$${amount}</b><br><br><br>
	<h4>BANK BALANCE : <b>$${BANK.balance}</b></h4><br><br>`;
	
	Swal.fire({
		heightAuto:false,
		title:"Deposited Money",
		icon:"success",
		html:html,
		confirmButtonText:"Okay"
	});
};



function withdraw(){
	let html = `<br><h4>BANK BALANCE : <b>$${BANK.balance}</b></h4><br><br>
	<h5> Withdrawing money </h5><br><br>`;

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} National Bank`,
		html:html,
		confirmButtonText:"Withdraw",
		showCancelButton:true,
		cancelButtonText:"Cancel",
		input:"text",
		inputValue:250,
		inputValidator: (val) => {
			let isNum = /^\d+$/.test(val);
			
			if (isNum && val < 250){
				return "Minimum amount to withdraw is $250";
			}
			else if (isNum && val > BANK.balance){
				return "You don't have that much money in bank";
			}
			else if (!isNum){
				return "Please input a number only";
			}
			else if (!val){
				return "Please input an amount";
			}
			else if (isNum && val >= 250){
				withdrawMoney(val);
			}
			else {
				return "Please input a valid amount";
			};
		},
	});
};



function withdrawMoney(amount){
	amount = parseInt(amount);
	money += amount;
	message(`You withdrew $${amount} from your bank acount`);
	BANK.balance -= amount;
	BANK.transactions += 1;
	display()
	
	let html = `<br>
	You withdrew money from your ${USER.country} National Bank account.<br><br>
	Amount Withdrawn : <b>$${amount}</b><br><br><br>
	<h4>BANK BALANCE : <b>$${BANK.balance}</b></h4><br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Withdrawn Money",
		icon:"success",
		html:html,
		confirmButtonText:"Okay"
	});
};



function bankTransaction(amount){
	BANK.transactions += 1;
	BANK.balance += amount;
	BANK.transactionsList.push(amount);

	if (amount > 0){
		message(`$${amount} was added to your bank balance`);
	}
	else if (amount < 0){
		let msg = `$${amount} was deducted from your bank balance`.replace('-','');
		message(msg);
	};
};


// In an event where the person requires money urgently.
function forceLoan(amt,msg=null){
	BANK.transactions += 1;
	BANK.loan += Number(amt);
	hasLoan = true;

	if (msg == null){
		 message(`You had to take an immediate loan of $${amt}`);
	}
	if (msg != null){
		message(msg);
	};
};