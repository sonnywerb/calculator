function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, x, y) {
    switch(operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
           return divide(x, y);
    }
}

const display = document.querySelector('#display');
const displayContainer = document.querySelector('#displayContainer');

// Globals
let currInput = 0;
let inputArr = [];
let x;
let y;
let operation;
let output;
// Initial calculator display
displayUpdate(currInput);

const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        inputNumber(e);
    });
});
function inputNumber(e) {
    inputArr.push(e.target.textContent);
    currInput = getNumber(inputArr);
    displayUpdate(currInput);
}

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (operation !== "" && operation !== undefined) {
            y = currInput;
            output = operate(operation, x, y);
            displayUpdate(output);
            currInput = output;
        }
        inputOp(e);
    });
});
function inputOp(e) {
    operation = e.target.textContent;
    x = currInput;
    inputArr.splice(0, inputArr.length);
}

const equalsKey = document.querySelector('#equal');
equalsKey.addEventListener('click', () => {
    evaluate();
    operation = "";
});
function evaluate() {
    y = currInput;
    output = operate(operation, x, y);
    displayUpdate(output);
    currInput = output;
}

function displayUpdate(output) {
    display.textContent = output;
}

function getNumber(arr) {
    return parseInt(arr.join(""));
}

/*
Calcuator steps
1. enter first number
2. select operator
3. enter second number
4. press equals

further functionalities to add
- pressing an operator again would perform same functionality as =
- make numbers shrink to fit on screen

*/