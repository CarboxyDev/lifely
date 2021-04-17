const allCountries = [
	'United States','Canada','England','India','Pakistan',
	'China','Saudi Arabia','Sri Lanka','Mexico','Sweden','Norway',
	'Denmark','Finland','Russia','Japan','Taiwan','South Korea',
	'Indonesia','Singapore','Italy','Hungary','Switzerland',
	'Poland','Germany','France','Portugal','Spain','Ireland',
	'Iceland','Argentina','Brazil','Uruguay','Cuba','Albania',
	'Australia','Austria','Belgium','Belarus','Estonia','Bulgaria',
	'Chile','Turkey','Greece','Cyprus','Croatia','Costa Rica',
	'Egypt','Israel','Kuwait','Latvia','Iran','Slovenia','Lithuania',
	'Malaysia','UAE','Morocco','Luxembourg','New Zealand','Qatar',
	'South Africa','Bangladesh','Mongolia','Thailand','Serbia',
	'Vietnam','Ukraine','Zimbawe','Burundi','Belize','Bolivia',
	'Slovakia','Laos','Lebanon','Mauritius','Netherlands',
	'Macedonia','Philippines','Wales','Northern Ireland','Scotland'


]

const essentialCountries = [

	'United States','Canada','England','India','Russia','China',
	'Japan','South Korea','Taiwan','New Zealand','Brazil','Portugal',
	'Spain','Ireland','Philippines','Netherlands','Sweden','Norway',
	'Finland','Denmark','UAE','Israel','South Africa','Malaysia',
	'Thailand','Scotland','Mexico','Belgium','France','Italy',
	'Singapore','Germany','Australia','Greece','Scotland',
	'Vietnam','Argentina','Mexico','Ukraine','Belarus','Poland'

]





function randomCountry(){

	// adding bias for most essential countries

	let biasedCountries = [

	'United States','United States','United States','United States',
	'United States','United States','United States','United States',
	'Canada','Canada','India','India','India','India','Thailand'
	'England','England','England','Vietnam','Vietnam',
	'Germany','Brazil','Brazil','Finland','Denmark',
	'Singapore','Australia','Japan','Japan','Japan','France','France',
	'France','Sweden','Sweden','Norway','China','China','China','China'

	]


	let availableCountries = essentialCountries;
	for (x=0;x<biasedCountries.length-1;x++){
		availableCountries.push(biasedCountries[x]);
	}


	let rand = randint(0,availableCountries.length-1);
	return availableCountries[rand];
};


