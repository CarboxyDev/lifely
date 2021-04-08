

function bank(){

	let html = `
	<br><br>
	<button onclick="bank_details()" class="w3-btn w3-large w3-green w3-hover-indigo">Bank Details</button><br><br>
	<button onclick="loan_services()" class="w3-btn w3-large w3-green w3-hover-indigo">Loan Services</button><br><br>
	<button onclick="deposit()" class="w3-btn w3-large w3-green w3-hover-indigo">Deposit Money</button><br><br>
	<button onclick="withdraw()" class="w3-btn w3-large w3-green w3-hover-indigo">Withdraw Money</button><br><br>
	<hr>
	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Bank",
		html:html,
		background:"#333",
		showConfirmButton:false
	})



}





function bank_details(){

	if (hasLoan){

		var loan_status = `
		Loan Status : <b><i class="w3-text-red">HAS LOAN</i></b><br>
		`
	}
	else {
		var loan_status = `
		Loan Status : <b><i class="w3-text-green">NO LOAN</i></b><br>
		`
	};
	var bal;
	if (BANK.balance < 0){
		bal = `<span class="w3-text-red">${BANK.balance}</span>`;
	}
	else {
		bal = BANK.balance;
	};


	let html = `
	<br><br>
	Account Holder Name : <b>${USER.name}</b><br>
	Bank Account ID : <b>${BANK.id}</b><br>
	Total Transactions : <b>${BANK.transactions}</b><br><br><br>
	<h4>BANK BALANCE  : <b>${bal}$</b></h4><br><br>

	Current Debt : <b>${BANK.loan}$</b><br>

	${loan_status}<br><br>
	<button onclick="withdraw()" class="w3-btn w3-green w3-hover-blue">Withdraw</button>
	&nbsp;&nbsp;
	<button onclick="deposit()" class="w3-btn w3-green w3-hover-red">Deposit</button>	
	<br><hr><br><br>
	<button onclick="bank()" class="w3-btn w3-blue w3-hover-red">Return To Bank</button>
	`;
	Swal.fire({
		heightAuto:false,
		title:`${USER.country} National Bank`,
		html:html,
		position:top,
		showConfirmButton:false
	})

}


function loan_services(){

	let html = `<br>
	<h4> Current Debt : <b>${BANK.loan}$</b>
	<br><br><hr>
	<button onclick="loan()" class="w3-btn w3-red w3-large">Take Loan</button>
	<button onclick="repay_loan()" class="w3-btn w3-green w3-large">Repay Loan</button>
	<br><br>
	`

	Swal.fire({
		heightAuto:false,
		title:"Loan Services",
		html:html,
		confirmButtonText:"Return To Bank"
	}).then((result) => {
		if (result.value){
			bank();
		}

	});


}


function loan(){

	if (hasJob){

		var max_loan_amt = Math.floor(USER.salary*12)*4 - BANK.loan;
	}
	else {
		var max_loan_amt = 20000 - BANK.loan;
	}
	let html = ` <br>
	Bank Balance : <b>${BANK.balance}$</b><br>
	Current Debt : <b>${BANK.loan}$</b><br>
	Annual Salary : <b>${Math.floor(USER.salary*12)}$</b><br><br>

	Maximum Loanable Amount : <b>${max_loan_amt}$</b><br>
	`;
	
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
			loan_money(max_loan_amt);
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			bank();
		}

	});


}


function loan_money(max_loan_amt){

	let html = `
	<br>
	You are in the process of taking a loan.<br>
	The requested amount shall be added to your bank balance.<br>
	Loan Interest Rate : <b>2% / Month</b><br><br> 


	`
	Swal.fire({
		heightAuto:false,
		title:"Loan Services",
		position:top,
		html:html,
		showCancelButton:true,
		cancelButtonText:"Abandon",
		confirmButtonText:"Authorize",
		input:"text",
		inputValue:10000,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 2500){
				return "Minimum Loan Amount is $2500";
			}
			else if (!isnum){
				return "Please input a number only";
			}
			else if (!val){
				return "Please input an amount";
			}
			else if (isnum && val > max_loan_amt){
				return `Maximum allotable loan is ${max_loan_amt}$`;
			}
			else if (isnum && val >= 2500){
				process_loan(val);
			}
			else {
				return "Please input a valid amount";
			}
		}
	});
}




function process_loan(amount){
	var amount = parseInt(amount);
	BANK.balance += amount;
	BANK.loan += amount;
	hasLoan = true;
	message(`Your loan of ${amount}$ has been processed`);
	message(`You've recieved the said amount in your bank account`);

	let html = `
	Amount Loaned : <b>${amount}$</b><br>
	The loaned amount has been added to your bank balance.<br>

	`
	Swal.fire({
		heightAuto:false,
		title:"Loan Alloted",
		icon:"success",
		html:html,
		confirmButtonText:"Proceed",
		allowOutsideClick:false,

	}).then((result) => {

		if (result.value){
			loan_certificate(amount);

		}

	})

}



function loan_certificate(amount){

	let html = `
	<h3> ${USER.country} National Bank </h3><br><hr><br>

	This certifcate is to certify that <b>${USER.name}</b> ,
	a client of ${USER.country} National Bank has taken a loan
	of amount - <b>${amount}$</b> at an interest rate of
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
	of ${USER.country} National Bank.<br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"Loan Certificate",
		html:html,
		confirmButtonText:"I agree with the terms",
		allowOutsideClick:false,
		position:top,
		footer:"Note : Use the Repay Button under Loan Services to repay"
	});

}




function repay_loan(){

	if (hasLoan){
		let html = `
		<br>
		You are in the process repaying your outstanding debt.<br>
		The repayment amount shall be deducted from your bank balance.<br>
		<br>Current Debt : <b>${BANK.loan}$</b><br>	

		`
		Swal.fire({
			heightAuto:false,
			title:"Loan Services",
			position:top,
			html:html,
			showCancelButton:true,
			cancelButtonText:"Abandon",
			confirmButtonText:"Authorize",
			input:"text",
			inputValue:2500,
			inputValidator: (val) => {

				let isnum = /^\d+$/.test(val);
			
				if (isnum && val < 2500){
					return "Minimum Repayment Amount is $2500";
				}
				else if (!isnum){
					return "Please input a number only";
				}
				else if (!val){
					return "Please input an amount";
				}
				else if (val >= 2500 && BANK.balance >= val){
					repay_amount(val);
				}
				else if (val >= 2500 && BANK.balance < val){
					return "You don't have that much money in bank";
				}
				else {
					return "Please input a valid amount";
				}
			}
		});

	}
	else {
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You don't have any loan!",
			confirmButtonText:"Back To Bank"
		}).then((result) => {
			if (result.value){
				bank();
			}

		})
	}

}



function repay_amount(amount){

	var amount = parseInt(amount);
	if (amount > BANK.loan){
		amount = BANK.loan;
	}
	BANK.balance -= amount;
	BANK.loan -= amount;
	if (BANK.loan <= 0){
		hasLoan = false;
	}

	message(`You repaid ${amount}$ in due loans`);

	let html = `
	<br>
	Debt Paid : <b>${amount}$</b><br>
	Remaining Debt : <b>${BANK.loan}$</b><br>
	`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"Loan Repayment",
		html:html,
		confirmButtonText:"Cool!"
	});

}



function deposit(){
	let html = `<br>
	<h4>BANK BALANCE : <b>${BANK.balance}$</b></h4><br><br><br>
	The amount in bank is increased at <b>1%</b> /month<br>
	<h5> Depositing money </h5>
	`

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} National Bank`,
		position:top,
		html:html,
		confirmButtonText:"Confirm Deposit",
		showCancelButton:true,
		cancelButtonText:"Cancel",
		input:"text",
		inputValue:500,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 500){
				return "Minimum Deposit is $500";
			}
			else if (isnum && val >= money){
				return "You don't have that much money";
			}
			else if (!isnum){
				return "Please input a number only";
			}
			else if (!val){
				return "Please input an amount";
			}
			else if (isnum && val >= 500){
				deposit_money(val);
			}
			else {
				return "Please input a valid amount";
			}
		}
	});

}


function deposit_money(amount){
	var amount = parseInt(amount);
	money = money - amount;
	BANK.balance = BANK.balance + amount;
	BANK.transactions += 1;

	display()
	message(`You deposited ${amount}$ to your bank acount`);


	let html = `<br>
	You deposited money to your ${USER.country} National Bank account.<br><br>
	Amount Deposited : <b>${amount}$</b><br><br><br>
	<h4>BANK BALANCE : <b>${BANK.balance}$</b></h4><br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"Transaction Successful",
		icon:"success",
		html:html,
		confirmButtonText:"Okay"
	});

}




function withdraw(){

	let html = `<br>
	<h4>BANK BALANCE : <b>${BANK.balance}$</b></h4><br><br>

	<h5> Withdrawing money </h5>
	`

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} National Bank`,
		position:top,
		html:html,
		confirmButtonText:"Confirm Transaction",
		showCancelButton:true,
		cancelButtonText:"Cancel",
		input:"text",
		inputValue:250,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 250){
				return "Minimum Widthdraw is $250";
			}
			else if (isnum && val > BANK.balance){
				return "You don't have that much money in bank";
			}
			else if (!isnum){
				return "Please input a number only";
			}
			else if (!val){
				return "Please input an amount";
			}
			else if (isnum && val >= 250){
				withdraw_money(val);
			}
			else {
				return "Please input a valid amount";
			}
		}
	});



}


function withdraw_money(amount){

	var amount = parseInt(amount);
	money = money + amount;
	BANK.balance = BANK.balance - amount;
	BANK.transactions += 1;

	display()
	message(`You withdrew ${amount}$ from your bank acount`);


	let html = `<br>
	You withdrew money from your ${USER.country} National Bank account.<br><br>
	Amount Withdrawn : <b>${amount}$</b><br><br><br>
	<h4>BANK BALANCE : <b>${BANK.balance}$</b></h4><br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"Transaction Successful",
		icon:"success",
		html:html,
		confirmButtonText:"Okay"
	});


}

