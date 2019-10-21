let displayValue = "";
let maxStringLength = 10;
let operators = ["+","-","/","x"]

function updateDisplay() {
  document.querySelector("h1").innerHTML = displayValue;
}

let num = document.querySelectorAll(".number");
num.forEach(function(number) {
  number.addEventListener("click", addNumber);
});

function addNumber() {
  let number = event.target.innerHTML;
  if(displayValue.length < maxStringLength){
    displayValue += number;
    updateDisplay();
  }
}

document.querySelector(".clearButton").onclick = function(){
  displayValue = "";
  updateDisplay();
};

document.querySelector(".delButton").onclick = function(){
  let delString = displayValue.slice(0, -1);
  displayValue = delString;
  updateDisplay();
};

document.querySelector(".equalButton").addEventListener("click", calc);

function calc() {
  let operatorCount = 0;
  let firstOperator;
  let calcArray = displayValue.split("");
  calcArray.forEach(function(item, index){
    operators.forEach(function(operator){
      if(operator == item){
        if(operatorCount == 1){
          let part = calcArray.slice(0, index);
          calculatePart(part, firstOperator);
        }
        firstOperator = operator;
        operatorCount++;
      }
    });
  });
}

function calculatePart(array, operator){
  console.log(array, operator);
  let num1 = array.slice(0, array.indexOf(operator));
  let num2 = array.slice(array.indexOf(operator) + 1, array.length);
  console.log(num1, num2);
}
