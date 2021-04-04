initStats()

function barChange(barType,percent){
	updateStats();
	let elem = document.querySelector(`#${barType}-fill`);

	var statPercent = Number(elem.style.width.replace('%',''));


	
	if (percent == statPercent){
		// replace 0 with the stat type like health,morale
		return;
	}
	else if (percent > statPercent){

		let animInterval = setInterval(() => {
			if (percent == statPercent){
				clearInterval(animInterval);
			}
			elem.style.width = statPercent+"%";
			statPercent += 1;


		},25)
	}
	else if (percent < statPercent){
		
		let animInterval = setInterval(() => {
			if (percent == statPercent){
				clearInterval(animInterval)
			}
			elem.style.width = statPercent+"%";
			statPercent -= 1;


		},25)
	}
	else {
		document.write('Game crashed due to error in function barChange()')
	}
	


}



function fetchStats(statName){
	if (statName == "health"){
		return health;
	}
	else if (statName == "morale"){
		return morale;
	} 
	else if (statName == "intellect"){
		return intellect;
	}
	else if (statName == "looks"){
		return looks;
	}
	else {
		return 0;
	}
}


function updateStats(){
	document.querySelector('#health').innerText = health;
	document.querySelector('#morale').innerText = morale;
	document.querySelector('#intellect').innerText = intellect;
	document.querySelector('#looks').innerText = looks;
}



function initStats(){
	health = randint(92,100);
	morale = randint(88,100);
	intellect = randint(60,95);
	looks = randint(50,97);

	barChange('health',health);
	barChange('morale',morale);
	barChange('intellect',intellect);
	barChange('looks',looks);
	
}