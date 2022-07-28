# MicroComps
🧱 A bundle of micro components.

## How it works
### Step 1 : Import
Import MicroComps.js into your project

### Step 2 : Instanciate
Create a MicroComps instance. The constructor takes an object of options. You must provide a "container" which is element that will host the MicroComps instance DOM elements.
```javascript
let mc = new MicroComps({
	container: document.querySelector('.microcomps')
});
```

### Step 3 : Add controls
Your MicroComps instance got a "add" method. This "add" method signature is the following :
```javascript
add(objectToUpdate, keyToUpdate, typeOfEditor, options)
```
Consider this object :
```javascript
let dog = {
	"name": "John Dog",
	"age": 4,
}
```
If you wants to create a control inside your MicroComps instance to update the dog.age, you can proceed like that :
```javascript
mc.add(dog, 'age', 'number', {
	min : 0, // You can add a minimum value
	max : 10000000, // You can add a maximum value
	onCreate: (value) => {
		console.log('Editor created');
	},
	onChange: (value) => {
		console.log('Editor value changed', value);
	}
});
```
See more example in [/demo/js/main.js](/demo/js/main.js) and right in the [source](MicroComps.js).

## Todo
- [x] StringEditor
- [x] NumberEditor
- [x] BooleanEditor
- [x] ListEditor
- [x] ColorEditor
- [x] XYEditor
- [x] XYZEditor
- [x] Range slider
- [ ] More exhaustive documentation
- [ ] ...do not hesitate to ask for more
