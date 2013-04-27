window.onload = function() {
    "use strict";

    document.getElementById("draw").onclick = draw;

    // This is the deck we will draw from
    var deck = new Deck();
    deck.makeDeck();
    deck.shuffle(1);

    // All the possibilities of cards left in the deck
    var probs = {};
    var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
    var suits = new Array("C", "D", "H", "S");

    for (var j = 0; j < suits.length; j++) {
        for (var k = 0; k < ranks.length; k++) {
            var card = new Card(ranks[k], suits[j]);
            probs[card] = 0;
        }
    }

    var drawn = [];

    generateProbs();

    function draw() {

        var card = deck.draw();
        console.log("Drew " + card);
        delete probs[card];

        drawn.push(card);

        var ele = document.getElementById("drawn");
        var span = document.createElement("span");
        span.innerHTML = card;
        ele.insertBefore(span, ele.firstChild);

        generateProbs();
    }

    function generateProbs() {
        var ele = document.getElementById("probs");
        ele.innerHTML = "";

        var cardsInDeck = Object.keys(probs).length;
        for (var card in probs) {
            // calculate the probability
            probs[card] = 1 / cardsInDeck;

            // Put it in the dom
            var span = document.createElement("span");
            span.innerHTML = card + ": " + probs[card].toFixed(3);
            ele.appendChild(span);
        }
    }
};