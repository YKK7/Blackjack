" use strict ";

let display = document.getElementById("display");
let input = document.getElementById("instructions");
let userInput = document.getElementById("userInput");
let lastInput;

let deck = new Deck();
deck.shuffle();

function readInput() {
    let input = document.getElementById("form1");
    lastInput = input.elements[0].value;
}
function print(output){
  display.innerHTML += output;
}
function println(output){
  display.innerHTML += output + "<br>";
}
function printNew(output){
  display.innerHTML = output;
}
