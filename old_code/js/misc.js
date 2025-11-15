function calculateAssetsWorth(){
	let result = 0;

	for (x=0;x!=USER.assets.length;x++){
		let asset = USER.assets[x];
		result += asset[1];
	}

	return result;
}

function calculateNetWorth(){
	let assetsWorth = calculateAssetsWorth();
	let result = money+BANK.balance+assetsWorth-BANK.loan;
	return result;
}

function calculateTotalMoney(){
	let result = BANK.balance+money-BANK.loan;
	return result;
}


function calculateMonthlyBudget(){
	var amt;
	var minRange;
	var maxRange;
	if (hasJob){
		let yearlySalary = USER.job.salary*12;
		
		if (yearlySalary < 30000){
			[minRange,maxRange] = [36,40];

		}
		else if (yearlySalary > 30000 && yearlySalary < 50000){
			[minRange,maxRange] = [30,35];
		
		}		
		else if (yearlySalary > 50000 && yearlySalary < 100000){
			[minRange,maxRange] = [25,29];

		}
		else if (yearlySalary > 100000){
			[minRange,maxRange] = [22,24];
			
		}
		else if (yearlySalary > 175000){
			[minRange,maxRange] = [14,21];
		
		}


		amt = approx(Math.floor((randint(minRange,maxRange)*USER.job.salary)/100));
	
	}

	else if (!hasJob){
		var netWorth = calculateNetWorth();
		if (netWorth < 5000){
			[minRange,maxRange] = [25,30];
		}
		if (netWorth > 5000 && netWorth < 10000){
			[minRange,maxRange] = [11,12];
		}

		else if (netWorth > 10000 && netWorth < 50000){
			[minRange,maxRange] = [7,8];
		}
		else if (netWorth > 50000 && netWorth < 100000){
			[minRange,maxRange] = [5,6];
		}
		else if (netWorth > 100000 && netWorth < 150000){
			[minRange,maxRange] = [4,5];
		}
		else if (netWorth > 150000 && netWorth < 250000){
			[minRange,maxRange] = [3,3];
		}
		else if (netWorth > 250000 && netWorth < 500000){
			[minRange,maxRange] = [2,2];
		}
		else if (netWorth > 500000 && netWorth < 750000){
			[minRange,maxRange] = [2,2];
		}
		else if (netWorth > 750000){
			[minRange,maxRange] = [1,1];
		};

		amt = approx(Math.floor((randint(minRange,maxRange)*netWorth)/100));
	};

	if (amt < 250){
		amt = 250;
	}


	console.log(`Monthly Budget estimated at around $${amt}`);
	return amt;
}



function fetchBankBalance(){
	return BANK.balance;
}


function hasMoney(amount,msg=null){
	
	if (money > amount){
		return true;
	}
	else {
		return false;
	}
}


function hasMoneyInBank(amount,msg=null){
	let bankBalance = fetchBankBalance();
	if (bankBalance > amount){
		return true;
	}
	else {
		return false;
	}
}



function checkStats(){
	// limit max stats to 100
	if (health > 100){
		health = 100;
	}
	if (morale > 100){
		morale = 100;
	}
	if (intellect > 100){
		intellect = 100;
	}
	if (looks > 100){
		looks = 100;
	}
	
	// limit min stats to X
	if (health < 3){
		health = 3;
	}
	if (morale < 0){
		morale = 0;
	}
	if (intellect < 10){
		intellect = 10;
	}
	if (looks < 10){
		looks = 10;
	}

}



function generateConfirmBtn(content,onclick){
	let result = `<button class="btn btn-primary" onclick=${onclick}>${content}</button>`
	return result;
}

function generateCancelBtn(content){
	let result = `<button class="btn btn-secondary">${content}</button>`
	return result;
}

