//
// last code cleanup / improvement - None yet

/*
 mind the variable naming,
 the code is pretty old and was written when i was new to programming
 so please mind the everything bad in this code. thanks.
*/



start();


var messagesOnConsole = 0;
function message(msg){
	messagesOnConsole += 1;
	if (messagesOnConsole >= 8){
		$("#console").html("");
		messagesOnConsole = 0;
	};
	$("#console").append(`${msg}<br>`);

};


function start(){
	display();
	message(`You are ${USER.name}`);
	message(`You live in ${USER.country}`);
};


function display(){
	checkStats();
	barChange('health',health);
	barChange('morale',morale);
	barChange('intellect',intellect);
	barChange('looks',looks);
	document.querySelector('#money').innerText = `$${money}`;

};














function human_event(){
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







function monthly_budget(){
	if (is_jailed == false){
		if (hasJob){
			var amt = Math.floor(USER.salary*28/100);
			money -= total_budget;
			message(`You paid <b>${total_budget}$</b> as monthly budget`);
			if (amt > total_budget){
				message(`You should consider increasing your budget`);
				budget_less();
			}

		}
		else if (USER.job == "Unemployed"){
			if (USER.age > 50 && USER.salary){
				var amt = Math.floor(USER.salary*28/100);
			}
			else {
				var amt = randint(300,320);
			}
			money -= total_budget;
			message(`You paid <b>${total_budget}$</b> as monthly budget`);
			if (amt > total_budget){
				message(`You should consider increasing your budget`);
				budget_less();
			}
		}

	}

};



function budget_less(){
	let rand = randint(1,3);
	if (rand == 1){
		health -= 1;
	}
	if (rand == 2){
		morale -= 1;
	}
	display();
};



function budget(){

	let html = `
	<br><h4>Current Budget : <b>${total_budget}$</b></h4><hr><br>
	<button onclick="modify_budget()" class="btn btn-success">Modify Budget</button><br><br>
	
	`;

	Swal.fire({
		heightAuto:false,
		title:"Budget",
		position:"top",
		html:html,
		showConfirmButton:false,
		footer:"NOTE : Budget is essential for living a sustained life."
	});


};



function modify_budget(){
	var assets_costs = 0;
	for (x in USER.assets){

	};

	if (hasJob){
		var recom = Math.floor(USER.salary*randint(28,33)/100+assets_costs);

	}
	else {
		if (USER.job == "Unemployed"){
			var range = randint(300,320);
			var recom = Math.floor(range+assets_costs);
			if (recom < 100){
				recom = 100;
			}
		}
		else if (isStudent){
			total_budget = 0;
		}
	};
	let html = `
	<h4>Current Budget : <b>${total_budget}$</b></h4>
	<h4>Recommended Budget : <b>${recom}$</b></h4><br><br>
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
		inputValue:recom,
		inputValidator: (val) => {
			let isnum = /^\d+$/.test(val);
			if (isnum && val > money/2 && val != recom){
				return "Too big of a budget for you!"
			}
			else if (isnum && val >= 100){
				message(`You changed your monthly budget to <b>${val}$</b>`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:`Monthly budget changed to ${val}$`,
					confirmButtonText:"Nice"
				});
				total_budget = val;
			}
			else if (!val){
				return `Please specify a budget`
			}
			else if (!isnum){
				return `Please specify a number`
			}
			else if (val < 100){
				return `Budget can't be lesser than 100$`
			}
			else {
				return `Only put a number!`
			};
		}
	});
};








function accident(){
	message(`You met an accident`);
	let list = ["hit by a car","hit by a truck","hit by a bike",
	"ruthlessly beaten by some criminals","shot by an unknown man",
	"stabbed by a thief","crushed by a pole","electrocuted by hanging wires"];

	var cause = `<h4>You were ${list[randint(0,list.length-1)]}.</h4>`;
	message(cause);
	var surv = randint(0,100);
	var mort = 100-surv;
	let html = `
	${cause}<br><br>
	Survival Chance - <b>${surv}%</b><br>
	Mortality Chance - <b>${mort}%</b><br>
	`
	health = health - randint(50,70);
	display();
	Swal.fire({
		heightAuto:false,
		allowOutsideClick:false,
		icon:"warning",
		title:"You were in an accident!",
		html:html,
		confirmButtonText:"Continue",
		confirmButtonColor:"#d31747"
	}).then((result) => {
		if (result.value){
			let chance = randint(0,100);
			if (chance > surv){
				death();
			}
			else {
				accident_survive();
			}

		}

	});

};

function accident_survive(){
	message(`You survived the fatal accident`);
	health = health + randint(30,40);
	display();
	if (hasJob && USER.salary > 3000 && USER.salary <= 8000){
		var real_bill = randint(75000,120000);
		var bill = randint(25000,50000);
		var notice = `
		Hospital Bill - <del>${real_bill}$</del>&nbsp;<b>${bill}$</b><br>
		Savings - <b>${real_bill-bill}$</b><br><br>
		You got medical benefits for employed middle class citizens.<br>
		`;
	}
	else if (hasJob && USER.salary <= 3000){
		var real_bill = randint(75000,120000);
		var bill = randint(20000,30000);
		var notice = `
		Hospital Bill - <del>${real_bill}$</del>&nbsp;<b>${bill}$</b><br>
		Savings - <b>${real_bill-bill}$</b><br><br>
		You got medical benefits for employed low salary citizens.<br>
		`;
	}
	else if (hasJob && USER.salary > 8000){
		var bill = randint(75000,120000);
		var notice = `
		Hospital Bill - <b>${bill}$</b><br><br>
		You did not get any medical benefits.<br>
		`;
	}
	else if (!hasJob){
		var real_bill = randint(75000,120000);
		var bill = randint(10000,20000);
		var notice = `
		Hospital Bill - <del>${real_bill}$</del>&nbsp;<b>${bill}$</b><br>
		Savings - <b>${real_bill-bill}$</b><br><br>
		You got medical benefits for unemployed citizens.
		`;
	};
	let html = `
	The doctors successfully saved you from dying!<br>
	Now you'll need to pay the hospital bills.<br><br>
	${notice}
	`;

	Swal.fire({
		heightAuto:false,
		allowOutsideClick:false,
		icon:"success",
		title:"You survived the accident!",
		html:html,
		confirmButtonText:"I'm glad"

	}).then((result) => {
		if (result.value){
			let html = `<br>
			You , <b>${USER.name}</b> are entitled to pay <b>$${bill}</b>
			as hospital fees to the respective hospital. All
			benefits provided by <b>Goverment Of ${USER.country}</b> have
			already been availed. The competent authority shall
			receive the said amount and release you as soon as possible.
			<br><br>
			The said amount shall be deducted from your bank account<br>
			`;
			Swal.fire({
				heightAuto:false,
				icon:"info",
				allowOutsideClick:false,
				title:"Hospital Fees Notice",
				html:html,
				confirmButtonText:`Pay $${bill}`
			}).then((result) => {
				if (result.value){
					BANK.balance -= bill;
					display();
					message(`You paid <b>${bill}$</b> as hospital bills`);
				}
			});

		}
	});
};





function random_event(){
	var chance = randint(0,20);
	if (event_chance==chance){
		random_event();
	}
	else {
		event_chance = chance;
		switch (event_chance){
			default:
				break;
			case 0:
				var country = generate("country",1);
				message(`Stock prices in ${country[0]} fluctuated`);
				break;
			case 1:
				var country = generate("country",2);
				message(`${country[0]} signed a trade deal with ${country[1]}`);
				break;
			case 2:
				var country = generate("country",1);
				message(`Riots broke out in parts of ${country[0]}`);
				break;
			case 3:
				var country = generate("country",1);
				message(`Explosions were heard in ${country[0]}`);
				break;
			case 4:
				var country = generate("country",1);
				message(`${country[0]} was the victim of major terrorist attacks`)
				break;
			case 5:
				found_event();
		};
	};


};


function found_event(){
	var random = randint(0,5);
	var item = "";
	if (random == 0){
		item = "wallet";
	};
	if (random == 1){
		item = "phone";
	};
	if (random == 2){
		item = "purse";
	};
	if (random == 3){
		item = "necklace";
	};
	if (random == 4){
		item = "ring";
	};
	if (random == 5){
		item = "hat";
	};

	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:`Lost And Found`,
		html:`You found a lost <b>${item}</b><br><hr><br>`,
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
			var inc = randint(5,500);
			money = money + inc;
			message(`The ${item} is worth ${inc}$`);
			display();
		};
	});
};







function gym(){
	var max = 250;
	var min = 50;
	var gym_cost = randint(min,max);
	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"Do you want to go to a gym ?",
		html:`Cost - <b>${gym_cost}$</b>/ session<br><hr><br>`,
		footer:`Note : Working out in gym sometimes boosts your looks`,
		showCancelButton:true,
		cancelButtonText:"Nope",
		confirmButtonText:`Pay $${gym_cost}`
	}).then((result)=>{
		if (hasMoney(gym_cost) == false){
			return;
		};
		if (result.value){
			money = money - gym_cost;
			total_gym_count += 1;
			if (total_gym_count >= 3){

			}
			else{
				looks += randint(0,2);
				display();
			};
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"You worked out at the gym!",
			confirmButtonText:"Phew!"
		});
		message(`You paid ${gym_cost}$ for working out in a gym`);
		display();
		};

	});


};







function restaurant(){
	let cost = randint(30,300);
	let rating = randint(30,100);
	html = 
	`
	Cost of food - <b>${cost}$</b><br>
	Restaurant rating - <b>${rating}%</b><br>
	<br><hr><br>
	`;
	Swal.fire({
		heightAuto:false,
		title:"Restaurant",
		icon:"info",
		html:html,
		confirmButtonText:`Pay $${cost}`,
		showCancelButton:true,
		cancelButtonText:`Not hungry!`
	}).then((result) => {
		if (result.value){
			money = money - cost;
			let rand = randint(0,1);
			let poison = randint(1,3);
			let satisfaction = randint(10,100);
			let btn_text = (satisfaction > 60) ? "Good food!":"Not the best food"; 
			message(`You ate at a restaurant`);
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"You ate at a restaurant!",
				text:`Your satisfaction - ${satisfaction}%`,
				confirmButtonText:btn_text
			});
			if (satisfaction >= 60){
				morale = morale + 2;
			};
			if (satisfaction <= 40){
				if (poison == 1){

					message(`You got food poisoning`);
					Swal.fire({
						heightAuto:false,
						title:"You got food poisioning!",
						text:"You lost some health due to the poisoning",
						icon:'error'
					})
					health = health - randint(3,10);
				};
			};
		display();
		};
	});



};




function disease_checkup() {
	// upgrade this simple system
	message(`You have been diagnosed with <b>${DISEASE}</b>`);
	if (disease_severity == "High"){
		var cost = randint(15000,30000);
	}
	else {
		var cost = randint(250,7500);
	}
	let html = `<br>
	Cost of Treatment - <b>${cost}$</b><br>
	Success Chance - <b>67%</b><br>
	`;

	Swal.fire({
		heightAuto:false,
		background:swalBackground,
		title:`Diagnosed with ${DISEASE}`,
		html:html,
		icon:"warning",
		confirmButtonText:"Get Treatment",
		showCancelButton:true,
		cancelButtonText:"I'd rather suffer"
	}).then((result) => {
		if (result.value){
			if (hasMoney(cost)){
				money -= cost;
				display();
				let chance = randint(1,3);
				
				if (chance != 1){
					message(`The treatment for ${DISEASE} was successful`);
					let html = `<br>You are no longer suffering from
					<b>${DISEASE}</b>!`
					Swal.fire({
						heightAuto:false,
						background:swalBackground,
						title:"Your disease has been cured!",
						html:html,
						icon:"success",
						confirmButtonText:"Awesome!"
					});
					morale += randint(3,5);
					display();
					has_disease = false;
				}
				else {
					let html= `<br>

					`;
					message(`The treatment for ${DISEASE} was unsuccessful`);
					morale -= randint(5,10);
					display();
					Swal.fire({
						heightAuto:false,
						background:swalBackground,
						title:"No Luck",
						icon:"error",
						html:html,
						confirmButtonText:"Crap!"
					});
				}
			}
		}
	});
};





function checkup(){
	var cost = randint(100,500);
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
			if (hasMoney(cost)){
				money -= cost;
				display();
				if (has_disease){
					disease_checkup();
				}
				else {
					morale += randint(0,1);
					display();
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"You're healthy as a fruit!",
						confirmButtonText:"Good News!"
					});
				}
			}
		}

	});
};


function medicine(){
	// cost partially dependent on person's salary
	if (hasJob && USER.salary <= 4000 ){
		var cost = Math.floor(USER.salary*30/100);
		let real_cost = randint(2000,6000);
		var html = `<br>You are getting cheap medicine due to government
		<br>benefits for not so well-off people<br><br>
		Real Cost of Medicine - <b>${real_cost}$</b><br>
		Cost of Medicine for you - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b>
		<br><br>`;
	}
	else if (hasJob == false){
		var cost = randint(250,1000);
		let real_cost = randint(2000,6000);
		var html = `<br>You are getting cheap medicine due to government
		<br>benefits for unemployed citizens<br><br>
		Real Cost of Medicine - <b>${real_cost}$</b><br>
		Cost of Medicine for you - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b>
		<br><br>`;

	}
	else {
		var cost = randint(2000,6000);
		var html = 
		`
		Cost of the Medicine - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b><br>
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
		cancelButtonText:"Nevermind",
		footer:"NOTE : Taking medicine improves your health"
	}).then((result) => {

		if (result.value){
			if (hasMoney(cost)){
				health += randint(3,8);
				display();
				message(`You bought western medicine for ${cost}$`);
				let html = `
				<br>You paid <b>${cost}$</b> to buy the western medicine<br>
				`;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"Medicine Taken!",
					html:html,
					confirmButtonText:"Anything For Health!"
				});

			}
		}
	});


};





function therapy(){
	if (has_depression){
		var cost = randint(300,750);
		let html = `
		Cost Of Session : <b>${cost}$</b><br><br>
		You are being treated for depression.<br><br>

		`;

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
				if (hasMoney(cost)){
					money -= cost;
					morale += randint(1,4);
					message(`You had a therapy session`);
					Swal.fire({
						heightAuto:false,
						title:"You Had Therapy",
						icon:"success",
						text:"You feel better now.",
						confirmButtonText:"Alright"
					});
				}

				display();
			}

		});
	}


	else {
		let html = `<br>
		It doesn't seem like you're suffering from depression.<br>
		You're all good to go without any therapy sessions!<br><br>
		`
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You don't require therapy",
			html:html,
			confirmButtonText:"Good"
		});
	}
};


function dentist(){
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Dentist",
		text:"Coming Soon!"
	});
};


function plastic_surgery(){
	let max = 20000;
	let min = 5000;
	let cost = randint(min,max);
	let html = 
	`
	<br><hr><br>
	Cost of surgery - <b>${cost}$</b><br>
	Success Chance - <b>80%</b><br>
	<br><hr><br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Plastic Surgery",
		footer:"Note : Getting a plastic surgery increases Looks",
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:"Not for me"
	}).then((result) =>{
		if (result.value){
			if (hasMoney(cost)){
				money = money - cost;
				let fail = randint(0,4);
				let rand = randint(5,25);
				if (fail != 4){
					looks = looks + rand;
					morale += 2;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"Plastic Surgery Successful!",
						text:`You paid ${cost}$`,
						confirmButtonText:"Awesome!"
					});
					message(`You got a successful plastic surgery`)
				}
				else {
					looks = looks - rand;
					morale -= 5;
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"Plastic Surgery botched!",
						text:`You paid ${cost}$ and got a botched up surgery`,
						confirmButtonText:"Crap!"
					});
					message(`You got a botched up plastic surgery`);
				};
			display();
			};
		};
	});


};







function hospital(){
	var html = 
	`<br><hr><br>
	<button onclick="checkup()" class="btn btn-success">Get a Checkup</button>
	<br><br>
	<button onclick="medicine()" class="btn btn-success">Get Western Medicine</button>
	<br><br>
	<button onclick="therapy()" class="btn btn-success">Go to Therapy</button>
	<br><br>
	<button onclick="dentist()" class="btn btn-success">Visit the Dentist</button>
	<br><br>
	<button onclick="plastic_surgery()" class="btn btn-success">Get Plastic Surgery</button>
	<br><br>
	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Hospital",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,

	});


};












function crime(){
	var chance = randint(0,6);
	if (chance == 0){
		let stole = randint(10,1000);
		money = money + stole;
		message(`You commited a crime and stole ${stole}$`);
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:`You stole ${stole}$`,
			html:`<br><hr><br>You successfully commited a crime!`,
			footer:"NOTE : Please do not commit any crime in  real life",
			confirmButtonText:"Money!"
		});
	}
	else if (chance == 1){
		let fine = randint(10,500);
		money = money - fine;
		message(`You were caught commiting a minor crime and fined\ 
		${fine}$`);
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:`You were caught and fined ${fine}$`,
			html:`<br><hr><br>You failed in commiting
			a crime and were fined`,
			confirmButtonText:"Shit!"
		});	
	}
	else if (chance == 2){
		message(`You were caught commiting a heinous crime and were\
		<u>jailed</u>`);
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"Caught and charged!",
			html:`<br><hr><br>You were caught commiting a heinous crime.<br>
			You have been sentenced to <b>36</b> months in jail.`,
			confirmButtonText:"Okay.."
		}).then((result) => {
			jail(36);
		});
		
	}
	else if (chance == 3 || chance == 4){
		message(`You did not commit any crime out of fear`);
		Swal.fire({
			heightAuto:false,
			title:"No crime commited!",
			html:"You didn't commit any crime out of fear.",
			icon:"info",
			confirmButtonText:"Oh"
		});
	}
	else {
		message(`You failed to commit a crime`);
		Swal.fire({
			heightAuto:false,
			title:`You failed to commit a crime`,
			text:"You didn't play your crime well and messed up",
			icon:"info",
			confirmButtonText:"Silly me"
		});

	};
	display();
};



function jail(months){
	karma = karma - months;
	if (isStudent){
		message("You were rusticated from your college");
		$("#student").attr("class","btn-lg btn-warning");
		$("#student").attr("id","jail");
		$("#jail").attr("onclick","jail_menu()");
	
	}
	else if (hasJob == true){
		message("You were fired from your job");
		$("#job").attr("class","btn-lg btn-warning");
		$("#job").attr("id","jail");
		$("#jail").attr("onclick","jail_menu()");
	
	}
	else {
		$("#actions").attr("class","btn-lg btn-warning");
		$("#actions").attr("id","jail");
		$("#jail").attr("onclick","jail_menu()");
	
	};
	$("#activities").hide();
	$("#assets").hide()
	is_jailed = true;
	isStudent = false;
	hasJob = false;
	USER.job = "Jailed";
	jail_months = months;


	Swal.fire({
		heightAuto:false,
		title:`You have been jailed for ${months} months`,
		icon:"warning",
		html:`You can either accept the prison time or appeal in court<br>`+
		``,
		showCancelButton:true,
		cancelButtonText:"Accept Prison",
		confirmButtonText:"Appeal In Court"

	}).then((result)=>{
		if (result.value){
			appeal_jail(jail_months);
		};
	});

};



function jail_menu(){
	let html = `
	<br><hr><br>Time Spent - <b>${jail_months_spent}</b>/${jail_months} months<br>
	Imprisoned in ${USER.country}
	`;

	Swal.fire({
		heightAuto:false,
		title:"Jail Actions",
		showConfirmButton:false,
		html:html

	});

};

function jail_bully(){
	health -= randint(3,6);
	looks -= randint(1,2);
	morale -= randint(3,5)
	display();
	var bully = generate("name",1);
	message(`You were beaten up in jail by ${bully}`);
	
	let html = `
	<br>
	A jail bully named ${bully} beat you up in jail.<br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"You were beaten up in Jail!",
		html:html,
		confirmButtonText:"Forget it",
		showCancelButton:true,
		cancelButtonText:"Retaliate!"
	}).then((result) =>{
		if (result.dismiss == Swal.DismissReason.cancel){
			message(`You decided to attack your jail bully`);
			let chance = randint(1,2);
			if (chance == 1){
				//thrashed the shit outta him
				message(`You thrashed ${bully}`);
				let html = `<br>
				You ruthlessly thrashed <b>${bully}</b>!<br>
				He won't be bullying you anytime soon!<br><br>
				`;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You thrashed your jail bully!",
					html:html,
					confirmButtonText:"Easy"
				});
				morale += randint(5,7);
			}
			else {
				message(`You got beaten up by ${bully} again`);
				let html = `
				You tried to beat <b>${bully}</b> but you failed miserably.<br>
				You got a good beating in return.<br>
				`;
				Swal.fire({
					heightAuto:false,
					title:"Backfired!",
					icon:"error",
					html:html,
					confirmButtonText:"Where's my teeth..?"
				});
				health -= randint(3,6);
			}
		}

	});

};





function jail_events(){
	var chance = randint(0,10);

	switch (chance){
		default:
			break;
		case 0:
			if (randint(1,2) == 1){
				jail_bully();
			}
			break;
		
	};

};







function appeal_jail(months){

	var def_cost = randint(10000,100000);
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:`How would you like to appeal`,
		html:`<br><hr><br><br>Public Defender is free<br>`+
		`Private Defender will cost <b>${def_cost}$</b>`,

		showCancelButton:true,
		cancelButtonText:`Public Defender`,
		confirmButtonText:`Private Defender`,
	}).then((result) => {
		if (result.value){
			// private defender
			if (hasMoney(def_cost)){
				money = money - def_cost;
				display();
				message(`You hired a private defender for ${def_cost}$`);
				var chance = randint(0,1);
				if (chance == 0){
					// saved
					appeal_result(true,"private");
				}
				else {
					// RIP
					appeal_result(false,"private");
				};
			}
			else {
				Swal.fire({
					heightAuto:false,
					icon:"warning",
					title:"You don't have enough money to hire a Private Defender"
				}).then((result) => {
					jail(months);
				});
			};
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			// public defender
			message(`You were given a public defender for free`);
			var chance = randint(0,4);
			if (chance == 4){
				appeal_result(true,"public");
			}
			else {
				appeal_result(false,"public");
			};
		};
	});

};





function appeal_result(was_saved,defender){
	if (was_saved){
		if (defender == "private"){
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"You won the court case!",
				html:`Your private defender saved you from prison<br>`,
				confirmButtonText:"Amazing!"
			});
		}
		else {
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"You won the court case!",
				html:`Your free public defender saved you from prison<br>`,
				confirmButtonText:"Very Nice!"
			});
		};
		message(`You won the court case. You will not serve prison time`);
		is_jailed = false;
		USER.job = "Unemployed";

		$("#jail").attr("onclick","actions()");
		$("#jail").attr("class","btn-lg btn-danger");
		$("#jail").attr("id","actions");
		$("#activities").show();
		$("#assets").show();


	}
	else {
		// wasnt saved
		message(`You lost the court case and jailed`);
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You lost the court case...",
			text:"You will have to serve the prison time",
			confirmButtonText:"Take me"
		});
	};
};



function disease(level=null){
	disease_count += 1;
	has_disease = true;

	if (level==null){
		// normal disease
		var diseases = ["Common Cold","Hepatitis","Obesity",
		"Flu","Chronic Fatigue","Typhoid","Acne",
		"Anxiety","Cough",];
		disease_severity = "Low To Medium";
	}
	else {
		// serious disease
		var diseases = ["Cancer","Diabetes","Dementia","Hearing Loss",
		"Heart Disease","High Blood Pressure","Tuberculosis"
		];
		disease_severity = "High";
	};

	DISEASE = diseases[randint(0,diseases.length-1)];

	let html = `
	<br> You are advised to get the required treatment for 
	<b>${DISEASE}</b> as soon as possible.<br><br>
	Disease Severity - <b>${disease_severity}</b>
	`;
	message(`You were diagnosed with <b>${DISEASE}</b>`);
	Swal.fire({
		heightAuto:false,
		title:`You've been diagnosed with ${DISEASE}`,
		icon:"warning",
		html:html,
		confirmButtonText:"Oh No"
	})

};














function actions(){
	var html = 
	`<br>
	<button id="study-btn" class="btn-lg btn-info" onclick="study()">Study &nbsp;<i class="fa fa-graduation-cap"></i></button><br><br>
	<button id="job-btn" class="btn-lg btn-info" onclick="jobs()">Jobs &nbsp;<i class="fa fa-briefcase"></i></button><br><br>
	<button id="budget" class="btn-lg btn-info" onclick="budget()">Budget &nbsp;<i class="fa fa-wallet"></i></button><br><br>
	<button id="bank" class="btn-lg btn-info" onclick="bank()">Bank &nbsp;<i class="fa fa-dollar-sign"></i></button><br><br>
	<br>
	<button id="profile" class="btn-lg main-btn btn-secondary" onclick="profile()"> <i class="fas fa-user-alt"></i>&nbsp;Profile</button>
	<button id="assets" class="btn-lg main-btn btn-danger" onclick="assets()">Assets <i class="fas fa-home"></i></button>
	`;
	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Actions",
		showConfirmButton:false,
		html:html,
		background:swalBackground
	});


};





function gamble_result(option,amount){
	
	if (option == 1){
		// win
		let prize = amount*2;
		money = money + prize;
		morale += randint(0,2);
		display()
		message(`You won ${prize}$ in a gamble`);
		let html = `
		<b>YOU WON THE GAMBLE!</b><br><br>
		You gambled <b>${amount}$</b><br>
		You won <b>${prize}$</b><br><br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"Congratulations!!",
			html:html,
			confirmButtonText:"Amazing!"
		});
	}
	else {
		// lose
		message(`You lost ${amount}$ in a gamble`);
		let html = `
		You lost <b>${amount}$ in the gamble</b><br><br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You lost the gamble!",
			html:html,
			confirmButtonText:"Harsh Luck"
		});

	};

};



function gamble_start(amount){
	if (hasMoney(amount)){
		money -= amount;
		display();
		let html = `
		<h5>You've spent <b>${amount}$</b> to gamble</h5><br><br>
		<h6>Click one button below.<br>
		One of the buttons will win you the gamble!</h6>
		<br><br>
		`;

		let opts = [1,2,3,4];
		shuffle(opts);

		let btns = 
		`
		<button onclick="gamble_result(${opts[0]},${amount})" class="btn btn-success">Choice 1</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button onclick="gamble_result(${opts[1]},${amount})" class="btn btn-success">Choice 2</button><br><br>
		<button onclick="gamble_result(${opts[2]},${amount})" class="btn btn-success">Choice 3</button>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button onclick="gamble_result(${opts[3]},${amount})" class="btn btn-success">Choice 4</button><br>

		`

		html = html+btns;

		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"Gambling",
			html:html,
			showConfirmButton:false
		});



		
	}

};











function gamble(){
	let placeholder = 100;
	let html = `
	<br>
	Minimum gamble amount - <b>100$</b><br>
	Maximum gamble amount - <b>10000$</b><br><br>
	On winning the gamble , your gamble amount is doubled!<br>
	On losing the gamble , your gamble amount is lost!<br><br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Gambling Time",
		input:"text",
		inputValue:placeholder,
		html:html,
		footer:"NOTE : Please refrain from gambling in real life",
		confirmButtonText:"Gamble!",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		inputValidator: (cost) => {
			let isnum = /^\d+$/.test(cost);
			if (isnum){
				gamble_start(cost);
			}
			else if (!cost){
				return 'You need to bet some money!'
			}
			else if (!isnum){
				return 'Enter only a number!'
			}
			else if (cost < 100){
				return 'You have to bet a minimum of 100$'
			}
			else if (cost > 10000){
				return 'You can bet a maximum of 10000$'
			}
		}
	})


};







function activities(){
	var html = 
	`<br>
<button id="hosp-btn" onclick="hospital()" class="btn btn-success">Go To Hospital &nbsp;<i class="fa fa-hospital"></i></button>
<br><br>
<button id="gym-btn" onclick="gym()" class="btn btn-danger">Go To Gym &nbsp;<i class="fa fa-dumbbell"></i></button>
<br><br>
<button id="lib-btn" onclick="library()" class="btn btn-danger">Go To Library &nbsp;<i class="fa fa-book"></i></button>
<br><br>
<button id="restaurant-btn" onclick="restaurant()" class="btn btn-danger">Go To Restaurant &nbsp;<i class="fa fa-utensils"></i></button>
<br><br>
<button id="exercise-btn" onclick="exercise()" class="btn btn-danger">Do Exercise &nbsp;<i class="fa fa-running"></i></button>
<br><br>
<hr>
	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Activities",
		showConfirmButton:true,
		confirmButtonText:"Next Page",
		html:html,
		background:swalBackground,
		showCloseButton:true
	}).then((result) => {
		if (result.value){
			activities2();
		}
	});
};


function activities2(){

	var html = `<br>
	<button onclick="gamble()" class="btn btn-danger">Do Gambling &nbsp;<i class="fa fa-dice-six"></i></button>
	<br><br>
	<button id="crime-btn" onclick="crime()" class="btn btn-danger">Commit Crime &nbsp;<i class="fa fa-exclamation"></i></button>
	<br><br>
	<button id="vacation-btn" onclick="vacation()" class="btn btn-danger">Go On Vacation &nbsp;<i class="fa fa-compass"></i></button>
	<br><br>
	<button onclick="emigrate()" class="btn btn-danger">Emigrate <i class="fas fa-plane"></i></button>
	<br><br>
	<hr>
	`;

	Swal.fire({
		heightAuto:false,
		title:"Activites",
		html:html,
		position:"top",
		showCloseButton:true,
		showConfirmButton:true,
		confirmButtonText:"Next Page",
		showCancelButton:true,
		background:swalBackground,
		cancelButtonText:"Previous Page"
	}).then((result) => {
		if (result.value){
			activities3();
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			activities();
		}

	});

}







function emigrate(){
	var cost = randint(5000,25000);

	let html = `<br><br>
	<h2 class="w3-center"> Emigration Process <i class="fa fa-plane-departure"></h2><br><br>
	<br>
	Total Cost : <b>${cost}$</b><br>
	<br><br>
	`

	Swal.fire({
		heightAuto:false,
		title:"Emigration",
		position:"top",
		html:html,
		footer:"Note : There are limited countries in Lifely",
		confirmButtonText:"Emigrate",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		input:"text",
		inputValidator: (value) => {
			value = value.charAt(0).toUpperCase() + value.slice(1);
			

			// temporary solution
			// find a way to make country_list global ffs
			var country_list = [
				"United States","Canada","United Kingdom","India","Pakistan",
				"China","Saudi Arabia","Sri Lanka","Mexico","Sweden","Norway",
				"Denmark","Finland","Russia","Japan","Taiwan","South Korea",
				"Indonesia","Singapore","Italy","Hungary","Switzerland",
				"Poland","Germany","France","Portugal","Spain","Ireland",
				"Iceland","Argentina","Brazil","Uruguay","Cuba","Albania",
				"Australia","Austria","Belgium","Belarus","Estonia","Bulgaria",
				"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
				"Egypt","Israel","Kuwait","Latvia","Iran","Slovenia","Lithuania",
				"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
				"South Africa","Bangladesh","Mongolia","Thailand","Serbia",
				"Vietnam","Ukraine","Zimbawe","Burundi","Belize","Bolivia",
				"Slovakia","Laos","Lebanon","Mauritius",
				"Netherlands","Macedonia","Philippines",
			];
			
			var country_found = false;
			for (x=0;x<country_list.length;x++){
				if (value == country_list[x]){
					country_found = true;
				}
			};
			if (country_found){
				if (hasMoney(cost)){
					USER.country = value;
					money -= cost;
					message(`You paid ${cost}$ for emigration to ${value}`);
					emigration_success();
				}
			}
			else {
				return "Country not found"
			}

		}
	})


}




function emigration_success(){
	message(`All your bank details have been transferred to ${USER.country} National Bank`);
	
	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"Emigration Successful!",
		text:`You emigrated to ${USER.country}!`,
		confirmButtonText:"Cool!",
		allowOutsideClick:false
	}).then((result) => {
		if (result.value){
			leave_job();
		}
	});
	
}













function exercise(){
	message(`You exercised a bit`);
	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"You did some exercise!",
		confirmButtonText:"Hoorah!"
	});
	var chance = randint(1,5);
	if (chance == 1){
		morale += 1;
		health += 1;
	};
};




function vacation(){
	let country_list = [
	"United States","Canada","United Kingdom","India",
	"China","Sri Lanka","Mexico","Sweden","Norway",
	"Denmark","Finland","Russia","Japan","Taiwan","South Korea",
	"Indonesia","Singapore","Italy","Hungary","Switzerland",
	"Poland","Germany","France","Portugal","Spain","Ireland",
	"Iceland","Argentina","Brazil","Cuba","Albania",
	"Australia","Austria","Belgium","Belarus","Estonia","Bulgaria",
	"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
	"Egypt","Israel","Kuwait","Latvia","Slovenia","Lithuania",
	"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
	"South Africa","Mongolia","Thailand","Serbia",
	"Vietnam","Ukraine","United States","Sweden","Denmark",
	"Canada","Canada","Greece","UAE","India","France",
	"Russia","Burundi","Belize","Bolivia","Slovakia","Laos",
	"Lebanon","Mauritius","Netherlands","Macedonia","Philippines"
	];
	var countries = [];
	
	for (x=0;x<5;x++){
		random = randint(0,country_list.length-1);
		var sel = country_list[random];
		if (countries.includes(sel)){
			x = x - 1;
		}
		else if (sel == USER.country){
			x = x - 1;
		}
		else {
			countries.push(sel);	
		};
	};

	var country_object = {
		country0:countries[0],
		country1:countries[1],
		country2:countries[2],
		country3:countries[3],
		country4:countries[4]
	};
	var html = `<br><br><button onclick="vacation()" class="btn btn-success">View More Locations</button><br><br>`;
	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"Where would you like to go for vacation?",
		showCancelButton:true,
		confirmButtonText:"Vacation Time!",
		cancelButtonText:"Nevermind",
		input:"select",
		inputOptions:country_object,
		inputPlaceholder:"Select Country",
		html:html,
		position:"top",
		
	}).then((result) => {
		if (result.value){
			var country = country_object[result.value];
			var cost = randint(15000,50000);
			Swal.fire({
				heightAuto:false,
				icon:"info",
				title:`Vacation in ${country}`,
				showCancelButton:true,
				confirmButtonText:`Pay $${cost}`,
				cancelButtonText:"Not For Me!",
				footer:"Note : Going on a vacation significantly boosts your morale",
				html:
				`<br><hr><br>Cost Of Trip - <b>${cost}$</b><br>`+
				`<br><hr><br>`
			}).then((result) => {
				if (result.value){
					if (hasMoney(cost)){
						money = money - cost;
						morale += randint(20,30);
						display();
						message(`You went on a vacation to ${country}`);
						Swal.fire({
							heightAuto:false,
							icon:"success",
							title:`You went on a vacation to ${country}`,
							confirmButtonText:"Enjoyed it!"
						});
					};
				}
				else if (result.dismiss == Swal.DismissReason.cancel){
					vacation();
				};
			});
		};

	});
};








var has_depression = false;
function depression(){

	has_depression = true;
	message(`You have depression`);
	let html = `
	<br> Depression has struck another human and this time,
	it's you.<br>
	Your low morale is the reason behind your depression.<br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"You Have Depression!",
		html:html,
		confirmButtonText:"Oh no",
		footer:"NOTE : Morale affects depression"
	});

}



function cure_depression(){
	has_depression = false;
	message(`You defeated depression`);

	let html = `<br>
	You have finally managed to cure your depression.<br>
	You have no bad thoughts anymore.<br>
	Life is again normal for you!<br> 
	<br>
	`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"You Defeated Depression!",
		confirmButtonText:"Awesome!",
		html:html
	});

}



function depression_effect(){

	let chance = randint(0,4);
	if (chance != 0){
		let html=`<br>
		You have been struggling with depression.<br>
		You don't feel like living anymore.<br>

		`;
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"Struggle With Depression",
			html:html,
			confirmButtonText:"I will survive",
			showCancelButton:true,
			cancelButtonText:"It's over",
			allowOutsideClick:false
		}).then((result) =>{
			if (result.dismiss == Swal.DismissReason.cancel){
				death();
				message(`You took the extreme step of ending your life.`);
				

			}
		});
	}

	else {
		death();
		message(`You took the extreme step of ending your life.`);
	}
}






function settings(){
	let html = `
	<br><br>
	<button onclick="credits()" class="btn btn-success">Credits</button>
	<br><br>
	<button onclick="help()" class="btn btn-success">Help</button>
	<br><br>
	<button onclick="contributions()" class="btn btn-success">Contributions</button>
	<br><br>
	<button onclick="displayThemes()" class="w3-btn w3-blue">Display Themes</button>
	<br><br>
	<hr><br>
	
	`;
	Swal.fire({
		heightAuto:false,
		title:"Settings",
		position:"top",
		showConfirmButton:false,
		html:html,
		background:swalBackground,
		showCloseButton:true
	});


}


function displayThemes(){

	let html = `
	<br><br>
	<button onclick="darkTheme()" class="w3-btn w3-dark-grey">Dark Theme</button>
	<br><br>
	<button onclick="ultraDarkTheme()" class="w3-btn w3-black">Ultra Dark Theme</button>
	<br><br>
	<button onclick="cobaltTheme()" class="w3-btn w3-blue">Cobalt Theme</button>
	<br><br>
	<button onclick="wizardTheme()" class="w3-btn w3-purple">Wizard Theme</button>

	<br><br>
	`;
	Swal.fire({
		heightAuto:false,
		title:"Display Themes",
		html:html,
		showConfirmButton:false,
		showCloseButton:true,
		background:swalBackground
	});

}



function contributions(){

	let html = `<br><br>
	<a href="https://github.com/mikeRujevic" target="_blank">Milos Rujevic</a> - Help in icons<br>
	`
	Swal.fire({
		heightAuto:false,
		icon:"info",
		position:top,
		html:html,
		title:"Contributions",
		confirmButtonText:"Back To Game",
		showCloseButton:true,
		background:swalBackground
	});

}



function ultraDarkTheme(){

		$("body").css("background-color","black");
		$("body").css("color","white");
}
	
function darkTheme(){
		$("body").css("background-color","#201f1f");
		$("body").css("color","white");
}


function cobaltTheme(){
	$("body").css("background-color","#0047ab");
	$("body").css("color","white");
}



function wizardTheme(){
	$("body").css("background-color","#581845");
	$("body").css("color","white");
}



function credits(){
	let html = `
	<br>
	Icons by <b>FontAwesome</b><br>
	GUI by <b>Bootstrap</b> and <b>SweetAlert2</b><br>
	Buttons by <b>Bootstrap</b> and <b>w3css</b><br><br>
	MADE WITH <i class="fas fa-heart" style="color:#d0142b"></i>
	<br>
	`;
	Swal.fire({
		heightAuto:false,
		title:"Credits",
		html:html,
		icon:"info",
		background:swalBackground,
		confirmButtonText:"Back To Game"
	})
};




function help(){
	let html=`
	<br>
	Press the button below to view help.
	Alternatively , you could contact us for other queries.
	<br><br>
	<a href="https://github.com/wraithM17/lifely/wiki/Help" 
	target="_blank" class="w3-button w3-blue">View Help</a><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"Help",
		showCloseButton:true,
		html:html,
		icon:"success",
		showConfirmButton:false,
		background:swalBackground

	});

}








function update(){
	count = 0;
	totalGymVisits = 0;
	totalLibVisits = 0;
	$("#console").text("");
	
	USER.age = USER.age + 1;

	var months = USER.age%12;
	var years = (USER.age-months)/12;

	let ageElem = document.querySelector('#age');
	ageElem.innerText = `${years}y ${months}m`


	if (money <= 100){
		morale -= 1;
		let rand = randint(1,4)
		if (rand == 1){
			health -= 1;
			looks -= 1;
		}
		else if (rand == 2){
			intellect -= 1;
		}
	};

	if (!is_jailed){
		random_event();
	};
	if (is_jailed){
		jail_events();
	}
	if (isStudent){
		student_events();
	}
	age_events();
	display();
};


function confirm(title,text=null){
	if (text == null){
		text = "";
	}
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:title,
		text:text,
		showCancelButton:true,
		confirmButtonText:"Yes",
		cancelButtonText:"No"
	})
};






function intro(){
	if (intro_disabled == false){
		var html = 
		`
		You start off as a random person with random features in
		a random country. You can live your life in any way you want.
		All this with simple button clicks.
		Lifely helps you visualize different situations in life.<br>		
		`;

		Swal.fire({
			heightAuto:false,
			icon:"info",
			allowOutsideClick:false,
			title:"Welcome To Lifely",
			text:"Lifely is a life based online simulator",
			html:html,
			confirmButtonText:"Start Lifely",
			showCancelButton:true,
			cancelButtonText:"Custom Life"
		}).then((result) => {
			if (result.value){
				start_animation();
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				custom_life();

			}
		});

	};

};


function start_animation(){
	Swal.fire({
		heightAuto:false,
		title:"<h1>Starting Lifely...</h1>",
		showConfirmButton:false,
		timer:3000,
		timerProgressBar:true,
		toast:true,
		position:top
	});
}




function custom_life(){
	let html = `
	<br>
	You have decided to start off as a custom character.
	This means that you'll be able to set some custom features
	like your name and your country. Your character's attributes
	like intellect and looks are still randomized and not 
	customizable.
	`;
	Swal.fire({
		heightAuto:false,
		title:"Custom Life",
		html:html,
		confirmButtonText:"Choose Name",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		allowOutsideClick:false,
		icon:"info"
	}).then((result) => {
		if (result.value){
			custom_character("name");
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			start_animation();
		}
	});



}


function custom_character(attr){
	if (attr == "name"){
		Swal.fire({
			heightAuto:false,
			allowOutsideClick:false,
			title:"Your Name",
			icon:"question",
			text:"Choose a suitable full name for yourself",
			input:"text",
			inputValue:random_name(),
			confirmButtonText:"Proceed",
			inputValidator: (value) => {
				let check = /^[a-z][a-z\s]*$/i.test(value);
				if (check && value.length <= 30 && value.length >= 5){
					$("#console").html("");
					message(`<del>You've started your journey as ${USER.name}</del>`);
					message(`You've got ${money}$ with you`);
					message(`<del>You're currently living in <u>${USER.country}</u></del>`);
				
					USER.name = value;

					custom_character("country");
				}
				else if (check && value.length > 30 ){
					return "Your name is too big!"
				}
				else if (check && value.length < 5 ){
					return "Your name is too short!"
				}
				else {
					return "Invalid Name. Only use alphabets!"
				}
			}
		})
	}

	if (attr == "country"){
		let html = `
		Type in the name of the country you want to be born in.
		Lifely will check if the country exists in the game.
		`;
		Swal.fire({
			heightAuto:false,
			title:"Your Country",
			allowOutsideClick:false,
			icon:"question",
			html:html,
			footer:"Note : There are limited countries in Lifely",
			confirmButtonText:"Start Lifely",
			input:"text",
			inputValidator: (value) => {
				value = value.charAt(0).toUpperCase() + value.slice(1);
				

				// temporary solution
				// find a way to make country_list global ffs
				var country_list = [
					"United States","Canada","United Kingdom","India","Pakistan",
					"China","Saudi Arabia","Sri Lanka","Mexico","Sweden","Norway",
					"Denmark","Finland","Russia","Japan","Taiwan","South Korea",
					"Indonesia","Singapore","Italy","Hungary","Switzerland",
					"Poland","Germany","France","Portugal","Spain","Ireland",
					"Iceland","Argentina","Brazil","Uruguay","Cuba","Albania",
					"Australia","Austria","Belgium","Belarus","Estonia","Bulgaria",
					"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
					"Egypt","Israel","Kuwait","Latvia","Iran","Slovenia","Lithuania",
					"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
					"South Africa","Bangladesh","Mongolia","Thailand","Serbia",
					"Vietnam","Ukraine","Zimbawe","Burundi","Belize","Bolivia",
					"Slovakia","Laos","Lebanon","Mauritius",
					"Netherlands","Macedonia","Philippines",
				];
				
				var country_found = false;
				for (x=0;x<country_list.length;x++){
					if (value == country_list[x]){
						country_found = true
					}
				};
				if (country_found){
					USER.country = value;
					custom_character("complete");
				}
				else {
					return "Country not found"
				}

			}
		})	
	}
	if (attr == "complete"){
		Swal.fire({
			heightAuto:false,
			title:"Custom Character Created",
			icon:"success",
			confirmButtonText:"Start Lifely",
			allowOutsideClick:false
		}).then((result) => {
			if (result.value){
				
				$("#console").html("");
				message(`You're playing as a custom character`);
				message(`You've started your journey as ${USER.name}`);
				message(`You've got ${money}$ with you`);
				message(`You're currently living in <u>${USER.country}</u>`);
				start_animation();
			}
		})
	}

}







function main(){
	intro();
	$("#update").click(update);
	$("#settings").hover(function (){
		$("#settings-icon").attr("class","fa fa-lg fa-cog fa-rotate-270");
	});
	$("#settings").mouseleave(function (){
		$("#settings-icon").attr("class","fa fa-lg fa-cog");
	})
	
	$("#money-icon").hover(function (){
		let html = `BANK BALANCE : ${BANK.balance}$`;
			$("#money-block").html(html);},
		function(){
			let html = `MONEY : <span id="money">${money}</span>$`;
			$("#money-block").html(html);

	})

	$("#looks-icon").hover(
		function(){
			$("#looks-icon").attr("class","fas fa-fire-alt");
			$("#looks-icon").css("color","firebrick");
		},
		function(){
			$("#looks-icon").attr("class","fas fa-fire");
			$("#looks-icon").css("color","#e25822");
		});

	
};


$(document).ready(main());







