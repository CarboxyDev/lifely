// DEV NOTES
// last refactored on 31 Aug 2021

function library(){
	let cost = randint(5,40);
	let html = `<br>Cost per session : $${cost}<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'question',
		title:'Library',
		html:html,
		showCancelButton:true,
		showConfirmButton:true,
		showCloseButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:`Nevermind`
	}).then((result) => {
		if (result.value){
			let visitedLibrary;
			if (hasMoney(cost)){
				money -= cost;
				visitedLibrary = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedLibrary = true;
			}
			else {
				swalNoMoney.fire();
				visitedLibrary = false;
			};

			if (visitedLibrary){
				message(`You spent $${cost} for a library session`);
				totalLibVisits += 1;
				if (totalLibVisits < 3){
					intellect += randint(0,2);
				};
				Swal.fire({
					heightAuto:false,
					title:'You studied at the library!',
					icon:'success',
					confirmButtonText:'Nice'
				});
				
				display();	
			}
		}
	});
};



function gym(){
	let cost = randint(20,100);
	let html = `<br>Cost per session : $${cost}<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'question',
		title:'Gym',
		html:html,
		showCancelButton:true,
		showConfirmButton:true,
		showCloseButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:`Nevermind`
	}).then((result) => {
		if (result.value){
			let visitedGym;
			if (hasMoney(cost)){
				money -= cost;
				visitedGym = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedGym = true;
			}
			else {
				swalNoMoney.fire();
				visitedGym = false;
			};

			if (visitedGym){
				message(`You spent $${cost} for a Gym session`);
				totalGymVisits += 1;
				if (totalGymVisits < 3){
					looks += randint(0,2);
					health += randint(0,1);
					morale += randint(0,1);
				};
				Swal.fire({
					heightAuto:false,
					title:'You trained at the gym!',
					icon:'success',
					confirmButtonText:'Nice'
				});
				
				display();	
			};
		};
	});
};




function exercise(){
	message(`You exercised a bit`);
	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"You did some exercise!",
		confirmButtonText:"Nice"
	});
	let chance = randint(0,3);
	if (chance == 0){
		health += 1;
		morale += randint(0,1);
		looks += randint(0,1);
		display();
	};
};



function restaurant(){
	let cost = randint(30,300);
	let rating = randint(30,100);
	let html = `<br><br>
	Cost of food - <b>$${cost}</b><br>
	Restaurant rating - <b>${rating}%</b>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Restaurant",
		icon:"info",
		html:html,
		confirmButtonText:`Pay $${cost}`,
		showCancelButton:true,
		cancelButtonText:`Pass`
	}).then((result) => {
		if (result.value){
			let visitedRestaurant = false;
			if (hasMoney(cost)){
				money -= cost;
				visitedRestaurant = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedRestaurant = true;
			}
			else {
				swalNoMoney.fire();
				visitedRestaurant = false;
			};

			if (visitedRestaurant){
				message(`You spent $${cost} on a restaurant`);
				morale += randint(0,2);
				Swal.fire({
					heightAuto:false,
					title:'You ate at a restaurant',
					icon:'success',
					confirmButtonText:'Okay'
				});
			};

			display();
		};
	});
};



function hospital(){
	let html = `<br><br>
	${buttons.checkup}<br><br>
	${buttons.westernMedicine}<br><br>
	${buttons.therapy}<br><br>
	${buttons.plasticSurgery}<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Hospital",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,

	});
};



function crime(){
	let chance = randint(0,100);
	if (chance < 65){ 
		crimeSuccess();
	}
	else if (chance >= 65 && chance <= 90){
		crimeFine();
	}
	else {
		crimeJail();
	}

	display();
};



function crimeSuccess(){
	let amt = approx(randint(100,1500));
	let html = `<br><br>You commited a crime and stole <b>$${amt}</b><br><br>`;
	money += amt;
	message(`You commited a crime and stole $${amt}`);

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:`You commited a crime`,
		html:html,
		confirmButtonText:"Okay"
	});
};



function crimeFine(){
	let fine = randint(500,2500);
	let html = `<br><br>
	You were caught by police while committing a minor crime.
	You have been fined <b>$${fine}</b>.<br><br>`;
	money -= fine;
	message(`You were caught commiting a minor crime and fined $${fine}`);

	Swal.fire({
		heightAuto:false,
		icon:"error",
		title:`Caught!`,
		html:html,
		allowOutsideClick:false,
		confirmButtonText:`Pay $${fine}`
	});	
};



function crimeJail(){
	let jailTime = randchoice([3,6,8,12]);
	let html = `<br><br>
	You were caught by police while committing a serious crime.<br>
	You are about to be sentenced to <b>${jailTime}</b> months in prison.
	<br><br>`;
	message(`You were caught committing a serious crime`);
	message(`You might have to serve ${jailTime} months in prison`);
	
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Caught and charged!",
		allowOutsideClick:false,
		html:html,
		confirmButtonText:"Accept your fate"
	}).then((result) => {
		jail(jailTime);
	});
};



function gamble(){
	let placeholder = 100;
	let html = `<br><br>
	Gamble money between <b>$1000</b> and <b>$10000</b>.<br>
	Prize money is double the amount you gambled.<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Gambling",
		input:"text",
		inputValue:placeholder,
		html:html,
		confirmButtonText:"Gamble!",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		inputValidator: (cost) => {
			let isNum = /^\d+$/.test(cost);
			if (isNum && hasMoney(cost)){
				startGamble(cost);
			}
			else if (!cost){
				return 'You need to bet some money';
			}
			else if (!isNum){
				return 'You need to enter a number';
			}
			else if (cost < 100){
				return 'Minimum gamble amount is $1000';
			}
			else if (cost > 10000){
				return 'Maximum gamble amount is $10000';
			}
			else if (!hasMoney(cost)){
				return `You don't have enough money in hand`;
			};
		},
	});
};



function startGamble(amount){
	message(`You gambled $${amount}`);
	let html = `<br><br>
	You've spent <b>${amount}$</b> to gamble.<br>
	Pick your choice below. Good luck.<br><br>`;
	money -= amount;
	display();

	var opts = [1,2,3,4];
	shuffle(opts);

	let btns = `<br>
	<button onclick="resultGamble(${opts[0]},${amount})" class="btn btn-success">Choice 1</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[1]},${amount})" class="btn btn-info">Choice 2</button>
	<br><br>
	<button onclick="resultGamble(${opts[2]},${amount})" class="btn btn-info">Choice 3</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[3]},${amount})" class="btn btn-success">Choice 4</button>
	<br><br>`;

	html += btns;

	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"Gambling",
		html:html,
		allowOutsideClick:false,
		showConfirmButton:false
	});
};



function resultGamble(option,amount){
	if (option == 1){
		let prize = amount*2;
		money += prize;
		morale += randint(1,2);
		message(`You won $${prize} in a gamble`);

		let html = `<br><br><b>You won the gamble!</b><br><br>
		You gambled <b>$${amount}</b><br>
		You won <b>$${prize}</b><br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"Congratulations!",
			html:html,
			confirmButtonText:"Great"
		});
	}
	else {
		morale -= randint(0,1);
		message(`You lost the gamble`);
		
		let html = `<br><br>You lost <b>$${amount} in the gamble</b><br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You lost the gamble",
			html:html,
			confirmButtonText:"Okay"
		});

	};

	display();
};



// Removed emigration feature from the game on 31 Aug 2021
/*
function emigrate(){
	let cost = randint(15000,35000);
	let html = `<br><br>
	<h2 class="w3-center"> Emigration Process <i class="fa fa-plane-departure"></h2><br><br>
	<br>
	Total Cost : <b>$${cost}</b><br><br>
	Choose the desired country : <br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Emigration",
		position:"top",
		html:html,
		confirmButtonText:"Emigrate",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		input:"text",
		inputValidator: (value) => {
			value = value.charAt(0).toUpperCase() + value.slice(1);
			

			// allCountries is global variable declared in countries.js
			let countryFound = allCountries.includes(value);
			
			if (countryFound){
				willEmigrate = false;
				if (hasMoney(cost)){
					money -= cost;
					willEmigrate = true;
				}
				else if (hasMoneyInBank(cost)){
					bankTransaction(-cost);
					willEmigrate = true;
				}
				else {
					swalNoMoney.fire();
					willEmigrate = false;
				};


				if (willEmigrate){
					message(`You spent $${cost} on Emigration Services`);
					USER.country = value;
					successEmigrate();
				};

			}
			else {
				return "Country not found";
			};
		},
	});
};
*/



/*
function successEmigrate(){
	message(`You emigrated to <b>${USER.country}</b>`);
	message(`All your bank details have been transferred to ${USER.country} National Bank`);
	if (isStudent){
		leaveEducation();
	}
	if (hasJob){
		leaveJob();
	}

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"Emigration Successful!",
		text:`You emigrated to ${USER.country}!`,
		confirmButtonText:"New Life!",
		allowOutsideClick:false
	});
	
	display();
};
*/



function emigrate(){
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Coming soon!",
		confirmButtonText:"Okay"
	});
};





function vacation(){
	let countries = [];

	// select 5 countries to show as options for vacation.
	for (x=0;x<5;x++){
		let randCountry = allCountries[randint(0,allCountries.length-1)];
		if (countries.includes(randCountry)){
			x -= 1;
		}
		else if (randCountry == USER.country){
			x -= 1;
		}
		else {
			countries.push(randCountry);	
		};
	};

	let countryObj = {
		0:countries[0],
		1:countries[1],
		2:countries[2],
		3:countries[3],
		4:countries[4]
	};

	let html = `<br><br>
	<button onclick="vacation()" class="btn btn-success">View More</button><br><br>`;
	
	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"Vacation",
		showCancelButton:true,
		confirmButtonText:"Lets go!",
		cancelButtonText:"Nevermind",
		input:"select",
		inputOptions:countryObj,
		inputPlaceholder:"Select Country",
		html:html
		
	}).then((result) => {
		if (result.value){
			let country = countryObj[result.value];
			let cost = randint(10000,25000);
			let html2 = `<br><br>Cost of vacation : <b>$${cost}</b><br><br>`;

			Swal.fire({
				heightAuto:false,
				icon:"info",
				title:`Vacation in ${country}`,
				showCancelButton:true,
				confirmButtonText:`Pay $${cost}`,
				cancelButtonText:"Not For Me!",
				footer:"Note : Going on a vacation boosts your morale",
				html:html2
			}).then((result) => {
				if (result.value){
					let wentForVacation = false;

					if (hasMoney(cost)){
						money -= cost;
						wentForVacation = true;
					}
					else if (hasMoneyInBank(cost)){
						bankTransaction(-cost);
						wentForVacation = true;
					}
					else {
						swalNoMoney.fire();
						wentForVacation = false;
					};

					if (wentForVacation){
						message(`You went for a vacation to ${country}`);
						morale += randint(12,20);
						intellect += randint(-2,1);

						Swal.fire({
							heightAuto:false,
							title:'Vacation Time!',
							text:`You went for a vacation to ${country}!`,
							confirmButtonText:'Nice',
							icon:'success'
						});
					}
				}
				else if (result.dismiss == Swal.DismissReason.cancel){
					vacation();
				};
			});

			display();
		};

	});
};

