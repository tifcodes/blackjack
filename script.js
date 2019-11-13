// deck of cards 
const card = {};
const cardSuits = ["diamonds", "hearts", "spades", "clubs"];
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
        cardValueArray.push(cardValue);
    }
    return cardValueArray;
}
card.showEachCards = function() {
    $(".playerCard1").append(card.showCards()[0]);
    $(".dealerCard1").append(card.showCards()[1]);
    $(".playerCard2").append(card.showCards()[2]);
    $(".dealerCard2").append(card.showCards()[3]);
}

    // return cardValue
    // console.log(cardValueArray.push("heloo"))
    // $(".playerCard1").append(cardValue);
    // $(".dealerCard1").append(cardValue);
    // $(".playerCard1").append(cardValue);
    // let cardValue = card.dealCards().Value;
    // let suitValues = card.dealCards().Suit;
    // $(".playerCard1").append(card.dealCards().Value);
    // $(".dealerCard1").append(card.dealCards().Value);
    // $(".playerCard2").append(card.dealCards().Value);
    // $(".dealerCard2").append(card.dealCards().Value);
    //     if (suitValue = "diamonds") {
    //         $(".playerCard1").append(`${cardValue} ♦️ ${cardValue}`);
    //         $(".dealerCard1").append(`${cardValue} ♦️ ${cardValue}`);
    //         $(".playerCard2").append(`${cardValue} ♦️ ${cardValue}`);
    //         $(".dealerCard2").append(`${cardValue} ♦️ ${cardValue}`);
    //     } else if (suitValue = "hearts") {
    //         $(".playerCard1").append(`${cardValue} ♥️ ${cardValue}`);
    //         $(".dealerCard1").append(`${cardValue} ♥️ ${cardValue}`);
    //         $(".playerCard2").append(`${cardValue} ♥️ ${cardValue}`);
    //         $(".dealerCard2").append(`${cardValue} ♥️ ${cardValue}`);
    //     } else if (suitValue = "spades") {
    //         $(".playerCard1").append(`${cardValue} ♠️ ${cardValue}`);
    //         $(".dealerCard1").append(`${cardValue} ♠️ ${cardValue}`);
    //         $(".playerCard2").append(`${cardValue} ♠️ ${cardValue}`);
    //         $(".dealerCard2").append(`${cardValue} ♠️ ${cardValue}`);
    //     } else if (suitValue = "clubs") {
    //         $(".playerCard1").append(`${cardValue} ♣️ ${cardValue}`);
    //         $(".dealerCard1").append(`${cardValue} ♣️ ${cardValue}`);
    //         $(".playerCard2").append(`${cardValue} ♣️ ${cardValue}`);
    //         $(".dealerCard2").append(`${cardValue} ♣️ ${cardValue}`);
    // }}


// add cards (banker and player)


// if dealers hit 17 no need cards, but lower than 17 get more cards

// player1 (hit, stand, new game)

// init
card.init = function () {
    cardArray = card.getCard()
    card.shuffleCards();
    card.showEachCards();
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