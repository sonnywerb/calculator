// Globals
let output = 0;
let x;
let y;
let z;
let operator;
let currKeyPressed;
let lastKeyPressed;

const display = document.querySelector('#display');
const displayContainer = document.querySelector('#displayContainer');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equal');
const buttons = document.querySelectorAll('button');

function getLastKeyPressed() {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            lastKeyPressed = currKeyPressed;
            currKeyPressed = e.target.textContent;
            console.log(`Last: ${lastKeyPressed} \nCurr: ${currKeyPressed}`);
        });
    });
}
getLastKeyPressed();

function updateDisplay() {
    display.textContent = output;
}

// button click events
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
        updateDisplay();
    });
});

function appendNumber(n) {
    if (output == 0) {
        output = n;
    } else {
        output = output + n;
    }
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

operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
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

equalsBtn.addEventListener('click', () => {
    if (lastKeyPressed == currKeyPressed) return;
    if (isOperator(lastKeyPressed)) return;

    y = parseInt(output);
    output = operate(operator, x, y);
    updateDisplay();

    // reset x and y
    x = undefined;
    y = undefined;
    operator = undefined;

    console.log(`Clicked Equals Log \nx: ${x} \ny: ${y} \noperator: ${operator} \noutput: ${output}`)
});

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