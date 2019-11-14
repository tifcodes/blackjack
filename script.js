// deck of cards 
const card = {};
const cardSuits = ["♦️", "♥️", "♠️", "♣️"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let cardArray = new Array();

card.getCard = function () {
    let cardArray = new Array();

    for (let s = 0; s < cardSuits.length; s++) {

        for (let v = 0; v < cardValues.length; v++) {

            let card = { Value: cardValues[v], Suit: cardSuits[s] };
            cardArray.push(card);
        }
    }
    return cardArray;
}

// shuffle deck of cards
card.shuffleCards = function () {
    for (let i = 0; i < 500; i++) {
        let cardPlace1 = Math.floor(Math.random() * cardArray.length);
        let cardPlace2 = Math.floor(Math.random() * cardArray.length);
        [cardArray[cardPlace1], cardArray[cardPlace2]] = [cardArray[cardPlace2], cardArray[cardPlace1]]
    }
    return cardArray;
}

// deal card
card.dealCards = function () {
    return cardArray.pop();
}

// dealer and player1 cards (show cards)
card.showCards = function () {
    let cardValueArray = [];
    for (let i = 0; i < 4; i++) {
        let cardValue = card.dealCards().Value;
        let suitValue = card.dealCards().Suit;
        cardValueArray.push(cardValue, suitValue);
    }
    console.log(cardValueArray)
    return cardValueArray;
}

card.showEachCards = function () {
    const showEachCardArray = card.showCards();
    $(".playerCard1").append(`<p>${showEachCardArray[0]}</p> <p class = "suits">${showEachCardArray[1]}</p> <p class = "value"> ${showEachCardArray[0]}</p>`);
    $(".dealerCard1").append(`<p>${showEachCardArray[2]}</p> <p class = "suits">${showEachCardArray[3]}</p> <p class = "value"> ${showEachCardArray[2]}</p>`);
    $(".playerCard2").append(`<p>${showEachCardArray[4]}</p> <p class = "suits">${showEachCardArray[5]}</p> <p class = "value"> ${showEachCardArray[4]}</p>`);
    $(".dealerCard2").append(`<p>${showEachCardArray[6]}</p> <p class = "suits">${showEachCardArray[7]}</p> <p class = "value"> ${showEachCardArray[6]}</>`);
}

// add cards (banker and player)
card.addCards = function(){
    const showEachCardArray = card.showCards();
    showEachCardArray.filter(function(number) {
        console.log(parseInt(number))
        return parseInt(number)
    })
    console.log(showEachCardArray)
}


// if dealers hit 17 no need cards, but lower than 17 get more cards

// player1 (hit, stand, new game)

// init
card.init = function () {
    cardArray = card.getCard()
    card.shuffleCards();
    card.showCards();
    card.showEachCards();
    card.addCards();
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
// insurance
// split