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
	${buttons.bank}<br><br>
	${buttons.budget}<br><br><br>
	${buttons.jobs}<br><br>
	${buttons.study}<br><br>
	<br><br>
	${buttons.profile}&nbsp;
	${buttons.assets}`;


	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Actions",
		showConfirmButton:false,
		html:html,
		background:swalBackground
	});


};




function activities(){
	
	let html = `<br><br>
	<button id="hosp-btn" onclick="hospital()" class="btn btn-success">Go To Hospital &nbsp;<i class="fa fa-hospital"></i></button>
	<br><br>
	<button id="gym-btn" onclick="gym()" class="btn btn-danger">Go To Gym &nbsp;<i class="fa fa-dumbbell"></i></button>
	<br><br>
	<button id="lib-btn" onclick="library()" class="btn btn-danger">Go To Library &nbsp;<i class="fa fa-book"></i></button>
	<br><br>
	<button id="restaurant-btn" onclick="restaurant()" class="btn btn-danger">Go To Restaurant &nbsp;<i class="fa fa-utensils"></i></button>
	<br><br>
	<button id="exercise-btn" onclick="exercise()" class="btn btn-danger">Do Exercise &nbsp;<i class="fa fa-running"></i></button>
	<br><br>`;

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

	let html = `<br><br>
	<button onclick="gamble()" class="btn btn-danger">Do Gambling &nbsp;<i class="fa fa-dice-six"></i></button>
	<br><br>
	<button id="crime-btn" onclick="crime()" class="btn btn-danger">Commit Crime &nbsp;<i class="fa fa-exclamation"></i></button>
	<br><br>
	<button id="vacation-btn" onclick="vacation()" class="btn btn-danger">Go On Vacation &nbsp;<i class="fa fa-compass"></i></button>
	<br><br>
	<button onclick="emigrate()" class="btn btn-danger">Emigrate <i class="fas fa-plane"></i></button>
	<br><br>`;

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


function activities3(){
	Swal.fire({
		title:`Coming Later!`}
	);
}


























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






function settings(){
	let html = `<br><br>

	${buttons.credits}<br><br>
	${buttons.help}<br><br>
	${buttons.contributions}<br><br>
	${buttons.displayThemes}<br><br>

	<br><br>`;
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

	let html = `<br><br>
	<button onclick="darkTheme()" class="w3-btn w3-dark-grey">Dark Theme</button>
	<br><br>
	<button onclick="ultraDarkTheme()" class="w3-btn w3-black">Ultra Dark Theme</button>
	<br><br>
	<button onclick="cobaltTheme()" class="w3-btn w3-blue">Cobalt Theme</button>
	<br><br>
	<button onclick="wizardTheme()" class="w3-btn w3-purple">Wizard Theme</button>

	<br><br>`;


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
	No contributions yet. You could be the first contributor!
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:"info",
		position:top,
		html:html,
		title:"Contributions",
		confirmButtonText:"Back",
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
	let html = `<br><br>
	Icons by <b>FontAwesome</b><br>
	Buttons by <b>Bootstrap</b> and <b>w3css</b><br>
	A huge thanks to <span class='w3-text-amber'>SweetAlert2</span>
	<br><br>
	Made With <i class="fas fa-heart" style="color:#d0142b"></i>
	<br><br>`;
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
	let html=`<br><br>

	Press the button below to view help.
	Alternatively , you could contact us for other queries.
	<br><br>
	<a href="https://github.com/wraithM17/lifely/wiki/Help" 
	target="_blank" class="w3-button w3-blue">View Help</a>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Help Section",
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
	HTML.console.innerText = "";
	USER.age += 1;

	let months = USER.age%12;
	let years = (USER.age-months)/12;

	HTML.ageDisplay.innerText = `${years}y ${months}m`

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





function main(){
	

	$("#alert").hover(() => {
		let html = `Alerts : <span id="alert-count">${alertsCount}</span>`;
		$("#alert").html(html);
	
	},() => {
		let html = `<i class="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;<span id="alert-count">${alertsCount}</span>`;
		$("#alert").html(html);
	});

	
};


$(document).ready(main());





// update stats every 10 seconds just in case i miss to
// update them after stats related changes in a function

setInterval(() => {
	display();
},10000)

