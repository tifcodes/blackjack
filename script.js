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
    for (let i = 0; i < 2; i++) {
        let cardValue = card.dealCards().Value;
        let suitValue = card.dealCards().Suit;
        cardValueArray.push(cardValue, suitValue);
    }
    return cardValueArray;
}


card.showEachCards = function () {
    const showPlayerCardArray = card.showCards();
    const showDealerCardArray = card.showCards();
    $(".playerCard1").append(`<p>${showPlayerCardArray[0]}</p> 
    <p class = "suits">${showPlayerCardArray[1]}</p> 
    <p class = "value"> ${showPlayerCardArray[0]}</p>`);
    $(".playerCard2").append(`<p>${showPlayerCardArray[2]}</p> 
    <p class = "suits">${showPlayerCardArray[3]}</p> 
    <p class = "value"> ${showPlayerCardArray[2]}</p>`);
    $(".dealerCard1").append(`<p>${showDealerCardArray[0]}</p> 
    <p class = "suits">${showDealerCardArray[1]}</p> 
    <p class = "value"> ${showDealerCardArray[0]}</p>`);
    $(".dealerCard2").append(`<p>${showDealerCardArray[2]}</p> 
    <p class = "suits">${showDealerCardArray[3]}</p> 
    <p class = "value"> ${showDealerCardArray[2]}</>`);

    const cardAddValueArray = showPlayerCardArray.filter(function (v, i) {
        return i % 2 == 0;
    })

    const cardAddDealerValueArray = showDealerCardArray.filter(function (v, i) {
        return i % 2 == 0;
    })
    
    console.log(cardAddValueArray);
    console.log(cardAddDealerValueArray);
    console.log(getValue(cardAddValueArray[0]) + getValue(cardAddValueArray[1]));
    console.log(getValue(cardAddDealerValueArray[0]) + getValue(cardAddDealerValueArray[1]));
}

// get value/weight for cards
const getValue = function (card) {
    if (card === "J" || card === "Q" || card === "K") {
        return 10;
    } else if (card === "A") {
        return 1;
    } else {
        return parseInt(card);
    }
}

// add cards (banker and player)
// card.addCards = function(){
//     console.log(showEachCardArray)
//     showEachCardArray.filter(function(number) {
//         console.log(parseInt(number))
//         return parseInt(number)
//     })

// }


// if dealers hit 17 no need cards, but lower than 17 get more cards

// player1 (hit, stand, new game)

// init
card.init = function () {
    cardArray = card.getCard()
    card.shuffleCards();
    card.showCards();
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