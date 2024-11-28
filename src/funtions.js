/*  
    Dado una cadena M, cuente los números reales de la forma: 
    a) a.bbbb, donde a: es un número entre 1 y 999, y b: 
    entre 0 y 9. 
*/

function realCounter(inputString) {
    let numbers = []; // Para almacenar los números reales encontrados
    let currentNumber = []; // Para construir el número actual
    let hasDecimalPoint = false; // Bandera para rastrear si el número tiene un punto decimal

    // Convertir la cadena en un arreglo de caracteres
    const characters = inputString.trim().split("");

    characters.forEach((char, index) => {
        // Si es un dígito o un punto decimal
        if (!isNaN(char) && char !== " " || char === ".") {
            // Si encontramos un punto decimal
            if (char === ".") {
                
                if (hasDecimalPoint) {
                    // Si ya hay un punto decimal, terminamos el número actual
                    if (currentNumber.length > 0) {
                        numbers.push(currentNumber.join(""));
                        currentNumber = [];
                    }
                    hasDecimalPoint = false; // Resetear la bandera
                } else {
                    hasDecimalPoint = true; // Marcar que encontramos un punto decimal
                }

                if(currentNumber.length === 0) {
                    currentNumber = ["0"];
                    hasDecimalPoint = true;
                }
            }
            currentNumber.push(char);
        } else {
            // Si encontramos un carácter no numérico
            if (currentNumber.length > 0) {
                numbers.push(currentNumber.join(""));
                currentNumber = [];
                hasDecimalPoint = false; // Resetear la bandera
            }
        }

        // Agregar el último número si estamos al final del string
        if (index === characters.length - 1 && currentNumber.length > 0) {
            numbers.push(currentNumber.join(""));
        }
    });

    console.log(numbers);
    return numbers; // Retornar los números encontrados
}

function realCounterWithLimits(inputString) {
    let numbers = []; // Para almacenar los números reales encontrados
    let currentNumber = []; // Para construir el número actual
    let hasDecimalPoint = false; // Bandera para rastrear si el número tiene un punto decimal
    let decimalCount = 0; // Contador para los dígitos después del punto decimal
    let intCount = 0; // Contador para los dígitos de la parte entera

    // Convertir la cadena en un arreglo de caracteres
    const characters = inputString.trim().split("");

    characters.forEach((char, index) => {
        if (!isNaN(char) && char !== " ") { 
            // Es un dígito
            if (hasDecimalPoint) {
                // Parte decimal
                if (decimalCount < 4) {
                    currentNumber.push(char);
                    decimalCount++;
                } else {
                    // Si excede los 4 dígitos, se cierra el número actual
                    if (isValidNumber(intCount, decimalCount)) {
                        numbers.push(currentNumber.join(""));
                    }
                    resetCurrentNumber();
                    currentNumber.push(char);
                    intCount = 1;
                }
            } else {
                // Parte entera
                if (currentNumber.length === 0 && char === "0") {
                    // Números que empiezan con 0 no son válidos
                    resetCurrentNumber();
                } else {
                    if (intCount < 3) {
                        intCount++;
                        currentNumber.push(char);
                    } else {
                        // Si excede los 3 dígitos, se cierra el número actual
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
            // Manejo de punto decimal
            if (hasDecimalPoint || currentNumber.length === 0) {
                // Si ya hay un punto o está al inicio, se descarta el número actual
                resetCurrentNumber();
            } else {
                hasDecimalPoint = true;
                currentNumber.push(char);
            }
        } else {
            // Manejo de caracteres no numéricos
            if (currentNumber.length > 0 && isValidNumber(intCount, decimalCount)) {
                numbers.push(currentNumber.join(""));
            }
            resetCurrentNumber();
        }

        // Manejar el último carácter
        if (index === characters.length - 1 && currentNumber.length > 0 && isValidNumber(intCount, decimalCount)) {
            numbers.push(currentNumber.join(""));
        }
    });

    return numbers;

    // Función para resetear el número actual
    function resetCurrentNumber() {
        currentNumber = [];
        hasDecimalPoint = false;
        decimalCount = 0;
        intCount = 0;
    }

    // Validar si el número cumple con los límites
    function isValidNumber(intCount, decimalCount) {
        return (
            (intCount >= 1 && intCount <= 3 && !hasDecimalPoint) || // Números enteros (1-999)
            (intCount >= 1 && intCount <= 3 && decimalCount >= 1 && decimalCount <= 4) // Números con punto decimal
        );
    }
}

/*
    implemente la evaluación de expresiones aritméticas considerando los operadores +,-,*,/ y
    los operando pueden ser ingresados en notación científica (125e25,5e-8 para denotar 12x1025,
    5x10-8 respectivamente), la entrada al programa será una caden
*/

function evalExpresion(expresion) {
    try {
        let evaluation = eval(expresion)
        return evaluation
    } catch (error) {
        return null;
    }
}

/*
    Dado una cadena C con un programa en un lenguaje L, donde en la cadena E se encuentra
    las palabras reservadas de L, muestre un resumen indicando la cantidad de palabras reservadas
    de L en C.
*/


function countReservedWords(C, E) {
    let count = 0
    let cadena = new Set(C.split(/\W+/));
    let reservedWords =new Set(E.split(/\s+/));

    reservedWords.forEach(word => {
        if(cadena.has(word)) {
             count++; 
             console.log(word)
        }
    });

    return count
}