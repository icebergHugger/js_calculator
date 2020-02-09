let displayValue = "";
let maxStringLength = 10;
let error = false;
const forbidden = ["x", "/", "."];
const first_op = ["x", "/"];
const second_op = ["+", "-"]


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

function addNumber() {
  let number = event.target.innerHTML;
  if(displayValue.length < maxStringLength){
    if(number == "." && displayValue.slice(-1) == "."){
      return;
    }
    if(isNaN(number) == false && displayValue.slice(-2, -1) == "."){
      return;
    }
    displayValue += number;
    updateDisplay();
  };
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
  checkString(displayValue);
});

function checkString(string){
  let firstChar = displayValue.charAt(0);
  let lastCharInt = parseInt(displayValue.slice(-1));
  if(forbidden.indexOf(firstChar) != -1 ||
    !Number.isInteger(lastCharInt) ){
    errorHandler();
  }else {
    changeArray(string);
  }
}

function changeArray(string){
  array = string.split(/[-+x/]/);
  operator_array = string.replace(/[0-9, .]/g, '').split("");

  let length = operator_array.length;
  for(let i = 0; i < length; i++){
    array.splice(2*i + 1, 0, operator_array[i]);
  }
  divideEquation(array);
}

function divideEquation(equation){
  let equLength = equation.length;
  if(equation.includes("x") || equation.includes("/")){
    for(let i = 0; i < equLength; i++){
      if(first_op.includes(equation[i])){
        removeFromArray(equation, i);
        break;
      }
    }
  }else if (equation.includes("+") || equation.includes("-")){
    for(let i = 0; i < equLength; i++){
      if(second_op.includes(equation[i])){
        removeFromArray(equation, i);
        break;
      }
    }
  }else{
    if(error){
      return;
    }
    result = Math.round((Number(equation) + Number.EPSILON) * 100)
     / 100;
    displayValue = result.toString();
    updateDisplay();
  }
}

function removeFromArray(equation, operator){
  let part = equation.slice(operator - 1, operator + 2);
  if(Number.isInteger(part[0]) || Number.isInteger(part[2])){
    errorHandler();
  }
  newNumber = calcSwitch(part[0], part[1], part[2]);
  equation.splice(operator - 1 , 3, newNumber);
  divideEquation(equation);
}

function calcSwitch(num1, operator, num2){
  switch (operator) {
    case "+":
      return Number(num1) + Number(num2);
      break;
    case "-":
      return Number(num1) - Number(num2);
      break;
    case "/":
      if(num1 == 0 && num2 == 0){
        errorHandler();
      }
      return Number(num1) / Number(num2);
      break;
    case "x":
      return Number(num1) * Number(num2);
      break;
    default:
      errorHandler();
  }
}

function errorHandler(){
  error = true;
  displayValue = "ERROR";
  updateDisplay();
  setTimeout(function(){
    error = false;
    displayValue = "";
    updateDisplay();
  },900);
}

function updateDisplay() {
  document.querySelector("h1").innerHTML = displayValue;
}
