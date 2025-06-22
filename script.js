const brandSelector = new Choices('#brandSelector', {
    searchEnabled: true,
    itemSelectText: '',
});

document.getElementById('brandSelector').addEventListener('change', e => {
    localStorage.setItem('selectedBrand', e.target.value);
    processNumbers();
});

window.onload = function () {
    const savedBrand = localStorage.getItem('selectedBrand');
    const brandSelector = document.getElementById('brandSelector');
    if (savedBrand) {
        brandSelector.value = savedBrand;
    }
    processNumbers();
};

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
        let result = "Unsupported format.";

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
        } else if (selectedBrand === 'bmw') {
            result = processBmwNumber(cleanNumber);
        } else if (selectedBrand === 'ford') {
            result = processFordNumber(number);
        } else if (selectedBrand === 'landrover') {
            result = processLandRoverNumber(number);
        }

        if (selectedBrand === 'mercedes' && result.includes('|')) {
            const resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item');
            resultContainer.style.display = 'flex';
            resultContainer.style.flexWrap = 'wrap';
            resultContainer.style.gap = '8px';
            resultContainer.style.backgroundColor = "white";

            const resultParts = result.split('|').map(r => r.trim());

            resultParts.forEach(res => {
                const partWrapper = document.createElement('div');
                partWrapper.classList.add('result-item-hover');
                partWrapper.style.display = 'flex';
                partWrapper.style.alignItems = 'center';
                partWrapper.style.gap = '4px';
                partWrapper.style.padding = '4px 8px';
                partWrapper.style.border = '1px solid #ddd';
                partWrapper.style.borderRadius = '6px';

                if (result === "Unsupported format.") {
                    partWrapper.classList.add('result-disabled');
                } else {
                    partWrapper.style.cursor = 'pointer';
                    partWrapper.onclick = () => {
                        navigator.clipboard.writeText(res).catch(err => {
                            console.error('Copy error:', err);
                        });
                    };
                }

                const resultText = document.createElement('span');
                resultText.textContent = res;

                partWrapper.appendChild(resultText);
                resultContainer.appendChild(partWrapper);
            });

            resultsDiv.appendChild(resultContainer);
        } else {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            if (result === "Unsupported format.") {
                resultItem.classList.add('result-disabled');
            } else {
                resultItem.style.cursor = 'pointer';
                resultItem.onclick = () => {
                    navigator.clipboard.writeText(result).catch(err => {
                        console.error('Copy error:', err);
                    });
                };
            }

            const resultText = document.createElement('span');
            resultText.textContent = result;

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

        return "Unsupported format.";
    }

    const match = number.match(/^(\w+?)(\w{2})$/);
    if (match) {
        return `${number} / ${match[1]} ${match[2]}`;
    }

    return "Unsupported format.";
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

    return "Unsupported format.";
}

function processMaseratiNumber(number) {
    const isDigitsOnly = /^\d+$/.test(number);
    if (!isDigitsOnly) return "Unsupported format.";
    if (number.length < 9) return "Unsupported format.";
    if (number.length === 9) return number;

    let start = 0;
    let end = number.length;

    // Рахуємо нулі з початку
    while (number[start] === '0') {
        start++;
    }

    // НЕ обрізаємо нулі з кінця одразу — натомість спробуємо знайти ядро
    let core = number.slice(start);

    // Якщо "ядро" довше за 9 — обрізаємо з кінця
    if (core.length > 9) {
        core = core.slice(0, 9);
    }

    // Якщо "ядро" коротше за 9 — розширяємо межі назад у зону нулів на початку
    while (core.length < 9 && start > 0) {
        start--;
        core = number.slice(start, start + 9);
    }

    // Визначаємо частини
    const leading = number.slice(0, start);
    const trailing = number.slice(start + 9);

    let formatted = number + " /";
    if (leading) formatted += ` ${leading}`;
    formatted += ` ${core}`;
    if (trailing) formatted += ` ${trailing}`;

    return formatted;
}



function processNissanNumber(number) {
    if (number.length === 10) {
        return `${number} / ${number.slice(0, 5)} ${number.slice(5)}`;
    }
    return "Unsupported format.";
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
    return "Unsupported format.";
}

function processMitsubishiNumber(number) {
    if (number.length === 8) {
        return `${number} / ${number.slice(0, 4)} ${number.slice(4)}`;
    }
    if (number.length >= 10) {
        return `${number} / ${number.slice(0, 8)} ${number.slice(8)} / ${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8)}`;
    }
    return "Unsupported format.";
}

function processTeslaNumber(number) {
    if (number.length === 10) {
        return `${number} / ${number.slice(0, 9)} ${number.slice(9)} / ${number.slice(0, 7)} ${number.slice(7, 9)} ${number.slice(9)}`;
    }
    return "Unsupported format.";
}

function processVagNumber(number) {
    if (number.length <= 9) {
        return `${number} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
    if (number.length >= 10 && number.length <= 12) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`;
    }
    if (number.length >= 12 && number.length <= 13) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 10)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9, 10)} ${number.slice(10)}`;
    }
    if (number.length === 14) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 11)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9, 11)} ${number.slice(11)}`;
    }
    if (number.length === 15) {
        return `${number} / ${number.slice(0, 9)} / ${number.slice(0, 12)} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9, 12)} ${number.slice(12)}`;
    }

    return "Unsupported format.";
}

function processMercedesNumber(number) {
    const isWithA = number[0].toUpperCase() === 'A';
    const raw = isWithA ? number.slice(1) : number;
    const len = number.length;

    const firstThree = raw.slice(0, 3);
    const secondThree = raw.slice(3, 6);
    const thirdTwo = raw.slice(6, 8);
    const fourthTwo = raw.slice(8, 10);
    const fifthTwo = raw.slice(10, 12);
    const fifthFour = raw.slice(10);
    const sixthFour = raw.slice(12);

    const baseSplit = `${firstThree} ${secondThree} ${thirdTwo} ${fourthTwo}`;

    if (isWithA) {
        if (len === 11) {
            return `${number} / ${raw} / ${baseSplit}`;
        }
        if (len === 13) {
            return `${number} | ${raw.slice(0, -2)} / ${raw} / ${baseSplit} ${fifthFour}`;
        }
        if (len === 15) {
            return `${number} | ${raw.slice(0, -4)} / ${raw} / ${baseSplit} ${fifthFour}`;
        }
        if (len === 17) {
            return `${number} | ${raw.slice(0, -6)} / ${raw} / ${baseSplit} ${fifthTwo} ${sixthFour}`;
        }
    } else {
        const withA = `A${number}`;

        if (len === 10) {
            return `${withA} / ${number} / ${baseSplit}`;
        }
        if (len === 12) {
            return `${withA} | ${number.slice(0, -2)} / ${number} / ${baseSplit} ${fifthFour}`;
        }
        if (len === 14) {
            return `${withA} | ${number.slice(0, -4)} / ${number} / ${baseSplit} ${fifthFour}`;
        }
        if (len === 16) {
            return `${withA} | ${number.slice(0, -6)} / ${number} / ${baseSplit} ${fifthTwo} ${sixthFour}`;
        }
    }

    if (len <= 9) {
        return `${number} / ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }

    return "Unsupported format.";
}

function processBmwNumber(number) {
    //const onlyDigits = number.replace(/\D/g, '');

    if (number.length === 7) {
        // Short number: 7 221 001
        const part1 = number.slice(0, 1);
        const part2 = number.slice(1, 4);
        const part3 = number.slice(4);
        return `${number} / ${part1} ${part2} ${part3}`;
    }

    if (number.length === 11) {
        // Long number: 5143 7288219 and 51 43 7 288 219
        const split1 = `${number.slice(0, 4)} ${number.slice(4)}`;
        const split2 = `${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 5)} ${number.slice(5, 8)} ${number.slice(8)}`;
        return `${number} / ${split1} / ${split2}`;
    }

    return "Unsupported format.";
}

function processFordNumber(number) {
    if (number.length < 5) {
        return "Unsupported format.";
    }

    if (number.includes('-')) {
        const clean = number.replace(/-/g, '');
        const parts = number.split('-');
        if (parts.length === 3) {
            return `${clean} / ${parts[0]}${parts[1]} ${parts[2]} / ${parts[0]} ${parts[1]} ${parts[2]}`;
        } else {
            return `${clean} / ${parts.join(' ')}`;
        }
    }

    const isLetter = (ch) => /^[A-Z]$/i.test(ch);

    if (isLetter(number.at(-1))) {
        let i = number.length - 1;
        while (i >= 0 && isLetter(number[i])) {
            i--;
        }
        const suffix = number.slice(i + 1);
        const firstPart = number.slice(0, 4);
        const middlePart = number.slice(4, i + 1);
        return `${number} / ${number.slice(0, number.length - suffix.length)} ${suffix} / ${firstPart} ${middlePart} ${suffix}`;
    } else {
        const firstPart = number.slice(0, 4);
        const secondPart = number.slice(4);
        return `${number} / ${firstPart} ${secondPart}`;
    }
}

function processLandRoverNumber(number) {
    if (number.length >= 9) {
        return processFordNumber(number);
    }

    const prefix = number.slice(0, 2).toUpperCase();

    if (prefix === 'LR' || prefix === 'L0') {
        const part1 = number.slice(0, 2);
        const part2 = number.slice(2);
        return `${number} / ${part1} ${part2}`;
    } else {
        const part1 = number.slice(0, 3);
        const part2 = number.slice(3);
        return `${number} / ${part1} ${part2}`;
    }
}

function processText()
{
    const input = document.getElementById('inputText').value.trim().toUpperCase();
    const resultsDiv = document.getElementById('resultText');
    resultsDiv.innerHTML = '';

    if (input === '') {
        return;
    }
    else
    {
        result = input.toUpperCase();
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        
            resultItem.style.cursor = 'pointer';
            resultItem.onclick = () => {
                navigator.clipboard.writeText(result).catch(err => {
                    console.error('Copy error:', err);
                });
            };

        const resultText = document.createElement('span');
        resultText.textContent = result;

        resultItem.appendChild(resultText);
        resultsDiv.appendChild(resultItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleArrow');
  const input = document.getElementById('inputText');
  const result = document.getElementById('resultText');
  let visible = true;

  toggle.addEventListener('click', () => {
    visible = !visible;

    if (!visible) {
      input.style.display = 'none';
      input.value = '';
      result.textContent = '';
    } else {
      input.style.display = 'block';
    }

    toggle.textContent = visible ? '✔️' : '➕';
  });
});
