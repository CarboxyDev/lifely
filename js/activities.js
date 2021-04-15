function library(){
	let cost = randint(5,40);

	let html = `<br>
	Cost per session : $${cost}<br><br><br>

	<br><br>`;

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

}





function gym(){
	let cost = randint(20,100);

	let html = `<br>
	Cost per session : $${cost}<br><br><br>
	<br><br>`;

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
	var chance = randint(0,3);
	if (chance == 0){
		morale += 1;
		health += 1;
		looks += randint(0,1);
		display();
	};
};









function restaurant(){
	let cost = randint(30,300);
	let rating = randint(30,100);
	let html = 
	`<br><br>
	Cost of food - <b>$${cost}</b><br>
	Restaurant rating - <b>${rating}%</b><br>
	<br><br>
	`;
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
					confirmButtonText:'Nice'
				});
			};
			
		display();
		};
	});

};




function hospital(){
	var html = 
	`<br><br>
	<button onclick="checkup()" class="btn btn-success">&nbspGet a Checkup&nbsp</button>
	<br><br>
	<button onclick="westernMedicine()" class="btn btn-success">Get Western Medicine</button>
	<br><br>
	<button onclick="therapy()" class="btn btn-success">Go to Therapy</button>
	<br><br>
	<button onclick="dentist()" class="btn btn-success">Visit the Dentist</button>
	<br><br>
	<button onclick="plasticSurgery()" class="btn btn-success">Get Plastic Surgery</button>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Hospital",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,

	});


};







function crime(){
	let chance = randint(1,100);

	if (chance < 65){ //65% chance
		crimeSuccess();
	}
	else if (chance >= 65 && chance <= 90){ // 25% chance
		crimeFine();
	}
	else {	//10% chance
		crimeJail();
	}

	display();
};



function crimeSuccess(){
	let amt = approx(randint(100,1500));
	money += amt;
	message(`You commited a crime and stole $${amt}`);

	let html = `<br><br>
	You commited a crime and stole <b>$${amt}</b>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:`Successful Crime`,
		html:html,
		confirmButtonText:"Okay"
	});



}



function crimeFine(){
	let fine = randint(500,2500);
	money -= fine;
	message(`You were caught commiting a minor crime and were fined $${fine}`);
	
	let html = `<br><br>
	You were caught while trying to commit a minor crime.<br>
	You have been fined <b>$${fine}</b>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"error",
		title:`Caught!`,
		html:html,
		allowOutsideClick:false,
		confirmButtonText:`Pay $${fine}`
	});	

}



function crimeJail(){
	message(`You were caught committing a serious crime`);
	let jailTime = randchoice([3,6,8,12]);
	message(`You might have to serve ${jailTime} months in Jail`);
	
	let html = `<br><br>
	You were caught whilst commiting a serious crime.<br>
	You have been sentenced to <b>${jailTime}</b> months in jail.
	<br><br>
	`
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Caught and charged!",
		allowOutsideClick:false,
		html:html,
		confirmButtonText:"Oh No"
	}).then((result) => {
		jail(jailTime);
	});
}








function gamble(){
	let placeholder = 100;
	
	let html = `<br><br>
	Minimum gamble amount : <b>$100</b><br>
	Maximum gamble amount : <b>$10000</b><br><br>
	On winning the gamble , your gambling amount is doubled!<br>
	On losing the gamble , your gambling amount is lost!
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"Gambling Time",
		input:"text",
		inputValue:placeholder,
		html:html,
		confirmButtonText:"Gamble!",
		showCancelButton:true,
		cancelButtonText:"Nevermind",
		inputValidator: (cost) => {
			let isnum = /^\d+$/.test(cost);
			if (isnum && hasMoney(cost)){
				startGamble(cost);
			}
			else if (!cost){
				return 'You need to bet some money'
			}
			else if (!isnum){
				return 'Dude, just enter a number'
			}
			else if (cost < 100){
				return 'You have to bet a minimum of $100'
			}
			else if (cost > 10000){
				return 'You can only bet a maximum of $10000'
			}
			else if (!hasMoney(cost)){
				return `You don't have enough money in hand`
			}
		}
	})


};





function startGamble(amount){
	
	message(`You gambled $${amount}`);
	money -= amount;
	display();

	let html = `<br><br>
	<h5>You've spent <b>${amount}$</b> to gamble</h5><br><br>
	<h6>Click one button below.<br>
	One of these buttons will win you the gamble!</h6>
	<br><br>`;

	var opts = [1,2,3,4];
	shuffle(opts);

	let btns = `
	<button onclick="resultGamble(${opts[0]},${amount})" class="btn btn-success">Choice 1</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[1]},${amount})" class="btn btn-success">Choice 2</button>
	<br><br>
	<button onclick="resultGamble(${opts[2]},${amount})" class="btn btn-success">Choice 3</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[3]},${amount})" class="btn btn-success">Choice 4</button>
	<br><br>`;

	html = html+btns;

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

		let html = `<br><br>
		<b>YOU WON THE GAMBLE!</b><br><br>
		You gambled <b>$${amount}</b><br>
		You won <b>$${prize}</b>
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"Congratulations!!",
			html:html,
			confirmButtonText:"Amazing!"
		});
	
	}
	else {
		
		message(`You lost the gamble`);
		morale -= randint(0,1);

		let html = `<br><br>
		You lost <b>${amount}$ in the gamble</b>
		<br><br>`;
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"You lost the gamble!",
			html:html,
			confirmButtonText:"Harsh Luck"
		});

	};
	display();

};


