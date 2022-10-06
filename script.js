// Globals
let output = 0;
let x;
let y;
let lastOperator;
let operator;
let currKeyPressed;
let lastKeyPressed;

const display = document.querySelector('#display');
const displayContainer = document.querySelector('#displayContainer');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equals = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const plusMinus = document.querySelector('#plusMinus');
const percent = document.querySelector('#percent');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll('button');

getLastKeyClicked();

// button click events
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        append(e.target.textContent);
        updateDisplay();
    });
});


operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.focus();
        console.log(e.target.textContent);
        getOperator();
    });
});

equals.addEventListener('click', () => {
    evaluate();
});

clear.addEventListener('click', () => {
    reset();
    updateDisplay();
});

decimal.addEventListener('click', () => {
    if (output.toString().includes(".")) {
        return;
    } else {
        append('.');
        updateDisplay();
    }
});

plusMinus.addEventListener('click', () => {
    output *= -1;
    updateDisplay();
});

percent.addEventListener('click', () => {
    output = (output / 100);
    updateDisplay();
})

// keyboard support
window.addEventListener("keydown", (e) => keyboardInput(e));

// helper functions
function append(n) {
    if (output === 0) {
        if (n === '.') {
            output += n;
        } else {
            // shows only 1 zero on screen when output is 0 and user presses 0
            output = parseInt(output) + parseInt(n);
        }
    } else {
        output += n;
    }
}

function getLastKeyClicked() {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            lastKeyPressed = currKeyPressed;
            currKeyPressed = e.target.textContent;
        });
    });
}

function updateDisplay() {
    display.textContent = parseFloat(output);
    resize();
}

function isOperator(a) {
    switch(a) {
        case '+':
            return true;
        case '-':
            return true;
        // * in unicode
        case '\u00d7':
            return true;
        // division in unicode
        case '\u00f7':
            return true;
    }
    return false;
}

const getOperator = function() {
    // if same operator is pressed, we ignore input
    if (lastKeyPressed == currKeyPressed) return;

    // Only one of the two following if's will be evaluated
    // if the previous key and current key are both operators, we update
    // the operator to the current operator
    if (isOperator(lastKeyPressed) && isOperator(currKeyPressed)) {
        operator = currKeyPressed;
    // if the current key pressed is an operator and the last key press is not
    // and there already exists an operator, then we will evaluate the 
    // current expression
    } else if (operator !== undefined && isOperator(currKeyPressed)) {
        y = parseFloat(output);
        output = round(operate(operator, x, y));
        updateDisplay();
    }

    // after clicking operator to evaluate, this will allow user to change the 
    // current operator
    if (isOperator(lastKeyPressed) && isOperator(currKeyPressed)) {
        operator = currKeyPressed;
    // otherwise, process the number
    } else {
        x = parseFloat(output);
        operator = currKeyPressed;
        output = "";
    }
}

const evaluate = function() {
    // if there's no second value inputted after operator, the = key
    // assumes the second value is the same as the first
    if (isOperator(lastKeyPressed)) {
        y = x;
        operator = lastKeyPressed;
        output = round(operate(operator, x, y));
        updateDisplay();
        lastOperator = operator;
        operator = undefined;
    // if no values have been inputted yet, do nothing
    } else if (x === undefined) { 
        return;
    // perform last operation and return value
    } else if (lastKeyPressed === currKeyPressed) {
        if (y === undefined) return;
        output = round(operate(lastOperator, output, y));
        updateDisplay();
    // evaluate expression
    } else {
        if (operator === undefined) {
            x = parseFloat(output);
            output = round(operate(lastOperator, x, y));
            updateDisplay();
            return;
        }
        y = parseFloat(output);
        lastOperator = operator;
        output = round(operate(operator, x, y));
        console.log(operator, x, y, output);
        updateDisplay();
        operator = undefined;
    }
}

const reset = function() {
    output = 0;
    x = undefined;
    y = undefined;
    z = undefined;
    lastOperator = undefined;
    operator = undefined;
    currKeyPressed = undefined;
    lastKeyPressed = undefined;
}

const keyboardInput = function(e) {
    if (e.key === '0') document.getElementById("zero").click();
    if (e.key > 0 && e.key <= 9) document.getElementById(`${e.key}`).click();
    if (e.key === "Backspace") document.getElementById("clear").click();
    if (e.key === '_') document.getElementById("plusMinus").click();
    if (e.key === "%") document.getElementById("percent").click();
    if (e.key === "/") document.getElementById("divide").click();
    if (e.key === "*") document.getElementById("mulitply").click();
    if (e.key === "-") document.getElementById("subtract").click();
    if (e.key === "+") document.getElementById("add").click();
    if (e.key === "Enter") document.getElementById("equal").click();
    if (e.key === ".") document.getElementById("decimal").click();
}

const resize = function() {
    if (display.textContent.length >= 7) {
        let excess = display.textContent.length - 7;
        let newFontSize = 46 - (excess * 3.5);
        console.log(newFontSize);
        display.style.fontSize = `${newFontSize}px`;
    } else {
        display.style.fontSize = `46px`;
    }
}

const round = function(num) {
    return Math.round((num + Number.EPSILON) * 10000000) / 10000000;
}

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
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function operate(operator, x, y) {
    switch(operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '\u00d7':
            return multiply(x, y);
        case '\u00f7':
           return divide(x, y);
    }
}