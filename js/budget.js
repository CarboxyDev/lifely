function monthlyBudgetEvents(){

	if (!isJailed && !isStudent){
		let budgetMessage;
		monthsSinceLastBudgetUpdate += 1;
		if (monthsSinceLastBudgetUpdate >= 3){
			monthsSinceLastBudgetUpdate = 0;
			budgetAmount = calculateMonthlyBudget();
			if (budgetAmount > setBudgetAmount){
				message(`You need to increase your budget spending to sustain your lifestyle`);
			}
		};

		if (fetchBankBalance() > setBudgetAmount){
			bankTransaction(-setBudgetAmount);
			budgetMessage = `You paid your monthly budget of $${setBudgetAmount} from your Bank`;
		}
		else if (fetchBankBalance() < setBudgetAmount && money >= setBudgetAmount){
			money -= setBudgetAmount;
			budgetMessage = `You paid your monthly budget of $${setBudgetAmount} from your in-hand money`;
		}
		else if (fetchBankBalance() < setBudgetAmount && money < setBudgetAmount){
			let msg = `Due to shortage of money , you had to take a loan of $${setBudgetAmount} to make ends meet`;
			forceLoan(setBudgetAmount,msg);
			budgetMessage = `You paid your monthly budget by taking a loan of $${setBudgetAmount}`;
			// alert user using new beta feature [IMPORTANT]

		};






		message(budgetMessage);

		if (setBudgetAmount < budgetAmount){
			health -= randint(0,2);
			morale -= randint(1,2);

		}
		display();


	};

 	//maybe also set for student

}




function budget(){

	let html = `<br><br>
	<h4>Current Budget : <b>$${setBudgetAmount}</b></h4><br><br>
	<h4>Recommended Budget : <b>$${budgetAmount}</b></h4><br><br><br>
	<button onclick="modifyBudget()" class="btn btn-success">Modify Budget</button>
	<br><br>
	`;

	Swal.fire({
		heightAuto:false,
		title:"Monthly Budget",
		html:html,
		showConfirmButton:false,
		showCloseButton:true
	});


};



function modifyBudget(){

	let html = `
	<h4>Current Budget : <b>$${setBudgetAmount}</b></h4><br><br>
	<h4>Recommended Budget : <b>$${budgetAmount}</b></h4><br><br>
	`;

	Swal.fire({
		heightAuto:false,
		title:"Modifying Budget",
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:"Modify",
		cancelButtonText:"Leave",
		input:"text",
		inputValue:budgetAmount,
		inputValidator: (val) => {
			let isnum = /^\d+$/.test(val);
			if (isnum && val > calculateNetWorth()/2){
				return "Too big of a budget for you!"
			}
			else if (isnum && val >= 100){
				message(`You changed your monthly budget to <b>$${val}</b>`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:`Monthly budget changed to $${val}`,
					confirmButtonText:"Nice"
				});
				setBudgetAmount = val;
			}
			else if (!val){
				return `Please specify a budget`
			}
			else if (!isnum){
				return `Please specify a number`
			}
			else if (val < 250){
				return `Budget can't be lesser than $250`
			}
			else {
				return `Only put a number!`
			};
		}
	});
};







