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
        } else if (selectedBrand === 'mercedes') {
            result = processMercedesNumber(cleanNumber);
        }
        
        if (selectedBrand === 'mercedes' && result.includes('|')) {
            const resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item');
            resultContainer.style.display = 'flex';
            resultContainer.style.flexWrap = 'wrap';
            resultContainer.style.gap = '8px';
        
            const resultParts = result.split('|').map(r => r.trim());
        
            resultParts.forEach(res => {
                const partWrapper = document.createElement('div');
                partWrapper.style.display = 'flex';
                partWrapper.style.alignItems = 'center';
                partWrapper.style.gap = '4px';
                partWrapper.style.padding = '4px 8px';
                partWrapper.style.background = '#f9f9f9';
                partWrapper.style.border = '1px solid #ddd';
                partWrapper.style.borderRadius = '6px';
        
                const copyButton = document.createElement('button');
                copyButton.classList.add('copy-button');
                copyButton.textContent = 'Copy';
                copyButton.onclick = () => {
                    navigator.clipboard.writeText(res).catch(err => {
                        console.error('Copy error:', err);
                    });
                };
        
                const resultText = document.createElement('span');
                resultText.textContent = res;
        
                partWrapper.appendChild(copyButton);
                partWrapper.appendChild(resultText);
                resultContainer.appendChild(partWrapper);
            });
        
            resultsDiv.appendChild(resultContainer);
        } else {
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
        }
    });
}

function processMoparNumber(number) {
    const firstChar = number[0];
    const secondChar = number[1];
    const lastChar = number.at(-1);
    const secondLastChar = number.at(-2);

    const isDigitsOnly = /^\d+$/.test(number);

    if (isDigitsOnly) {
        const len = number.length;

        if (firstChar !== '0' && lastChar === '0' && secondLastChar !== '0') {
            return `${number} / ${number.slice(0, -1)} ${lastChar}`;
        }

        if (firstChar === '0' && secondChar !== '0' && lastChar !== '0') {
            return `${number} / ${firstChar} ${number.slice(1)}`;
        }

        if (firstChar === '0' && secondChar !== '0' && lastChar === '0' && secondLastChar !== '0') {
            return `${number} / ${firstChar} ${number.slice(1)} / ${firstChar} ${number.slice(1, -1)} ${lastChar}`;
        }

        if (firstChar !== '0' && lastChar === '0' && secondLastChar === '0') {
            return `${number} / ${number.slice(0, -2)} ${number.slice(-2)}`;
        }

        if (firstChar === '0' && secondChar === '0' && lastChar !== '0') {
            return `${number} / ${number.slice(0, 2)} ${number.slice(2)}`;
        }

        if (firstChar !== '0' && lastChar !== '0') {
            return number;
        }

        if (firstChar === '0' && secondChar === '0' && lastChar === '0' && secondLastChar === '0') {
            return `${number} / ${number.slice(0, 2)} ${number.slice(2)} / ${number.slice(0, 2)} ${number.slice(2, -2)} ${number.slice(-2)}`;
        }

        if (firstChar === '0' && secondChar === '0' && lastChar === '0') {
            return `${number} / ${number.slice(0, 2)} ${number.slice(2)} / ${number.slice(0, 2)} ${number.slice(2, -1)} ${lastChar}`;
        }

        return "Incorrect number or format.";
    }

    const match = number.match(/^(\w+?)(\w{2})$/);
    if (match) {
        return `${number} / ${match[1]} ${match[2]}`;
    }

    return "Incorrect number or format.";
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

function processMercedesNumber(number) {

    let withoutFirstOne = number.slice(1);              // without first 1

    if (number[0] === 'A' || number[0] === 'a')
    {
        
        let firstThree = number.slice(1,4);
        let secondThree = number.slice(4,7);
        let thirdTwo = number.slice(7,9);
        let fourthTwo = number.slice(9,11);
        let fifthFour = number.slice(11);

        let middleWithoutAandFourLast = number.slice(1, -4);     // without A and last 4
        let middleWithoutAandTwoLast = number.slice(1, -2);     // without A and last 2
        let middleWithoutAandSixLast = number.slice(1, -6);     // without A and last 6

        // A0068173420
        if (number.length === 11)
        {
            return `${number} / ${withoutFirstOne} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo}`;
        }
        // A16681094009H43, 1668109400 / 16681094009H43 / 166 810 94 00 9H43
        if (number.length === 15)
        {
            return `${number} | ${middleWithoutAandFourLast} / ${withoutFirstOne} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthFour}`;
        }
        // A166810940099, 1668109400 / 166810940099 / 166 810 94 00 99
        if (number.length === 13)
        {
            return `${number} | ${middleWithoutAandTwoLast} / ${withoutFirstOne} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthFour}`;
        }
        // A2929107202648R02, 2929107202 / 2929107202648R02 / 292 910 72 02 64 8R02
        if (number.length === 17)
        {
            let fifthTwo = number.slice(11, 13);
            let SixFour = number.slice(13);

            return `${number} | ${middleWithoutAandSixLast} / ${withoutFirstOne} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthTwo} ${SixFour}`;
        }
    }
    else
    {
        let firstThree = number.slice(0,3);
        let secondThree = number.slice(3,6);
        let thirdTwo = number.slice(6,8);
        let fourthTwo = number.slice(8, 10);
        let fifthFour = number.slice(10);

        let middleWithoutFourLast = number.slice(0, -4);     // without last 4
        let middleWithoutTwoLast = number.slice(0, -2);     // without last 2
        let middleWithoutSixLast = number.slice(0, -6);     // without last 6


        // 0068173420
        if (number.length === 10)
        {
            return `A${number} / ${number} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo}`;
        }
        // 16681094009H43
        if (number.length === 14)
        {
            return `A${number} | ${middleWithoutFourLast} / ${number} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthFour}`;
        }
        // A166810940099, 1668109400 / 166810940099 / 166 810 94 00 99
        if (number.length === 12)
        {
            return `A${number} | ${middleWithoutTwoLast} / ${number} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthFour}`;
        }
        // A2929107202648R02, 2929107202 / 2929107202648R02 / 292 910 72 02 64 8R02
        if (number.length === 16)
        {
            let fifthTwo = number.slice(10, 12);
            let SixFour = number.slice(12);
    
            return `A${number} | ${middleWithoutSixLast} / ${number} / ${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo} ${fifthTwo} ${SixFour}`;
        }
    }


    if (number.length <= 9) {
        return `${number} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
    

    return "Incorrect number or format.";
}