var user = {
	"fname":"Arman","lname":"Ganjoo","age":18,"country":"United States",
	"age":216
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




function update(){
	$(".console").html("");
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
	message = "";
	message(event);
};






function jobs(){




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





function main(){
	$("#update").click(update);
	$("#actions").click(actions);
	$("#actions-overlay").popup({
		transition: "all 0.5s"
	});
	$.fn.popup.defaults.pagecontainer = '#page'
	$("#crime-btn").click(crime);
};






















$(document).ready(main());








