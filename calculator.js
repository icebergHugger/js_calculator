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

document.querySelector(".equalButton").addEventListener("click", findOperators);

function findOperators(){
  for(let i = 0; i < operators.length; i++) {
    if(displayValue.includes(operators[i])) {
      calcString(operators[i]);
    }
  }
}

function calcString(operator){
  console.log(cutString(operator));
}

function cutString(value) {
  let parts = displayValue.split(value);
  if(value == "+"){
      return Number(parts[0]) + Number(parts[1]);
  }
}
