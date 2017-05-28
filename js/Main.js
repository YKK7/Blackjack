" use strict ";

var display = document.getElementById("display");
let input = document.getElementById("instructions");
let userInput = document.getElementById("userInput");

let deck = new Deck();
deck.shuffle();

form1.addEventListener("submit", readInput);

function readInput() {
    let input = document.getElementById("form1");
    display.innerHTML += input.elements[0].value + "<br>";
}

for(let i = 0; i < 312; i++){
  display.innerHTML += deck.drawCard().toString() + ", new size: " + deck.size() + "<br>";
}
