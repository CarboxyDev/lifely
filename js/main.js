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





// update stats every 10 seconds just in case I miss to
// update them after stats related changes in a function

setInterval(() => {
	display();
},10000)

