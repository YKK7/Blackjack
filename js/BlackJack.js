" use strict ";

class Card{
  constructor(rank, suit){
    this.rank = rank;
    this.suit = suit;
  }

  getRank(){
    return this.rank;
  }

  getRankName(){
    if(this.rank < 11){
      return this.rank;
    } else if(this.rank === 11){
      return "J";
    } else if(this.rank === 12){
      return "Q";
    } else if(this.rank === 13){
      return "K";
    } else return "A";

  }

  getSuitShape(){
    if(this.suit === 1){
      return "\u2666";
    } else if(this.suit === 2){
      return "\u2663";
    }else if(this.suit === 3){
      return "\u2665";
    }else return "\u2660";
  }

  toString(){
    return this.getRankName() + " " + this.getSuitShape();
  }
}

class Deck{
    constructor(){
      this.cards = this.generateDeck();
    }

    generateDeck(){
      let deck = [];
      for(let rank = 2; rank <= 14; rank++){
        for(let suit = 1; suit <= 4; suit++){
          deck.push(new Card(rank, suit));
        }
      }
      return deck;
    }

    //Durstenfeld shuffle
    shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    drawCard(){
      return this.cards.pop();
    }
}