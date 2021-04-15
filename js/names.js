function random_name(){

	var maleName = [
		'Aiden','Arron','Zach','James','Alan','Harry','Peter','Steve',
		'Tom','Tim','Gary','Sam','Kevin','Mark','Chester','Mike',
		'Edward','Dyson','Tyson','Ravi','Aakash','Howard','Tony','Jason',
		'Jordan','Felix','Quinton','Rohit','Alex','Alexander','Steven',
		'Liam','James','Kendrick','Austin','Bailey','Elgar','Edgar',
		'Carl','Markus','Hector','Wyatt','Ryan','Dilbert','Gilbert',
		'Ronald','Charlie','Donald','Jacob','Jake','Jonathon','John',
		'Kelvin','Corey','Matthew',"Draco","Zach","Henry",
		"Jim","John","Robert","Harry","Peter",
		"Kevin","Samuel","James","Arnold","Donald","Henry","Jake",
		"Drake","Corey","Matthew","Zach","Wyatt","Charlie","Carl",
		"Ryan","Toby","Jordan","Edgar","Alex","Edward","Tyson",
		"Steve","Steven","Alan","Arron","Ron"
	];

	var lastName = [
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

	maleName = maleName[randint(0,maleName.length-1)];
	lastName = lastName[randint(0,lastName.length-1)];

	var name = maleName+" "+lastName;
	return name;
	
};


























