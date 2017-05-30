" use strict ";

let display = document.getElementById("display");

let deck = new Deck();
deck.shuffle();

let game = new Game(display);
game.println("You have " + game.player.wallet + " chips");
game.play();
