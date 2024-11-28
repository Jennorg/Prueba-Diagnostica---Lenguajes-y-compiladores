//Without Limits
const input_M = document.getElementById("input_M");
const count = document.getElementById("there_is");
const numbers = document.getElementById("numbers");
const try_btn = document.getElementById("try_btn");

//With Limits
const input_M_with_limits = document.getElementById("input_M_with_limits");
const countWithLimits = document.getElementById("there_is_with_limits");
const numbersWithLimits = document.getElementById("numbers_with_limits");
const try_btn_with_limits = document.getElementById("try_btn_with_limits");

const expresion = document.getElementById("expresion");
const evalueExpresion = document.getElementById("evalue_expresion");
const p_evalue_expresion = document.getElementById("evalued_expresion");

const c = document.getElementById("C");
const e = document.getElementById("E");
const tryBTN = document.getElementById("try");
const output = document.getElementById("output");

// Función para limpiar listas
const clearList = (list) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

// Función para crear y estilizar elementos de lista
const createStyledListItem = (content) => {
    const li = document.createElement("li");
    li.textContent = content;
    li.className = "p-2 bg-blue-100 rounded-md shadow-md text-blue-800";
    return li;
};

// Event Listeners
try_btn.addEventListener("click", () => {
    clearList(numbers);
    const countedNumbers = realCounter(input_M.value);
    count.textContent = `Hay: ${countedNumbers.length}`;
    countedNumbers.forEach(number => {
        numbers.appendChild(createStyledListItem(number));
    });

    // Efecto visual al actualizar
    count.classList.add("text-green-600", "font-semibold");
    setTimeout(() => count.classList.remove("text-green-600", "font-semibold"), 1000);
});

try_btn_with_limits.addEventListener("click", () => {
    clearList(numbersWithLimits);
    const countedNumbers = realCounterWithLimits(input_M_with_limits.value);
    countWithLimits.textContent = `Hay: ${countedNumbers.length}`;
    countedNumbers.forEach(number => {
        numbersWithLimits.appendChild(createStyledListItem(number));
    });

    // Efecto visual al actualizar
    countWithLimits.classList.add("text-green-600", "font-semibold");
    setTimeout(() => countWithLimits.classList.remove("text-green-600", "font-semibold"), 1000);
});

evalueExpresion.addEventListener("click", () => {
    try {
        p_evalue_expresion.textContent = evalExpresion(expresion.value);
        p_evalue_expresion.className = "text-green-600 font-medium";
    } catch (error) {
        p_evalue_expresion.textContent = "Error en la evaluación";
        p_evalue_expresion.className = "text-red-600 font-medium";
    }
});

// Palabras reservadas
tryBTN.addEventListener("click", () => {
    const reservedCount = countReservedWords(c.value, e.value);
    output.textContent = reservedCount;
    output.className = "p-2 rounded-md bg-yellow-100 text-yellow-800";
});

// Ejemplo de implementación
const C = `
function sum(a, b) {
    return a + b;
}
if (a > 0) {
    console.log("Positive");
}
`;

const E = "function return if else for console";



