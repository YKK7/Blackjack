" use strict ";

let display = document.getElementById("display");

let deck = new Deck();
deck.shuffle();

let game = new Game(display);
game.print("You have " + game.player.getWallet() + " chips");
