const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');

let currentExpression = '';
let lastOperationWasEquals = false;

function appendToDisplay(value) {
    if (lastOperationWasEquals && (value >= '0' && value <= '9' || value === '.')) {
        currentExpression = '';
        display.value = '';
        lastOperationWasEquals = false;
    } else if (lastOperationWasEquals && (value === '+' || value === '-' || value === '*' || value === '/')) {
        lastOperationWasEquals = false;
    } else if (lastOperationWasEquals) {
        currentExpression = '';
        display.value = '';
        lastOperationWasEquals = false;
    }

    if (value === '.' && (currentExpression.includes('.') && !/[+\-*/]/.test(currentExpression.split(/[+\-*/]/).pop()))) {
        return;
    }

    if (value === '0' && currentExpression === '0') {
        return;
    }
    if (value !== '.' && currentExpression === '0') {
        currentExpression = value;
    } else {
        currentExpression += value;
    }

    display.value = currentExpression;
}

function clearDisplay() {
    currentExpression = '';
    display.value = '';
    lastOperationWasEquals = false;
}

function calculateSquare() {
    try {
        let num = eval(currentExpression);
        if (isNaN(num)) {
            display.value = 'Error';
            currentExpression = '';
            return;
        }
        const result = num * num;
        display.value = result;
        currentExpression = result.toString();
        lastOperationWasEquals = true;
    } catch (error) {
        display.value = 'Error';
        currentExpression = '';
        lastOperationWasEquals = true;
    }
}

function calculateCube() {
    try {
        let num = eval(currentExpression);
        if (isNaN(num)) {
            display.value = 'Error';
            currentExpression = '';
            return;
        }
        const result = num * num * num;
        display.value = result;
        currentExpression = result.toString();
        lastOperationWasEquals = true;
    } catch (error) {
        display.value = 'Error';
        currentExpression = '';
        lastOperationWasEquals = true;
    }
}

function calculateResult() {
    try {
        let expressionToEvaluate = currentExpression.replace(/x²/g, '**2').replace(/x³/g, '**3');

        if (expressionToEvaluate.includes('/0')) {
            display.value = 'Error: Div by 0';
            currentExpression = '';
            lastOperationWasEquals = true;
            return;
        }

        const result = eval(expressionToEvaluate);

        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
            currentExpression = '';
            lastOperationWasEquals = true;
            return;
        }

        display.value = result;
        currentExpression = result.toString();
        lastOperationWasEquals = true;
    } catch (error) {
        display.value = 'Error';
        currentExpression = '';
        lastOperationWasEquals = true;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        switch (value) {
            case 'clear':
                clearDisplay();
                break;
            case 'square':
                calculateSquare();
                break;
            case 'cube':
                calculateCube();
                break;
            case '=':
                calculateResult();
                break;
            default:
                appendToDisplay(value);
                break;
        }
    });
});
