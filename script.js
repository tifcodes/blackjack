// deck of cards (random)
const card = {};
const cardSuits = ["diamonds", "hearts", "spades", "clubs"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let cardArray = new Array();

card.getCard = function() {
    let cardArray = new Array();

    for (let s = 0; s < cardSuits.length; s++) {

        for (let v = 0; v < cardValues.length; v++){

            let card = {Value: cardValues[v], Suit: cardSuits[s]};
            cardArray.push(card);
        }
    }
    return cardArray;
}

// shuffle deck of cards
card.shuffleCards = function() {
    for (let i = 0; i < 500; i++) {
        let cardPlace1 = Math.floor(Math.random() * cardArray.length);
        let cardPlace2 = Math.floor(Math.random() * cardArray.length);
        [cardArray[cardPlace1], cardArray[cardPlace2]] = [cardArray[cardPlace2], cardArray[cardPlace1]]
    }
    return cardArray;
}

// deal card
card.dealCards = function(){
    console.log(cardArray.pop())
    return cardArray.pop();
}

// dealer and player1 cards

// add cards


// if dealers hit 17 no need cards, but lower than 17 get more cards

// player1 (hit, stand, new game)

// init
card.init = function () {
    cardArray = card.getCard()
    card.shuffleCards();
    card.dealCards();
}

// document ready
$(function () {
    card.init();
});

// STRETCH GOALS
// add how many wins, loses and draws
// betting
// more deck of cards
// add more players to the game