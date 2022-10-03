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
display.textContent = 0;

// Index 0: x, 1: operator, 2: y
// let inputArr = [];

let x = 0;
let y = 0;
let currInput;
let arr = [];
const numberKeys = document.querySelectorAll('.number');
function inputNumber() {
    numberKeys.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            arr.push(e.target.textContent);
            console.log(arr);
            currInput = getNumber(arr);
            displayUpdate(currInput);
            console.log(`X = ${x}`);
            console.log(`Y = ${y}`);
        });
    });
}
inputNumber();

let operation;
const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        operation = e.target.textContent;
        x = currInput;
        arr.splice(0, arr.length);
        console.log(`op: ${operation}`);
        console.log(`X = ${x}`);
        console.log(`Y = ${y}`);
    });
});

let output;
const equalsKey = document.querySelector('#equal');
equalsKey.addEventListener('click', (e) => {
    y = currInput;
    output = operate(operation, x, y);
    displayUpdate(output);
    currInput = output;
    console.log(`output: ${output}`);
    console.log(`X = ${x}`);
    console.log(`Y = ${y}`);
});

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