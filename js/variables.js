

var USER  = {
	'name':null,
	'country':randomCountry(),
	'age':216,
	'status':'None',
	'assets':[],//temp assets | will be much more complex in future
	'education':{
		'degrees':{
			'SAMPLE':{
				cgpa:10,
				grade:'A+',
				remark:'',
			}
		}	
	},

	'job':{
		'name':'Unemployed',
		'salary':0,
		'promotions':0,
		'duration':0,
		'previousJobs':{

		}

	}
}

USER.name = randomName();



var BANK = {
	"balance":0,
	"id":randint(100000,999999),
	"loan":0,
	"hasLoan":false,
	"transactions":0,
	'transactionsList':[]
}






var money = approx(randint(750,5000));
var health;
var morale;
var intellect;
var looks;
var karma = 0;
var isStudent = false;
var student_months = 0;
var total_student_loan = 0;
var total_years = 0;
var isJailed = false;

var totalLibVisits = 0;
var totalGymVisits = 0;
var jobQualified = false;
var hasJob = false;
var hasLoan = false;
var salary = 0;
var student_months = 0;
var student_has_loan = false;
var student_fees = 0;
var hasDisease = false;
var hasDepression = false;

var DISEASE = false;
var jailDuration = 0;
var jailDurationSpent = 0;
var alertsCount = 0;



// DISEASE RELATED

var diseases = {}
var diseaseCount = 0;

// BUDGET RELATED
var setBudgetAmount = 250;
var budgetAmount = 250;
var monthsSinceLastBudgetUpdate = 0;






var swalBackground = "#333"
var Swal = Swal.mixin({
	background:swalBackground,
	heightAuto:false
})





const buttons = {

	profile:`<button id="profile" class="btn-lg main-btn btn-secondary" onclick="profile()"> <i class="fas fa-user-alt"></i>&nbsp;Profile</button>`,
	bank:`<button id="bank" class="btn-lg btn-danger" onclick="bank()">Bank &nbsp;<i class="fa fa-dollar-sign"></i></button>`,
	budget:`<button id="budget" class="btn-lg btn-info" onclick="budget()">Budget &nbsp;<i class="fa fa-wallet"></i></button>`,
	jobs:`<button id="job-btn" class="btn-lg btn-info" onclick="jobs()">Jobs &nbsp;<i class="fa fa-briefcase"></i></button>`,
	study:`<button id="study-btn" class="btn-lg btn-info" onclick="study()">Study &nbsp;<i class="fa fa-graduation-cap"></i></button>`,
	assets:`<button id="assets" class="btn-lg main-btn btn-secondary" onclick="assets()">Assets <i class="fas fa-home"></i></button>`,
	credits:`<button onclick="credits()" class="btn btn-success">Credits</button>`,
	help:`<button onclick="help()" class="btn btn-success">Help</button>`,
	contributions:`<button onclick="contributions()" class="btn btn-success">Contributions</button>`,
	displayThemes:`<button onclick="displayThemes()" class="w3-btn w3-blue">Display Themes</button>`,
	myJob:`<button id="job" class="btn-lg btn-success" onclick="myJob()">My Job</button>`,
	bankAccount:`<button onclick="bankAccount()" class="btn-lg btn-info">Bank Details</button>`,
	loanServices:`<button onclick="loanServices()" class="btn-lg btn-secondary">Loan Services</button>`,
	deposit:`<button onclick="deposit()" class="btn-md btn-blue">DEPOSIT&nbsp;</button>`,
	withdraw:`<button onclick="withdraw()" class="btn-md btn-blue">WITHDRAW</button>`,


}

const HTML = {
	console:document.querySelector("#console"),
	ageDisplay:document.querySelector('#age'),
	actions:document.querySelector('#actions-btn'),
	activities:document.querySelector('#activities-btn'),
}




