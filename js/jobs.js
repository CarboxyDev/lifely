// maybe add promotion frequency later on
// totally didn't forget to add it rn.
allJobs = {

	//Engineers

	"Civil Engineer":{
		minSalary:3500,
		maxSalary:4500,
		minIncrement:200,
		maxIncrement:600,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},

	"Chemical Engineer":{
		minSalary:2500,
		maxSalary:4000,
		minIncrement:200,
		maxIncrement:550,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Mechanical Engineer":{
		minSalary:3200,
		maxSalary:4000,
		minIncrement:250,
		maxIncrement:575,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Chemical Engineer":{
		minSalary:2500,
		maxSalary:4000,
		minIncrement:200,
		maxIncrement:550,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Aerospace Engineer":{
		minSalary:4500,
		maxSalary:5500,
		minIncrement:400,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Environmental Engineer":{
		minSalary:2000,
		maxSalary:3500,
		minIncrement:150,
		maxIncrement:400,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Electrical Engineer":{
		minSalary:4000,
		maxSalary:5200,
		minIncrement:400,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Computer Engineer":{
		minSalary:6000,
		maxSalary:8000,
		minIncrement:450,
		maxIncrement:800,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},


	"Nuclear Engineer":{
		minSalary:5500,
		maxSalary:8000,
		minIncrement:400,
		maxIncrement:80,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},

	"Aerospace Engineer":{
		minSalary:4500,
		maxSalary:5500,
		minIncrement:400,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},

	//Management or Finance

	"Public Banker":{
		minSalary:4500,
		maxSalary:5500,
		minIncrement:450,
		maxIncrement:800,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},

	"Private Banker":{
		minSalary:5000,
		maxSalary:7500,
		minIncrement:500,
		maxIncrement:900,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},


	"Finance Consultant":{
		minSalary:4000,
		maxSalary:5500,
		minIncrement:200,
		maxIncrement:700,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},



	"MNC Manager":{
		minSalary:4500,
		maxSalary:7000,
		minIncrement:300,
		maxIncrement:600,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},


	"Supermarket Manager":{
		minSalary:3500,
		maxSalary:6000,
		minIncrement:200,
		maxIncrement:400,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},



	"Commercial Broker":{
		minSalary:4000,
		maxSalary:6500,
		minIncrement:100,
		maxIncrement:1200,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},


	"Hedge Fund Manager":{
		minSalary:5000,
		maxSalary:7500,
		minIncrement:200,
		maxIncrement:1200,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},




	"Insurance Salesman":{
		minSalary:2000,
		maxSalary:4000,
		minIncrement:100,
		maxIncrement:800,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},




	"Stock Broker":{
		minSalary:3250,
		maxSalary:6500,
		minIncrement:200,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},




	"Product Salesman":{
		minSalary:1500,
		maxSalary:3500,
		minIncrement:100,
		maxIncrement:500,
		successRate:null,
		cgpaNeeded:null,
		requires:['COM'],
	},


	"Accountant":{
		minSalary:2000,
		maxSalary:4000,
		minIncrement:200,
		maxIncrement:600,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY'],
	},


	"Chartered Accountant":{
		minSalary:5000,
		maxSalary:9000,
		minIncrement:250,
		maxIncrement:900,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY'],
	},

	// Science maybe?




	"Biomedical Scientist":{
		minSalary:4500,
		maxSalary:7000,
		minIncrement:250,
		maxIncrement:600,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Biochemical Scientist":{
		minSalary:4000,
		maxSalary:6000,
		minIncrement:200,
		maxIncrement:500,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},



	"Nuclear Scientist":{
		minSalary:6000,
		maxSalary:8500,
		minIncrement:400,
		maxIncrement:850,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},




	"Petrochemical Scientist":{
		minSalary:3000,
		maxSalary:5500,
		minIncrement:300,
		maxIncrement:700,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},



	"Computer Scientist":{
		minSalary:6000,
		maxSalary:10000,
		minIncrement:400,
		maxIncrement:950,
		successRate:null,
		cgpaNeeded:null,
		requires:['ENG'],
	},




	"Medical Scientist":{
		minSalary:4500,
		maxSalary:7250,
		minIncrement:350,
		maxIncrement:575,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},




	"Cardiologist":{
		minSalary:6000,
		maxSalary:9000,
		minIncrement:400,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},



	"Dentist":{
		minSalary:6500,
		maxSalary:9500,
		minIncrement:400,
		maxIncrement:750,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Paediatrician":{
		minSalary:5500,
		maxSalary:9000,
		minIncrement:300,
		maxIncrement:700,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Radiologist":{
		minSalary:7000,
		maxSalary:10000,
		minIncrement:500,
		maxIncrement:850,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Neurologist":{
		minSalary:7500,
		maxSalary:11000,
		minIncrement:500,
		maxIncrement:900,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},



	"Veterenarian":{
		minSalary:5000,
		maxSalary:7000,
		minIncrement:300,
		maxIncrement:550,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Nurse":{
		minSalary:3000,
		maxSalary:5000,
		minIncrement:250,
		maxIncrement:450,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},



	"Biologist":{
		minSalary:4000,
		maxSalary:6000,
		minIncrement:300,
		maxIncrement:575,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	"Psychiatrist":{
		minSalary:5000,
		maxSalary:9500,
		minIncrement:350,
		maxIncrement:850,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},



	"Surgeon":{
		minSalary:8000,
		maxSalary:12000,
		minIncrement:500,
		maxIncrement:1000,
		successRate:null,
		cgpaNeeded:null,
		requires:['MED'],
	},


	// Lesser jobs or arts related



	"Teacher":{
		minSalary:3000,
		maxSalary:4000,
		minIncrement:200,
		maxIncrement:375,
		successRate:null,
		cgpaNeeded:null,
		requires:['ART','LIB'],
	},


	"Chef":{
		minSalary:2500,
		maxSalary:5000,
		minIncrement:150,
		maxIncrement:425,
		successRate:null,
		cgpaNeeded:null,
		requires:['ART'],
	},


	"Firefighter":{
		minSalary:3000,
		maxSalary:4250,
		minIncrement:200,
		maxIncrement:400,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY','ART'],
	},



	"Security Guard":{
		minSalary:1500,
		maxSalary:2500,
		minIncrement:100,
		maxIncrement:200,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY'],
	
	},



	"Army Personnel":{
		minSalary:2500,
		maxSalary:2750,
		minIncrement:150,
		maxIncrement:425,
		successRate:null,
		cgpaNeeded:null,
		requires:['ART','COMMUNITY'],
	},



	"Graphic Designer":{
		minSalary:2500,
		maxSalary:3500,
		minIncrement:150,
		maxIncrement:325,
		successRate:null,
		cgpaNeeded:null,
		requires:['ART'],
	},



	"Mall Cop":{
		minSalary:1500,
		maxSalary:2500,
		minIncrement:100,
		maxIncrement:250,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY'],
	},



	"Political Analyst":{
		minSalary:2500,
		maxSalary:4000,
		minIncrement:100,
		maxIncrement:250,
		successRate:null,
		cgpaNeeded:null,
		requires:['LIB'],
	},
	

	"Office Secretary":{
		minSalary:2500,
		maxSalary:3500,
		minIncrement:150,
		maxIncrement:300,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY','ART','COM'],
	},


	"Govt Clerk":{
		minSalary:1500,
		maxSalary:3500,
		minIncrement:100,
		maxIncrement:300,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY','COM','ART','ENG'],
	},


	"Botanist":{
		minSalary:1000,
		maxSalary:2500,
		minIncrement:100,
		maxIncrement:200,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY','ART','LIB'],
	},



	// Law related


	"Legal Assistant":{
		minSalary:2000,
		maxSalary:2750,
		minIncrement:125,
		maxIncrement:250,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},


	"Law Attorney":{
		minSalary:4000,
		maxSalary:6000,
		minIncrement:125,
		maxIncrement:400,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},


	"Criminal Lawyer":{
		minSalary:3500,
		maxSalary:5500,
		minIncrement:125,
		maxIncrement:400,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},



	"Tax Lawyer":{
		minSalary:7000,
		maxSalary:10000,
		minIncrement:250,
		maxIncrement:800,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},



	"Public Lawyer":{
		minSalary:2750,
		maxSalary:4500,
		minIncrement:150,
		maxIncrement:450,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},




	"Corporate Lawyer":{
		minSalary:7000,
		maxSalary:12000,
		minIncrement:150,
		maxIncrement:1000,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},




	"Law Mediator":{
		minSalary:4000,
		maxSalary:6000,
		minIncrement:200,
		maxIncrement:600,
		successRate:null,
		cgpaNeeded:null,
		requires:['LAW'],
	},




	// No degree required



	"Fast Food Worker":{
		minSalary:1250,
		maxSalary:2000,
		minIncrement:50,
		maxIncrement:75,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Sweeper":{
		minSalary:1000,
		maxSalary:2000,
		minIncrement:50,
		maxIncrement:75,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Laborer":{
		minSalary:1000,
		maxSalary:1500,
		minIncrement:50,
		maxIncrement:75,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},



	"Delivery Driver":{
		minSalary:1500,
		maxSalary:2500,
		minIncrement:50,
		maxIncrement:100,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Restaurant Waiter":{
		minSalary:1250,
		maxSalary:2250,
		minIncrement:60,
		maxIncrement:100,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Garbage Collector":{
		minSalary:900,
		maxSalary:1750,
		minIncrement:25,
		maxIncrement:75,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Plumber":{
		minSalary:1250,
		maxSalary:2250,
		minIncrement:50,
		maxIncrement:100,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Clown":{
		minSalary:900,
		maxSalary:1750,
		minIncrement:25,
		maxIncrement:75,
		successRate:null,
		cgpaNeeded:null,
		requires:[],
	},


	"Technician":{
		minSalary:1250,
		maxSalary:2100,
		minIncrement:50,
		maxIncrement:100,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY'],
	},

	"Call Center Employee":{
		minSalary:1250,
		maxSalary:2250,
		minIncrement:50,
		maxIncrement:100,
		successRate:null,
		cgpaNeeded:null,
		requires:['COMMUNITY','ENG','COM','ART'],
	}

}









function jobs(){
	
	var html = "<br>";
	let amountOfJobs = 6;
	let listedJobs = [];
	let jobsList = Object.keys(allJobs)
	for (x=0;x<amountOfJobs;x++){
		let randJobName = jobsList[randint(0,jobsList.length-1)];

		// to show only DISTINCT jobs
		if (!listedJobs.includes(randJobName)){
			listedJobs.push(randJobName);
			randJob = allJobs[randJobName]
 			let btnClasses = `w3-round w3-ripple w3-btn w3-indigo w3-hover-red`;	
			let elem = `<button class="${btnClasses}" onclick="findJob('${randJobName}')">${randJobName}</button><br><br>`;
			html += elem;
		}
		else {
			x--;
		}

	}

	let btnClasses = 'btn-lg btn-secondary'
	let moreJobsElem = `<br><button onclick=jobs() class="${btnClasses}">View More</button><br>`
	html += moreJobsElem;
	


	Swal.fire({
		heightAuto:false,
		title:'Jobs',
		background:swalBackground,
		showConfirmButton:false,
		showCancelButton:false,
		position:'top',
		showCloseButton:true,
		html:html
	});



};







function findJob(jobName){
	let jobDetails = allJobs[jobName];
	// round off salary to last digit 0
	let randSalary = approx(randint(jobDetails.minSalary,jobDetails.maxSalary));
	let jobRequirements = jobDetails.requires;
	if (jobRequirements.length != 0){
		var jobRequiresDegree = true;
		var jobReq = `
		You can pursue this job if you have a degree in one of these streams -<br>
		<br>
		`;
		for (x=0;x<jobRequirements.length;x++){
			let degreeName = degreeNames(`${jobRequirements[x]}<br>`);
			jobReq += degreeName;
 		}
		



	}
	else if (jobRequirements.length == 0){
		var jobRequiresDegree = false;
		var jobReq = `
		This job doesn't require any college degree.
		`;
	};


	var html = `
	<br><div id='findJob'>
	<span id="jobTitle">Job Title : ${jobName}</span><br><br>
	<p id="jobDetails">
	Monthly Salary : $${randSalary}<br>
	Yearly Salary : $${randSalary*12}<br><br>
	${jobReq}
	</p>
	</div><br>
	
	`;



	Swal.fire({
		heightAuto:false,
		title:'Viewing Job',
		background:swalBackground,
		showConfirmButton:true,
		showCancelButton:true,
		cancelButtonText:'Not for me!',
		confirmButtonText:'Apply',
		position:'top',
		showCloseButton:true,
		html:html
	}).then((result) => {
		if (result.value){
			checkJob(jobName,randSalary);
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			jobs();
		}
	});

}





function checkJob(jobName,jobSalary){

	let jobDetails = allJobs[jobName];
	let jobRequirements = jobDetails.requires;
	let hasRequiredDegree = false;
	let userDegreeList = Object.keys(USER.education.degrees);

	for (degree in userDegreeList){
		console.log(degree);
		if (jobRequirements.includes(userDegreeList[degree])){
			hasRequiredDegree = true;
			USER.job.name = jobName;
			USER.job.salary = jobSalary;
			USER.job.promotions = 0;
			jobSuccess();
		}
	};
	if (jobRequirements.length == 0){
		hasRequiredDegree = true;
		USER.job.name = jobName;
		USER.job.salary = jobSalary;
		USER.job.promotions = 0;
		jobSuccess();
	}
	if (!hasRequiredDegree){
		jobReject();
	}



}


function jobSuccess(){

	let html = `<br>
	<p>
	You've been accepted for the requested job!<br>
	You will be earning $${USER.job.salary} per month.<br>
	</p><br>
	`
	message(`You're now working as a ${USER.job.name}`);
	Swal.fire({
		heightAuto:false,
		title:'Job Request Accepted!',
		icon:'success',
		html:html,
		background:swalBackground,
		showCancelButton:false,
		showConfirmButton:true,
		confirmButtonText:'Cool Beans!'
	});

	jobAllow = false;
	hasJob = true;
	let actionsBtn = document.querySelector('#actions-btn');
	actionsBtn.setAttribute('onclick','jobMenu()')
	actionsBtn.classList = [];
	actionsBtn.classList.add('btn-main','btn-purple');

}


function jobReject(){

	let html = `<br>
	You didn't have the necessary skills for the required job.
	<br>`

	Swal.fire({
		heightAuto:false,
		title:'Rejected For Job',
		icon:'error',
		html:html,
		background:swalBackground,
		showConfirmButton:true,
		showCancelButton:false,
		confirmButtonText:'Alright'
	})
}




function jobMenu(){
	console.log('JobMenu()');

	let html = `
		<br><button id="budget" class="btn-lg btn-info" onclick="budget()">Budget</button><br>
		<br><button id="bank" class="btn-lg btn-info" onclick="bank()">Bank</button><br>
		<br><button id="job" class="btn-lg btn-success" onclick="myJob()">My Job</button><br>
		<br><br><br>
		<button id="profile" class="btn-lg main-btn btn-secondary" onclick="profile()"> <i class="fas fa-user-alt"></i>&nbsp;Profile</button>
		<button id="assets" class="btn-lg main-btn btn-danger" onclick="assets()">Assets <i class="fas fa-home"></i></button>
	`

	Swal.fire({
		heightAuto:false,
		title:'Actions',
		html:html,
		showCloseButton:true,
		showConfirmButton:false
	})


}






function myJob(){

	let html = `<br>
	Job Name : ${USER.job.name}<br>
	Monthly Salary : $${USER.job.salary}<br>
	Yearly Salary : $${USER.job.salary*12}<br><br>
	Current Promotions : ${USER.job.promotions}<br>
	Current Job Duration : ${USER.job.duration} months<br><br>


	`;



	Swal.fire({
		heightAuto:false,
		title:'My Job',
		html:html,
		confirmButtonText:'Go Back',
		showCloseButton:true
	})


}







function monthlyJobEvent(){
	USER.job.duration += 1;
	money += USER.job.salary;

	message(`You were paid ${USER.job.salary}$ as your salary`);


	randPromotionEvent();
	display();

}


function randPromotionEvent(){
	let randNum = randint(0,22);
	if (randNum == 22){
		console.log('Congrats on job promotion :D');
		let minIncrement = allJobs[USER.job.name]['minIncrement'];
		let maxIncrement = allJobs[USER.job.name]['maxIncrement'];
		let randInc1 = approx(randint(minIncrement,maxIncrement));
		let randInc2 = approx(randint(minIncrement,maxIncrement));
		let inc;
		if (randInc1 <= randInc2){
			inc = randInc1;
		}
		else {
			inc = randInc2
		}

		USER.job.promotions += 1;
		USER.job.salary += inc;	
		message(`You've been given a raise of $${inc}`);

		let html = `<br>
		Raise Given : $${inc}<br>
		New Salary : $${USER.job.salary}<br><br>

		`;

		Swal.fire({
			heightAuto:false,
			title:'Job Promotion',
			html:html,
			icon:'success',
			confirmButtonText:'Nice'
		});


	}
}


