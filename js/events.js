function ageEvents(){
	newsEvents();
	if (hasJob){
		monthlyJobEvent();
	}
	
	diseaseEvents();
	special_event_check();
	monthly_budget();
	
	student_check();
	loan_check();
	money_in_bank_check();
	need_house_check();
	depression_check();
	if (USER.age/12 > 65){
		oldAgeEvent();
	}
	if (!isJailed){
		randomEvents();
	}
	if (isJailed){
		jailEvents();
	}
	if (isStudent){
		studentEvents();
	}
	if (!isJailed){
		extremeEvents();
	}
	

	display();

};





function oldAgeEvent(){
	if (USER.age/12 > 65){
		let randNum = randint(0,2);
		health -= randNum;
	}
	if (USER.age/12 > 80){
		let chance = randint(0,50);
		if (chance == 50){
			death();
		}
	}
	if (USER.age/12 > 95){
		let chance = randint(0,20);
		if (chance == 20){
			death();
		}
	}

}


function healthEvents(){

}




function diseaseEvents(){
	if (has_disease){
		if (disease_severity == "Low To Medium"){
			health -= randint(1,2);
			morale -= randint(0,2);
			looks -= randint(0,1);
		}
		else if (disease_severity == "High"){
			health -= randint(2,4);
			morale -= randint(1,4);
			looks -= randint(1,2);
		}		
		display();
	}
	else if (!has_disease){
		let chance = randint(1,50);
		if (chance == 1){
			let chance = randint(1,3)
			if (chance == 1){
				disease("High");
			}
			else {
				disease();
			}
		}
	}


};



function oldAgeEvent(){
	if (USER.age/12 > 60){
		

	};
};





function student_check(){


	if (isStudent){
		student_months = student_months + 1;
		let test_chance = randint(1,10);
		if (test_chance == 1){
			student_test();
		}

		if (student_has_loan == false){
			// for future
		};

		if (student_months%12==0){

			intellect += randint(1,4);
			display();
			var total_years = student_months/12;

			if (total_years == 1){
				message(`You've completed your first year in college`);
				let html = `<br>
				Your Academic Performance - <b>${randint(30,100)}%</b><br>
				`;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"First year in college completed!",
					html:html,
					confirmButtonText:"Good!"
				}).then((result) =>{
					if (student_has_loan){

						student_loan_notice();
					}
				});
			}
			else {
				message(`You've completed ${total_years} years in college`);
				let html = `<br>
				Your Academic Performance - <b>${randint(30,100)}%</b><br>
				`;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:`${total_years} years in college completed!`,
					html:html,
					confirmButtonText:"Good!"
				}).then((result) =>{
					if (student_has_loan){
						student_loan_notice();
					}
					// 0 because stu months have been reset to 0
					else if (student_months == 0){
						Swal.fire({
							heightAuto:false,
							icon:"success",
							title:"You completed your College!",
							confirmButtonText:"Sweet!"
						});
					};

				});
			};

		};



		if (student_has_loan){

			if (student_months%12==0){
				
			};
			if (student_months >= 48){
				message(`You have ${total_student_loan}$ as total student loans`);
				message(`Your student loan will be paid when you start earning`)
				message(`You are no longer entitled to more student loans`);

			};
		};
	
		if (student_months == 48){
			student_pass();
		};
	
	};
	
	if (hasJob == false){
		if (isStudent == false){
			if (student_has_loan){
				if (USER.age/12 >= 30){
					money = money - total_student_loan;
					let html = `
					You reached the student loan repayment deadline<br>
					and had to pay <b>${total_student_loan}$</b><br>
					`;
					Swal.fire({
						heightAuto:false,
						icon:"warning",
						title:"Student Loan Deadline!",
						html:html,
						confirmButtonText:"Okay"
					});
					student_has_loan = false;
					message(`Student loans repayment deadline has been reached`);
					message(`You had to pay all your pending loans`);
				};
			};
		};
	};

};




function jailEvents(){

	if (isJailed){
		morale -= 1;
		looks -= 1;
		jail_months_spent += 1;
		if (jail_months_spent == jail_months){
			message(`You were released from jail after serving ${jail_months} months`);
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"Released from jail!",
				confirmButtonText:"Finally!",
				html:`<br><hr><br>Time Served - <b>${jail_months} months</b>`
				});
			isJailed = false;
			USER.job = "Unemployed";
			jail_months_spent = 0;
			$("#jail").attr("onclick","actions()");
			$("#jail").attr("class","btn-lg btn-danger");
			$("#jail").attr("id","actions");
			$("#activities").show();
			$("#assets").show();

		};


	};



};




function loan_check(){

	if (hasLoan){
		let inc = Math.floor((2/100)*BANK.loan);
		BANK.loan += inc;
	}
}


function money_in_bank_check(){

	let inc = Math.floor((1/100)*BANK.balance);
	BANK.balance += inc;

}


var need_house_notif = false;
function need_house_check(){
	if (USER.age/12 >= 35){
		var has_house = false;
		for (x=0;x!=USER.assets.length;x++){
			if (USER.assets[x][2] == "house"){
				has_house = true;
			}
		}
		if (!has_house){
			morale -= randint(1,2);
		}
	}
	if (USER.age/12 == 35 || USER.age/12 == 40 ||
		USER.age/12 == 45 || USER.age/12 == 50 && !has_house){

		message(`It's recommended that you buy a house`);
		let html = `
		<br>
		You are <b>${USER.age/12}</b> years old and yet without a 
		house to call home. You really desire a comfortable
		home where you can spend your time.<br><br>
		It's recommended that you buy a home.<br>

		`;
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"You desire a house",
			html:html,
			confirmButtonText:"Purchase House",
			showCancelButton:true,
			cancelButtonText:"I'd rather not",
			footer:"NOTE : Without a home , your morale gets damaged"
		}).then((result) => {
			if (result.value){
				purchase("house");
			}
		});

	}
}



function depression_check(){
	if (morale < 20 && !has_depression){
		let chance = randint(0,3);
		if (chance == 0){
			depression();
		}
	}

	if (has_depression){
		if (morale > 40){
			cure_depression();
		}
		else {
			morale -= randint(0,2);	
			if (morale < 15){
				health -= randint(0,1);
				let chance = randint(0,5);
				if (chance == 0){
					depression_effect();
				}
			}

		}
		
	}
	display();
}




function death(){
	var age = (USER.age-USER.age%12)/12;
	var html = `
	<br><hr><br>
	Name : ${USER.name}<br>
	Net-worth : ${money}$<br>
	Age : ${age}<br>

	<br><hr><br>You were cremated in ${USER.country}
	<br><hr><br>
	`
	;
	Swal.fire({
		heightAuto:false,
		title:`You died at ${age}`,
		imageUrl:"images/death.png",
		imageHeight:80,
		imageWidth:80,
		imageAlt:"Death",
		html:html,
		confirmButtonText:"RIP"
	});
	
	let bottomPanel = document.querySelector('#bottom-panel');
	bottomPanel.innerHTML = '';
	let topPanel = document.querySelector('#top-panel');
	topPanel.innerHTML = '';



	let content = `
	<h2 class="text-danger">You died</h2><br><br>
	`;
	let console = document.querySelector('#console');
	console.innerHTML = content;

};






function randomEvents(){
	var chance = randint(0,60);
	if (chance == 0){
		lostAndFoundEvent();
	}


};



function lostAndFoundEvent(){
	
	let items = [
	'wallet','watch','necklace','jewellery','ring','handbag','briefcase'
	];
	let item = items[randint(0,items.length-1)];
	let html = `<br>You found a lost <b>${item}</b><br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:`Lost And Found`,
		html:html,
		confirmButtonText:"Give it to Authorities",
		showCancelButton:true,
		cancelButtonText:"Keep it",
		allowOutsideClick:false
	}).then((result) => {
		if (result.value) {
			karma = karma + 5;
			message(`You turned in the lost ${item} to authorities`);

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			karma = karma - 10;
			message(`You decided to keep the lost ${item}`);
			var inc = randint(5,125);
			money = money + inc;
			message(`The ${item} is worth ${inc}$`);
			display();
		};
	});
};








function thiefEncounter(){
	let chance = randint(0,1);
	if (chance == 0){
		// success
		let prize = randint(500,2000);
		message(`You helped police catch a thief`);
		money += prize;
		morale += randint(3,6);
		display();
		let html = `You were given <b>${prize}$</b> as prize money
		for catching the thief. The police appreciate your response.`;
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"You called the police and the thief was caught!",
			html:html,
			confirmButtonText:"Amazing!"
		});
	}
	else {
		message(`The thief confronted you`);
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"The thief caught you calling police!",
			confirmButtonText:"Try to Flee",
			showCancelButton:true,
			cancelButtonText:"Fight Him",
			allowOutsideClick:false
		}).then((result) => {
			if (result.value){
				message(`You fled from the thief`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You fled from the thief!",
					confirmButtonText:"Phew"
				});
				morale -= randint(3,5);
				display();
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				let chance = randint(0,1);
				if (chance == 0){
					message(`You beat and handed over the thief`);
					let prize = randint(500,2000);
					money += prize;
					morale += randint(3,6);
					display()
					let html = `
					You handed the thief over to the police after
					they came to the spot. You've been awarded
					<b>${prize}$</b> for your valor!
					`;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"You beat the shit out of the thief!",
						html:html,
						confirmButtonText:"I Feel Good"
					});
				}
				else {
					let html=`
					He spared you but not your bones!
					He also told you to piss off and mind your own business.
					`;
					message(`You were beaten up by the thief`);
					health -= randint(6,15);
					morale -= randint(3,6);
					display();
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"You got beaten by the thief",
						html:html,
						confirmButtonText:"My neck.."
					});
				}
			}
		});
	}
}



function newsEvents(){
	let randNum = randint(0,40);
	if (randNum == 0){
		let msg = `Breaking News! There is no news today!`;
		message(msg);
	}
	//develop later on after fixing bugs ok
}



function extremeEvents(){
	let randNum = randint(0,600);
	if (randNum == 0){
		accident();
	}
	else if (generateRange(1,10).includes(randNum)){
		humanEvents();
	}

};


function humanEvents(){
	let rand = randint(0,1);
	if (rand == 0){
		message(`You encounter a thief`);
		let html = `<br>
		The thief hasn't noticed you yet but looks like
		he is fleeing with some valuables.<br>
		What do you want to do ?<br>
		`;

		Swal.fire({
			heightAuto:false,
			allowOutsideClick:false,
			icon:"warning",
			title:"You encounter a thief!",
			html:html,
			confirmButtonText:"Run Away",
			showCancelButton:true,
			cancelButtonText:"Call the Police"
		}).then((result)=>{
			if (result.value){
				message(`You ran away from the thief`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You ran away from the thief!"
				});
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				thief_encounter();
			}
		});
	}
	else if (rand == 1){
		message(`You met an unknown person`);
		var country = generate("country",1)[0];
		var amt = randint(20000,50000);
		let html = `
		<br>The unknown person wants you to deliver a secret 
		package of some drugs to <b>${country}</b>.<br><br>
		He's willing to give you <b>${amt}$</b> for the trouble.
		He'll be arranging the plane tickets too!
		<br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"An unknown person seeks your attention",
			html:html,
			showCancelButton:true,
			confirmButtonText:"Too Risky!",
			cancelButtonText:"I'll Deliver"
		}).then((result) => {
			if (result.value){
				Swal.fire({
					heightAuto:false,
					icon:"info",
					title:"You declined the offer!",
					confirmButtonText:"Creepy Dude!"
				});
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				karma -= 25;
				let chance = randint(0,1);
				if (chance == 1){
					// success
					message(`You delivered the drug package successfully`);
					money += amt;
					morale += randint(3,6);
					display();
					let html=`<br>You successfully delivered the package
					containing drugs to <b>${country}</b> for
					<b>${amt}$</b>.<br>`;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"You delivered the package!",
						html:html,
						confirmButtonText:"Easy Money!"
					});
				}
				else {
					// rip
					morale -= randint(5,10);
					message(`You were caught smuggling the drugs`);
					display();
					let html = `
					<br>You are in legal trouble and the person who
					asked you to deliver the package has gone missing.
					`;
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"You were caught smuggling the drugs!",
						html:html,
						confirmButtonText:"Shit"
					}).then((result) => {
						jail(60);
					});

				}
			}
		});
	}
};






