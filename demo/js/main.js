let mc;
let car = {
	brand: 'Brand',
	model: 'Model B',
	color: '#00cc88',
	tractionBallOption: true,
	year: 2022,
	maxSpeed: 250,
	licencePlate: "2F45T4U",
	size: [250, 185, 150]
}

document.addEventListener("DOMContentLoaded", (event) => {
	mc = new MicroComps({
		container: document.querySelector('.microcomps')
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
		min : 1900,
		onCreate: (v) => {
			console.log('On create year', v);
		},
		onChange: (v) => {
			console.log('Changed year', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'maxSpeed', 'number', {
		min : 50,
		max: 300,
		onCreate: (v) => {
			console.log('On create maxSpeed', v);
		},
		onChange: (v) => {
			console.log('Changed maxSpeed', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'licencePlate', 'string', {
		onCreate: (v) => {
			console.log('On create licencePlate', v);
		},
		onChange: (v) => {
			console.log('Changed licencePlate', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'model', 'list', {
		values: ['Model A', 'Model B', 'Model C'],
		onChange: (v) => {
			console.log('Changed model', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'color', 'color', {
		onChange: (v) => {
			console.log('Changed color', v);
			displayTargetObjectValues();
		}
	});

	mc.add(car, 'size', 'xyz', {
		label: "Car size",
		min: 150,
		max: 400,
		onChange: (v) => {
			console.log('Changed size', v);
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