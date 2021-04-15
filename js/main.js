start();
var messagesOnConsole = 0;
function message(msg){
	messagesOnConsole += 1;
	if (messagesOnConsole >= 12){
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






function disease(level=null){
	disease_count += 1;
	hasDisease = true;

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
	var html = `<br><br>
	<button id="bank" class="btn-lg btn-success" onclick="bank()">Bank &nbsp;<i class="fa fa-dollar-sign"></i></button>
	<br><br>
	<button id="budget" class="btn-lg btn-info" onclick="budget()">Budget &nbsp;<i class="fa fa-wallet"></i></button>
	<br><br>
	<button id="job-btn" class="btn-lg btn-info" onclick="jobs()">Jobs &nbsp;<i class="fa fa-briefcase"></i></button>
	<br><br>
	<button id="study-btn" class="btn-lg btn-info" onclick="study()">Study &nbsp;<i class="fa fa-graduation-cap"></i></button>
	<br><br>
		
	<br>
	${buttons.profile}&nbsp;
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

		$("body").css("background-color","#111010");
		$("body").css("color","white");
}
	
function darkTheme(){
		$("body").css("background-color","#1b1b1b");
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
	ageUpAnimation();
	count = 0;
	totalGymVisits = 0;
	totalLibVisits = 0;
	document.querySelector('#console').innerText = "";
	USER.age = USER.age + 1;

	var months = USER.age%12;
	var years = (USER.age-months)/12;

	let ageElem = document.querySelector('#age');
	ageElem.innerText = `${years}y ${months}m`

	ageEvents();
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
	

	$("#alert").hover(() => {
		let html = `Alerts : <span id="alert-count">${alertsCount}</span>`;
		$("#alert").html(html);
	
	},() => {
		let html = `<i class="fas fa-exclamation-triangle"></i>&nbsp;<span id="alert-count">${alertsCount}</span>`;
		$("#alert").html(html);
	});




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





// update stats every 10 seconds just in case i miss to update them in a function
setInterval(() => {
	display();
},10000)

