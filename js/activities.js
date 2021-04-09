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










