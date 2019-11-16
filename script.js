// deck of cards 
const card = {};
const cardSuits = ["♦️", "♥️", "♠️", "♣️"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let cardArray = new Array();
let showPlayerCardArray = new Array();
let showDealerCardArray = new Array();

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

// dealer and player1 cards (deal and show cards)
card.showCards = function () {
    let cardValueArray = [];
    for (let i = 0; i < 2; i++) {
        let cardValue = cardArray.pop().Value;
        let suitValue = cardArray.pop().Suit;
        cardValueArray.push(cardValue, suitValue);
    }
    return cardValueArray;
}

card.showEachCards = function () {
    $(".playerCards").append(`<div id = "playerCard1" class = "playerCard1"> <p>${showPlayerCardArray[0]}</p> 
    <p class = "suits">${showPlayerCardArray[1]}</p> 
    <p class = "value"> ${showPlayerCardArray[0]}</p> </div>`);
    $(".playerCards").append(`<div id = "playerCard2" class = "playerCard2"> <p>${showPlayerCardArray[2]}</p> 
    <p class = "suits">${showPlayerCardArray[3]}</p> 
    <p class = "value"> ${showPlayerCardArray[2]}</p> </div>`);
    $(".dealerCards").append(`<div id = "dealerCard1" class = "dealerCard1"> <p>${showDealerCardArray[0]}</p> 
    <p class = "suits">${showDealerCardArray[1]}</p> 
    <p class = "value"> ${showDealerCardArray[0]}</p> </div>`);
    $(".dealerCards").append(`<div class="flipCard"> <div class="flipCardInner">
    <div class="flipCardFront">
      <img src="./asset/playingCardBack.png" alt="bicycle playing card back">
    </div>
    <div class="flipCardBack">
        <div id = "dealerCard2" class = "dealerCard2"><p>${showDealerCardArray[2]}</p> 
    <p class = "suits">${showDealerCardArray[3]}</p> 
    <p class = "value"> ${showDealerCardArray[2]}</p> </div>
    </div>
  </div>
</div> `);
    if (showPlayerCardArray[1] == "♦️" || showPlayerCardArray[1] == "♥️") {
        $("#playerCard1").addClass("cardRed")
    }
    if (showPlayerCardArray[3] == "♦️" || showPlayerCardArray[3] == "♥️") {
        $("#playerCard2").addClass("cardRed")
    }
    if (showDealerCardArray[1] == "♦️" || showDealerCardArray[1] == "♥️") {
        $("#dealerCard1").addClass("cardRed")
    }
    if (showDealerCardArray[3] == "♦️" || showDealerCardArray[3] == "♥️") {
        $("#dealerCard2").addClass("cardRed")
    }
    card.compareCardsBlackJack(showPlayerCardArray, showDealerCardArray)
}

// get value/weight for cards
card.getValue = function (card) {
    if (card === "J" || card === "Q" || card === "K") {
        return 10;
    } else if (card === "A") {
        return 11;
    } else {
        return parseInt(card);
    }
}

// add cards (banker and player)
card.addCardFilter = function (array) {
    const arrayFilter = array.filter(function (v, i) {
        return i % 2 == 0;
    })
    return arrayFilter;
}

card.addCards = function (array) {
    let sum = 0;
    arrayFilter = card.addCardFilter(array)
    for (i = 0; i < arrayFilter.length; i++) {
        sum += card.getValue(arrayFilter[i])
    }
    return sum;
}

// if dealers hit 17 no need cards, but lower than 17 get more cards
card.cardDealerCheck = function (array) {
    if (card.addCards(array) >= 17) {
        card.compareCards(showPlayerCardArray, showDealerCardArray)
    } else if (card.addCards(array) < 17) {
        oneDealerCard = card.showOneCard();
        $(".dealerCards").append(`<div id = "dealerCard3" class = "dealerCard3"> <p>${oneDealerCard[0]}</p> 
        <p class = "suits">${oneDealerCard[1]}</p> 
        <p class = "value"> ${oneDealerCard[0]}</p> </div>`);
        oneCardConcat = showDealerCardArray.concat(oneDealerCard);
        card.compareCards(showPlayerCardArray, oneCardConcat)
    }
}

card.compareCards = function (num1, num2) {
    let compare1 = card.addCards(num1);
    let compare2 = card.addCards(num2);
    if (compare1 >= 22) {
        alert("dealer win")
        $("h2").append("<div> dealer win </div>");
    } else if (compare2 >= 22) {
        alert("player win")
        $("h2").append("<div> player win </div>");
    } else if (compare1 > compare2) {
        alert("player win")
        $("h2").append("<div> player win </div>");
    } else if (compare1 < compare2) {
        alert("dealer win")
        $("h2").append("<div> dealer win </div>");
    } else if (compare1 == compare2) {
        alert("draw")
        $("h2").append("<div> draw </div>");
    }
}

card.compareCardsBlackJack = function (num1, num2) {
    let blackjack1 = card.addCards(num1);
    let blackjack2 = card.addCards(num2);
    if (blackjack1 == 21) {
        alert("player win")
        $("h2").append("player wins");
    } else if (blackjack2 == 21) {  
        alert("dealer win")
        $("h2").append("dealer wins");
    } else if (blackjack1 == 21 && blackjack2 == 21) {
        alert("draw")
        $("h2").append("draw");
    }
}

// player1 (hit, stand, new game)
card.showOneCard = function () {
    let oneCardArray = [];
    for (let i = 0; i < 1; i++) {
        let cardValue = cardArray.pop().Value;
        let suitValue = cardArray.pop().Suit;
        oneCardArray.push(cardValue, suitValue);
    }
    if (oneCardArray[1] == "♦️" || oneCardArray[1] == "♥️") {
        $("#playerCard3").addClass("cardRed")
    }
    return oneCardArray;
}

$('#hit').on("click", function () {
    let moreCards = showPlayerCardArray;
    oneCard = card.showOneCard();
    $(".playerCards").append(`<div id = "playerCard3" class = "playerCard3"> <p>${oneCard[0]}</p> 
            <p class = "suits">${oneCard[1]}</p> 
            <p class = "value"> ${oneCard[0]}</p> </div>`);
    for (i = 0; i < moreCards.length; i++) {
        oneCardConcat = moreCards.push(oneCard[0], oneCard[1]);
        if (card.addCards(moreCards) >= 22) {
            alert("dealer win")
            $(".flipCardInner").addClass("flipped");
            return;
        }
        return moreCards;
    }
})

$('#stand').on("click", function () {
    $(".flipCardInner").addClass("flipped");
    card.cardDealerCheck(showDealerCardArray)
})

$('#new').on("click", function () {
    $('.playerCards').empty();
    $('.dealerCards').empty();
    cardArray = card.getCard();
    card.shuffleCards();
    showPlayerCardArray = card.showCards();
    showDealerCardArray = card.showCards();
    card.showEachCards();
})

// init
card.init = function () {
    cardArray = card.getCard()
    card.shuffleCards();
    showPlayerCardArray = card.showCards();
    showDealerCardArray = card.showCards();
    card.showEachCards();
}

// document ready
$(function () {
    $("#instructions").show()
    $("#main-div").hide()

    $("#letsPlay").on("click", function () {
        $("#instructions").hide()
        $("#main-div").show()
    })
    card.init();
});

// need to do

// STRETCH GOALS
// audio
// add how many wins, loses and draws
// betting
// more deck of cards
// add more players to the game
// insurance
// split