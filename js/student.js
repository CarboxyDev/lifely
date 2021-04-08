// I'm extremely sorry for the awful code
// - Developer , 20 Nov 2020

function study(){
	var html = `
	<br>
	<br><button id="study-eng" class="btn btn-success" onclick="study_course('eng')">Engineering College</button><br>

	<br><button id="study-lib" class="btn btn-success" onclick="study_course('lib')">Liberal Arts College</button><br>
	<br><button id="study-com" class="btn btn-success" onclick="study_course('com')">Commerce College</button><br>

	<br><button id="study-law" class="btn btn-success" onclick="study_course('law')">Law College</button><br>
	<br><button id="study-art" class="btn btn-success" onclick="study_course('art')">Arts College</button><br>
	<br><button id="study-med" class="btn btn-success" onclick="study_course('med')">Medical College</button><br>	
	<br><button id="study-community" class="btn btn-success" onclick="study_course('community')">Community College</button><br>


	`;
	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Colleges",
		showConfirmButton:false,
		html:html,
		showCloseButton:true

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
	if (course == "lib"){
		var title = "Liberal Arts College";
		var html = 
		`
		<span>REQUIREMENT : 55%+ INTELLECT</span><br>
		<span>FEES : 25000$</span><br><br>
		<span>Study for better job opportunities in related job fields</span>
		<br><br>
		<button id="scholarship-lib" onclick="scholarship('lib')" class="btn btn-outline-primary">Apply for Scholarship</button><br><br>
		<button id="student-loan-lib" onclick="student_loan('lib')" class="btn btn-outline-primary">Take a student loan</button><br><br>


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
		heightAuto:false,
		position:top,
		title:title,
		showConfirmButton:false,
		icon:"info",
		html:html
	})


};













function student_loan(type){
	if (type=="eng" && intellect >= 70){
		student_fees = 40000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Engineering College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Engineering College`);
		student_has_loan = true;
		student();

	}
	else if (type=="lib" && intellect >= 55){
		student_fees = 25000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Liberal Arts Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Liberal Arts College`);
		student_has_loan = true;
		student();

	}
	else if (type=="com" && intellect >= 65){
		student_fees = 33000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Commerce College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Commerce College`);
		student_has_loan = true;
		student();

	}
	else if (type=="arts" && intellect >= 60){
		student_fees = 28000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Arts College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in an Arts College`);
		student_has_loan = true;
		student();

	}
	else if (type=="law" && intellect >= 70){
		student_fees = 35000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Law College Student";
		message(`You got a student loan worth ${student_fees}$`);
		student_has_loan = true;
		student();

	}
	else if (type=="med" && intellect >= 70){
		student_fees = 45000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Medical College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Medical College`);
		student_has_loan = true;
		student();

	}
	else if (type=="community" && intellect >= 50){
		student_fees = 10000;
		Swal.fire({
			heightAuto:false,
			title:"You were alloted a student loan!",
			text:`You are liable to pay ${student_fees}$ in future loans`,
			icon:"success"
		});
		USER.job = "Community College Student";
		message(`You got a student loan worth ${student_fees}$`);
		message(`You are now enrolled in a Community College`);
		student_has_loan = true;
		student();

	}
	else {
		Swal.fire({
			heightAuto:false,
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
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
			USER.job = "Engineering College Student";
			message("You were awarded a scholarship	at an Engineering College");
			message(`You are now enrolled in an Engineering College`);
			student();
		}
		else{
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in an Engineering College");
			};
	};
	if (type=="lib"){
		if (intellect >= 75){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
		USER.job = "Liberal Arts Student";
		message("You were awarded a scholarship	at a Liberal Arts College");
		message(`You are now enrolled in a Liberal Arts College`);
		student();
		}
		else{
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
		message("You were denied a scholarship in a Liberal Arts College");
		};
	};
	if (type=="com"){
		if (intellect >= 80){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
			USER.job = "Commerce College Student";
			message("You were awarded a scholarship	at a Commerce College");
			message(`You are now enrolled in a Commerce College`);
			student();
		}
		else {
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in a Commerce College");
		};
	};
	if (type=="arts"){
		if (intellect >= 75){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
				
			});
			USER.job = "Arts College Student";
			message("You were awarded a scholarship	at an Arts College");
			message(`You are now enrolled in an Arts College`);
			student();
		}
		else{
			Swal.fire({
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in an Arts College");
		};
	};
	if (type=="law"){
		if (intellect >= 80){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
			USER.job = "Law College Student";
			message("You were awarded a scholarship	at a Law College");
			message(`You are now enrolled in a Law College`);
			student();
		}
		else {
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in a Law College");
		};
	};
	if (type=="med"){
		if (intellect >= 80){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
			USER.job = "Medical College Student";
			message("You were awarded a scholarship	at a Medical College");
			message(`You are now enrolled in an Medical College`);
			student();
		}
		else {
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in a Medical College");
		};
	}
	if (type=="community"){
		if (intellect >= 70){
			Swal.fire({
				heightAuto:false,
				title:"You got the scholarship!",
				icon:"success"
			});
			USER.job = "Community College Student";
			message("You were awarded a scholarship	at a Community College");
			message(`You are now enrolled in a Community College`);
			student();
		}
		else {
			Swal.fire({
				heightAuto:false,
				title:"You were denied a scholarship.",
				icon:'error'
			});
			message("You were denied a scholarship in a Community College");
		};
	};

};




function student(){
	isStudent = true;
	$("#actions").attr("class","btn-lg btn-success")
	$("#actions").attr("id","student");
	$("#student").attr("onclick","student_menu()");
	
};


function student_menu(){
	let html = `
		Months Completed - <b>${student_months}</b>/48<br>
		Current Student Debt - ${total_student_loan}$<br>
		<br><br><br>
		<button onclick="leave_study()" class='btn btn-danger'>Leave College</button><br><br>
		<button id="bank" class="btn-lg btn-info" onclick="bank()">Bank</button><br><br>
		`

	Swal.fire({
		heightAuto:false,
		title:"Student Actions",
		position:"top",
		html:html,
		showConfirmButton:false

	});

};


function leave_study(){


	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Do you really want to leave college?",
		confirmButtonText:"Yes",
		showCancelButton:true,
		cancelButtonText:"No",
		footer:"Note : You will still need to repay student loans"
	}).then((result) => {
		if (result.value){
			let html = `
			Months Studied - <b>${student_months}</b> Months<br>
			`;
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"You left your college!",
				html:html
			});	
			isStudent = false;
			USER.job = "Unemployed";
			student_months = 0;
			$("#student").attr("onclick","actions()");
			$("#student").attr("class","btn-lg btn-danger");
			$("#student").attr("id","actions");
			if (student_has_loan){
				total_student_loan = Math.floor(student_fees/48*student_months);
				message(`Despite leaving school , you're liable to pay ${total_student_loan}$ in student loans`);
			}

		}

	});

	
};




var degree = [];
function student_pass(){
	deg = USER.job;

	if (deg.includes("Engineer")){
		var course = "ENG";
	}
	else if (deg.includes("Liberal")){
		var course = "LIB";
	}
	else if (deg.includes("Commerce")){
		var course = "COM";
	}
	else if (deg.includes("Arts")){
		var course = "ART";
	}
	else if (deg.includes("Law")){
		var course = "LAW";
	}
	else if (deg.includes("Medical")){
		var course = "MED";
	}
	else if (deg.includes("Community")){
		var course = "COMMUNITY";
	}
	else {
		document.write("Error in student_pass()");
	}
	

	message(`You passed out as a ${deg}`);
	USER.job = "Unemployed";
	isStudent = false;
	student_months = 0;
	degree.push(course);
	$("#student").attr("onclick","actions()");
	$("#student").attr("class","btn-lg btn-danger");
	$("#student").attr("id","actions");
};




function student_test_result(result){

	if (result == "pass"){
		message(`You passed the college test`);
		Swal.fire({
			heightAuto:false,
			title:"You passed the test!",
			icon:"success",
			confirmButtonText:"Sweet!"
		});
		intellect += randint(1,3);

	}
	else {
		message(`You failed the college test`);
		Swal.fire({
			heightAuto:false,
			title:"You failed the test!",
			icon:"error",
			confirmButtonText:"Rats!"
		});
		intellect -= randint(2,4);
	}
	display()
};








function student_test(start=false){
	if (start==true){
		let rand = randint(0,1);

		var p1 = randint(1,12);
		var p2 = randint(1,12);
		var p3 = randint(1,20);

		if (rand == 0){
			var ans = p1*p2+p3;
			var sign = "+";
		}
		else {
			var ans = p1*p2-p3;
			var sign = "-";
		}
		let question = `${p1} <b>x</b> ${p2} <b>${sign}</b> ${p3}`;
		let html = `
		<br>
		Answer the following question - <br><br>
		<h3>${question}</h3>
		<br><br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"Test In Process",
			html:html,
			confirmButtonText:"Submit",
			allowOutsideClick:false,
			input:"text",
			timer:10000,
			timerProgressBar:true,

			inputValidator: (answer) => {
				if (answer == ans){
					student_test_result("pass");
				}
				else {
					student_test_result("fail");
				}
			}
		}).then((result) => {
			if (result.dismiss == Swal.DismissReason.timer){
				student_test_result("fail");
			};
		});
	}
	else{
		let html=`
		<br><br>
		You will have <b>10</b> seconds to answer the question.<br>
		You will need to answer the question correctly to pass the test.
		<br><br>
		`
		Swal.fire({
			heightAuto:false,
			icon:"info",
			title:"College Test",
			html:html,
			confirmButtonText:"Take the Test",
			showCancelButton:true,
			cancelButtonText:"Don't care",
			allowOutsideClick:false

		}).then((result)=> {
			if (result.value){
				message(`You took the college test`);
				student_test(true);
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				message(`You ignored a college test and failed in it`);
				intellect -= randint(1,2);
				student_test_result("fail");

			}
		});
	};
};



function student_loan_notice(){
	let int = randint(8,14);
	var yearly_interest = Math.floor(student_fees*int/100);
	var yearly_student_fees = Math.floor(student_fees/4)+yearly_interest;
	total_student_loan = total_student_loan + yearly_student_fees;
	let html = `<br>
	Amount added this year - <b>${yearly_student_fees}$</b><br>
	Total Interest Added - <b>${yearly_interest}$</b><br>
	Interest Rate / Annum - <b>${int}%</b><br>
	Total Student Debt - <b>${total_student_loan}$</b><br>
	`;
	Swal.fire({
		heightAuto:false,
		title:"Student Loan Notice",
		html:html,
		confirmButtonText:"Noted",
		icon:"info"
	}).then((result) => {
		if (student_months == 0){
			let html = `<br>
			As you've completed your time in college , <br>
			you're no longer entitled to more college loans<br><br>
			Total Student Debt - <b>${total_student_loan}$</b>
			`
			;
			Swal.fire({
				heightAuto:false,
				title:"No More Student Loans!",
				html:html,
				icon:"info",
				confirmButtonText:"Nice"
			}).then((result) => {
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You completed your College!",
					confirmButtonText:"Great!"
				});
			});
		}

	});
	message(`Your student loan increased by ${yearly_student_fees}$ as yearly student loans at 10% interest rate`);


};








function student_events(){
	//placeholder

}