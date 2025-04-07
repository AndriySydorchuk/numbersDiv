function processNumbers() {
    const input = document.getElementById('inputNumber').value.trim().toUpperCase();
    const selectedBrand = document.getElementById('brandSelector').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (input === '') {
        return;
    }

    const numbers = input.split(/\s+/);

    numbers.forEach(number => {
        let cleanNumber = number.replace(/-/g, '');
        let result = "Incorrect number or format.";

        if (selectedBrand === 'mopar' || selectedBrand === 'alfaromeo') {
            result = processMoparNumber(cleanNumber);
        } else if (selectedBrand === 'toyota' || selectedBrand === 'subaru' || selectedBrand === 'hyundai') {
            result = processToyotaOrSubaruNumber(cleanNumber);
        } else if (selectedBrand === 'maserati') {
            result = processMaseratiNumber(cleanNumber);
        } else if (selectedBrand === 'nissan') {
            result = processNissanNumber(cleanNumber);
        } else if (selectedBrand === 'mazda') {
            result = processMazdaNumber(cleanNumber);
        } else if (selectedBrand === 'mitsubishi') {
            result = processMitsubishiNumber(cleanNumber);
        } else if (selectedBrand === 'tesla') {
            result = processTeslaNumber(cleanNumber);
        } else if (selectedBrand === 'vag') {
            result = processVagNumber(cleanNumber);
        }

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => {
            navigator.clipboard.writeText(result).catch(err => {
                console.error('Copy error:', err);
            });
        };

        const resultText = document.createElement('span');
        resultText.textContent = result;

        resultItem.appendChild(copyButton);
        resultItem.appendChild(resultText);
        resultsDiv.appendChild(resultItem);
    });
}

function processMoparNumber(number) {
    const pattern = /^(\w+?)(\w{2})$/;
    const match = number.match(pattern);

    let firstOne = number.slice(0, 1);                  // first 1
    let firstTwo = number.slice(0, 2);                  // first 2
    let withoutFirstOne = number.slice(1);              // without first 1
    let withoutFirstTwo = number.slice(2);              // without first 2
    let withoutLastTwo = number.slice(0, -2);           // without last 2
    let withoutLast = number.slice(0, -1);           // without last 1
    let lastChar = number.slice(-1);                    // last
    let lastTwoChar = number.slice(-2);                 // last two
    let middle = number.slice(2, -1);                   // without first 2 & last
    let middleWithoutTwoLast = number.slice(2, -2);     // without first 2 & last
    let middleWithoutOneLast = number.slice(1, -1);     // without first 1 & last
    
    let isDigitsOnly = /^\d+$/.test(number);

    if (isDigitsOnly) {
            // 5005409570 / 500540957 0
        if (number[0] != '0' && number[number.length - 1] === '0' && number[number.length - 2] != '0') {
            return `${number} / ${withoutLast} ${lastChar}`;
        }   // 0500540957 / 0 500540957
        else if (number[0] === '0' && number[1] != '0' && number[number.length - 1] != '0') {
            return `${number} / ${firstOne} ${withoutFirstOne}`;
        }   // 05005409570 / 0 5005409570 / 0 500540957 0
        else if (number[0] === '0' && number[1] != '0' && number[number.length - 1] === '0' && number[number.length - 2] != '0') {
            return `${number} / ${firstOne} ${withoutFirstOne} / ${firstOne} ${middleWithoutOneLast} ${lastChar}`;
        }   // 50054095700 / 500540957 00
        else if (number[0] != '0' && number[number.length - 1] === '0' && number[number.length - 2] === '0') {
            return `${number} / ${withoutLastTwo} ${lastTwoChar}`;
        }   // 00500540957 / 00 500540957
        else if (number[0] === '0' && number[1] === '0' && number[number.length - 1] != '0') {
            return `${number} / ${firstTwo} ${withoutFirstTwo}`;
        }   // 500540957
        else if (number[0] != '0' && number[number.length - 1] != '0') {
            return `${number}`;
        }   // 0050054095700 / 00 50054095700 / 00 500540957 00
        else if (number[0] === '0' && number[1] === '0' && number[number.length - 1] === '0' && number[number.length - 2] === '0') {
            return `${number} / ${firstTwo} ${withoutFirstTwo} / ${firstTwo} ${middleWithoutTwoLast} ${lastTwoChar}`;
        }   // 005005409570 / 00 5005409570 / 00 500540957 0
        else if (number[0] === '0' && number[1] === '0' && number[number.length - 1] === '0') {
            return `${number} / ${firstTwo} ${withoutFirstTwo} / ${firstTwo} ${middle} ${lastChar}`;
        } else {
            return "Incorrect number or format.";
        } 
    } else {
        if (match) {
            const full = number;
            const split = `${match[1]} ${match[2]}`;
            return `${full} / ${split}`;
        } else {
            return "Incorrect number or format.";
        }
    }
    
}

function processToyotaOrSubaruNumber(number) {
    const mainPartLength = 10;

    if (number.length === mainPartLength) {
        const part1 = number.slice(0, 5);
        const part2 = number.slice(5);
        return `${number} / ${part1} ${part2}`;
    }

    if (number.length > mainPartLength) {
        const mainPart = number.slice(0, mainPartLength);
        const suffix = number.slice(mainPartLength);
        const part1 = mainPart.slice(0, 5);
        const part2 = mainPart.slice(5);
        return `${number} / ${mainPart} ${suffix} / ${part1} ${part2} ${suffix}`;
    }

    return "Incorrect number or format.";
}

function processMaseratiNumber(number) {
    if (number.length <= 9) {
        return number;
    }
    
    let formatted = number;
    if (number.startsWith("0") && number.endsWith("0")) {
        formatted = `0 ${number.slice(1, -1)} 0`;
    } else if (number.startsWith("0")) {
        formatted = `0 ${number.slice(1)}`;
    } else if (number.endsWith("0")) {
        formatted = `${number.slice(0, -1)} 0`;
    }
    
    return `${number} / ${formatted}`;
}

function processNissanNumber(number) {
    if (number.length === 10) {
        return `${number} / ${number.slice(0, 5)} ${number.slice(5)}`;
    }
    return "Incorrect number or format.";
}

function processMazdaNumber(number) {
    if (number.length === 9 || number.length === 10) {
        return `${number} / ${number.slice(0, 4)} ${number.slice(4, 6)} ${number.slice(6)}`;
    }
    if (number.length >= 11 && number.length <= 13) {
        let variant1 = `${number.slice(0, number.length - 2)} ${number.slice(-2)}`;
        let variant2 = `${number.slice(0, 4)} ${number.slice(4, 6)} ${number.slice(6, number.length - 2)} ${number.slice(-2)}`;
        return `${number} / ${variant1} / ${variant2}`;
    }
    return "Incorrect number or format.";
}

function processMitsubishiNumber(number) {
    if (number.length === 8) {
        return `${number} / ${number.slice(0, 4)} ${number.slice(4)}`;
    }
    if (number.length >= 10) {
        return `${number} / ${number.slice(0, 8)} ${number.slice(8)} / ${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8)}`;
    }
    return "Incorrect number or format.";
}

function processTeslaNumber(number) {
    if (number.length === 10) {
        return `${number} / ${number.slice(0, 9)} ${number.slice(9)} / ${number.slice(0, 7)} ${number.slice(7, 9)} ${number.slice(9)}`;
    }
    return "Incorrect number or format.";
}

function processVagNumber(number) {
    if (number.length <= 9) {
        return `${number} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
    if (number.length >= 10 && number.length <= 12) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`;
    }
    if (number.length >= 12 && number.length <= 13) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 10)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9,10)} ${number.slice(10)}`;
    }
    if (number.length === 14) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 11)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9,11)} ${number.slice(11)}`;
    }
    if (number.length === 15) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 12)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9,12)} ${number.slice(12)}`;
    }

    return "Incorrect number or format.";
}