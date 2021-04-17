function profile(){

	let assetsWorth = calculateAssetsWorth();
	let netWorth = calculateNetWorth();

	let html = `<br><br>
	Name : ${USER.name}<br>
	Country : ${USER.country}<br>
	Occupation : ${USER.job.name}<br>
	Total Assets : <b>${USER.assets.length}</b><br><br>
	Net Worth : <b class="w3-text-green">$${netWorth}</b>
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		imageHeight:125,
		imageWidth:125,
		imageAlt:"Profile",
		position:"top",
		title:"Profile",
		showConfirmButton:false,
		html:html
	});
};




function settings(){
	let html = `<br><br>

	${buttons.credits}<br><br>
	${buttons.help}<br><br>
	${buttons.contributions}<br><br>
	${buttons.displayThemes}<br><br>

	<br><br>`;
	Swal.fire({
		heightAuto:false,
		title:"Settings",
		position:"top",
		showConfirmButton:false,
		html:html,
		background:swalBackground,
		showCloseButton:true
	});


}


function displayThemes(){

	let html = `<br><br>
	<button onclick="darkTheme()" class="w3-btn btn-dark">Dark Theme</button>
	<br><br>
	<button onclick="ultraDarkTheme()" class="w3-btn w3-black">Ultra Dark Theme</button>

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:"Display Themes",
		html:html,
		showConfirmButton:false,
		showCloseButton:true,
		background:swalBackground
	});

}



function contributions(){

	let html = `<br><br>
	No contributions yet. You could be the first contributor!
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:"info",
		position:top,
		html:html,
		title:"Contributions",
		confirmButtonText:"Back",
		showCloseButton:true,
		background:swalBackground
	});

}


function ultraDarkTheme(){

		$("body").css("background-color","#111010");
		$("body").css("color","white");
}
	
function darkTheme(){

		$("body").css("background-color","#1b1b1b");
		$("body").css("color","white");
}



function credits(){
	let html = `<br><br>
	Icons by <b>FontAwesome</b><br>
	Buttons by <b>Bootstrap</b> and <b>w3css</b><br>
	A huge thanks to <span class='w3-text-amber'>SweetAlert2</span>
	<br><br>
	Made With <i class="fas fa-heart" style="color:#d0142b"></i>
	<br><br>`;
	Swal.fire({
		heightAuto:false,
		title:"Credits",
		html:html,
		icon:"info",
		background:swalBackground,
		confirmButtonText:"Back To Game"
	})
};




function help(){
	let html=`<br><br>

	Press the button below to view help.
	Alternatively , you could contact us for other queries.
	<br><br>
	<a href="https://github.com/wraithM17/lifely/wiki/Help" 
	target="_blank" class="w3-button w3-blue">View Help</a>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Help Section",
		showCloseButton:true,
		html:html,
		icon:"success",
		showConfirmButton:false,
		background:swalBackground

	});

}


















const swalNoMoney = Swal.mixin({
	heightAuto:false,
	background:swalBackground,
	title:'You lack the funds!',
	icon:'error',
	text:`You don't have that much money in your wallet or as bank balance`
})
