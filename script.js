const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (button.classList.contains('dark') || button.classList.contains('zero')) {
            if (value === '.') {
                appendDecimal();
            } else {
                appendNumber(value);
            }
        } else if (button.classList.contains('operator')) {
            if (value === '=') {
                calculate();
            } else {
                setOperator(value);
            }
        } else if (button.classList.contains('gray')) {
            switch (value) {
                case 'AC':
                    clear();
                    break;
                case '+/-':
                    toggleSign();
                    break;
                case '%':
                    percentage();
                    break;
            }
        }
    });
});

updateDisplay();
