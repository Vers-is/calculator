const buttons = document.querySelectorAll(".box4x4 > div");
const display = document.querySelector(".display");

let currentValue = "";     
let previousValue = "";    
let operator = null;     
let expression = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("action");
    const value = button.getAttribute("value");

    if (value) {
      currentValue += value;
      expression += value;
      updateDisplay(expression);
    } else if (action) {
      handleAction(action);
    }
  });
});

function handleAction(action) {
  switch (action) {
    case "clear":
      clear();
      break;
    case "changeSign":
      currentValue = currentValue ? changeSign(parseFloat(currentValue)).toString() : "";
      expression = currentValue;
      updateDisplay(expression);
      break;
    case "makePercent":
      currentValue = currentValue ? makePercent(parseFloat(currentValue)).toString() : "";
      expression = currentValue;
      updateDisplay(expression)
      break;
    case "makeDouble":
      if (!currentValue.includes(".")) {
        currentValue += ".";
        expression = currentValue;
        updateDisplay(expression)
      }
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      setOperator(action);
      break;
    case "calculate":
      calculateResult();
      break;
  }
}

function setOperator(action) {
  if (currentValue) {
    if (previousValue) {
      calculateResult(); 
    } else {
      previousValue = currentValue; 
    }
    currentValue = "";
    expression += " " + OPERATIONS[action] + " ";
    operator = action;
    updateDisplay(expression);
  }
}

function calculateResult() {
  if (previousValue && currentValue && operator) {
    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);

    const result = calculate({
      a,
      b,
      operation: OPERATIONS[operator], 
    });

    expression = result.toString();
    previousValue = result.toString();
    currentValue = "";
    operator = null;

    updateDisplay(result);
  }
}

function clear() {
  currentValue = "";
  previousValue = "";
  operator = null;
  expression="";
  updateDisplay("0");
}

function changeSign(a) {
  return -a;
}

function makePercent(a) {
  return a / 100;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function add(a, b) {
  return a + b;
}

const OPERATIONS = {
  add: "+",
  subtract: "-",
  divide: "/",
  multiply: "*",
};

function calculate({ a, b, operation }) {
  switch (operation) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return b !== 0 ? divide(a, b) : "Error";
    default:
      return null;
  }
}
