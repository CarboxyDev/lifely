


var user = {
	"fname":"Arman","lname":"Ganjoo","country":random_country(),
	"age":216,"job":"unemployed"
};

var money = 1000;
var health = 100;
var morale = 100;
var intellect = 100;
var looks = 100;



start();

var count = 0;
function message(message){
	count = count + 1;
	if (count >= 10){
		$(".console").text("");
		count = 0;
	};
	$(".console").append(message+"<br>");

};


function start(){
	message(`You've started your journey as ${user.fname} ${user.lname}`);
	message(`You've got ${money}$ with you`);
	message(`You're currently living in <u>${user.country}</u>`);
};


function display(element,content){
	$(element).text(content);

}



function decrease(type,max){
	decrement = Math.floor((Math.random()*max)+1);
	if (type=="health"){
		health = health - decrement;
		display("#health",health);
	}
	else if (type=="morale"){
		morale = morale - decrement;
		display("#morale",morale);
	}
	else if (type=="looks"){
		looks = looks - decrement;
		display("#looks",looks);
	}
	else if (type=="intellect"){
		intellect = intellect - decrement;
		display("#intellect",intellect);
	}
	else {
		alert("Error in decrease() function");
	};

};


function random_country(){
	var list = [
	"United States","Canada","United Kingdom","India","Pakistan",
	"China","Saudi Arabia","Sri Lanka","Mexico","Sweden","Norway",
	"Denmark","Finland","Russia","Japan","Taiwan","South Korea",
	"Indonesia","Singapore","Italy","Hungary","Switzerland",
	"Poland","Germany","France","Portugal","Spain","Ireland",
	"Iceland","Argentina","Brazil","Urugay","Cuba","Albania",
	"Australia","Austraia","Belgium","Belarus","Estonia","Bulgaria",
	"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
	"Egypt","Israel","Kuwait","Latvia","Iran","Slovenia","Lithuania",
	"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
	"South Africa","Bangladesh","Mongolia","Thailand","Serbia",
	"Vietnam","Ukraine","Zimbawe","United States","United States"
	]; // Increasing chance of getting United States

	random = Math.floor((Math.random()*list.length)+1);
	return list[random];
};





function update(){
	$(".console").text("");
	user.age = user.age + 1;
	if (user.age % 12 != 0){
		var months = user.age%12;
		var years = (user.age-months)/12;
		$("#age").text(`Age : ${years} years ${months} months`);
	}
	else{
		var years = user.age/12;
		$("#age").text(`Age : ${years} years`);

	};

	random_event();





};



function random_event(){
	var num = Math.floor((Math.random()*5) + 1);
	event = "";
	message(event);
};






function jobs(){
	$("#jobs-overlay").html("");
	$("#jobs-overlay").html(`<h1 class="text-info">Available Jobs</h1>`);
	var list = [{"Jr. Software Developer":[4000,5000]},
	{"Teacher":[2000,3000]},{"Firefighter":[2000,3000]},
	{"Jr. Engineer":[3500,4500]},{"Gardener":[1000,2000]},
	{"Police Officer":[3000,4000]},{"Soldier":[1500,2500]},
	{"Army Officer":[2500,3500]},{"Marine Biologist":[2000,4000]},
	{"Data Scientist":[4000,5000]},{"Garbage Collector":[500,1500]},
	{"Jr. Pilot":[6000,8000]},{"Sr. Pilot":[10000,14000]},
	{"Chef":[2000,2500]}

	];
	var jobs = {};
	for (x=0;x<5;x++){
		random = Math.floor((Math.random()*list.length));
		var sel = list[random];
		if (sel in jobs){
			x = x - 1;
		}
		else {
		var job_name = Object.keys(sel);
		var min = sel[job_name][0];
		var max = sel[job_name][1];

		var salary = Math.floor(Math.random()*(max-min+1))+min;

		jobs[job_name] = salary;
		var btn = `<br><button class="btn-lg btn-warning">${job_name} : ${salary}</button><br>`;
		$("#jobs-overlay").append(btn);
		};
	};

};








function crime(){
	var chance = Math.floor((Math.random()*6)+ 1);
	if (chance == 1){
		let stole = Math.floor((Math.random()*1000)+1);
		money = money + stole;
		message(`You commited a crime and stole ${stole}$`);
	}
	else if (chance == 2){
		let fine = Math.floor((Math.random()*500)+1);
		money = money - fine;
		message(`You were caught commiting a minor crime and fined\ 
		${fine}$`);
	}
	else if (chance == 3){
		// develop jail later
		message(`You were caught commiting a heinous crime and were\
		<u>jailed</u>`);
	}
	else {
		message(`You chickened out before commiting the crime`)
	};
	display("#money",money);
};




function profile(){
	$("#profile-overlay").html(`
		<h1 class="text-warning">Profile</h1><br>Name : ${user.fname} ${user.lname}<br>
		Country : ${user.country}`)

};




function main(){
	$("#update").click(update);
	$("#actions").click(actions);
	$("#actions-overlay").popup({
		transition: "all 0.5s",
		vertical:"top"
	});
	$("#profile-overlay").popup({
		transition: "all 0.5s",
		vertical:"top",
		onopen:profile
	});
	$("#activities-overlay").popup({
		transition: "all 0.5s",
		vertical:"top"
	});

	$("#jobs-overlay").popup({
		transition: "all 1s",
		vertical:"top",
		onopen:jobs
	});

	$.fn.popup.defaults.pagecontainer = '#page';
	$("#crime-btn").click(crime);
	//$("#job-btn").click(jobs);
};






















$(document).ready(main());








