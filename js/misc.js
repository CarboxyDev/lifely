/* CONTENTS */
/*
thief_encounter()



*/




function thief_encounter(){
	let chance = randint(0,1);
	if (chance == 0){
		// success
		let prize = randint(500,2000);
		message(`You helped police catch a thief`);
		money += prize;
		morale += randint(3,6);
		display();
		let html = `You were given <b>${prize}$</b> as prize money
		for catching the thief. The police appreciate your response.`;
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"You called the police and the thief was caught!",
			html:html,
			confirmButtonText:"Amazing!"
		});
	}
	else {
		message(`The thief confronted you`);
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"The thief caught you calling police!",
			confirmButtonText:"Try to Flee",
			showCancelButton:true,
			cancelButtonText:"Fight Him",
			allowOutsideClick:false
		}).then((result) => {
			if (result.value){
				message(`You fled from the thief`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"You fled from the thief!",
					confirmButtonText:"Phew"
				});
				morale -= randint(3,5);
				display();
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				let chance = randint(0,1);
				if (chance == 0){
					message(`You beat and handed over the thief`);
					let prize = randint(500,2000);
					money += prize;
					morale += randint(3,6);
					display()
					let html = `
					You handed the thief over to the police after
					they came to the spot. You've been awarded
					<b>${prize}$</b> for your valor!
					`;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"You beat the shit out of the thief!",
						html:html,
						confirmButtonText:"I Feel Good"
					});
				}
				else {
					let html=`
					He spared you but not your bones!
					He also told you to piss off and mind your own business.
					`;
					message(`You were beaten up by the thief`);
					health -= randint(6,15);
					morale -= randint(3,6);
					display();
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"You got beaten by the thief",
						html:html,
						confirmButtonText:"My neck.."
					});
				}
			}
		});
	}
}















