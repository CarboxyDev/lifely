

function assets(){

	let html = `<br><br>
	<button onclick="my_assets()" class="w3-btn w3-large w3-blue">
	My Assets &nbsp;<i class="fa fa-home"></i></button>
	<br><br><hr><br>
	<br><button class="btn btn-success" onclick="purchase_assets()">
	Purchase Assets</button><br><br>
	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Assets",
		showConfirmButton:false,
		html:html,
		background:"#333",
		footer:`NOTE : Assets are currently in BETA`,
		showCloseButton:true
	});
};




function my_assets(){
	var html = `<div id="scroll-container">`;
	if (USER.assets.length == 0){
		html = `<br><hr><h2>You don't own any assets</h2><br>
		<h2><i class="w3-center">:(</i></h2>`;
	}
	else {
		for (x=0;x!=USER.assets.length;x++){
			let asset = USER.assets[x];
			let new_html = `
			<div id="${asset[0]}" class="w3-margin-16 
			w3-panel w3-pale-blue w3-leftbar w3-border-blue">
			<br>
			<h4 class="">${asset[0]}</h4>
			<h6 class="">${asset[1]}$</h6>
			<br>
			<button onclick=sell_assets(${x})
			class="w3-btn w3-small w3-red w3-hover-green w3-center">
			Sell This</button><br>
			</div>
			`;

			html = html+new_html;

		}	
	}
	html = html + "<br></div>";


	
	Swal.fire({
		heightAuto:false,
		title:"My Assets",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,
		position:top
	})


}








function purchase_assets(){
	var btn1 = `<br><button class="btn btn-success" onclick="purchase('house')">Purchase House</button><br>`;
	var btn2 = `<br><button class="btn btn-success" onclick="purchase('vehicle')">Purchase Vehicle</button><br>`;
	
	let html =`<br><hr>${btn1}${btn2}`;
	Swal.fire({
		heightAuto:false,
		position:"top",
		icon:"info",
		title:"Purchase Assets",
		showConfirmButton:false,
		html:html
	});

};





function sell_assets(index){
	asset = USER.assets[index];

	let html = `<br><br>
	Asset Type - <b>${asset[0]}</b><br>
	Selling Price - <b>${asset[1]}$</b><br><hr><br>
	`;
	
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Selling Asset",
		html:html,
		confirmButtonText:"Sell It",
		showCancelButton:true,
		cancelButtonText:"Nevermind"
	}).then((result) => {

		if (result.value){
			asset_sell(index);
		}

	});

};



function asset_sell(index){
	let asset = USER.assets[index];
	let asset_price = asset[1];
	let asset_name = asset[0];
	money += asset_price;
	display();
	USER.assets.splice(index,1);
	message(`You sold your ${asset_name} for ${asset_price}$`);

	let html = `<br><br>
	<h3>Sold for ${asset_price}$</h3>
	`;
	Swal.fire({
		heightAuto:false,
		title:"Sold An Asset",
		icon:"success",
		html:html,
		confirmButtonText:"Cool!"
	});

}





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


	if (discount){
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
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay ${price}$`,
		cancelButtonText:"I'll pass"
	}).then((result) => {
		if (result.value){
			if (has_money(price)){
				money = money - price;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You bought a house!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>${price}$</b>`,
					confirmButtonText:"Amazing!"
				});
				USER.assets.push([name,price,"house"]);
				message(`You bought a ${name} for ${price}$`)
				morale += randint(5,10);
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


	if (discount){
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
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`Pay ${price}$`,
		cancelButtonText:"Not Interested"
	}).then((result) => {
		if (result.value){
			if (has_money(price)){
				money = money - price;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You bought a vehicle!",
					html:`You are now a proud owner of a <b>${name}</b><br>`+
					`You bought it for <b>${price}$</b>`,
					confirmButtonText:"Amazing!"
				});
				USER.assets.push([name,price,"vehicle"]);
				message(`You bought a ${name} for ${price}$`)
				morale += randint(3,7)
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
			let btn = `<br><button onclick="purchase_house('${house}',${cost})"
			class="btn btn-primary">${house}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('house')" 
		class="btn-lg btn-secondary">View More Houses</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			heightAuto:false,
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
			let btn = `<br><button onclick="purchase_vehicle('${vehicle}',${cost})"
			class="btn btn-primary">${vehicle}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('vehicle')" 
		class="btn-lg btn-secondary">View More Vehicles</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			heightAuto:false,
			title:"Available Vehicles",
			icon:"info",
			position:"top",
			html:html,
			showConfirmButton:false
		});

	};

};










