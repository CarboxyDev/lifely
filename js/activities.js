
function library(){
	let cost = randint(5,40);

	let html = `<br>
	Cost per session : $${cost}<br><br><br>

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'question',
		title:'Library',
		html:html,
		showCancelButton:true,
		showConfirmButton:true,
		showCloseButton:true,
		confirmButtonText:`Pay $${cost}`,
		cancelButtonText:`Nevermind`
	}).then((result) => {
		if (result.value){
			let visitedLibrary;
			if (hasMoney(cost)){
				money -= cost;
				visitedLibrary = true;


			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedLibrary = true;
			}
			else {
				swalNoMoney.fire();
				visitedLibrary = false;
			};

			if (visitedLibrary){
				message(`You spent $${cost} for a library session`);
				totalLibVisits += 1;
				if (totalLibVisits < 3){
					intellect += randint(0,2);
				};
				Swal.fire({
					heightAuto:false,
					title:'You studied at the library!',
					icon:'success',
					confirmButtonText:'Nice'
				});
				
				display();	
			}
		}
	});

}















