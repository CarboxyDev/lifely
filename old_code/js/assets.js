// DEV NOTES
// last cleaned on 31 Aug 2021
// Needs serious updates. Terrible code. 

function assets(){

	let html = `<br><br>
	<button onclick="myAssets()" class="w3-btn w3-large w3-green w3-round">
	My Assets &nbsp;<i class="fa fa-home"></i></button>
	<br><br>
	<button class="btn btn-secondary" onclick="buyAssets()">Buy Assets</button><br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Assets",
		showConfirmButton:false,
		html:html,
		footer:`NOTE : This feature is in development`,
		showCloseButton:true
	});
};



function myAssets(){
	var html = `<div id="scroll-container">`;
	if (USER.assets.length == 0){
		html = `<br><hr><h2>You don't own any assets</h2><br>
		<h2><i class="w3-center">:(</i></h2>`;
	}
	else {
		for (x = 0;x != USER.assets.length;x++){
			let asset = USER.assets[x];
			let newHtml = `
			<div id="${asset[0]}" class="w3-margin-16 
			w3-panel w3-pale-blue w3-leftbar w3-border-blue">
			<br>
			<h4 class="">${asset[0]}</h4>
			<h6 class="">$${asset[1]}</h6>
			<br>
			<button onclick=sellAssets(${x})
			class="w3-btn w3-small w3-red w3-hover-green w3-center">
			Sell Asset</button><br><br></div>`;

			html += newHtml;
		};
	};
	html += "<br></div>";

	Swal.fire({
		heightAuto:false,
		title:"My Assets",
		html:html,
		showCloseButton:true,
		showConfirmButton:false
	});
};



function buyAssets(){
	let houseBtn = `<button class="btn btn-success" onclick="purchase('house')">Purchase House</button>`;
	let vehicleBtn = `<button class="btn btn-success" onclick="purchase('vehicle')">Purchase Vehicle</button>`;
	let html =`<br><br>${houseBtn}<br><br>${vehicleBtn}<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Purchase Assets",
		showConfirmButton:false,
		html:html,
		showCloseButton:true
	});
};



function sellAssets(index){
	let asset = USER.assets[index];

	let html = `<br><br>Asset name : <b>${asset[0]}</b><br>
	Asset value : <b>$${asset[1]}</b><br><br>`;
	
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Selling Asset",
		html:html,
		confirmButtonText:"Sell Asset",
		showCancelButton:true,
		cancelButtonText:"Nevermind"
	}).then((result) => {
		if (result.value){
			sellAssetsConfirm(index);
		};
	});

};



function sellAssetsConfirm(index){
	let asset = USER.assets[index];
	let assetPrice = asset[1];
	let assetName = asset[0];
	money += assetPrice;
	
	// remove asset from asset list.
	USER.assets.splice(index,1);
	message(`You sold your ${assetName} for $${assetPrice}`);

	let html = `<br><br>Sold for $${assetPrice}`;
	Swal.fire({
		heightAuto:false,
		title:"Sold Asset",
		icon:"success",
		html:html,
		confirmButtonText:"Nice"
	});

	display();
};





function purchaseHouse(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	let discount = false;
	let price;
	let html;
	r = l[randint(0,12)];
	let change = 200*r;
	if (chance == 0){
		price = cost - change;
		discount = true;
	}
	else {
		price = cost + change;
	};


	if (discount){
		html = `
		Price : <del>${cost}</del> <b>$${price}</b><br>
		Discount : <b>$${cost-price}</b><br>`;
	}
	else {
		html = `Price : <b>$${price}</b><br>`;
	};

	Swal.fire({
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay $${price}`,
		cancelButtonText:"I'll pass"
	}).then((result) => {
		if (result.value){
			if (hasMoney(price)){
				money -= price;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You bought a house!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>$${price}</b>`,
					confirmButtonText:"Great!"
				});
				USER.assets.push([name,price,"house"]);
				message(`You bought a ${name} for $${price}`)
				morale += randint(5,10);
				display();
			};

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			purchase("house");
		};

	});
};



function purchaseVehicle(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	let discount = false;
	let price;
	let html;
	r = l[randint(0,12)];
	let change = 100*r;
	if (chance == 0){
		price = cost - change;
		discount = true;
	}
	else {
		price = cost + change;
	};

	if (discount){
		html = `
		Price : <del>$${cost}</del> <b>$${price}</b><br>
		Discount : <b>$${cost-price}</b><br>`;
	}
	else {
		html = `Price : <b>$${price}</b><br>`;
	}

	Swal.fire({
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay $${price}`,
		cancelButtonText:"Not Interested"
	}).then((result) => {
		if (result.value){
			if (hasMoney(price)){
				money -= price;

				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You bought a vehicle!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>$${price}</b>`,
					confirmButtonText:"Amazing!"
				});
				USER.assets.push([name,price,"vehicle"]);
				message(`You bought a ${name} for $${price}`);
				morale += randint(3,7);
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
		{"4 BHK Modern House":200000},{"1 Room Modern House":90000},
		{"Expensive Mansion":1000000},{"Suburb House":160000},
		{"2 BHK Luxury House":200000},{"4 BHK Luxury House":420000},
		{"5 BHK Duplex":300000},{"Royal Bungalow":5000000},
		{"Medieval Castle":10000000},{"Compact House":25000}

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
			let btn = `<br><button onclick="purchaseHouse('${house}',${cost})"
			class="btn btn-primary">${house}</button><br>`;
			btns.push(btn);

		};
		let reloadBtn = `<br><br><button onclick="purchase('house')" 
		class="btn-lg btn-secondary">View More Houses</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reloadBtn;

		Swal.fire({
			heightAuto:false,
			title:"Available Houses",
			icon:"info",
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
		{"Lamborghini":120000},{"Harley Davidson Bike":40000},
		{"Ford Car (Used)":15000},{"Ford Car":40000},
		{"Toyota Prius (Used)":9000},{"Toyota Prius":30000}
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
			let btn = `<br><button onclick="purchaseVehicle('${vehicle}',${cost})"
			class="btn btn-primary">${vehicle}</button><br>`;
			btns.push(btn);

		};
		let reloadBtn = `<br><br><button onclick="purchase('vehicle')" 
		class="btn-lg btn-secondary">View More Vehicles</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reloadBtn;
		Swal.fire({
			heightAuto:false,
			title:"Available Vehicles",
			icon:"info",
			html:html,
			showConfirmButton:false
		});
	};
};
