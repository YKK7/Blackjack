" use strict ";

describe("Card class", function(){

  let card;

  beforeEach(function(){
    card = new Card(13, 3);
  });

  describe("constructor()", function(){
    it("Sets suit = Hearts", function(){
      expect(card.getSuitShape()).toEqual("\u2665");
    });

    it("Sets rank = King", function(){
      expect(card.getRankName()).toEqual("K");
    });
  });

  describe("toString()", function(){
    it("correctly converts (13, 3) to King of Hearts (K \u2665)", function(){
      expect(card.toString()).toEqual("K \u2665");
    });
  });
});


describe("Deck class", function(){

  describe("generateDeck() - called by constructor", function(){
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

  describe("shuffle()", function(){
    let deck1 = new Deck();
    let deck2 = new Deck();
    deck1.shuffle();
    let count = 0;
    for(let i = 0; i < 312; i++){
      if(deck1.drawCard().toString() !== deck2.drawCard().toString()) {
        count++;
      }
    }

    it("the shuffled deck should have at least 200 cards in new positions", function(){
      expect(count).toBeGreaterThan(199);
    });
  });
});

describe("Player class", function(){

  describe("constructor(100)", function(){
    let player = new Player(100);
    it("initializes the wallet to 100", function(){
      expect(player.getWallet()).toEqual(100);
    });
  });

  describe("makeBet(75)", function(){
    let player = new Player(100);
    let balance = player.makeBet(75);
    it("should leave the player with a wallet of 25", function(){
      expect(player.getWallet()).toEqual(25);
    });
    it("should return the remaining balance (25)", function(){
      expect(balance).toEqual(25);
    });
  });

  describe("makeBet(200)", function(){
    let player = new Player(100);
    let balance = player.makeBet(200);
    it("should leave the player with a wallet of 100", function(){
      expect(player.getWallet()).toEqual(100);
    });
    it("should return the remaining balance (100)", function(){
      expect(balance).toEqual(100);
    });
  });

  describe("addMoney(100)", function(){
    let player = new Player(100);
    let balance = player.addMoney(100);
    it("should add 100 to the wallet", function(){
      expect(player.getWallet()).toEqual(200);
    });
    it("should return the new balance (200)", function(){
      expect(balance).toEqual(200);
    });
  });

});
