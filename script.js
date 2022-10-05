/*
Things to work on
- decimal
- +/- symbol
- % symbol
- dynamic resizing of numbers
- scientific notation
- working with floats
*/

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

getLastKeyPressed();

// button click events
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        append(e.target.textContent);
        updateDisplay();
    });
    // keyboard support
    btn.addEventListener('keydown', (e) => {
        append(e.target.key);
        // console.log(e.target.key);
        updateDisplay();
    })
});

operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.focus();
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
            output = operate(operator, x, y);
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
    });
});

equals.addEventListener('click', () => {
    // if there's no second value inputted after operator, the = key
    // assumes the second value is the same as the first
    if (isOperator(lastKeyPressed)) {
        y = x;
        operator = lastKeyPressed;
        output = operate(operator, x, y);
        updateDisplay();
        lastOperator = operator;
        operator = undefined;
    // if no values have been inputted yet, do nothing
    } else if (x === undefined) { 
        return;
    // perform last operation and return value
    } else if (lastKeyPressed === currKeyPressed) {
        if (y === undefined) return;
        output = operate(lastOperator, output, y);
        updateDisplay();
    // evaluate expression
    } else {
        if (operator === undefined) {
            x = parseFloat(output);
            output = operate(lastOperator, x, y);
            updateDisplay();
            return;
        }
        y = parseFloat(output);
        lastOperator = operator;
        output = operate(operator, x, y);
        updateDisplay();
        operator = undefined;
    }
});

// last=digit current='=' &&  


clear.addEventListener('click', () => {
    output = 0;
    x = undefined;
    y = undefined;
    z = undefined;
    lastOperator = undefined;
    operator = undefined;
    currKeyPressed = undefined;
    lastKeyPressed = undefined;
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

function getLastKeyPressed() {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            lastKeyPressed = currKeyPressed;
            currKeyPressed = e.target.textContent;
            // console.log(`Last: ${lastKeyPressed} \nCurr: ${currKeyPressed}`);
        });
    });
}

function updateDisplay() {
    display.textContent = output;
}

function isOperator(a) {
    switch(a) {
        case '+':
            return true;
        case '-':
            return true;
        case '*':
            return true;
        case '/':
            return true;
    }
    return false;
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
        case '*':
            return multiply(x, y);
        case '/':
           return divide(x, y);
    }
}