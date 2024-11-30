/*  
    Dado una cadena M, cuente los números reales de la forma: 
    a.bbbb, donde a es un número entre 1 y 999, y b entre 0 y 9. 
*/
function realCounter(inputString) {
    let numbers = []; // Almacena los números reales encontrados
    let currentNumber = []; // Construye el número actual
    let hasDecimalPoint = false; // Indica si el número tiene un punto decimal
    const characters = inputString.trim().split("");

    characters.forEach((char, index) => {
        if (!isNaN(char) && char !== " " || char === ".") {
            if (char === ".") {
                if (hasDecimalPoint) {
                    if (currentNumber.length > 0) {
                        numbers.push(currentNumber.join(""));
                        currentNumber = [];
                    }
                    hasDecimalPoint = false;
                } else {
                    hasDecimalPoint = true;
                }
                if (currentNumber.length === 0) {
                    currentNumber = ["0"];
                }
            }
            currentNumber.push(char);
        } else {
            if (currentNumber.length > 0) {
                numbers.push(currentNumber.join(""));
                currentNumber = [];
                hasDecimalPoint = false;
            }
        }
        if (index === characters.length - 1 && currentNumber.length > 0) {
            numbers.push(currentNumber.join(""));
        }
    });

    return numbers; // Retorna los números encontrados
}

/*  
    Similar a `realCounter`, pero considera límites:
    - Parte entera: 1 a 3 dígitos.
    - Parte decimal: hasta 4 dígitos.
*/
function realCounterWithLimits(inputString) {
    let numbers = [];
    let currentNumber = [];
    let hasDecimalPoint = false;
    let decimalCount = 0;
    let intCount = 0;
    const characters = inputString.trim().split("");

    characters.forEach((char, index) => {
        if (!isNaN(char) && char !== " ") { 
            if (hasDecimalPoint) {
                if (decimalCount < 4) {
                    currentNumber.push(char);
                    decimalCount++;
                } else {
                    if (isValidNumber(intCount, decimalCount)) {
                        numbers.push(currentNumber.join(""));
                    }
                    resetCurrentNumber();
                    currentNumber.push(char);
                    intCount = 1;
                }
            } else {
                if (currentNumber.length === 0 && char === "0") {
                    resetCurrentNumber();
                } else {
                    if (intCount < 3) {
                        intCount++;
                        currentNumber.push(char);
                    } else {
                        if (isValidNumber(intCount, decimalCount)) {
                            numbers.push(currentNumber.join(""));
                        }
                        resetCurrentNumber();
                        currentNumber.push(char);
                        intCount = 1;
                    }
                }
            }
        } else if (char === ".") {
            if (hasDecimalPoint || currentNumber.length === 0) {
                resetCurrentNumber();
            } else {
                hasDecimalPoint = true;
                currentNumber.push(char);
            }
        } else {
            if (currentNumber.length > 0 && isValidNumber(intCount, decimalCount)) {
                numbers.push(currentNumber.join(""));
            }
            resetCurrentNumber();
        }
        if (index === characters.length - 1 && currentNumber.length > 0 && isValidNumber(intCount, decimalCount)) {
            numbers.push(currentNumber.join(""));
        }
    });

    return numbers;

    function resetCurrentNumber() {
        currentNumber = [];
        hasDecimalPoint = false;
        decimalCount = 0;
        intCount = 0;
    }

    function isValidNumber(intCount, decimalCount) {
        return (
            (intCount >= 1 && intCount <= 3 && !hasDecimalPoint) ||
            (intCount >= 1 && intCount <= 3 && decimalCount >= 1 && decimalCount <= 4)
        );
    }
}

/*  
    Evalúa expresiones aritméticas que incluyen notación científica.
    Ejemplo: 125e25, 5e-8.
*/
function evalExpresion(expresion) {
   return eval(expresion)
}

/*  
    Dado un programa en una cadena C, y las palabras reservadas E del lenguaje L, 
    cuenta cuántas palabras reservadas están en C.
*/
function countReservedWords(C, E) {
    let count = 0;
    let cadena = new Set(C.split(/\W+/));
    let reservedWords = new Set(E.split(/\s+/));

    reservedWords.forEach(word => {
        if (cadena.has(word)) {
            count++;
        }
    });

    return count;
}
