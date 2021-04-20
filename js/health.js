function checkup(){
	var cost = randint(75,250);
	let html = `<br>
	You will need to pay some money before a doctor checks your
	health and looks for any illnesses<br><br>
	Cost of Checkup - <b>$${cost}</b><br>
	`;
	Swal.fire({
		heightAuto:false,
		background:swalBackground,
		icon:"info",
		title:"Checkup",
		html:html,
		confirmButtonText:`Pay $${cost}`,
		showCancelButton:true,
		cancelButtonText:"Nevermind"
	}).then((result) => {
		if (result.value){
			let hadCheckup = false;
			if (hasMoney(cost)){
				money -= cost;
				hadCheckup = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				hadCheckup = true;
			}
			else {
				
				swalNoMoney.fire();
				
			};
			if (hadCheckup){
				if (hasDisease){
					diseaseCheckup();
				}
				else {
					morale += randint(0,1);
					Swal.fire({
						heightAuto:false,
						title:`You're Healthy!`,
						confirmButtonText:'Nice',
						icon:'success',
						text:`You're as healthy as a fruit!`
					});
				}
			}
			display();
		}

	});
};




function westernMedicine(){
	// cost partially dependent on person's salary
	let cost;
	let html;
	if (hasJob && USER.job.salary <= 3500 ){
		cost = randint(100,500);
		let realCost = randint(500,2000);
		
		html = `<br><br>
		You are getting cheaper subsidized medicine due to government 
		benefits for middle class citizens<br><br>
		Real cost of medicine : <b>$${realCost}</b><br>
		Subsidized cost of medicine : <b>$${cost}</b><br>
		<br><br>`;
	}
	else if (hasJob == false){
		cost = randint(50,250);
		let realCost = randint(500,2000);
		
		html = `<br><br>
		You are getting cheaper subsidized medicine due to government 
		benefits for unemployed citizens<br><br>
		Real cost of medicine : <b>$${realCost}</b><br>
		Subsidized cost of medicine : <b>$${cost}</b><br>
		<br><br>`;

	}
	else {
		cost = randint(500,2000);

		html = `<br><br>
		Cost of the Medicine - <b>$${cost}</b><br>
		<br>
		`;
	}
	
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Western Medicine",
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:"Nevermind"
	}).then((result) => {

		if (result.value){
			let takenMedicine = false;
			if (hasMoney(cost)){
				money -= cost;
				takenMedicine = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				takenMedicine = true;
			}
			else {
				swalNoMoney.fire();
			};

			if (takenMedicine){
				health += randint(1,3);
				message(`You spent $${cost} on western medicine`);

				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:'Western Medicine Taken!',
					text:'You feel healthier now',
					confirmButtonText:'Alright'
				})
			};
			display();
		}
	});


};

function dentist(){
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Dentist",
		text:"Coming Soon!"
	});
};








function plasticSurgery(){
	let max = 30000;
	let min = 5000;
	let cost = randint(min,max);
	let html = `<br><br>
	Cost of surgery - <b>$${cost}</b><br>
	Success Chance - <b>80%</b><br>
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Plastic Surgery",
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:"Not for me"
	}).then((result) =>{
		if (result.value){
			let gotPlasticSurgery = false;
			if (hasMoney(cost)){
				money -= cost;
				gotPlasticSurgery = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				gotPlasticSurgery = true;
			}
			else {
				swalNoMoney.fire();
			};

			if (gotPlasticSurgery){
				let randNum = randint(0,4);
				if (randNum != 4){
					message(`You had a successful plastic surgery`);
					looks += randint(5,12);
					Swal.fire({
						heightAuto:false,
						icon:'success',
						title:'Successful Surgery!',
						text:`You had a successful plastic surgery`,
						confirmButtonText:'Cool'
					});

				}
				else if (randNum == 4){
					message(`You had a botched plastic surgery`);
					looks -= randint(4,8);
					Swal.fire({
						heightAuto:false,
						icon:'error',
						title:'Botched Surgery!',
						text:`You had a botched plastic surgery`,
						confirmButtonText:'Crap!'
					});
				}
			}

			display()
		};
	});


};





function therapy(){
	if (hasDepression){
		var cost = randint(200,600);

		let html = `<br><br>
		Cost of therapy session : <b>$${cost}</b><br><br>
		You are being treated for depression.
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"Therapy Session",
			html:html,
			confirmButtonText:`Pay $${cost}`,
			showCancelButton:true,
			cancelButtonText:"I'd Rather Not"
		}).then((result)=> {
			if (result.value){
				let hadTherapy = false;

				if (hasMoney(cost)){
					money -= cost;
					hadTherapy = true;
				}
				else if (hasMoneyInBank(cost)){
					bankTransaction(-cost);
					hadTherapy = true;

				}
				else {
					swalNoMoney.fire();
					hadTherapy = false;

				};


				if (hadTherapy){
					message(`You had a depression therapy session`);
					morale += randint(1,4);

					Swal.fire({
						heightAuto:false,
						title:'Depression Therapy',
						text:'You had a depression therapy session. You feel better now.',
						icon:'success',
						confirmButtonText:'Okay'
					});

				}



				display();
			}

		});
	}


	else if (!hasDepression){
		let html = `<br><br>
		It doesn't seem like you're suffering from depression.<br>
		You're all good to go without any therapy sessions!<br><br>
		`
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You don't require therapy",
			html:html,
			confirmButtonText:"Alright"
		});
	}
};




function depression(){

	hasDepression = true;
	message(`You have depression`);
	let html = `
	<br> Depression has struck another human and this time,
	it's you.<br>
	Your low morale is the reason behind your depression.<br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"You Have Depression.",
		html:html,
		confirmButtonText:"Okay"
	});

}



function cureDepression(){
	has_depression = false;
	message(`You came out strong and defeated depression`);

	let html = `<br><br>
	You did it.<br>
	You defeated depression.<br>		

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"You Defeated Depression!",
		confirmButtonText:"Awesome!",
		html:html,
		allowOutsideClick:false
	});

}


function EffectOfdepression(){

	let chance = randint(1,100);
	if (chance >= 5){
		message(`You can't take it anymore. You are too despressed to survive`);
		message(`You took the extreme step of ending your life`);
		death();
	};


}






function diseaseCheckup(){
	
	let allDiseases = Object.keys(diseases);
	let diseaseName = allDiseases[0];
	let diseaseObj = diseases[allDiseases];
	let diseaseLevel = diseaseObj.level;
	diseaseObj.detected = true;
	let cost;
	let successChance;

	if (diseaseLevel == 1){
		cost = randint(500,1500);
		successChance = randint(90,100);
	}
	else if (diseaseLevel == 2){
		cost = randint(1000,4500);
		successChance = randint(70,95);
	}
	else {
		cost = randint(2000,5000);
		successChance = randint(35,60);
	};
	

	let html = `<br><br>
	You have been diagnosed with <b>${diseaseName}</b><br><br>
	Disease Severity : <b class='w3-text-red'>${diseaseObj.severity}</b><br>
	Treatment Cost : <b>$${cost}</b><br>
	Success Chance : ${successChance}%

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		title:'Disease Detected',
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:`I'll survive`
	}).then((result) => {
		if (result.value){
			let gotTreatment = false;

			if (hasMoney(cost)){
				money -= cost;
				gotTreatment = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				gotTreatment = true;
			}
			else {
				swalNoMoney.fire();
				gotTreatment = false;
			};

			if (gotTreatment){
				let chance = randint(1,100);
				if (successChance > chance){
					diseaseOver(diseaseName);
					message(`You were successfully treated for ${diseaseName}`);
					morale += randint(2,4);

					Swal.fire({
						heightAuto:false,
						icon:'success',
						title:'Bye Bye Disease!',
						text:`You were successfully treated for ${diseaseName}`,
						confirmButtonText:'Amazing!'
					})
				}
				else {
					message(`The treatment for ${diseaseName} was unsuccessful`);
					morale -= randint(1,3);

					Swal.fire({
						heightAuto:false,
						icon:'error',
						title:'No luck',
						text:`Your treatment for ${diseaseName} was unsuccessful`,
						confirmButtonText:'Oh No'
					});

				}
			}
		display();

		}
	});


};



function disease(){
	diseaseCount += 1;
	hasDisease = true;

	let randChance = randint(1,100);
	let diseaseLevel = 1; // 1 : lowest & 3 : hardest
	let diseaseSeverity;
	let randDisease;
	let persistTime;

	if (randChance <= 65){
		diseaseLevel = 1;
		diseaseSeverity = "Low";
		persistTime = randint(1,3);
		message(`You're not feeling very well`);
	
	}
	else if (randChance > 65 && randChance <= 90){
		diseaseLevel = 2;
		diseaseSeverity = "Medium";
		persistTime = randint(2,8);
		message(`You feel like you're sick`);
	
	}
	else {
		diseaseLevel = 3;
		diseaseSeverity = "High";
		persistTime = randint(6,36);
		message(`You're having trouble doing tasks. You might not be healthy`);

	};

	randDisease = randomDisease(diseaseLevel);

	let alreadyHasDiseases = Object.keys(diseases);
	if (alreadyHasDiseases.includes(randDisease)){
		disease();
	};


	diseases[randDisease] = {
		severity:diseaseSeverity,
		level:diseaseLevel,
		persistsFor:persistTime,
		monthsSince:0,
		detected:false
	}


}




function randomDisease(diseaseLevel){

	const allDiseases = {

		1:['Common Cold','Mild Flu','Pink Eye',
		'Stomach Ache','Allergies','Fatigue',
		'Insomnia','Migraine','Nausea','Diarrhea','Food Poisoning',
		'Salmonella','Anxiety'],

		2:['Mild Covid-19','Meningitis','Chlymadia','Herpes',
		'Tuberculosis','Hearing Loss','Mononucleosis',
		'Influenza A','Influenza B','Syphilis',
		'Pneumonia','Hepatitis','Typhoid','Arthritis',
		'High Cholesterol','Dengue','Malaria'],

		3:['Cancer','Dementia','HIV/AIDS','High Blood Pressure',
		'Diabetes','Alzheimers','Lung Disease','Kidney Failure',
		'Stroke','Heart Disease','Severe Covid-19']
	}

	let listLength = allDiseases[diseaseLevel].length;
	let randDisease = allDiseases[diseaseLevel][randint(0,listLength-1)];
	
	return randDisease; 
	

}



function diseaseEvents(){
	let allDiseases = Object.keys(diseases);

	allDiseases.forEach(diseasePersistence);
	allDiseases.forEach(diseaseEffect);

	function diseasePersistence(diseaseName,index){

		let diseaseObj = diseases[diseaseName];
		diseaseObj.monthsSince += 1;
		if (diseaseObj.monthsSince >= diseaseObj.persistsFor){
			diseaseOver(diseaseName);
			allDiseases.splice(index);
		}		
	};


	function diseaseEffect(diseaseName){

		let diseaseLevel = diseases[diseaseName]['level'];
		if (diseaseLevel == 1){ //low
			health -= randint(1,2);
		}
		else if (diseaseLevel == 2){ //moderate
			health -= randint(1,3);
			morale -= randint(1,2);
			looks -= randint(0,1);
		}
		else if (diseaseLevel == 3){ //high
			health -= randint(2,3);
			morale -= randint(1,2);
			looks -= randint(1,2);
			intellect -= randint(0,1);

		}
	}

}


function diseaseOver(diseaseName){
	
	let diseaseDetected = diseases[diseaseName]['detected'];
	if (diseaseDetected){
		message(`You are no longer affected by <b>${diseaseName}</b>`);
	}
	diseaseCount -= 1;


	delete diseases[diseaseName];

}





