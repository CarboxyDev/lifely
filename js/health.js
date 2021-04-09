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









