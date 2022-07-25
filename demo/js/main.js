let mc;
let car = {
	brand: 'Toyota',
	model: 'C.H.R',
	color: '#000000',
	tractionBallOption: true,
	year: 2022,
	maxSpeed: 250,
	licencePlate: "2F45T4U"
}

document.addEventListener("DOMContentLoaded", (event) => {
	mc = new MicroComps({
		container: document.getElementById('microcomps')
	});

	mc.add(car, 'tractionBallOption', 'boolean', {
		onCreate: (v) => {
			console.log('On create tractionBallOption', v);
		},
		onChange: (v) => {
			console.log('Changed tractionBallOption', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'year', 'number', {
		onCreate: (v) => {
			console.log('On create tractionBallOption', v);
		},
		onChange: (v) => {
			console.log('Changed year', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'maxSpeed', 'number', {
		onCreate: (v) => {
			console.log('On create tractionBallOption', v);
		},
		onChange: (v) => {
			console.log('Changed tractionBallOption', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'licencePlate', 'string', { onChange: (v) => {
			console.log('Changed tractionBallOption', v);
			displayTargetObjectValues();
		}
	});

	displayTargetObjectValues();
});

let displayTargetObjectValues = () => {
	let to = document.querySelector('#targetObject');

	to.innerHTML = '';
	to.append(document.createElement('ul'));

	let lis = "";
	for(const key in car){
		lis += `<li><b>${key} :</b> ${car[key]}</li>`;
	}
	to.querySelector('ul').innerHTML = lis;

}