
var user = {
	"name":random_name(),"country":random_country(),
	"age":216,"job":"Unemployed","salary":0,"xp":0,
	"promos":0,"assets":[]
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
	if (health <= 0){
		health = 1;
	};
	if (morale < 5){
		morale = 1;
	};
	if (looks < 5){
		looks = 1;
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

		var rand = randint(1,4);
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
				Swal.fire({
					icon:"warning",
					title:"Student Loan Deadline is here!",
					text:`You had to pay ${total_student_loan}$`
				});
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
			$("#assets").show();

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
		<span>REQUIREMENT : 70%+ INTELLECT</span><br>
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
	if (type=="eng" && intellect >= 70){
		student_fees = 40000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Engineering College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Engineering College`);
		student_has_loan = true;
		student();

	}
	else if (type=="grad" && intellect >= 60){
		student_fees = 20000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Graduate College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Graduate College`);
		student_has_loan = true;
		student();

	}
	else if (type=="com" && intellect >= 65){
		student_fees = 33000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Commerce College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Commerce College`);
		student_has_loan = true;
		student();

	}
	else if (type=="arts" && intellect >= 60){
		student_fees = 28000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Arts College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Arts College`);
		student_has_loan = true;
		student();

	}
	else if (type=="law" && intellect >= 70){
		student_fees = 35000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Law College Student";
		message(`You got a student loan worth ${student_fees}$`);
		student_has_loan = true;
		student();

	}
	else if (type=="med" && intellect >= 70){
		student_fees = 45000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Medical College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Medical College`);
		student_has_loan = true;
		student();

	}
	else if (type=="community" && intellect >= 50){
		student_fees = 10000;
		Swal.fire({
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		user.job = "Community College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Community College`);
		student_has_loan = true;
		student();

	}
	else{
		Swal.fire({
			icon:"error",
			title:"Your student loan was rejected",
			html:`<br><hr><br><b>Reason :</b> Your intelligence level
			is not on par with the college requirements`,
			footer:`NOTE : Don't worry, you can increase your intellect!`,
			confirmButtonText:"Rats!"
		})

	}

	
	

};










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
			`<br><br><br>`+
			`<button onclick="leave_study()" class='btn btn-danger'>Leave College</button>`,
		showConfirmButton:false

	});

};


function leave_study(){

	$("#student").attr("onclick","actions()");
	$("#student").attr("class","btn-lg btn-danger");
	$("#student").attr("id","actions");
	if (student_has_loan == true){
		total_student_loan = Math.floor(student_fees/48*student_months);
		message(`Despite leaving school , you're liable to pay ${total_student_loan}$ in student loans`);
	}

	Swal.fire({
		icon:"warning",
		title:"You left your college!"
	});

	is_student = false;
	user.job = "Unemployed";
	student_months = 0;
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
	var xp = 0;
	var need_xp = false;
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
		xp = 60;
		need_xp = true;
	}
	else if (job_name == "Police Officer"){
		req = ["GRAD","COMMUNITY","ART"];
		xp = 60;
		need_xp = true;
	}
	else if (job_name == "Soldier"){
		req = ["GRAD","COMMUNITY","ENG"];
	}
	else if (job_name == "Army Officer"){
		req = ["GRAD","COMMUNITY","ENG"];
		xp = 60;
		need_xp = true;
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
		xp = 60;
		need_xp = true;
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
		xp = 120;
		need_xp = true;
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
				if (need_xp != true){
					job_qualified = true;
				}
				else{
					if (user.xp >= xp){
						job_qualified = true;
					}
				}
			}
		}
	}
	let html = 
	`<hr><br>Job name - ${job_name}<br>
	Salary - <b>${salary}$/month</b><br>`;

	if (need_xp == true){
		html = html+`Experience Needed - <b>${xp/12} years</b><br><br><hr>`;
	}
	else {
		html = html + "<br><br><hr>";
	}

	Swal.fire({
		position:"top",
		icon:"info",
		title:"Job Information",
		html:html
		
		
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
				if (poison == 1){
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


function medicine(){
	// cost partially dependent on person's salary
	if (has_job == true && user.salary <= 4000 ){
		var cost = Math.floor(user.salary*30/100);
		let real_cost = randint(2000,6000);
		var html = `<br>You are getting cheap medicine due to government
		<br>benefits for not so well-off people<br><br>
		Real Cost of Medicine - <b>${real_cost}$</b><br>
		Cost of Medicine for you - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b>
		<br><br>`;
	}
	else if (has_job == false){
		var cost = randint(250,1000);
		let real_cost = randint(2000,6000);
		var html = `<br>You are getting cheap medicine due to government
		<br>benefits for unemployed citizens<br><br>
		Real Cost of Medicine - <b>${real_cost}$</b><br>
		Cost of Medicine for you - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b>
		<br><br>`;

	}
	else {
		var cost = randint(2000,6000);
		var html = 
		`
		Cost of the Medicine - <b>${cost}$</b><br>
		Quality of the Medicine - <b>${randint(45,100)}%</b><br>
		<br>
		`;
	}
	
	Swal.fire({
		icon:"info",
		title:"Western Medicine",
		html:html,
		showCancelButton:true,
		confirmButtonText:`Pay ${cost}$`,
		cancelButtonText:"Nevermind",
		footer:"NOTE : Taking medicine improves your health"
	}).then((result) => {

		if (result.value){
			if (has_money(cost) == true){
				increase("health",3,8);
				message(`You bought western medicine for ${cost}$`);
				let html = `
				<br>You paid <b>${cost}$</b> to buy the western medicine<br>
				`;
				Swal.fire({
					icon:"success",
					title:"Medicine Taken!",
					html:html,
					confirmButtonText:"Anything For Health!"
				});

			}
		}
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
	<button onclick="medicine()" class="btn btn-success">Get Western Medicine</button>
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
	if (chance == 0){
		let stole = randint(10,1000);
		money = money + stole;
		message(`You commited a crime and stole ${stole}$`);
		Swal.fire({
			icon:"success",
			title:`You stole ${stole}$`,
			html:`<br><hr><br>You successfully commited a crime!`,
			footer:"NOTE : Please do not commit any crime in  real life",
			confirmButtonText:"Money!"
		});
	}
	else if (chance == 1){
		let fine = randint(10,500);
		money = money - fine;
		message(`You were caught commiting a minor crime and fined\ 
		${fine}$`);
		Swal.fire({
			icon:"error",
			title:`You were caught and fined ${fine}$`,
			html:`<br><hr><br>You failed in commiting
			a crime and were fined`,
			confirmButtonText:"Shit!"
		});	
	}
	else if (chance == 2){
		message(`You were caught commiting a heinous crime and were\
		<u>jailed</u>`);
		Swal.fire({
			icon:"warning",
			title:"Caught and charged!",
			html:`<br><hr><br>You were caught commiting a heinous crime.<br>
			You have been sentenced to <b>36</b> months in jail.`,
			confirmButtonText:"Okay.."
		}).then((result) => {
			jail(36);
		});
		
	}
	else if (chance == 3 || chance == 4){
		message(`You did not commit any crime out of fear`);
		Swal.fire({
			title:"No crime commited!",
			html:"You didn't commit any crime out of fear.",
			icon:"info",
			confirmButtonText:"Oh"
		});
	}
	else {
		message(`You failed to commit a crime`);
		Swal.fire({
			title:`You failed to commit a crime`,
			text:"You didn't play your crime well and messed up",
			icon:"info",
			confirmButtonText:"Silly me"
		});

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
	$("#assets").hide()
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
		$("#jail").attr("class","btn-lg btn-danger");
		$("#jail").attr("id","actions");
		$("#activities").show();
		$("#assets").show();


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


function shuffle(array) {
   	for (let i = array.length - 1; i > 0; i--) {
      	const j = Math.floor(Math.random() * (i + 1));
      	[array[i], array[j]] = [array[j], array[i]];
   	}
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
			icon:"error",
			title:"You lost the gamble!",
			html:html,
			confirmButtonText:"Harsh Luck"
		});

	};

};



function gamble_start(amount){
	if (has_money(amount) == true){
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
			if (isnum == true){
				gamble_start(cost);
			}
			else if (!cost){
				return 'You need to bet some money!'
			}
			else if (isnum != true){
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
<button onclick="gamble()" class="btn btn-danger">Do Gambling</button>
<br><br>
<button id="crime-btn" onclick="crime()" class="btn btn-danger">Commit Crime</button>
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
		imageUrl:"images/profile.png",
		imageHeight:125,
		imageWidth:125,
		imageAlt:"Profile",
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
	var btn2 = `<br><button class="btn btn-danger" onclick="sell_assets()">Sell Assets</button><br>`;

	let html = btn1+btn2;
	html = html+`<br><hr><br><h3><u>Your Assets</u></h3>`;
	for (x in user.assets){
		html = html+`<br>${user.assets[x][0]}`;
	}
	Swal.fire({
		position:"top",
		title:"Assets",
		showConfirmButton:false,
		html:html,
		footer:`NOTE : Assets are currently in BETA`
	});
};






function purchase_assets(){
	var btn1 = `<br><button class="btn btn-success" onclick="purchase('house')">Purchase House</button><br>`;
	var btn2 = `<br><button class="btn btn-success" onclick="purchase('vehicle')">Purchase Vehicle</button><br>`;
	
	let html =`<br><hr>${btn1}${btn2}`;
	Swal.fire({
		position:"top",
		icon:"info",
		title:"Purchase Assets",
		showConfirmButton:false,
		html:html
	});

};





function sell_assets(){
	Swal.fire({
		icon:"info",
		title:"Coming Soon!",
		text:"Currently , Assets are currently in BETA"
	})

};





function purchase_house(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	var discount = false;
	r = l[randint(0,12)];
	let change = 200*r;
	if (chance == 0){
		var price = cost - change;
		var discount = true;
	}
	else {
		var price = cost + change;
	};


	if (discount == true){
		var html = `
		Price - <del>${cost}$</del> <b>${price}$</b><br>
		Discount - <b>${cost-price}$</b><br>
		Condition - <b>${randint(40,100)}%</b>`;
	}
	else {
		var html = `Price - <b>${price}$</b><br>
		Condition - <b>${randint(40,100)}%</b>`;
	}
	Swal.fire({
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay ${price}$`,
		cancelButtonText:"I'll pass"
	}).then((result) => {
		if (result.value){
			if (has_money(price) == true){
				money = money - price;
				Swal.fire({
					icon:"success",
					title:"You bought a house!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>${price}$</b>`,
					confirmButtonText:"Amazing!"
				});
				user.assets.push([name,price]);
				message(`You bought a ${name} for ${price}$`)
				increase("morale",5,10);
				display();
			};

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			purchase("house");
		};

	});
};



function purchase_vehicle(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	var discount = false;
	r = l[randint(0,12)];
	let change = 100*r;
	if (chance == 0){
		var price = cost - change;
		var discount = true;
	}
	else {
		var price = cost + change;
	};


	if (discount == true){
		var html = `
		Price - <del>${cost}$</del> <b>${price}$</b><br>
		Discount - <b>${cost-price}$</b><br>
		Condition - <b>${randint(40,100)}%</b>`;
	}
	else {
		var html = `Price - <b>${price}$</b><br>
		Condition - <b>${randint(40,100)}%</b>`;
	}
	Swal.fire({
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay ${price}$`,
		cancelButtonText:"Not Interested"
	}).then((result) => {
		if (result.value){
			if (has_money(price) == true){
				money = money - price;
				Swal.fire({
					icon:"success",
					title:"You bought a vehicle!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>${price}$</b>`,
					confirmButtonText:"Amazing!"
				});
				user.assets.push([name,price]);
				message(`You bought a ${name} for ${price}$`)
				increase("morale",3,7);
				display();
			};

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			purchase("vehicle");
		};

	});
};





function purchase(item){

	if (item == "house"){

		let list = [
		{"2 BHK Apartment":80000},{"3 BHK Apartment":100000},
		{"4 BHK Apartment":140000},{"1 Room Apartment":50000},
		{"2 BHK Cottage":70000},{"3 BHK Cottage":90000},
		{"4 BHK Cottage":120000},{"1 Room Cottage":40000},
		{"2 BHK Modern House":120000},{"3 BHK Modern House":150000},
		{"4 BHK Modern House":200000},{"1 Room Modern House":90000}
		];
		let all = [];
		for (x=0;x<4;x++){
			let rand = randint(0,list.length-1);
			if (list[rand] in all){
				x = x -1;	
			}
			else {
				all.push(list[rand]);
			};
		};
		let btns = [];
		for (x in all){
			let house = Object.keys(all[x])[0];
			let cost = Object.values(all[x])[0];
			let btn = `<br><button onclick="purchase_house('${house}',${cost})"
			class="btn btn-primary">${house}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('house')" 
		class="btn-lg btn-secondary">View More Houses</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			title:"Available Houses",
			icon:"info",
			position:"top",
			html:html,
			showConfirmButton:false
		});

	};



	if (item == "vehicle"){

		let list = [
		{"Toyota Car (Used)":10000},{"Toyota Car":30000},
		{"Chevrolet Car (Used)":8000},{"Chevrolet Car":25000},
		{"Volkswagen Car (Used)":12000},{"Volkswagen Car":35000},
		{"BMW Car (Used)":22000},{"BMW Car":50000},
		{"Audi Car (Used)":21000},{"Audi Car":45000},
		{"Lambhorgini":120000},{"Harley Davidson Bike":30000}
		];
		let all = [];
		for (x=0;x<4;x++){
			let rand = randint(0,list.length-1);
			if (list[rand] in all){
				x = x -1;	
			}
			else {
				all.push(list[rand]);
			};
		};
		let btns = [];
		for (x in all){
			let vehicle = Object.keys(all[x])[0];
			let cost = Object.values(all[x])[0];
			let btn = `<br><button onclick="purchase_vehicle('${vehicle}',${cost})"
			class="btn btn-primary">${vehicle}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('vehicle')" 
		class="btn-lg btn-secondary">View More Vehicles</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			title:"Available Vehicles",
			icon:"info",
			position:"top",
			html:html,
			showConfirmButton:false
		});

	};

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
	if (is_jailed != true){
		random_event();
	};
	age_events();

};


function confirm(title,text=null){
	if (text == null){
		text = "";
	}
	Swal.fire({
		icon:"warning",
		title:title,
		text:text,
		showCancelButton:true,
		confirmButtonText:"Yes",
		cancelButtonText:"No"
	})
};






var intro_disabled = false;
function intro(){
	if (intro_disabled == false){
		var html = 
		`
		<br><hr><br>
		You start off as a random person with random features in
		a random country. You can live your life in any way you want.
		All this with simple button clicks.
		Lifely helps you visualize different situations in life.<br>		
		<br><hr><br>
		`;

		Swal.fire({
			icon:"info",
			position:"top",
			allowOutsideClick:false,
			title:"Welcome To Lifely",
			text:"Lifely is a life based online simulator",
			html:html,
			footer:`Lifely has been created by wraithM17`,
			confirmButtonText:"Start Lifely"
		}).then((result) => {
			if (result.value){
				Swal.fire({
					title:"<h1>Starting Lifely...</h1>",
					showConfirmButton:false,
					allowOutsideClick:false,
					timer:5000,
					timerProgressBar:true,
					toast:true
				});

			}

		});

	};

};



function main(){
	intro();
	$("#update").click(update);
		
};
$(document).ready(main());








