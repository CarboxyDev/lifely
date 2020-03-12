
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
var karma = 0;


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
	display();
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



function decrease(type,min,max){
	let decrement = randint(min,max);
	if (type=="health"){
		health = health - decrement;
	}
	else if (type=="morale"){
		morale = morale - decrement;
	}
	else if (type=="looks"){
		looks = looks - decrement;

	}
	else if (type=="intellect"){
		intellect = intellect - decrement;
	}
	else {
		alert("Error in decrease() function");
	};
	display();
};


function increase(type,min,max){
	let increment = randint(min,max);
	if (type=="health"){
		health = health + increment;
	}
	else if (type=="morale"){
		morale = morale + increment;
	}
	else if (type=="looks"){
		looks = looks + increment;
	}
	else if (type=="intellect"){
		intellect = intellect + increment;
	}
	else {
		alert("Error in increase() function");
	};
	display();

};






function random_country(){
	var country_list = [
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

	random = randint(0,country_list.length-1);
	return country_list[random];
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


	var random_male_name = randint(0,male_name.length-1);
	random_male_name = male_name[random_male_name];

	var random_last_name = randint(0,last_name.length-1);
	random_last_name = last_name[random_last_name];



	var name = random_male_name +" "+ random_last_name;
	return name;
};



function random_feature(feature){
	if (feature=="looks"){
		var random = randint(30,95);

	}
	else if (feature=="intellect"){
		var random = randint(45,85);
	}
	else if (feature=="morale"){
		var random = randint(75,95);
	}
	else if (feature=="health"){
		var random = randint(85,100);
	};

	return random;
};





var is_student = false;
var student_months = 0;
var total_student_loan = 0;
var total_years = 0;
var is_jailed = false;
function age_events(){
	if (user.age/12 > 60){
		if (user.age/12 > 95){
			var die_chance = randint(1,10);
			if (die_chance == 5){
				death();
			}
		}
		if (health < 70){
			var die_chance = randint(1,50);
				if (die_chance == 35){
					death();
				}
			}
		if (health < 50 && health > 20){
			var die_chance = randint(1,25);
			if (die_chance == 20){
				death();
			}
		}
	};
	if (health <= 20){
		if (health <= 10){
			var die_chance = randint(1,5);
			if (die_chance == 2){
				death();
			}
		}
		else{
			var die_chance = randint(1,10);
			if (die_chance == 5){
				death();
			}
		};
	};



	if (user.age/12 == 35){
		message("You can no longer study in any college now");
		$("#study-btn").hide();
	};

	if (user.age/12 > 40){

		var rand = randint(1,2);
		if (rand == 1){
			health -= 1;
			looks -= 1;
			if (user.age/12 > 50){
				intellect -= 1;
			};
		};
	}; 

	if (is_student==true){

		student_months = student_months + 1;


		if (student_has_loan == false){
			// for future
		};

		if (student_months%12==0){

			increase("intellect",1,4);
			var total_years = student_months/12;

			if (total_years == 1){
				message(`You've completed your first year in college`);
			}
			else {
				message(`You've completed ${total_years} years in college`);
			};

		};



		if (student_has_loan == true){

			if (student_months%12==0){
				var yearly_interest = Math.floor(student_fees*10/100);
				var yearly_student_fees = Math.floor(student_fees/4)+yearly_interest;
				total_student_loan = total_student_loan + yearly_student_fees;
				message(`Your student loan increased by ${yearly_student_fees}$ as yearly student loans at 10% interest rate`);

			};
			if (student_months >= 48){
				message(`You have ${total_student_loan}$ as total student loans`);
				message(`Your student loan will be paid when you start earning`)
				message(`You are no longer entitled to more student loans`);
			};
		};
	
		if (student_months == 48){
			student_pass();
		};
	



	};
		


	if (has_job == false){
		if (is_student == false){
			if (student_has_loan == true){
				if (user.age/12 >= 30){
					money = money - total_student_loan;
					student_has_loan = false;
					message(`Student loans repayment deadline has been reached`);
					message(`You had to pay all your pending loans`);
				};
			};
		};
	};
	if (has_job == true){
		user.xp += 1;
		money = money + user.salary;
		var rand = randint(1,20);
		message(`You were paid ${user.salary}$ as your salary`);
		if (rand == 1){
			var inc = randint(5,8);
			var raise = Math.floor(user.salary*inc/100);
			message(`You got a raise of ${raise}$`);
			user.salary = user.salary + raise;
			user.promos += 1;

		}
		if (student_has_loan == true){
			var loan_paid = Math.floor(user.salary*25/100);
			if (total_student_loan <= loan_paid ){
				money = money - total_student_loan;
				student_has_loan = false;
				message(`You paid all your pending student loans`);
				Swal.fire({
					title:"All Student loans paid!",
					icon:"success",
					confirmButtonText:"Good Riddance!"
				});
			}
			// make the max student loan deadline flexible
			// cause a person can become student at 29,29 
			else if (user.age/12 == 30){
				money = money - total_student_loan;
				student_has_loan = false;
				message(`Student loans repayment deadline has been reached`);
				message(`You had to pay all your pending loans`);
			}
			else {
				money = money - loan_paid;
				total_student_loan = total_student_loan - loan_paid;
				message(`You paid ${loan_paid}$ as student loan repayment this month`);
			};
		}

	};

	if (is_jailed == true){
		morale -= 1;
		looks -= 1;
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

			$("#jail").attr("onclick","actions()");
			$("#jail").attr("class","btn-lg btn-danger");
			$("#jail").attr("id","actions");
			$("#activities").show();

		};


	};



	display();

};



function randint(min,max){
	let int = Math.floor(Math.random()*(max-min+1))+min;
	return int;

};








function generate(object,amount){

	if (object == "country"){
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
		"Canada"
		]; 

		var countries = [];
		for (x=0;x!=amount;x++){
			var random = randint(0,list.length-1);
			var c = list[random];
			if (c in countries){
				x = x - 1;
			}
			else {
				countries.push(c);
			}
		};
		return countries;

	};






};




var event_chance = 0;
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


function study(){
	var html = `
	<br>
	<br><button id="study-eng" class="btn btn-success" onclick="study_course('eng')">Engineering College</button><br>

	<br><button id="study-grad" class="btn btn-success" onclick="study_course('grad')">Graduate College</button><br>
	<br><button id="study-com" class="btn btn-success" onclick="study_course('com')">Commerce College</button><br>

	<br><button id="study-law" class="btn btn-success" onclick="study_course('law')">Law College</button><br>
	<br><button id="study-arts" class="btn btn-success" onclick="study_course('arts')">Arts College</button><br>
	<br><button id="study-med" class="btn btn-success" onclick="study_course('med')">Medical College</button><br>	
	<br><button id="study-community" class="btn btn-success" onclick="study_course('community')">Community College</button><br>


	`;
	Swal.fire({
		position:"top",
		title:"Colleges",
		showConfirmButton:false,
		html:html

	});
};


function study_course(course){

	if (course == "eng"){
		var title = "Engineering College";
		var html = 
		`
		<span>REQUIREMENT : 70%+ INTELLECT</span><br>
		<span>FEES : 40000$</span><br><br>
		<span>Study for better job opportunities in Engineering fields</span>
		<br><br>
		<button id="scholarship-eng" onclick="scholarship('eng')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-eng" onclick="student_loan('eng')" class="btn btn-outline-primary">Take a student loan</button><br><br>

		`;

	};
	if (course == "grad"){
		var title = "Graduate College";
		var html = 
		`
		<span>REQUIREMENT : 60%+ INTELLECT</span><br>
		<span>FEES : 20000$</span><br><br>
		<span>Study for better job opportunities in related job fields</span>
		<br><br>
		<button id="scholarship-grad" onclick="scholarship('grad')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-grad" onclick="student_loan('grad')" class="btn btn-outline-primary">Take a student loan</button><br><br>


		`;

	};
	if (course == "com"){
		var title = "Commerce College";
		var html = 
		`
		<span>REQUIREMENT : 65%+ INTELLECT</span><br>
		<span>FEES : 33000$</span><br><br>
		<span>Study for better job opportunities in commerce / business fields</span>
		<br><br>
		<button id="scholarship-com" onclick="scholarship('com')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-com" onclick="student_loan('com')" class="btn btn-outline-primary">Take a student loan</button><br><br>


		`;

	};
	if (course == "law"){
		var title = "Law College";
		var html = 
		`
		<span>REQUIREMENT : 70%+ INTELLECT</span><br>
		<span>FEES : 35000$</span><br><br>
		<span>Study for better job opportunities in law fields</span>
		<br><br>
		<button id="scholarship-law" onclick="scholarship('law')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-law" onclick="student_loan('law')" class="btn btn-outline-primary">Take a student loan</button><br><br>

		`;

	};
	if (course == "arts"){
		var title = "Arts College";
		var html = 
		`
		<span>REQUIREMENT : 60%+ INTELLECT</span><br>
		<span>FEES : 28000$</span><br><br>
		<span>Study for better job opportunities in related job fields</span>
		<br><br>
		<button id="scholarship-arts" onclick="scholarship('arts')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-arts" onclick="student_loan('arts')" class="btn btn-outline-primary">Take a student loan</button><br><br>


		`;

	};
	if (course == "med"){
		var title = "Medical College";
		var html = 
		`
		<span>REQUIREMENT : 75%+ INTELLECT</span><br>
		<span>FEES : 45000$</span><br><br>
		<span>Study for better job opportunities in medical fields</span>
		<br><br>
		<button id="scholarship-med" onclick="scholarship('med')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-med" onclick="student_loan('med')" class="btn btn-outline-primary">Take a student loan</button><br><br>

		`;

	};
	if (course == "community"){
		var title = "Community College";
		var html = 
		`
		<span>REQUIREMENT : 50%+ INTELLECT</span><br>
		<span>FEES : 5000$</span><br><br>
		<span>Study for better job opportunities in basic job fields</span>
		<br><br>
		<button id="scholarship-community" onclick="scholarship('community')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-community" onclick="student_loan('community')" class="btn btn-outline-primary">Take a student loan</button><br><br>


		`;

	};

	Swal.fire({
		position:top,
		title:title,
		showConfirmButton:false,
		icon:"info",
		html:html
	})


};














var student_months = 0;
var student_has_loan = false;
var student_fees = 0;
function student_loan(type){
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

	$("#scholarship-"+type).hide();
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
	$("#actions").attr("class","btn-lg btn-success")
	$("#actions").attr("id","student");
	$("#student").attr("onclick","student_menu()");
	
};


function student_menu(){
	Swal.fire({
		title:"Student Actions",
		position:"top",
		html:
			`Months Completed - <b>${student_months}</b>/48<br>`+
			`Current Student Debt - ${total_student_loan}$<br>`+
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
	student_months = 0;
	student_months = 0;
	degree.push(course);
	$("#student").attr("onclick","actions()");
	$("#student").attr("class","btn-lg btn-danger");
	$("#student").attr("id","actions");
};






var has_job = false;
var salary = 0;
function jobs(){
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
	var btns = [];
	var jobs = {};
	for (x=0;x<6;x++){
		random = randint(0,list.length-1);
		var sel = list[random];
		if (sel in jobs){
			x = x - 1;
		}
		else {
		var job_name = Object.keys(sel);
		var min = sel[job_name][0];
		var max = sel[job_name][1];

		salary = randint(min,max);
		jobs[job_name] = salary;
		var btn = `<br><button onclick="check_job('${job_name}',${salary})" 
		class="w3-round w3-ripple w3-btn w3-indigo w3-hover-red">
		${job_name} : ${salary}$ / month</button><br>`;
		btns.push(btn);
		};
	};
	var reload_btn = `<br><br><button onclick="jobs()" class="btn-lg btn-secondary">View More Jobs</button>`;
	var html = btns[0]+btns[1]+btns[2]+btns[3]+btns[4]+btns[5]+reload_btn;
	Swal.fire({
		title:"Jobs",
		showConfirmButton:false,
		position:"top",
		html:html
	});

};



var job_qualified = false;
function check_job(job_name,salary){


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
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			jobs();
		};

	});


	job_allow = false;

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
	

	$("#job").attr("onclick","actions()");
	$("#job").attr("class","btn-lg btn-danger");
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

	$("#job").attr("onclick","actions()");
	$("#job").attr("class","btn-lg btn-danger");
	$("#job").attr("id","actions");

};



function ask_raise(){
	chance = randint(0,10);
	if (chance < 5){
		// raise success
		var inc = randint(5,8);
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
	var max = 250;
	var min = 50;
	var gym_cost = randint(min,max);
	Swal.fire({
		icon:"question",
		title:"Do you want to go to a gym ?",
		html:`Cost - <b>${gym_cost}$</b>/ session<br><hr><br>`,
		footer:`Note : Working out in gym sometimes boosts your looks`,
		showCancelButton:true,
		cancelButtonText:"Nope",
		confirmButtonText:`Pay ${gym_cost}$`
	}).then((result)=>{
		if (has_money(gym_cost) == false){
			return;
		};
		if (result.value){
			money = money - gym_cost;
			total_gym_count += 1;
			if (total_gym_count >= 3){

			}
			else{
				increase("looks",0,2);
			};
		Swal.fire({
			icon:"success",
			title:"You worked out at the gym!",
			confirmButtonText:"Phew!"
		});
		message(`You paid ${gym_cost}$ for working out in a gym`);
		display();
		};

	});


};



var total_lib_count = 0;
function library(){
	var max = 200;
	var min = 30;
	var lib_cost = randint(min,max);
	Swal.fire({
		icon:"question",
		title:"Do you want to go to a library?",
		html:`Cost - <b>${lib_cost}$</b>/ session<br><hr><br>`,
		footer:`Note : Studying in a library sometimes boosts your intellect`,
		showCancelButton:true,
		cancelButtonText:"No studyin'",
		confirmButtonText:`Pay ${lib_cost}$`
	}).then((result)=>{
		if (has_money(lib_cost) == false){
			return;
		};
		if (result.value){
			money = money - lib_cost;
			total_lib_count += 1;
			if (total_lib_count >= 3){

			}
			else{
				increase("intellect",0,2);
			};
		Swal.fire({
			icon:"success",
			title:"You studied at the library!",
			confirmButtonText:"Nice!"
		});
		message(`You paid ${lib_cost}$ for studing in a library`);
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
		title:"Restaurant",
		icon:"info",
		html:html,
		confirmButtonText:`Pay ${cost}$`,
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
				icon:"success",
				title:"You ate at a restaurant!",
				text:`Your satisfaction - ${satisfaction}%`,
				confirmButtonText:btn_text
			});
			if (satisfaction >= 60){
				morale = morale + 2;
			};
			if (satisfaction <= 40){
				if (poision == 1){
					message(`You got food poisoning`);
					Swal.fire("You got food poisoning!",
					"Due to this , you lost some health","error");
					health = health - randint(3,10);
				};
			};
		display();
		};
	});



};










function checkup(){
	Swal.fire({
		icon:"info",
		title:"Checkup",
		text:"Coming Soon!"
	});
};


function therapy(){
	Swal.fire({
		icon:"info",
		title:"Therapy",
		text:"Coming Soon!"
	});
};


function dentist(){
	Swal.fire({
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
		icon:"info",
		title:"Plastic Surgery",
		footer:"Note : Getting a plastic surgery increases Looks",
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay ${cost}$`,
		cancelButtonText:"Not for me"
	}).then((result) =>{
		if (result.value){
			if (has_money(cost) == true){
				money = money - cost;
				let fail = randint(0,4);
				let rand = randint(5,25);
				if (fail != 4){
					looks = looks + rand;
					morale += 2;
					Swal.fire({
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





var has_disease = false;
function hospital(){
	var html = 
	`<br><hr><br>
	<button onclick="checkup()" class="btn btn-success">Get a Checkup</button>
	<br><br>
	<button onclick="therapy()" class="btn btn-success">Go to Therapy</button>
	<br><br>
	<button onclick="dentist()" class="btn btn-success">Visit the Dentist</button>
	<br><br>
	<button onclick="plastic_surgery()" class="btn btn-success">Get Plastic Surgery</button>
	<br><br>
	`;

	Swal.fire({
		position:"top",
		title:"Hospital",
		html:html,
		showConfirmButton:false,

	});


};












function crime(){
	var chance = randint(0,6);
	if (chance == 1){
		let stole = randint(10,1000);
		money = money + stole;
		message(`You commited a crime and stole ${stole}$`);
	}
	else if (chance == 2){
		let fine = randint(10,500);
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
		message(`You did not commit any crime out of fear`);
	};
	display();
};



var jail_months = 0;
var jail_months_spent = 0;
function jail(months){
	karma = karma - months;
	if (is_student == true){
		message("You were rusticated from your college");
		$("#student").attr("class","btn-lg btn-warning");
		$("#student").attr("id","jail");
		$("#jail").attr("onclick","jail_menu()");
	
	}
	else if (has_job == true){
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

	var def_cost = randint(10000,100000);
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
					icon:"warning",
					title:"You don't have enough money to hire a Private Defender"
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

		$("#jail").attr("onclick","actions()");
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

/*
function disease(name,decrease){

	decrement("health",decrease);

};
*/


function actions(){
	var html = 
	`<br>
	<button id="study-btn" class="btn-lg btn-info" onclick="study()">Study</button><br><br>
	<button id="job-btn" class="btn-lg btn-info" onclick="jobs()">Jobs</button>

	`;
	Swal.fire({
		position:"top",
		title:"Actions",
		showConfirmButton:false,
		html:html
	});


};













function activities(){
	var html = 
	`<br>
<button id="crime-btn" onclick="crime()" class="btn btn-danger">Commit Crime</button>
<br><br>
<button id="gym-btn" onclick="gym()" class="btn btn-danger">Go To Gym</button>
<br><br>
<button id="lib-btn" onclick="library()" class="btn btn-danger">Go To Library</button>
<br><br>
<button id="hosp-btn" onclick="hospital()" class="btn btn-danger">Go To Hospital</button>
<br><br>
<button id="restaurant-btn" onclick="restaurant()" class="btn btn-danger">Go To Restaurant</button>
<br><br>
<button id="exercise-btn" onclick="exercise()" class="btn btn-danger">Do Exercise</button>
<br><br>
<button id="vacation-btn" onclick="vacation()" class="btn btn-success">Go On Vacation</button>
<br><br>

	`;

	Swal.fire({
		position:"top",
		title:"Activities",
		showConfirmButton:false,
		html:html
	});
};













function profile(){
	var html = 
	`
	Name - <b>${user.name}</b><br>
	Country - <b>${user.country}</b><br>
	Occupation - <b>${user.job}</b><br>
	`;
	if (student_has_loan == true){
		html = html+`Student Loan - <b>${total_student_loan}$</b><br>`;
	};

	Swal.fire({
		position:"top",
		title:"Profile",
		showConfirmButton:false,
		html:html
	});
};













function exercise(){
	message(`You exercised a bit`);
	Swal.fire({
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
	var country_list = [
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
	"Russia"
	];
	var countries = [];
	
	for (x=0;x<5;x++){
		random = randint(0,country_list.length);
		var sel = country_list[random];
		if (sel in countries){
			x = x - 1;
		}
		else if (sel == user.country){
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
				icon:"info",
				title:`Vacation in ${country}`,
				showCancelButton:true,
				confirmButtonText:`Pay ${cost}$`,
				cancelButtonText:"Not For Me!",
				footer:"Note : Going on a vacation significantly boosts your morale",
				html:
				`<br><hr><br>Cost Of Trip - <b>${cost}$</b><br>`+
				`<br><hr><br>`
			}).then((result) => {
				if (result.value){
					if (has_money(cost) == true){
						money = money - cost;
						increase("morale",20,35);
						message(`You went on a vacation to ${country}`);
						Swal.fire({
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










function has_money(amount=null,message=null){
	if (message == null){
		message = "You don't have enough money!";
	};

	if (amount==null){
		if (money >= 0){
			return true;
		}
		else {
			Swal.fire({
				title:"You are already in debt!",
				icon:"error"
			});
			return false;
		};
	}
	else{
		if (money >= amount){
			return true;
		}
		else {
			Swal.fire({
				title:message,
				icon:"error",
				html:`You need <b>${amount}$</b>`
			});
			return false;
		};
	};

};




function assets(){

	var btn1 = `<br><button id="purchase-assets" class="btn btn-info" onclick="purchase_assets()">Purchase Assets</button><br>`;
	var btn2 = ``;

	Swal.fire({
		position:"top",
		title:"Assets",
		showConfirmButton:false,
		html:
		`${btn1}`
	});
};



function purchase_assets(){
	var btn1 = `<br><button id="purchase-house" class="btn btn-success" onclick="purchase('house')">Purchase House</button><br>`;
	var btn2 = `<br><button id="purchase-vehicle" class="btn btn-success" onclick="purchase('vehicle')">Purchase Vehicle</button><br>`;
	Swal.fire({
		position:"top",
		icon:"info",
		title:"Purchase Assets",
		showConfirmButton:false,
		html:
		`<br><hr>`+
		`${btn1} ${btn2}`
	});

};



function death(){
	var age = (user.age-user.age%12)/12;

	var html = `
	<br><hr><br>
	Name : ${user.name}<br>
	Net-worth : ${money}$<br>
	Age : ${age}<br>

	<br><hr><br>You were cremated in ${user.country}
	<br><hr><br>
	`
	;
	Swal.fire({
		title:`You died at ${age}`,
		imageUrl:"images/death.png",
		imageHeight:100,
		imageWidth:100,
		imageAlt:"Death",
		html:html,
		confirmButtonText:"RIP"
	});
	if (has_job == true){
		$("#job").hide();
	}
	else if (is_jailed == true){
		$("#jail").hide();
	}
	else{
		$("#actions").hide();
	};
	$("#update").hide();
	$("#profile").hide();
	$("#assets").hide();
	$("#activities").hide();
	message(`<h2>You died</h2>`);

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


function main(){
	$("#update").click(update);
		
};
$(document).ready(main());








