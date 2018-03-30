
var numbers = document.querySelectorAll('.number'),
	operations = document.querySelectorAll('.operation'),
	virgule = document.getElementById('virgule'),
	ce = document.getElementById('CE'),
	c = document.getElementById('C'),
	resultBtn = document.getElementById('result'),
	display = document.getElementById('display');

var	memoryCurrentNumber = 0,
	memoryNewNumber = false,
	memoryPendingOperation = '';

for(var i=0; i<numbers.length; i++) {

    var number = numbers[i];
	number.addEventListener('click', function(e) {
		numberPress(e.target.textContent);
	});
};

for(var i=0; i<operations.length; i++) {

    var operationBtn = operations[i];
	operationBtn.addEventListener('click', function(e) {
		operation(e.target.textContent);
	});
};

ce.addEventListener('click', clear);

c.addEventListener('click', clear);

virgule.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

function numberPress(e) {
	if(memoryNewNumber){
		display.value = e;
		memoryNewNumber = false;
	}else{
		if(display.value === '0') {
			display.value = e;
		}else{
			display.value += e;
		}
	}

}

function operation (op) {

	var localOperationMemory = display.value;

	if(memoryNewNumber && memoryPendingOperation !== '=') {
		display.value = memoryCurrentNumber;
	}else{
		memoryNewNumber = true;
		if (memoryPendingOperation === '+') {
			memoryCurrentNumber += parseFloat(localOperationMemory);
		}else if (memoryPendingOperation === '-'){
			memoryCurrentNumber -= parseFloat(localOperationMemory);
		}else if (memoryPendingOperation ==='*'){
			memoryCurrentNumber *= parseFloat(localOperationMemory);
		}else if (memoryPendingOperation ==='/'){
			memoryCurrentNumber /= parseFloat(localOperationMemory);
		}else{
			memoryCurrentNumber = parseFloat(localOperationMemory);
		}
		display.value = memoryCurrentNumber;
		memoryPendingOperation = op;
	}

}

function decimal(e) {
	var localDecimalMemory = display.value;

	if (memoryNewNumber) {
		localDecimalMemory = '0.';
		memoryNewNumber = false;
	}else {
		if (localDecimalMemory.indexOf('.') === -1 ) {
			localDecimalMemory += '.';
		}
	}

	display.value = localDecimalMemory;
	console.log(e.srcElement.id);
}

function clear(id) {
	console.log('i begin');
	console.log(id.target.id);
	if (id.target.id === 'CE'){
		display.value = '0';
		memoryNewNumber = true;
	}else if (id.target.id == 'C'){
		display.value = '0';
		memoryNewNumber = true;
		memoryCurrentNumber = 0;
		memoryPendingOperation = '';
	}
}

function result(e) {
	console.log(e.srcElement.id);
}