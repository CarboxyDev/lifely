function jailMenu(){

	let html = `<br><br>
	Time spent in jail : <b>${jailDurationSpent}</b> months<br>
	Duration remaining : <b>${jailDuration}</b> months<br><br>

	Imprisoned in ${USER.country}<br><br>
	${buttons.profile}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Actions (Jail)",
		showConfirmButton:false,
		showCloseButton:true,
		html:html

	});

};






function jail(months){



	
	jailDuration = months;

	let html = `<br><br>
	Jail Duration : <b>${jailDuration}</b> months<br><br>

	You can either accept the jail sentence or appeal in court

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:`You are being sentenced`,
		icon:"warning",
		html:html,
		allowOutsideClick:false,
		showCancelButton:true,
		cancelButtonText:"Accept Prison",
		confirmButtonText:"Appeal In Court"

	}).then((result)=>{
		if (result.value){
			jailAppeal(jailDuration);
		}
		else if (result.dismiss === Swal.DismissReason.cancel){
			jailSentence();
		}
		else {
			jailSentence();
		}
	});

};







function jailSentence(){

	if (isStudent){
		message("You were rusticated from your college");
		isStudent = false;
		
	}
	else if (hasJob){
		message("You were fired from your job");
		hasJob = false;

	}
	isJailed = true;
	USER.job.name = "Prisoner"
	message(`You are now serving your jail sentence of ${jailDuration} months`);
	

	HTML.actions.setAttribute('onclick','jailMenu()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-black');

	$("#activities-btn").hide();
	
}





function jailAppeal(months){

	var privateDefenderCost = randint(10000,25000);

	let html = `<br><br>
	Public Defender Cost : <b>Free</b><br>
	Private Defender Cost : <b>$${privateDefenderCost}</b><br><br>
	A private defender has much better chances at saving you from being charged.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:`Jail Appeal`,
		html:html,
		allowOutsideClick:false,
		showCancelButton:true,
		cancelButtonText:`Public Defender`,
		confirmButtonText:`Private Defender`,
	}).then((result) => {
		if (result.value){
			// private defender
			let hiredDefender = false;
			if (hasMoney(privateDefenderCost)){
				money -= privateDefenderCost;
				hiredDefender = true;

			}
			else if (hasMoneyInBank(privateDefenderCost)){
				bankTransaction(-privateDefenderCost);
				hiredDefender = true;
			}
			else {
				hiredDefender = false;
				Swal.fire({
					heightAuto:false,
					icon:"warning",
					title:"Not Enough Money!",
					text:"You don't have enough money to hire a private defender"
				}).then((result) => {
					jail(jailDuration);
				});
			};

			if (hiredDefender){
				message(`You hired a private defender for $${privateDefenderCost}`);
				jailAppealResult('private');
			}


			display();

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			// public defender
			message(`You were alloted a public defender free of cost by the court`);
			jailAppealResult('public');
		};
	});

};





function jailAppealResult(defenderType){

	let chance = randint(1,100);
	let saved = false;

	if (defenderType == "private"){
		let randChance = randint(35,65);
		
		if (chance > randChance){
			saved = false;
		}
		else {
			saved = true;
		}
	}
	else {
		
		let randChance = randint(10,15);
		if (chance > randChance){
			saved = false;
		}
		else {
			saved = true;
		}

	};



	if (saved){
		message(`You won the jail sentence appeal case`);
		Swal.fire({
			heightAuto:false,
			title:'You won the court case!',
			text:'You were saved by your defender',
			confirmButtonText:'Great',
			icon:'success'
		});
		jailDuration = 0;


	}
	else {
		message(`You lost the jail sentence appeal case`);
		Swal.fire({
			heightAuto:false,
			title:`You lost the court case!`,
			text:`You will now have to serve the jail sentence of ${jailDuration} months`,
			icon:'error',
			allowOutsideClick:false,
			confirmButtonText:'Oh No.'
		}).then(() => {
			jailSentence();
		});
	};


};


function jailOver(){

	message(`You completed your jail sentence`);

	let html = `<br><br>
	You served your jail sentence of <b>${jailDuration}</b> months<br>
	You are now a free citizen!
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'Jail sentence served',
		html:html,
		icon:'success',
		confirmButtonText:'Finally..',
		allowOutsideClick:false
	});

	isJailed = false;
	USER.job.name = "Unemployed";

	
	HTML.actions.setAttribute('onclick','actions()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-dark');

	$("#activities-btn").show();

};









function jailEvents(){
	jailDurationSpent += 1;
	if (jailDuration == jailDurationSpent){
		jailOver();
	};

	

};


