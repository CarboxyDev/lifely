function profile(){

	var assetsWorth = calculateAssetsWorth();

	var netWorth = calculateNetWorth();

	var html = 
	`<br>
	Name - <b>${USER.name}</b><br>
	Country - <b>${USER.country}</b><br>
	Occupation - <b>${USER.job.name}</b><br>
	Total Assets - <b>${USER.assets.length}</b><br><br>
	Net Worth - <b class="w3-text-green">${netWorth}$</b><br>
	`;
	if (student_has_loan){
		html = html+`Student Loan - <b>${total_student_loan}$</b><br>`;
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


