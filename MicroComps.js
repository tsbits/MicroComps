class MicroComps extends EventTarget{
	constructor(options = {}){
		super();

		this.uid = new Date().getTime() + Math.round(Math.random()*10)
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
		else if(type == "list"){
			comp = new ListEditor(object, key, options);
			this.dom.append(comp.dom);
			this.comps.push(comp);
		}
		else if(type == "color"){
			comp = new ColorEditor(object, key, options);
			this.dom.append(comp.dom);
			this.comps.push(comp);
		}
		else if(type == "xyz"){
			comp = new XYZEditor(object, key, options);
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('number-editor');
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

		if(this.options.min){
			this.dom.querySelector('input').setAttribute('min', this.options.min);
		}

		if(this.options.max){
			this.dom.querySelector('input').setAttribute('max', this.options.max);
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('boolean-editor');
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('string-editor');
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
		this.dom.querySelector('input').addEventListener('input', (e) => {
			this.object[this.key] = e.target.value;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}

class ListEditor extends EventTarget{
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('list-editor');

		let select = document.createElement('select');
		this.dom.append(select);

		if(this.options.label){
			let lbl = document.createElement('p');
			lbl.innerText = this.options.label;
			lbl.classList.add('label');
			this.dom.querySelector('select').before(lbl);
		}
		else{			
			let lbl = document.createElement('p');
			lbl.innerText = this.key;
			lbl.classList.add('label');
			this.dom.querySelector('select').before(lbl);
		}

		if(this.options.values){
			let select = this.dom.querySelector('select');

			for(let v in this.options.values){
				let opt = document.createElement('option');
				opt.text = this.options.values[v];
				opt.value = this.options.values[v];
				select.append(opt);
			}
		}
		
		select.value = this.object[this.key];

		if(this.options.onCreate){
			this.options.onCreate(this.object[this.key]);
		}
	}

	bindEvents(){
		this.dom.querySelector('select').addEventListener('change', (e) => {
			this.object[this.key] = e.target.value;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}

class ColorEditor extends EventTarget{
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('color-editor');
		this.dom.innerHTML = `<input type="color" value="${this.object[this.key]}">`;

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
		this.dom.querySelector('input').addEventListener('input', (e) => {
			let v = e.target.value;

			this.object[this.key] = v;
			e.target.value = v;

			if(this.options.onChange){
				this.options.onChange(this.object[this.key]);
			}
		});
	}
}

class XYZEditor extends EventTarget{
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
		this.dom.classList.add('microcomps-editor');
		this.dom.classList.add('xyz-editor');

		for(let val in this.object[this.key]){
			console.log(this.object[this.key][val])
			var i = document.createElement('input');
			i.type = "number";
			i.value = this.object[this.key][val];
			this.dom.append(i);
		}

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

		if(this.options.min){
			this.dom.querySelectorAll('input').forEach( (el, index) => {
				el.setAttribute('min', this.options.min);
			});
		}

		if(this.options.max){
			this.dom.querySelectorAll('input').forEach( (el, index) => {
				el.setAttribute('max', this.options.max);
			});
		}

		if(this.options.onCreate){
			this.options.onCreate(this.object[this.key]);
		}
	}

	bindEvents(){
		let self = this;

		this.dom.querySelectorAll('input').forEach((el, index) => {
			el.addEventListener('change', (e) => {
				let v = parseFloat(e.target.value);

				if(self.options.min && v < self.options.min){
					v = self.options.min;
				}

				if(self.options.max && v > self.options.max){
					v = self.options.max;
				}

				this.object[this.key][index] = v;
				e.target.value = v;

				if(self.options.onChange){
					self.options.onChange(this.object[this.key]);
				}
			});
		});
	}
}