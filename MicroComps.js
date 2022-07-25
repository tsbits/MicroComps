class MicroComps extends EventTarget{
	constructor(options = {}){
		super();

		this.uid = new Date().getTime() + Math.round(Math.random()*1000000)
		this.options = options;
		this.dom;
		this.comps = [];

		this.createDom();
	}

	createDom(){
		this.dom = document.createElement('ul');

		if(this.options.container){
			this.options.container.append(this.dom);
		}
	}

	add(object, key, type, options = {}){
		console.log(typeof object[key], type)
		let comp;

		if(type == "number"){
			comp = new NumberEditor(object, key, options);
			this.dom.append(comp.dom);
			this.comps.push(comp);
		}
		else if(type == "boolean"){
			comp = new BooleanEditor(object, key, options);
			this.dom.append(comp.dom);
			this.comps.push(comp);
		}
		else if(type == "string"){
			comp = new StringEditor(object, key, options);
			this.dom.append(comp.dom);
			this.comps.push(comp);
		}

		return comp;
	}
}

class NumberEditor extends EventTarget{
	constructor(object, key, options){
		super();
		this.object = object;
		this.key = key;
		this.options = options;
		this.dom;

		this.createDom();
		this.bindEvents();
	}

	createDom(){
		this.dom = document.createElement('li');
		this.dom.innerHTML = `<input type="number" value="${this.object[this.key]}">`;

		if(this.options.label){
			let lbl = document.createElement('p');
			lbl.innerText = this.options.label;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}
		else{			
			let lbl = document.createElement('p');
			lbl.innerText = this.key;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}

		if(this.options.onCreate){
			this.options.onCreate(this.object[this.key]);
		}
	}

	bindEvents(){
		this.dom.querySelector('input').addEventListener('change', (e) => {
			let v = parseFloat(e.target.value);

			if(this.options.min && v < this.options.min){
				v = this.options.min;
			}

			if(this.options.max && v > this.options.max){
				v = this.options.max;
			}

			this.object[this.key] = v;
			e.target.value = v;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}

class BooleanEditor extends EventTarget{
	constructor(object, key, options){
		super();
		this.object = object;
		this.key = key;
		this.options = options;
		this.dom;

		this.createDom();
		this.bindEvents();
	}

	createDom(){
		this.dom = document.createElement('li');
		let checked = this.object[this.key]?'checked':'';
		this.dom.innerHTML = `<input type="checkbox" ${checked}>`;

		if(this.options.label){
			let lbl = document.createElement('p');
			lbl.innerText = this.options.label;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}
		else{			
			let lbl = document.createElement('p');
			lbl.innerText = this.key;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}

		if(this.options.onCreate){
			this.options.onCreate(this.object[this.key]);
		}
	}

	bindEvents(){
		this.dom.querySelector('input').addEventListener('change', (e) => {
			this.object[this.key] = e.target.checked;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}

class StringEditor extends EventTarget{
	constructor(object, key, options){
		super();
		this.object = object;
		this.key = key;
		this.options = options;
		this.dom;

		this.createDom();
		this.bindEvents();
	}

	createDom(){
		this.dom = document.createElement('li');
		let checked = this.object[this.key]?'checked':'';
		this.dom.innerHTML = `<input type="text" value="${this.object[this.key]}">`;

		if(this.options.label){
			let lbl = document.createElement('p');
			lbl.innerText = this.options.label;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}
		else{			
			let lbl = document.createElement('p');
			lbl.innerText = this.key;
			lbl.classList.add('label');
			this.dom.querySelector('input').before(lbl);
		}

		if(this.options.onCreate){
			this.options.onCreate(this.object[this.key]);
		}
	}

	bindEvents(){
		this.dom.querySelector('input').addEventListener('change', (e) => {
			this.object[this.key] = e.target.value;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}