const display = document.querySelector('#display');
const displayContainer = document.querySelector('#displayContainer');

// Globals
let currInput = 0;
let inputArr = [];
let x;
let y;
let operation = "";
let output;
// Initial calculator display
displayUpdate(currInput);

// button click events
const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        getNumber(e);
    });
});

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(`op: ${operation}`);
        console.log(`X = ${x}`);
        console.log(`Y = ${y}`);
        if (operation !== "") {
            evaluate();
        }
        getOperator(e);
    });
});

const equalsKey = document.querySelector('#equal');
equalsKey.addEventListener('click', () => {
    if (operation !== "") {
        evaluate();
    }
    return;

    // console.log(`X = ${x}`);
    // console.log(`Y = ${y}`);
    // console.log(`op: ${operation}`);
    // console.log(`output: ${output}`);
});

// functions
function getNumber(e) {
    inputArr.push(e.target.textContent);
    currInput = toNumber(inputArr);
    displayUpdate(currInput);
}

function toNumber(arr) {
    return parseInt(arr.join(""));
}

function getOperator(e) {
    operation = e.target.textContent;
    x = currInput;
    inputArr.splice(0, inputArr.length);
}

function evaluate() {
    y = currInput;
    output = operate(operation, x, y);
    displayUpdate(output);
    currInput = output;
    operation = "";
}

function displayUpdate(output) {
    display.textContent = output;
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

// arithmetic functions
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