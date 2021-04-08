
function jobs(){
	// not using json 
	var list = [{"Senior Engineer":[4000,5000]},
	{"Teacher":[2000,3000]},{"Firefighter":[2000,3000]},
	{"Junior Engineer":[3500,4500]},{"Gardener":[500,800]},
	{"Police Officer":[3000,4000]},{"Soldier":[1500,2500]},
	{"Army Officer":[2500,3500]},{"Marine Biologist":[2000,4000]},
	{"Data Scientist":[4000,5000]},{"Garbage Collector":[500,800]},
	{"Junior Pilot":[5000,6000]},{"Senior Pilot":[6000,9000]},
	{"Chef":[2000,2500]},{"Lawyer":[4000,5000]},{"Banker":[4000,5000]},
	{"Artist":[2000,4000]},{"Sweeper":[400,800]},
	{"Doctor":[5000,7000]},{"Judge":[6000,7500]},
	{"Property Dealer":[3000,4000]},{"Waiter":[1000,1500]},
	{"Head Chef":[3000,5000]},{"McDonalds Worker":[500,800]},
	{"Security Guard":[1500,2000]},{"Mall Cop":[1500,2000]},
	{"Clown":[500,700]},{"Truck Driver":[600,1200]},
	{"Graphic Designer":[3000,4000]},{"Attorney":[3000,4000]},
	{"District Magistrate":[5000,6000]},{"Veterenarian":[5000,6500]},
	{"Biologist":[6000,6500]},{"Senior Doctor":[7000,10000]},
	
	//new jobs added 17 may 2020;
	
	{"Botanist":[4500,5500]},{"Secretary":[2750,3750]},
	{"Junior Clerk":[2500,3500]},{"Senior Clerk":[4500,6000]},
	{"Govt Clerk":[2000,3250]},{"Accountant":[3000,4000]},
	{"Sailor":[2500,3500]},{"Ship Captain":[5000,6250]},
	{"Political Analyst":[3000,4500]},{"Labourer":[500,1000]}
	];
	//boop
	var btns = [];
	var jobs = {};
	for (x=0;x<6;x++){
		random = randint(0,list.length-1);
		var sel = list[random];
		var jobName = Object.keys(sel);
		if (Object.keys(jobs).includes(jobName[0])){
			x = x - 1;
			console.log(jobName);
		}
		else {
			
			var min = sel[jobName][0];
			var max = sel[jobName][1];

			salary = randint(min,max);
			jobs[jobName] = salary;
			var btn = `<br><button onclick="check_job('${jobName}',${salary})" 
			class="w3-round w3-ripple w3-btn w3-indigo w3-hover-red">
			${jobName} : ${salary}$ / M</button><br>`;
			btns.push(btn);
		};
	};
	var reloadBtn = `<br><br><button onclick="jobs()" class="btn-lg btn-secondary">View More Jobs</button>`;
	var html = btns[0]+btns[1]+btns[2]+btns[3]+btns[4]+btns[5]+reloadBtn;
	Swal.fire({
		heightAuto:false,
		title:"Jobs",
		showConfirmButton:false,
		position:"top",
		html:html,
		showCloseButton:true
	});

};



function check_job(jobName,salary){


	var req = [];
	var xp = 0;
	var needXp = false;
	if (jobName == "Teacher"){
		req = ["ART","GRAD","ENG"];

	}
	else if (jobName == "Firefighter"){
		req = ["COMMUNITY","GRAD","ENG"];
	}
	else if (jobName == "Gardener"){
		jobQualified = true;

	}
	else if (jobName == "Junior Engineer"){
		req = ["ENG"];
	}
	else if (jobName == "Senior Engineer"){
		req = ["ENG"];
		xp = 60;
		needXp = true;
	}
	else if (jobName == "Police Officer"){
		req = ["GRAD","COMMUNITY","ART"];
		xp = 60;
		needXp = true;
	}
	else if (jobName == "Soldier"){
		req = ["GRAD","COMMUNITY","ENG"];
	}
	else if (jobName == "Army Officer"){
		req = ["GRAD","COMMUNITY","ENG"];
		xp = 60;
		needXp = true;
	}
	else if (jobName == "Garbage Collector"){
		jobQualified = true;
	}
	else if (jobName == "Marine Biologist"){
		req = ["MED"];
	}
	else if (jobName == "Data Scientist"){
		req = ["ENG"];
	}
	else if (jobName == "Junior Pilot"){
		req = ["ENG"];
	}
	else if (jobName == "Senior Pilot"){
		req = ["ENG"];
		xp = 60;
		needXp = true;
	}
	else if (jobName == "Chef"){
		req = ["COMMUNITY","GRAD","ARTS"];
	}
	else if (jobName == "Lawyer"){
		req = ["LAW"];
	}
	else if (jobName == "Banker"){
		req = ["COM"];
	}
	else if (jobName == "Artist"){
		req = ["ARTS"];
	}
	else if (jobName == "Sweeper"){
		jobQualified = true;
	}
	else if (jobName == "Doctor"){
		req = ["MED"];
	}
	else if (jobName == "Judge"){
		req = ["LAW"];
		xp = 120;
		needXp = true;
	}
	else if (jobName == "Property Dealer"){
		req = ["GRAD","ENG","COM"];
	}
	else if (jobName == "Waiter"){
		req = ["GRAD","COMMUNITY","ARTS"];
	}
	else if (jobName == "Head Chef"){
		req = ["COMMUNITY","GRAD","ARTS"];
		xp = 60;
		needXp = true;
	}
	else if (jobName == "McDonalds Worker"){
		jobQualified = true;
	}
	else if (jobName == "Security Guard"){
		req = ["ARTS","GRAD","COMMUNITY"];
	}

	else if (jobName == "Mall Cop"){
		req = ["ARTS","GRAD","COMMUNITY"];
	}
	else if (jobName == "Clown"){
		jobQualified = true;
	}
	else if (jobName == "Truck Driver"){
		let chance = randint(0,1)
		if (chance == 1){
			jobQualified = true;
		}
	}

	else if (jobName == "Graphic Designer"){
		req = ["ENG","ARTS"];
	}

	else if (jobName == "Attorney"){
		req = ["LAW"];
	}

	else if (jobName == "District Magistrate"){
		req = ["LAW"];
		xp = 60;
		needXp = true;
	}

	else if (jobName == "Veterenarian"){
		req = ["MED"];
	}

	else if (jobName == "Biologist"){
		req = ["MED"];
	}

	else if (jobName == "Senior Doctor"){
		req = ["MED"];
		xp = 120;
		needXp = true;
	}
	else if (jobName == "Botanist"){
		req = ["MED"];
	}
	else if (jobName == "Secretary"){
		req = ["ARTS","GRAD"];
	}
	else if (jobName == "Junior Clerk"){
		req = ["GRAD","ENG","COM"];
	}
	else if (jobName == "Senior Clerk"){
		req = ["GRAD","ENG","COM"];
		needXp = true;
		xp = 60;
	}
	else if (jobName == "Govt Clerk"){
		req = ["GRAD","ENG","COM"];
	}
	else if (jobName == "Accountant"){
		req = ["GRAD","ENG","COM"];
	}
	else if (jobName == "Sailor"){
		req = ["COMMUNITY","GRAD","MED","ARTS"];
	}
	else if (jobName == "Ship Captain"){
		req = ["COMMUNITY","GRAD","MED","ARTS"];
		needXp = true;
		xp = 72;
	}
	else if (jobName == "Political Analyst"){
		req = ["ARTS","GRAD"];
	}
	else if (jobName == "Labourer"){
		jobQualified = true;
	}





	for (x in degree){
		for (y in req){
			if (degree[x] == req[y]){
				if (!needXp){
					jobQualified = true;
				}
				else{
					if (USER.xp >= xp){
						jobQualified = true;
					}
				}
			}
		}
	}
	let html = 
	`<hr><br>Job name - ${jobName}<br>
	Salary - <b>${salary}$/month</b><br>`;

	if (needXp){
		html = html+`Experience Needed - <b>${xp/12} years</b><br><br><hr>`;
	}
	else {
		html = html + "<br><br><hr>";
	}

	Swal.fire({
		heightAuto:false,
		position:"top",
		icon:"info",
		title:"Job Information",
		html:html,
		confirmButtonText:'Apply',
		showCancelButton:true,
		cancelButtonText:"Leave"
	}).then((result) => {
		if (result.value){
			if (jobQualified){
				jobQualified = false;
				start_job(jobName,salary);
			}
			else {
				Swal.fire({
					heightAuto:false,
					icon:"error",
					title:"Your job application was declined"
				});
			};
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			jobs();
		};

	});


	jobAllow = false;

};



function start_job(jobName,salary){
	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"You got the job!",
		text:`You are now working as a ${jobName}`,
		footer:`You will be earning <b>${salary}$</b> every month`,
		confirmButtonText:"Cool!"
	});
	message(`You started working as a ${jobName} earning ${salary}$/month`);
	
	hasJob = true;
	USER.salary = salary;
	USER.job = jobName;

	$("#actions").attr("class","btn-lg btn-primary");
	$("#actions").attr("onclick","job_menu()");
	$("#actions").attr("id","job");
	
	

};









function job_menu(){

	let html = `

		<br><button id="budget" class="btn-lg btn-info" onclick="budget()">Budget</button><br>
		<br><button id="bank" class="btn-lg btn-info" onclick="bank()">Bank</button><br>
		<br><hr>
		Monthly Salary - <b>${USER.salary}$</b><br>
		Occupation - ${USER.job}<br>
		Experience - <b>${USER.xp}</b> months<br>
		Total Promotions - <b>${USER.promos}</b>
		<br><hr><br>
		<button onclick="ask_raise()" class="btn btn-info">Ask For Raise</button><br><br>
		<button onclick="leave_job()" class="btn btn-primary">Leave Job</button><br><br>
		

	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Job Actions",
		showConfirmButton:false,
		html:html
		
	});

};



function leave_job(){
	hasJob = false;
	USER.salary = 0;
	USER.job = "Unemployed";

	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:`You left your job!`,
		confirmButtonText:"Alright"
	});
	

	$("#job").attr("onclick","actions()");
	$("#job").attr("class","btn-lg btn-danger");
	$("#job").attr("id","actions");
};



function fire_job(reason){
	USER.job = "Unemployed";
	USER.salary = 0;
	hasJob = false;

	Swal.fire({
		heightAuto:false,
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
		var inc = randint(3,5);
		var raise = Math.floor(USER.salary*inc/100);
		USER.salary += raise;
		USER.promos += 1;
		message(`You were given a raise of <b>${raise}$</b>`);
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:`You were given a raise of<b> ${raise}$</b>`,
			confirmButtonText:"Sweet!"
		});
	}
	else if (chance > 8){
		fire_job("You were fired for asking a raise");
		message(`You were fired from your job for asking for a raise`);
	}
	else {
		message(`You were denied a raise by your boss`);
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"You were denied a raise",
			confirmButtonText:"Nevermind"
		});
	};
};



