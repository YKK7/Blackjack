" use strict ";

let display = document.getElementById("display");

let deck = new Deck();
deck.shuffle();

let table = new Table(display);
table.print("You have " + table.player.getWallet() + " chips");
