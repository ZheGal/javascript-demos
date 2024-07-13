const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

const values = {
  first: null,
  operator: null,
  awaitingNext: false,
};

function sendNumberValue(number) {
  if (values.awaitingNext) {
    calculatorDisplay.textContent = number;
    values.awaitingNext = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (_, secondNumber) => secondNumber,
};

function useOperator(operator) {
  console.log(values);
  const currentValue = Number(calculatorDisplay.textContent);
  if (values.operator && values.awaitingNext) {
    values.operator = operator;
    return;
  }
  if (!values.first) {
    values.first = currentValue;
  } else {
    const calculation = calculate[values.operator](values.first, currentValue);
    values.first = calculation;
    calculatorDisplay.textContent = calculation;
  }
  values.awaitingNext = true;
  values.operator = operator;
}

function addDecimal() {
  const displayValue = calculatorDisplay.textContent;
  if (values.awaitingNext) {
    return;
  }
  if (!displayValue.includes(".")) {
    calculatorDisplay.textContent = `${displayValue}.`;
  }
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

function resetAll() {
  calculatorDisplay.textContent = "0";
  values.first = null;
  values.operator = null;
  values.awaitingNext = false;
}

clearBtn.addEventListener("click", resetAll);
