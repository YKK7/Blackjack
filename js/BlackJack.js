" use strict ";

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  value() {
    if (this.rank < 11) {
      return this.rank;
    } else if (this.rank < 14) {
      return 10;
    } else return 1;
  }

  getRank() {
    if (this.rank < 11) {
      return this.rank;
    } else if (this.rank === 11) {
      return "J";
    } else if (this.rank === 12) {
      return "Q";
    } else if (this.rank === 13) {
      return "K";
    } else return "A";
  }

  getSuit() {
    if (this.suit === 1) {
      return "\u2666";
    } else if (this.suit === 2) {
      return "\u2663";
    } else if (this.suit === 3) {
      return "\u2665";
    } else return "\u2660";
  }

  toString() {
    return this.getRank() + " " + this.getSuit();
  }
}

class Deck {
  constructor() {
    this.cards = this.generateDeck();
  }

  generateDeck() {
    let deck = [];
    for (let i = 0; i < 6; i++) {
      for (let rank = 2; rank <= 14; rank++) {
        for (let suit = 1; suit <= 4; suit++) {
          deck.push(new Card(rank, suit));
        }
      }
    }
    return deck;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  drawCard() {
    if (this.cards.length === 100) {
      this.cards = this.generateDeck();
      this.shuffle();
    }
    return this.cards.pop();
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  size() {
    return this.cards.length;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.cards.length; i++) {
      result += this.cards[i] + " ";
    }
    return result;
  }

  clear() {
    this.cards = [];
  }

  value() {
    let hasAce = false;
    let size = this.size();
    let result = 0;

    for (let i = 0; i < size; i++) {
      result += this.cards[i].value();
      if (this.cards[i].value() === 1) {
        hasAce = true;
      }
    }
    if (result < 12 && hasAce) {
      return result + 10;
    } else return result;
  }

  isNatural() {
    return (this.size() === 2) && (this.value() === 21);
  }
}

class Player {
  constructor(startingWallet) {
    this.wallet = startingWallet;
  }

  makeBet(amount) {
    if (this.wallet >= amount) {
      this.wallet -= amount;
    } else {
      alert("Insufficient Funds");
    }
    return this.wallet;
  }

  addMoney(amount) {
    this.wallet += amount;
    return this.wallet;
  }

}

class Game {
  constructor() {
    let initialWallet = prompt("How many chips would you like to start with? Minimum bet is $100");
    this.player = new Player(initialWallet);
    this.bet = 0;
    this.playerHand = new Hand();
    this.dealerHand = new Hand();
    this.deck = new Deck();
    this.deck.shuffle();
  }

  print(output) {
    display.innerHTML += output;
  }

  println(output) {
    display.innerHTML += output + "<br>";
  }

  printNew(output) {
    display.innerHTML = output;
  }

  play() {
    let go = true;
    while (go) {
      this.playRound(go);
      go = confirm("Play again?");
    }
    this.printNew("Cashed out with $" + Math.round(this.player.wallet) + "<br>");
    this.println("Thanks for playing! Have a great day!");
  }

  playRound(go) {
    this.takeBet();
    this.dealCards();
    this.checkNatural();
    this.checkBalance(go);
  }

  takeBet() {
    let amount = Math.round(prompt("How much would you like to bet?"));
    if (amount <= this.player.wallet && amount >= 100) {
      this.bet = amount;
      this.println("Bet: " + amount + ", Wallet: " + this.player.makeBet(amount));
    } else if (amount > this.player.wallet) {
      this.println("You only have " + Math.round(this.player.wallet) +
        " chips remaining, please enter a valid amount");
      this.takeBet();
    } else {
      this.println("Minimum bet is 100, please enter a valid amount.");
      this.takeBet();
    }
  }

  dealCards() {
    this.dealTo(this.playerHand);
    this.dealTo(this.dealerHand);
    this.dealTo(this.playerHand);
    this.dealTo(this.dealerHand);
  }

  dealTo(hand) {
    hand.addCard(this.deck.drawCard());
  }

  checkNatural(){
    if(this.dealerHand.isNatural()){
      if(this.playerHand.isNatural()){
        //player gets money back
      } else {
        //dealer wins, go to next round
      }
    } else if(this.playerHand.isNatural()){
      //player wins 1.5x bet
    } else {
      //play the rest of round
    }
  }

  checkBalance(go) {
    if (this.player.wallet < 100) {
      if (confirm("You have less than the minimum bet (100), would you like to buy more chips?")) {
        this.buyMoreChips();
      } else go = false;
    }
  }

  buyMoreChips() {
    let amount = Math.round(prompt("How many chips would you like to purchase?"));
    if(amount + this.player.wallet >= 100){
      this.player.addMoney(amount);
      this.println(amount + " chips added, new balance: " + this.player.wallet);
    } else {
      this.println("Minimum bet is 100, please purchase at least " + (100 - this.player.wallet) + " chips.");
      this.buyMoreChips();
    }
  }
}