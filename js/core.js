function profile(){

	var assetsWorth = calculateAssetsWorth();

	var netWorth = calculateNetWorth();

	var html = 
	`<br>
	Name - <b>${USER.name}</b><br>
	Country - <b>${USER.country}</b><br>
	Occupation - <b>${USER.job.name}</b><br>
	Total Assets - <b>${USER.assets.length}</b><br><br>
	Net Worth - <b class="w3-text-green">$${netWorth}</b><br>
	`;
	if (student_has_loan){
		html = html+`Student Loan - <b>$${total_student_loan}</b><br>`;
	};

	Swal.fire({
		heightAuto:false,
		imageUrl:"images/profile.png",
		imageHeight:125,
		imageWidth:125,
		imageAlt:"Profile",
		position:"top",
		title:"Profile",
		showConfirmButton:false,
		html:html
	});
};

// maybe use in future?
/* 
function pay(amount){
	let bankBalance = fetchBankBalance();
	if (bankBalance > amount && money > amount){
		let html = `<br><br>
		<h3>Pay $${amount}</h3><br><br>
		<button id='' class='w3-btn w3-indigo' onclick=''>From Wallet</button>&nbsp;&nbsp;
		<button id='' class='w3-btn w3-indigo' onclick=''>From Bank</button> 
		<br><br>
		`
		Swal.fire({
			heightAuto:false,
			title:'Payment Gateway',
			html:html,
			showCloseButton:true,
			showConfirmButton:false
		});
	}

}*/



const swalNoMoney = Swal.mixin({
	heightAuto:false,
	background:swalBackground,
	title:'You lack the funds!',
	icon:'error',
	text:`You don't have that much money in your wallet or as bank balance`
})
