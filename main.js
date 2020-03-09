


var user = {
	"name":random_name(),"country":random_country(),
	"age":216,"job":"Unemployed","salary":0,"xp":0,
	"promos":0
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


function display(){
	if (money < 0 ){
		$("#money-block").css("color","red");
	};
	if (money > 0){
		$("#money-block").css("color","white");
	};
	if (health < 20){
		$("#health-block").css("color","red");
	};
	if (health > 20){
		$("#health-block").css("color","white");
	};
	if (intellect > 100){
		intellect = 100;
	};
	if (health > 100){
		health = 100;
	};
	if (morale > 100){
		morale = 100;
	};
	if (looks > 100){
		looks = 100;
	};
	if (intellect < 10){
		intellect = 10;
	};
	if (health < 0){
		health = 0;
	};
	if (morale < 5){
		morale = 5;
	};
	if (looks < 5){
		looks = 5;
	};


	$("#money").text(money);
	$("#health").text(health);
	$("#intellect").text(intellect);
	$("#morale").text(morale);
	$("#looks").text(looks);
};



function decrease(type,decrement){
	if (type=="health"){
		health = health - decrement;
		display();
	}
	else if (type=="morale"){
		morale = morale - decrement;
		display();
	}
	else if (type=="looks"){
		looks = looks - decrement;
		display();
	}
	else if (type=="intellect"){
		intellect = intellect - decrement;
		display();
	}
	else {
		alert("Error in decrease() function");
	};
};


function increase(type,increment){
	if (type=="health"){
		health = health + increment;
		display();
	}
	else if (type=="morale"){
		morale = morale + increment;
		display();
	}
	else if (type=="looks"){
		looks = looks + increment;
		display();
	}
	else if (type=="intellect"){
		intellect = intellect + increment;
		display();
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
	"Vietnam","Ukraine","Zimbawe","United States","United States",
	"United States","United States","United States","Canada","Canada",
	"Russia"
	]; // Increasing chance of getting United States

	random = Math.floor((Math.random()*list.length));
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
	'Kelvin','Corey','Matthew',"Draco","Zach","Henry"

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


	var random_male_name = Math.floor((Math.random()*male_name.length));
	random_male_name = male_name[random_male_name];

	var random_last_name = Math.floor((Math.random()*last_name.length));
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
var total_years = 0;
var is_jailed = false;
function age_events(){
	
	if (user.age/12 > 30){
		$("#study-btn").remove();
	}; 

	if (is_student==true){

		student_months = student_months + 1;


		if (student_has_loan == false){
			// for future
		};

		if (student_months%12==0){
			var rand = Math.floor(Math.random()*(4-1))+1;
			increase("intellect",rand);
			var total_years = student_months/12;
			if (total_years == 1){
				message(`You've completed your first year in college`);
			}
			else {
				message(`You've completed ${total_years} years in college`);
			};

		};

		if (student_months == 48){
			student_pass();
		};
	

		if (student_has_loan == true){
			student_loan_months = student_loan_months + 1;
			if (student_loan_months%12==0){
				var yearly_interest = Math.floor(student_fees*10/100);
				var yearly_student_fees = Math.floor(student_fees/4)+yearly_interest;
				total_student_loans = total_student_loans + yearly_student_fees;
				message(`You were charged ${yearly_student_fees}$ as yearly student loan at 10% interest rate`);
				money = money - yearly_student_fees;

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
	if (has_job == true){
		user.xp += 1;
		money = money + user.salary;
		var rand = Math.floor((Math.random()*20) + 1);
		message(`You were paid ${user.salary}$ as your salary`);
		if (rand == 1){
			var inc = Math.floor(Math.random()*(8-5))+5;
			var raise = Math.floor(user.salary*inc/100);
			message(`You got a raise of ${raise}$`);
			user.salary = user.salary + raise;
			user.promos += 1;

		};
	};

	if (is_jailed == true){
		decrease("morale",1);
		decrease("looks",1);
		jail_months_spent += 1;
		if (jail_months_spent == jail_months){
			message(`You were released from jail after serving ${jail_months} months`);
			Swal.fire({
				icon:"success",
				title:"Released from jail!",
				confirmButtonText:"Finally!",
				html:`<br><hr><br>Time Served - <b>${jail_months} months</b>`
				});
			is_jailed = false;
			user.job = "Unemployed";

			$("#jail").attr("class","btn-lg btn-danger actions-overlay_open");
			$("#jail").removeAttr("onclick");
			$("#jail").attr("id","actions");
			$("#activities").show();

		};


	};



	display();

};







function update(){
	count = 0;
	total_gym_count = 0;
	total_lib_count = 0;
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
	age_events();





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
	};
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
	};
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
	};
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
	};
	if (type=="law"){
		student_fees = 35000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Law College Student";
		message(`You got a student loan worth ${student_fees}$`);
	};
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
	};
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
	student(); };













function scholarship(type) {

	$("#scholarship-"+type).attr("class",`study-${type}-overlay_close`);
	$("#scholarship-"+type).remove();
	if (type=="eng"){
		if (intellect >= 80){
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
		if (intellect >= 75){
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
		if (intellect >= 80){
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
		if (intellect >= 75){
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
		if (intellect >= 80){
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
		if (intellect >= 80){
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
		if (intellect >= 70){
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

	if (deg.includes("Engineer") == true){
		var course = "ENG";
	}
	else if (deg.includes("Graduate") == true){
		var course = "GRAD";
	}
	else if (deg.includes("Commerce") == true){
		var course = "COM";
	}
	else if (deg.includes("Art") == true){
		var course = "ARTS";
	}
	else if (deg.includes("Law") == true){
		var course = "LAW";
	}
	else if (deg.includes("Medical") == true){
		var course = "MED";
	}
	else if (deg.includes("Community") == true){
		var course = "COMMUNITY";
	}
	else {
		document.write("Error in student_pass()");
	}



	message(`You passed out as a ${deg}`);
	user.job = "Unemployed";
	is_student = false;
	student_loan_months = 0;
	student_months = 0;
	student_has_loan = false;
	total_student_loans = 0;
	degree.push(course);
	$("#student").attr("class","btn-lg btn-danger actions-overlay_open");
	$("#student").removeAttr("onclick");
	$("#student").attr("id","actions");
};






var has_job = false;
var salary = 0;
function jobs(){
	$("#jobs-overlay").html("");
	$("#jobs-overlay").html(`<h1 class="text-info">Available Jobs</h1>`);
	var list = [{"Sr. Engineer":[4000,5000]},
	{"Teacher":[2000,3000]},{"Firefighter":[2000,3000]},
	{"Jr. Engineer":[3500,4500]},{"Gardener":[500,800]},
	{"Police Officer":[3000,4000]},{"Soldier":[1500,2500]},
	{"Army Officer":[2500,3500]},{"Marine Biologist":[2000,4000]},
	{"Data Scientist":[4000,5000]},{"Garbage Collector":[400,700]},
	{"Jr. Pilot":[6000,8000]},{"Sr. Pilot":[10000,14000]},
	{"Chef":[2000,2500]},{"Lawyer":[4000,5000]},{"Banker":[4000,5000]},
	{"Artist":[2000,4000]},{"Sweeper":[400,700]},
	{"Doctor":[6000,7000]},{"Judge":[6000,7500]},
	{"Property Dealer":[3000,4000]}

	];

	var jobs = {};
	for (x=0;x<6;x++){
		random = Math.floor((Math.random()*list.length));
		var sel = list[random];
		if (sel in jobs){
			x = x - 1;
		}
		else {
		var job_name = Object.keys(sel);
		var min = sel[job_name][0];
		var max = sel[job_name][1];

		salary = Math.floor(Math.random()*(max-min+1))+min;
		jobs[job_name] = salary;
		var btn = `<br><button onclick="check_job('${job_name}',${salary})" class="btn-lg btn-primary">${job_name} : ${salary}$ / month</button><br>`;
		$("#jobs-overlay").append(btn);
		};
	};
};


var job_qualified = false;
function check_job(job_name,salary){
	// example of removing the overlay display
	$("#job-btn").attr("class","btn-lg btn-info actions-overlay_close jobs-overlay_close");
	$("#jobs-overlay").attr("class","jobs-overlay_close");

	var req = [];
	if (job_name == "Teacher"){
		req = ["ART","GRAD","ENG"];
	}
	else if (job_name == "Firefighter"){
		req = ["COMMUNITY","GRAD","ENG"];
	}
	else if (job_name == "Gardener"){
		job_qualified = true;
	}
	else if (job_name == "Jr. Engineer"){
		req = ["ENG"];
	}
	else if (job_name == "Sr. Engineer"){
		req = ["ENG"];
	}
	else if (job_name == "Police Officer"){
		req = ["GRAD","COMMUNITY","ART"];
	}
	else if (job_name == "Soldier"){
		req = ["GRAD","COMMUNITY","ENG"];
	}
	else if (job_name == "Army Officer"){
		req = ["GRAD","COMMUNITY","ENG"];
	}
	else if (job_name == "Garbage Collector"){
		job_qualified = true;
	}
	else if (job_name == "Marine Biologist"){
		req = ["MED"];
	}
	else if (job_name == "Data Scientist"){
		req = ["ENG"];
	}
	else if (job_name == "Jr. Pilot"){
		req = ["ENG"];
	}
	else if (job_name == "Sr. Pilot"){
		req = ["ENG"];
	}
	else if (job_name == "Chef"){
		req = ["COMMUNITY","GRAD","ARTS"];
	}
	else if (job_name == "Lawyer"){
		req = ["LAW"];
	}
	else if (job_name == "Banker"){
		req = ["COM"];
	}
	else if (job_name == "Artist"){
		req = ["ART"];
	}
	else if (job_name == "Sweeper"){
		job_qualified = true;
	}
	else if (job_name == "Doctor"){
		req = ["MED"];
	}
	else if (job_name == "Judge"){
		req = ["LAW"];
	}
	else if (job_name == "Property Dealer"){
		req = ["GRAD","ENG","COM"];
	}
	else {
		document.write("ERROR in check_job()");
	};


	for (x in degree){
		for (y in req){
			if (degree[x] == req[y]){
				job_qualified = true;
			}
		}
	}

	Swal.fire({
		position:"top",
		icon:"info",
		title:"Job Information",
		html:
		`<hr><br>Job name - ${job_name}<br>`+
		`Salary - <b>${salary}$/month</b><br>`+
		`<br><br><hr>`

		
		,confirmButtonText:'Apply',
		showCancelButton:true,
		cancelButtonText:"Leave"
	}).then((result) => {
		if (result.value){
			if (job_qualified == true){
				job_qualified = false;
				start_job(job_name,salary);
			}
			else {
				Swal.fire({
					icon:"error",
					title:"Your job application was declined"
				});
			};
		};

	});


	job_allow = false;
	$("#job-btn").attr("class","btn-lg btn-info actions-overlay_close jobs-overlay_open");

};



function start_job(job_name,salary){
	Swal.fire({
		icon:"success",
		title:"You got the job!",
		text:`You are now working as a ${job_name}`,
		footer:`You will be earning <b>${salary}$</b> every month`,
		confirmButtonText:"Cool!"
	});
	message(`You started working as a ${job_name} earning ${salary}$/month`);
	
	has_job = true;
	user.salary = salary;
	user.job = job_name;

	$("#actions").attr("class","btn-lg btn-primary");
	$("#actions").attr("onclick","job_menu()");
	$("#actions").attr("id","job");
	
	

};



function job_menu(){
	Swal.fire({
		position:"top",
		title:"Job Actions",
		showConfirmButton:false,
		html:
		`<br><hr><br>`+
		`Monthly Salary - ${user.salary}$<br>`+
		`Occupation - ${user.job}<br>`+
		`Experience - <b>${user.xp}</b> months<br>`+
		`Total Promotions - <b>${user.promos}</b>`+
		`<br><hr><br>`+
		`<button onclick="ask_raise()" class="btn btn-info">Ask For Raise</button><br><br>`+
		`<button onclick="leave_job()" class="btn btn-primary">Leave Job</button><br><br>`

		
	});

};



function leave_job(){
	has_job = false;
	user.salary = 0;
	user.job = "Unemployed";

	Swal.fire({
		icon:"warning",
		title:`You left your job!`,
		confirmButtonText:"Alright"
	});
	

	$("#job").attr("class","btn-lg btn-danger actions-overlay_open");
	$("#job").removeAttr("onclick");
	$("#job").attr("id","actions");
};



function fire_job(reason){
	user.job = "Unemployed";
	user.salary = 0;
	has_job = false;

	Swal.fire({
		icon:"error",
		title:"You were fired from your job",
		text:reason,
		confirmButtonText:"Alright",
		confirmButtonColor:"#aaa"
	});

	$("#job").attr("class","btn-lg btn-danger actions-overlay_open");
	$("#job").removeAttr("onclick");
	$("#job").attr("id","actions");

};



function ask_raise(){
	chance = Math.floor((Math.random()*10)+1);
	if (chance < 5){
		// raise success
		var inc = Math.floor(Math.random()*(8-5))+5;
		var raise = Math.floor(user.salary*inc/100);
		user.salary += raise;
		user.promos += 1;
		message(`You were given a raise of <b>${raise}$</b>`);
		Swal.fire({
			icon:"success",
			title:`You were given a raise of<b> ${raise}$</b>`,
		});
	}
	else if (chance > 8){
		fire_job("You were fired for asking a raise");
		message(`You were fired from your job for asking for a raise`);
	}
	else {
		message(`You were denied a raise by your boss`);
		Swal.fire({
			icon:"warning",
			title:"You were denied a raise",
			confirmButtonText:"Nevermind"
		});
	};
};



var total_gym_count = 0;
function gym(){
	// TAG - removing overlay display example (TIP)
	$("#gym-btn").attr("class","btn btn-danger activities-overlay_close");

	var max = 250;
	var min = 50;
	var gym_cost = Math.floor(Math.random()*(max-min))+min;
	Swal.fire({
		icon:"question",
		title:"Do you want to go to a gym ?",
		html:`Cost - <b>${gym_cost}$</b>/ session<br><hr><br>`,
		footer:`Note : Working out in gym sometimes boosts your looks`,
		showCancelButton:true,
		cancelButtonText:"Nope",
		confirmButtonText:`Pay ${gym_cost}$`
	}).then((result)=>{
		if (result.value){
			money = money - gym_cost;
			total_gym_count += 1;
			if (total_gym_count >= 3){

			}
			else{
				var rand_looks = Math.floor(Math.random()*2);
				increase("looks",rand_looks);
			};
		Swal.fire({
			icon:"success",
			title:"You worked out at the gym!",
			confirmButtonText:"Phew!"
		});
		message(`You payed ${gym_cost}$ for working out in a gym`);
		display();
		};

	});


};



var total_lib_count = 0;
function library(){
	// TAG - removing overlay display example (TIP)
	$("#lib-btn").attr("class","btn btn-danger activities-overlay_close");
	var max = 200;
	var min = 30;
	var lib_cost = Math.floor(Math.random()*(max-min))+min;
	Swal.fire({
		icon:"question",
		title:"Do you want to go to a library?",
		html:`Cost - <b>${lib_cost}$</b>/ session<br><hr><br>`,
		footer:`Note : Studying in a library sometimes boosts your intellect`,
		showCancelButton:true,
		cancelButtonText:"No studyin'",
		confirmButtonText:`Pay ${lib_cost}$`
	}).then((result)=>{
		if (result.value){
			money = money - lib_cost;
			total_lib_count += 1;
			if (total_lib_count >= 3){

			}
			else{
				var rand_intellect = Math.floor(Math.random()*2);
				increase("intellect",rand_intellect);
			};
		Swal.fire({
			icon:"success",
			title:"You studied at the library!",
			confirmButtonText:"Nice!"
		});
		message(`You payed ${lib_cost}$ for studing in a library`);
		display();
		};

	});


};








function crime(){
	//$("#crime-btn").attr("class","btn btn-danger activities-overlay_close");
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
		message(`You were caught commiting a heinous crime and were\
		<u>jailed</u>`);
		jail(36);
	}
	else {
		message(`You chickened out before commiting the crime`)
	};
	display();
};



var jail_months = 0;
var jail_months_spent = 0;
function jail(months){

	if (is_student == true){
		$("#student").attr("class","btn-lg btn-warning");
		$("#student").attr("id","jail");
		$("#jail").attr("onclick","jail_menu()");
	
	}
	else if (has_job == true){
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

	is_jailed = true;
	is_student = false;
	has_job = false;
	user.job = "Jailed";
	jail_months = months;


	Swal.fire({
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

	Swal.fire({
		title:"Jail Actions",
		showConfirmButton:false,
		html:`<br><hr><br>Time Spent - <b>${jail_months_spent}</b>/${jail_months} months`

	});

};



function appeal_jail(months){

	var def_cost = Math.floor(Math.random()*(100000-10000))+10000;
	Swal.fire({
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
			if (money > def_cost){
				money = money - def_cost;
				display();
				message(`You hired a private defender for ${def_cost}$`);
				var chance = Math.floor(Math.random()*2);
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
					icon:"warning",
					title:"You don't have enough money to hire a Private Defender"
				});
			};
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			// public defender
			message(`You were given a public defender for free`);
			var chance = Math.floor(Math.random()*5);
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
	if (was_saved == true){
		if (defender == "private"){
			Swal.fire({
				icon:"success",
				title:"You won the court case!",
				html:`Your private defender saved you from prison<br>`,
				confirmButtonText:"Amazing!"
			});
		}
		else {
			Swal.fire({
				icon:"success",
				title:"You won the court case!",
				html:`Your free public defender saved you from prison<br>`,
				confirmButtonText:"Very Nice!"
			});
		};
		message(`You won the court case. You will not serve prison time`);
		is_jailed = false;
		user.job = "Unemployed";

		$("#jail").attr("class","btn-lg btn-danger actions-overlay_open");
		$("#jail").removeAttr("onclick");
		$("#jail").attr("id","actions");
		$("#activities").show();


	}
	else {
		// wasnt saved
		Swal.fire({
			icon:"error",
			title:"You lost the court case...",
			text:"You will have to serve the prison time",
			confirmButtonText:"Take me"
		});
	};
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
		vertical:"top",
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








