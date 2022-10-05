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
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll('button');

getLastKeyPressed();

// button click events
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
        updateDisplay();
    });
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
            y = parseInt(output);
            output = operate(operator, x, y);
            updateDisplay();
        }

        // after clicking operator to evaluate, this will allow user to change the 
        // current operator
        if (isOperator(lastKeyPressed) && isOperator(currKeyPressed)) {
            operator = currKeyPressed;
        // otherwise, process the number
        } else {
            x = parseInt(output);
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
        console.log(x, y, output);
    }
    // if no values have been inputted yet, do nothing
    else if (x === undefined) { 
        return;
    // perform last operation and return value
    } else if (lastKeyPressed === currKeyPressed) {
        if (y === undefined) return;
        output = operate(lastOperator, output, y);
        updateDisplay();
    // evaluate expression
    } else {
        y = parseInt(output);
        output = operate(operator, x, y);
        updateDisplay();
        lastOperator = operator;
        operator = undefined;
    }
});

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
})


// helper functions
function appendNumber(n) {
    if (output == 0) {
        output = n;
    } else {
        output = output + n;
    }
}

function getLastKeyPressed() {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            lastKeyPressed = currKeyPressed;
            currKeyPressed = e.target.textContent;
            console.log(`Last: ${lastKeyPressed} \nCurr: ${currKeyPressed}`);
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