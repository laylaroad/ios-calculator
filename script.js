let previousValue = '';
let currentValue = '';
let sign = '';
let result = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', 'x', '/']

const outScreen = document.querySelector('.calculator-screen p');

function clearScreen() {
    previousValue = '';
    currentValue = '';
    sign = '';
    result = false;
    outScreen.textContent = 0;
}

document.querySelector('.ac').onclick = clearScreen;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('button'))
        return;
    if (event.target.classList.contains('ac'))
        return;

    outScreen.textContent = '';
    const key = event.target.textContent;

    if (digits.includes(key)) {
        if (currentValue === '' && sign === '') {
            previousValue += key;

            outScreen.textContent = previousValue;
        }
        else if (previousValue !== '' && currentValue !== '' && result) {
            currentValue = key;
            result = false;
            outScreen.textContent = currentValue;
        }
        else {
            currentValue += key;
            outScreen.textContent = currentValue;
        }
        console.log(previousValue, currentValue, sign);
        return;
    }
    if (digits.includes(key)) {
        if (previousValue === '0') {
            previousValue += key;
            outScreen.textContent = '0,';
        }
        return;
    }

    if (actions.includes(key)) {
        sign = key;
        outScreen.textContent = sign;
        console.log(previousValue, currentValue, sign);
        return;
    }

    if (key === '=' || key === '%') {
        if (currentValue === '') currentValue = previousValue;
        if (key === '%') {
            previousValue = previousValue * 0.01;
        }
        switch (sign) {
            case "+":
                previousValue = (+previousValue) + (+currentValue);
                break;
            case "-":
                previousValue = previousValue - currentValue;
                break;
            case "x":
                previousValue = previousValue * currentValue;
                break;
            case "/":
                if (currentValue === '0') {
                    outScreen.textContent = 'Wrong!';
                    previousValue = '';
                    currentValue = '';
                    sign = '';
                    return;
                }
                previousValue = previousValue / currentValue;
                break;
        }
        result = true;
        // outScreen.textContent = result;
        // previousValue = result;
        outScreen.textContent = previousValue;
        console.log(previousValue, currentValue, sign);
    }
}
