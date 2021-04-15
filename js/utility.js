
function randint(min,max){
	let rnum = Math.floor(Math.random()*(max-min+1))+min;
	return rnum;

};

function randchoice(array){
	let randNum = randint(0,array.length-1);
	return array[randNum];
}

function approx(num){
	if (num%10==0){
		return num;
	}
	else {
		for (x=0;num%10!=0;x++){
			num += 1;
		}
		return num;
	}
}


function shuffle(array) {
   	for (let i = array.length - 1; i > 0; i--) {
      	const j = Math.floor(Math.random() * (i + 1));
      	[array[i], array[j]] = [array[j], array[i]];
   	}
};

function generateRange(floor,ceil){
	// includes floor and ceil
	let result = [];
	for (x=floor;x<ceil+1;x++){
		result.push(x);
	}
	return result;

}

function position(obj){
   let curleft = 0;
   let curtop = 0;

   if (obj.offsetParent) {
      do {
         curleft += obj.offsetLeft;
         curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);

      return {x:curleft,y:curtop};
      //returns coords
   }
}




function random_country(){

	var countryList = [
		"United States","Canada","United Kingdom","India","Pakistan",
		"China","Saudi Arabia","Sri Lanka","Mexico","Sweden","Norway",
		"Denmark","Finland","Russia","Japan","Taiwan","South Korea",
		"Indonesia","Singapore","Italy","Hungary","Switzerland",
		"Poland","Germany","France","Portugal","Spain","Ireland",
		"Iceland","Argentina","Brazil","Uruguay","Cuba","Albania",
		"Australia","Austria","Belgium","Belarus","Estonia","Bulgaria",
		"Chile","Turkey","Greece","Cyprus","Croatia","Costa Rica",
		"Egypt","Israel","Kuwait","Latvia","Iran","Slovenia","Lithuania",
		"Malaysia","UAE","Morocco","Luxembourg","New Zealand","Qatar",
		"South Africa","Bangladesh","Mongolia","Thailand","Serbia",
		"Vietnam","Ukraine","Zimbawe","United States","United States",
		"United States","United States","United States","Canada","Canada",
		"Russia","Burundi","Belize","Bolivia","Slovakia","Laos",
		"Lebanon","Mauritius","Netherlands","Macedonia","Philippines",
		"United States","United States","United States","Canada",
		"United States"
	]; // Increasing chance of getting United States
		
	random = randint(0,countryList.length-1);
	return countryList[random];
};




/*




*/


function generate(object,amount){

	if (object == "country"){
		let list = [
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
		"Canada","Burundi","Belize","Bolivia","Slovakia","Laos",
		"Lebanon","Mauritius","Netherlands","Macedonia","Philippines"
		]; 

		var countries = [];
		for (x=0;x!=amount;x++){
			var random = randint(0,list.length-1);
			var c = list[random];
			if (countries.includes(c)){
				x = x - 1;
			}
			else {
				countries.push(c);
			}
		};
		return countries;

	};

	if (object == "name"){

		return random_name()


	};

};


function degreeNames(degree){
	if (degree.includes('ENG')){
		return degree.replace('ENG','Engineering');
	}
	// because COMMUNITY has COM in it. yes im stupid.
	if (degree.includes('COM') && !degree.includes('COMMUNITY')){
		return degree.replace('COM','Commerce');
	}
	if (degree.includes('LIB')){
		return degree.replace('LIB','Liberal Arts');
	}
	if (degree.includes('LAW')){
		return degree.replace('LAW','Law');
	}
	if (degree.includes('ART')){
		return degree.replace('ART','Vocational Arts');
	}
	if (degree.includes('MED')){
		return degree.replace('MED','Medicine');
	}
	if (degree.includes('COMMUNITY')){
		return degree.replace('COMMUNITY','Community College');
	}
	

}