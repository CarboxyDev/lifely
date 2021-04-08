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

