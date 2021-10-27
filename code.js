let container = document.getElementsByClassName("container")[0];
console.log(container);

let firstScreen = container.querySelectorAll(`[name="textview"]`)[0];

let secondScreen = container.querySelectorAll(`[name="textview"]`)[1];

let buttons = container.querySelectorAll(".item");

let memory = null;

let operation = null;


function action(data) {
  switch (data) {
    case "c":
      clear()
      break;
    case "/":
    case "x":
    case "+":
    case "-":
    case "%":
      writeMemory(data)
      break;
    case "delete":
      deleteSymb()
      break;
    case "pm":
      plusMinus()
      break;
    case "point":
      point()
      break;
    case "equal":
      equal();
      break;

    
    default:
      writeNumber(data)
      break;
  }
  

}


function writeNumber(data) {
  if(secondScreen.value === "0"){
    secondScreen.value = data
  }
  else {
 secondScreen.value = secondScreen.value + data
  }
}


function deleteSymb() {
if (secondScreen.value !== 0) {
  if (secondScreen.value.length === 1){
    secondScreen.value = 0;
  }
  else {
   secondScreen.value= secondScreen.value.slice (0, -1);
  }
}

}

function getResult(x, y, op) { 
  switch (op) {
    case "+":
      return x + y;
      
    case "-":
      return x - y;
      
    case "x":
      return x * y;
    case "/":
      return x / y;
  
    case "%":
      return x * (y / 100);
      
    default:
      break;
  }





}

function writeMemory(data) {

  if (operation) {
    memory = getResult(+memory, +secondScreen.value, operation);
    operation = data;
    firstScreen.value = memory + data;
    secondScreen.value = 0;
  }
   else {
    memory = secondScreen.value;
    operation = data;
    secondScreen.value = 0;
    firstScreen.value = memory + data;
    
  }

}


function clear() {
  secondScreen.value = 0;
  firstScreen.value = "";
  memory = null;
  operation = null;
}

function equal() {
  if (operation) {
    let localMemory = getResult(+memory, +secondScreen.value, operation);
    clear();
    secondScreen.value = localMemory;
  }
}

function plusMinus() {

if (secondScreen.value !== "0") {
  if (secondScreen.value[0] === "-")  {
    secondScreen.value = secondScreen.value.substring(1);
  } else {
    secondScreen.value = "-"+ secondScreen.value
  }
}

}

function point(){
  if (secondScreen.value.indexOf(".")===-1){
    secondScreen.value+=".";
  }
}










buttons.forEach((item) => {
  item.addEventListener("click", (e) => {
    action(e.target.dataset.item);

  })
})