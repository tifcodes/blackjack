// deck of cards
const card = {};
const cardSuits = ['♦️', '♥️', '♠️', '♣️'];
const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// card array
let cardArray = new Array();
let showPlayerCardArray = new Array();
let showDealerCardArray = new Array();

// total wins for the player and dealer
let playerWin = 0;
let dealerWin = 0;

// create a card
card.getCard = function() {
        for (let s = 0; s < cardSuits.length; s++) {
                for (let v = 0; v < cardValues.length; v++) {
                        const card = {
                                Value: cardValues[v],
                                Suit: cardSuits[s],
                        };
                        cardArray.push(card);
                }
        }
        return cardArray;
};

// shuffle deck of cards
card.shuffleCards = function() {
        for (let i = 0; i < 500; i++) {
                const cardPlace1 = Math.floor(Math.random() * cardArray.length);
                const cardPlace2 = Math.floor(Math.random() * cardArray.length);
                [cardArray[cardPlace1], cardArray[cardPlace2]] = [cardArray[cardPlace2], cardArray[cardPlace1]];
        }
        return cardArray;
};

// dealer and player1 cards (deal and show cards)
card.showCards = function() {
        const cardValueArray = [];
        for (let i = 0; i < 2; i++) {
                const cardValue = cardArray.pop().Value;
                const suitValue = cardArray.pop().Suit;
                cardValueArray.push(cardValue, suitValue);
        }
        return cardValueArray;
};

// show each card for the player and one card of the dealer
card.showEachCards = function() {
        // show the total of the player cards
        $('#playerTotal').text(`Total : ${card.addCards(showPlayerCardArray)}`);

        $('.playerCards').append(
                `<div id = "playerCard1" class = "playerCard1"> 
        <p>${showPlayerCardArray[0]}</p> 
        <p class = "suits">${showPlayerCardArray[1]}</p> 
        <p class = "value"> ${showPlayerCardArray[0]}</p> 
        </div>`
        );
        $('.playerCards').append(
                `<div id = "playerCard2" class = "playerCard2"> <p>${showPlayerCardArray[2]}</p> 
            <p class = "suits">${showPlayerCardArray[3]}</p> 
            <p class = "value"> ${showPlayerCardArray[2]}</p> </div>`
        );
        $('.dealerCards').append(
                `<div id = "dealerCard1" class = "dealerCard1"> <p>${showDealerCardArray[0]}</p> 
            <p class = "suits">${showDealerCardArray[1]}</p> 
            <p class = "value"> ${showDealerCardArray[0]}</p> </div>`
        );
        $('.dealerCards').append(
                `<div class="flipCard"> <div class="flipCardInner">
            <div class="flipCardFront">
                <img src="./asset/playingCardBack.png" alt="bicycle playing card back">
            </div>
            <div class="flipCardBack">
        
            <div id = "dealerCard2" class = "dealerCard2">
            <p>${showDealerCardArray[2]}</p> 
                <p class = "suits">${showDealerCardArray[3]}</p> 
                <p class = "value"> ${showDealerCardArray[2]}</p> </div>
                </div>
                </div>
            </div> `
        );
        if (showPlayerCardArray[1] == '♦️' || showPlayerCardArray[1] == '♥️') {
                $('#playerCard1').addClass('cardRed');
        }
        if (showPlayerCardArray[3] == '♦️' || showPlayerCardArray[3] == '♥️') {
                $('#playerCard2').addClass('cardRed');
        }
        if (showDealerCardArray[1] == '♦️' || showDealerCardArray[1] == '♥️') {
                $('#dealerCard1').addClass('cardRed');
        }
        if (showDealerCardArray[3] == '♦️' || showDealerCardArray[3] == '♥️') {
                $('#dealerCard2').addClass('cardRed');
        }
};

// get value/weight for cards
card.getValue = function(card) {
        if (card === 'J' || card === 'Q' || card === 'K') {
                return 10;
        }
        if (card === 'A') {
                return 11;
        }
        return parseInt(card);
};

// add cards (banker and player)
card.addCardFilter = function(array) {
        const arrayFilter = array.filter(function(v, i) {
                return i % 2 == 0;
        });
        return arrayFilter;
};

card.addCards = function(array) {
        let sum = 0;
        arrayFilter = card.addCardFilter(array);
        for (i = 0; i < arrayFilter.length; i++) {
                sum += card.getValue(arrayFilter[i]);
        }
        return sum;
};

// if dealers hit 17 no need cards, but lower than 17 get more cards
card.cardDealerCheck = function(array) {
        if (card.addCards(array) >= 17) {
                card.compareCards(showPlayerCardArray, showDealerCardArray);
        } else if (card.addCards(array) < 17) {
                oneDealerCard = card.showOneCard();
                $('.dealerCards').append(`<div id = "dealerCard3" class = "dealerCard3"> <p>${oneDealerCard[0]}</p> 
        <p class = "suits">${oneDealerCard[1]}</p> 
        <p class = "value"> ${oneDealerCard[0]}</p> </div>`);
                if (oneDealerCard[1] == '♦️' || oneDealerCard[1] == '♥️') {
                        $('#dealerCard3').addClass('cardRed');
                }
                oneCardConcat = showDealerCardArray.concat(oneDealerCard);
                if (card.addCards(oneCardConcat) < 17) {
                        oneDealerCard = card.showOneCard();
                        $('.dealerCards')
                                .append(`<div id = "dealerCard3" class = "dealerCard3"> <p>${oneDealerCard[0]}</p> 
        <p class = "suits">${oneDealerCard[1]}</p> 
        <p class = "value"> ${oneDealerCard[0]}</p> </div>`);
                        if (oneDealerCard[1] == '♦️' || oneDealerCard[1] == '♥️') {
                                $('#dealerCard3').addClass('cardRed');
                        }
                }
                card.compareCards(showPlayerCardArray, oneCardConcat);
        }
};

// comparing cards and seeing which is higher
card.compareCards = function(num1, num2) {
        const compare1 = card.addCards(num1);
        const compare2 = card.addCards(num2);
        $('#dealerTotal').text(`Total : ${compare2}`);
        if (compare1 == 21) {
                playerWin += 1;
                $('#playerWins').text(`Wins : ${playerWin}`);
        } else if (compare2 == 21) {
                dealerWin += 1;
                $('#dealerWins').text(`Wins : ${dealerWin}`);
        } else if (compare2 >= 22) {
                playerWin += 1;
                $('#playerWins').text(`Wins : ${playerWin}`);
        } else if (compare1 > compare2) {
                playerWin += 1;
                $('#playerWins').text(`Wins : ${playerWin}`);
        } else if (compare1 < compare2) {
                dealerWin += 1;
                $('#dealerWins').text(`Wins : ${dealerWin}`);
        }
};

// player1 (hit, stand, new game)
card.showOneCard = function() {
        const oneCardArray = [];
        for (let i = 0; i < 1; i++) {
                const cardValue = cardArray.pop().Value;
                const suitValue = cardArray.pop().Suit;
                oneCardArray.push(cardValue, suitValue);
        }
        if (oneCardArray[1] == '♦️' || oneCardArray[1] == '♥️') {
                $('#playerCard3').addClass('cardRed');
        }
        return oneCardArray;
};

$('#hit').on('click', function() {
        const moreCards = showPlayerCardArray;
        oneCard = card.showOneCard();
        $('.playerCards').append(`<div id = "playerCard3" class = "playerCard3"> <p>${oneCard[0]}</p> 
            <p class = "suits">${oneCard[1]}</p> 
            <p class = "value"> ${oneCard[0]}</p> </div>`);
        for (i = 0; i < moreCards.length; i++) {
                oneCardConcat = moreCards.push(oneCard[0], oneCard[1]);
                $('#playerTotal').text(`Total : ${card.addCards(moreCards)}`);
                if (card.addCards(moreCards) >= 22) {
                        dealerWin += 1;
                        $('#dealerWins').text(`Wins : ${dealerWin}`);
                        $('#stand').hide();
                        $('#hit').hide();
                        $('.flipCardInner').addClass('flipped');
                        $('#dealerTotal').text(`Total : ${card.addCards(showDealerCardArray)}`);
                }
                return moreCards;
        }
});

$('#stand').on('click', function() {
        $('.flipCardInner').addClass('flipped');
        card.cardDealerCheck(showDealerCardArray);
        // if the player hits stand hit the other 2 buttons
        $('#stand').hide();
        $('#hit').hide();
});

$('#new').on('click', function() {
        // remove the cards
        $('.playerCards').empty();
        $('.dealerCards').empty();

        // get the total back to 0;
        $('#playerTotal').text(`Total: 0`);
        $('#dealerTotal').text(`Total: 0`);

        // if the player hits new game add back the button
        $('#stand').show();
        $('#hit').show();

        card.init();
});

// init
card.init = function() {
        cardArray = card.getCard();
        card.shuffleCards();
        showPlayerCardArray = card.showCards();
        showDealerCardArray = card.showCards();
        card.showEachCards();
};

// document ready (show and hide the instructions)
$(function() {
        $('#instructions').show();
        $('#main-div').hide();

        $('#letsPlay').on('click', function() {
                $('#instructions').hide();
                $('#main-div').show();
        });

        card.init();
});
