let displayValue = "";
let maxStringLength = 10;
const firstPriority = ["x", "/"];
const secondPriority = ["+", "-"]
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


document.querySelector(".equalButton").addEventListener("click", function(){
  equationParting(displayValue.split(""));
});

function equationParting(array) {
  //Crate array with index of all operators
  let operatorArray = [];
  array.forEach(function(item, index) {
    if(operators.includes(item)){
      operatorArray.push(index + item);
    }
  });

  operatorArray.forEach(function(item, index){
    if(firstPriority.includes(item.substr(1))){
      let part = array.splice(index - 1, array.lenght - index + 1);
      console.log(part);
    }
  });

  console.log(operatorArray);
}


function calc() {
  let operatorCount = 0;
  let firstOperator;
  let calcArray = displayValue.split("");
  calcArray.forEach(function(item, index){
    operators.forEach(function(operator){
      if(operator == item){
        if(operatorCount == 1){
          let part = calcArray.slice(0, index);
          calcArray = calcArray.slice(index, calcArray.length);
          console.log(calcArray);
          let newNum = calculatePart(part, firstOperator);
          console.log(newNum);
          let newCalcArray = newNum.concat(calcArray);
          console.log(newCalcArray);
        }
        firstOperator = operator;
        operatorCount++;
      }
    });
  });
}

function calculatePart(array, operator){
  let num1 = array.slice(0, array.indexOf(operator)).join("");
  let num2 = array.slice(array.indexOf(operator) + 1, array.length).join("");
  let newNum = calcSwitch(num1, num2, operator);
  return newNum.toString().split("");
}

function calcSwitch(num1, num2, operator){
  switch (operator) {
    case "+":
      return Number(num1) + Number(num2);
      break;
    case "-":
      return Number(num1) - Number(num2);
      break;
    case "/":
      return Number(num1) / Number(num2);
      break;
    case "x":
      return Number(num1) * Number(num2);
      break;
    default:
      return "error";
  }
}
