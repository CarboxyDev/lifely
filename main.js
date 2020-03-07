


var user = {
	"name":random_name(),"country":random_country(),
	"age":216,"job":"Unemployed"
};

var money = 1000;
var health = random_feature("health");
var morale = random_feature("morale");
var intellect = random_feature("intellect");
var looks = random_feature("looks");



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
	$("#money").text(`${money}`);
	$("#looks").text(`${looks}`);
	$("#health").text(`${health}`);
	$("#morale").text(`${morale}`);
	$("#intellect").text(`${intellect}`);
	message(`You've started your journey as ${user.name}`);
	message(`You've got ${money}$ with you`);
	message(`You're currently living in <u>${user.country}</u>`);
};


function display(element,content){
	$(element).text(content);
	if (money < 0 ){
		$("#money-block").css("color","red");
	};
	if (health < 20){
		$("#health-block").css("color","red");
	};
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
	"Australia","Austria","Belgium","Belarus","Estonia","Bulgaria",
	"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
	"Egypt","Israel","Kuwait","Latvia","Iran","Slovenia","Lithuania",
	"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
	"South Africa","Bangladesh","Mongolia","Thailand","Serbia",
	"Vietnam","Ukraine","Zimbawe","United States","United States"
	]; // Increasing chance of getting United States

	random = Math.floor((Math.random()*list.length)+1);
	return list[random];
};


function random_name(){
	var male_name = [
	'Aiden','Arron','Zach','James','Alan','Harry','Peter','Steve',
	'Tom','Tim','Gary','Sam','Kevin','Mark','Chester','Mike',
	'Edward','Dyson','Tyson','Ravi','Aakash','Howard','Tony','Jason',
	'Jordan','Felix','Quinton','Rohit','Alex','Alexander','Steven',
	'Liam','James','Kendrick','Austin','Bailey','Elgar','Edgar',
	'Carl','Markus','Hector','Wyatt','Ryan','Dilbert','Gilbert',
	'Ronald','Charlie','Donald','Jacob','Jake','Jonathon','John',
	'kelvin','Corey','Matthew',"Draco","Zach","Henry"

	];



	var last_name = [
	'Smith','Markram','Wolfram','Woods','Marsh','Anderson','Wright',
	'Simpson','Joyce','Burns','Lee','Hooper','Stark','Starc','Barker',
	'Parker','Butler','Hodges','Holmes','Garner','Lawrence',
	'Kumar','Sharma','Singh','Oliver','Cruz','Dean','Nelson',
	'Stuart','Woody','Turner','Rhodes','Washington','Owens',
	'Osborn','Florence','Wilson','Patterson','Peterson','Riley',
	'Dawson','Blair','Waters','Park','Miller','Bennington',
	'Leonard','Marshall','Stone','Roy','Stokes','Morgan','Freeman',
	'Yates','Drake','Wade','Griffin','Stevens','Stevenson','Cook',
	'Williams','Williamson','Sodhi','Pierce','Roberts','Newtons',
	'Lyon','Perkins','Perkinson','Paul','Goodman','Sanders',
	'Smith','Smith','Lee','Anderson','Little','Hales','Marshall',
	'Kumar','Alexson','Guzman','Chambers','Phelps','Hughes','Malfoy',
	'Jackson','Coleson','Carlson','Mason','Bond'

	];


	var random_male_name = Math.floor((Math.random()*male_name.length)+1);
	random_male_name = male_name[random_male_name];

	var random_last_name = Math.floor((Math.random()*last_name.length)+1);
	random_last_name = last_name[random_last_name];



	var name = random_male_name +" "+ random_last_name;
	return name;
};



function random_feature(feature){
	if (feature=="looks"){
		var random = Math.floor(Math.random()*(95-30+1))+30;

	}
	else if (feature=="intellect"){
		var random = Math.floor(Math.random()*(85-40+1))+40;
	}
	else if (feature=="morale"){
		var random = Math.floor(Math.random()*(100-75+1))+75;
	}
	else if (feature=="health"){
		var random = Math.floor(Math.random()*(100-85+1))+85;
	};

	return random;
};





var is_student = false;
var student_months = 0;
var total_student_loans = 0;
function age_events(){
	if (user.age/12 > 30){
		$("#study-btn").remove();
	}; 

	if (is_student==true){
		if (student_months >= 48){
			student_pass();
		};
		if (student_months!=48){
			student_months = student_months + 1;
		};
		if (student_has_loan == false){
			// for future
		};

		if (student_months%12==0){
			var years = student_months/12;
			if (years != 1){
				message(`You have completed ${years} years in college`)
			}
			else {
				message(`You completed your first year in college`);
			}
		}

		if (student_has_loan == true){
			student_loan_months += 1;
			if (student_loan_months%12==0){
				var yearly_interest = Math.floor(student_fees*10/100);
				var yearly_student_fees = Math.floor(student_fees/4)+yearly_interest;
				total_student_loans += yearly_student_fees;
				message(`You were charged ${yearly_student_fees}$ as yearly student loan at 10% interest rate`);
				money = money - yearly_student_fees;
				display("#money",money);
			};
			if (student_loan_months == 48){
				student_has_loan = false;
				message(`Your student loans are over`);
				message(`You paid ${total_student_loans}$ in total as student loans`)
			};
		};
		
	};
	if (has_job == false){


	};

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
	age_events();
	random_event();





};



function random_event(){
	var num = Math.floor((Math.random()*5) + 1);
	event = "";
	message(event);
};





function study(){
	var heading = `<h1 class="text-info">Study</h1><br>`;
	var subheading = `<h5 class="">Studying makes it easier to get certain jobs</h5>`;
	$("#study-overlay").html(heading+subheading);
	var btn = `<br><button id="study-eng" class="btn btn-outline-success study-overlay_close study-eng-overlay_open">Engineering College</button><br>`;
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-grad" class="btn btn-outline-success study-overlay_close study-grad-overlay_open">Graduate College</button><br>`;
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-com" class="btn btn-outline-success study-overlay_close study-com-overlay_open">Commerce College</button><br>`;
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-law" class="btn btn-outline-success study-overlay_close study-law-overlay_open">Law College</button><br>`;
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-arts" class="btn btn-success study-overlay_close study-arts-overlay_open">Arts College</button><br>`;
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-med" class="btn btn-outline-success study-overlay_close study-med-overlay_open">Medical College</button><br>`;	
	$("#study-overlay").append(btn);
	btn = `<br><button id="study-community" class="btn btn-outline-success study-overlay_close study-community-overlay_open">Community College</button><br>`;
	$("#study-overlay").append(btn+"<hr>");


};



var student_loan_months = 0;
var student_has_loan = false;
var student_fees = 0;
function student_loan(type){
	$(`#student-loan-${type}`).attr("class",`study-${type}-overlay_close`);
	$(`#student-loan-${type}`).remove();
	if (type=="eng"){
		student_fees = 40000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Engineering College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Engineering College`);
	}
	if (type=="grad"){
		student_fees = 20000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Graduate College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Graduate College`);
	}
	if (type=="com"){
		student_fees = 33000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Commerce College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Commerce College`);
	}
	if (type=="arts"){
		student_fees = 28000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Arts College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Arts College`);
	}
	if (type=="law"){
		student_fees = 35000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Law College Student";
		message(`You got a student loan worth ${student_fees}$`);
	}
	if (type=="med"){
		student_fees = 45000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Medical College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Medical College`);
	}
	if (type=="community"){
		student_fees = 5000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Community College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Community College`);
	};
	
	student_has_loan = true;
	student();
};













function scholarship(type) {

	$("#scholarship-"+type).attr("class",`study-${type}-overlay_close`);
	$("#scholarship-"+type).remove();
	if (type=="eng"){
		if (intellect > 80){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Engineering Student";
		message("You were awarded a scholarship	at an Engineering College");
		message(`You are now enrolled in an Engineering College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in an Engineering College");
		};
	};
	if (type=="grad"){
		if (intellect > 75){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Graduate Student";
		message("You were awarded a scholarship	at a Graduate College");
		message(`You are now enrolled in a Graduate College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in a Graduate College");
		};
	};
	if (type=="com"){
		if (intellect > 80){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Commerce Student";
		message("You were awarded a scholarship	at a Commerce College");
		message(`You are now enrolled in a Commerce College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in a Commerce College");
		};
	};
	if (type=="arts"){
		if (intellect > 75){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Arts Student";
		message("You were awarded a scholarship	at an Arts College");
		message(`You are now enrolled in an Arts College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in an Arts College");
		};
	};
	if (type=="law"){
		if (intellect > 80){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Law Student";
		message("You were awarded a scholarship	at a Law College");
		message(`You are now enrolled in a Law College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in a Law College");
		};
	};
	if (type=="med"){
		if (intellect > 80){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Medical Student";
		message("You were awarded a scholarship	at a Medical College");
		message(`You are now enrolled in an Medical College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in a Medical College");
		};
	}
	if (type=="community"){
		if (intellect > 70){
		Swal.fire({title:"You got the scholarship!",
		icon:"success"});
		user.job = "Community College Student";
		message("You were awarded a scholarship	at a Community College");
		message(`You are now enrolled in a Community College`);
		student();
		}
		else{
		Swal.fire({title:"You were denied a scholarship.",
		icon:'error'});
		message("You were denied a scholarship in a Community College");
		};
	};

};




function student(){
	student_months = 0;
	is_student = true;
	// add more //:)
	btn = `<button id="student" class="btn-lg btn-info student-overlay_open">Student</button>`;
	$("#actions").attr("class","btn-lg btn-success student-overlay_open");
	$("#actions").attr("id","student");
	$("#student").attr("onclick","student_menu()");
	
};


function student_menu(){
	Swal.fire({
		title:"Student Actions",
		position:"top",
		html:
			`Months Completed - <b>${student_months}</b>/48<br>`+
			`Current Student Debt - ${total_student_loans}$<br>`+
			`<br>`,
		showConfirmButton:false

	});

};



var degree = [];
function student_pass(){
	deg = user.job;
	if ("Engineer" in deg){
		var course = "ENG";
	}
	if ("Graduate" in deg){
		var course = "GRAD";
	}
	else{
		document.write("ERROR in function student_pass()")
	};


	message(`You passed out as a ${deg}`);
	user.job = "Unemployed";
	is_student = false;
	degree.push(course);
};






var has_job = false;
function jobs(){
	$("#jobs-overlay").html("");
	$("#jobs-overlay").html(`<h1 class="text-info">Available Jobs</h1>`);
	var list = [{"Jr. Software Developer":[4000,5000]},
	{"Teacher":[2000,3000]},{"Firefighter":[2000,3000]},
	{"Jr. Engineer":[3500,4500]},{"Gardener":[1000,2000]},
	{"Police Officer":[3000,4000]},{"Soldier":[1500,2500]},
	{"Army Officer":[2500,3500]},{"Marine Biologist":[2000,4000]},
	{"Data Scientist":[4000,5000]},{"Garbage Collector":[500,1200]},
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
		var btn = `<br><button class="btn-lg btn-warning">${job_name} : ${salary}$ / month</button><br>`;
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
		jail();
	}
	else {
		message(`You chickened out before commiting the crime`)
	};
	display("#money",money);
};


// work on , later!
function jail(){
	message("will work on jail() later.")

};




function profile(){
	$("#profile-overlay").html(`
		<h1 class="text-warning">Profile</h1><br>Name : ${user.name}<br>
		Country : ${user.country}<br>Occupation : ${user.job}<br>`)

};




function main(){
	$("#update").click(update);
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
		transition: "all 0.5s",
		vertical:"top",
		onopen:jobs
	});
	
	$("#study-overlay").popup({
		transition:"all 0.5s",
		vertical:"top",
		onopen:study
	});
	$("#study-eng-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-grad-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-com-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-arts-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-law-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-med-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});

	$("#study-community-overlay").popup({
		transition:"all 0.5s",
		vertical:"top"
	});


	$.fn.popup.defaults.pagecontainer = '#page';
	$("#crime-btn").click(crime);
};






















$(document).ready(main());








