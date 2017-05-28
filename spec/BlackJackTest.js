" use strict ";

describe("Card", function(){

  let card;

  beforeEach(function(){
    card = new Card(13, 3);
  });

  describe("Card Constructor", function(){
    it("Sets suit = Hearts", function(){
      expect(card.getSuitShape()).toEqual("\u2665");
    });

    it("Sets rank = King", function(){
      expect(card.getRankName()).toEqual("K");
    });
  });

  describe("Card toString", function(){
    it("correctly converts (13, 3) to King of Hearts", function(){
      expect(card.toString()).toEqual("K \u2665");
    });
  });

});


describe("Deck", function(){

  describe("Deck Constructor calls generateDeck()", function(){
    let deck = new Deck();
    let card = deck.drawCard();
    let card2 = deck.drawCard();

    it("the top card should be an Ace of Spades", function(){
      expect(card.toString()).toEqual("A \u2660");
    });

    it("the second card should be an Ace of Hearts", function(){
      expect(card2.toString()).toEqual("A \u2665");
    });
  });

  describe("Shuffle", function(){
    let deck1 = new Deck();
    let deck2 = new Deck();
    deck1.shuffle();
    let count = 0;
    for(let i = 0; i < 52; i++){
      if(deck1.drawCard().toString() !== deck2.drawCard().toString()) {
        count++;
      }
    }

    it("the shuffled deck should have at least 26 cards in new positions", function(){
      expect(count).toBeGreaterThan(25);
    });
  });

});
