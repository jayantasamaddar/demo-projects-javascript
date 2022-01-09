/* DEFINE GAME VARIABLES */
const suitNames = ["Hearts","Diamonds","Spades","Clubs"];
const cardNames = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
const cardsPerSuit = 13;
let totalCards = 52;

/* Declare Default cardsDeck array to store 52 cards with information about each card as its own object */
let cardsDeck = [];
const renderCards = () => {
    /* cardsDeck needs to initialize everytime renderCards is run hence cardsDeck cannot be a const variable*/
    cardsDeck = [];
    /* There are 13 cards per suit. Assign a suit_index value to each of 13 cards from 1-13 */
    const getCardSuit = () => {
        const cardSuit = [];
        /* LOOP 1 - Generate 13 cards */
        for(let i = 0; i < cardNames.length; i++)
        {
            const card = new Object();
            card.name = cardNames[i];
            card["suit_index"] = i + 1;
            cardSuit.push(card);
        }
        return cardSuit;
    }
    /* LOOP 2 - There are 4 Suits in Cards */
    for(let j = 0; j < suitNames.length; j++)
    {
        /* LOOP 3 - Loop the 13 card set generated in LOOP 1 through 4 Suites to get total 52 cards */
        thisSuit = getCardSuit();
        thisSuit.forEach((rec) => {rec.suit = suitNames[j];});
        
        cardsDeck = cardsDeck.concat(thisSuit);
    }
    return cardsDeck;
}
//console.log(renderCards());


/* Define Function to SHUFFLE CARDS - Fisher-Yates (aka Knuth) Shuffle */
/* Pass an array of cards - newDeck to Shuffle */
/* Pass the deck_index value to each card object to store where the card's index in the deck after shuffle */
let newDeck = [];
const shuffleDeck = (newDeck) => {
    let currentIndex = newDeck.length;
    let randomIndex = 0;
    // While there are remaining elements to shuffle
    while (currentIndex != 0) {
        // Pick a remaining element
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex --;
        
        // And swap it with the current element
        [newDeck[currentIndex], newDeck[randomIndex]] = [newDeck[randomIndex], newDeck[currentIndex]];
    }
    /* LOOP 4 - Assign a variable deck_index that changes every time cards are shuffled*/
    newDeck.forEach((rec) => {rec["deck_index"] = newDeck.indexOf(rec) + 1;});
    return newDeck;
}

/* INITIALIZE PLAYERS DEFAULTS*/
const player = {
    name: "Jayanta",
    age: 21,
    cards: [],
    cardsum: 0,
    isAlive: false,
    hasBlackJack: false,
    chips: 200,
    wins: 0
};
const computer = {
    name: "Computer",
    age: 100,
    cards: [],
    cardsum: 0,
    isAlive: false,
    hasBlackJack: false,
    wins: 0
};
/* COMPLETED VARIABLES INITIALIZATION */

/* GRAPHICS INITIALIZATION */
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

let br = document.createElement("br");

playerEl.textContent = player.name + ": $" + player.chips;

newCardButton = document.getElementById("button--newcard");
holdButton = document.getElementById("button--hold");

/* Function to pick a Random card */
const getRandomCard = (newDeck) => {
    let index = Math.floor( Math.random()*totalCards );
    let pickedCard = newDeck[index];
    totalCards -= 1;
    //console.log(totalCards);
    //console.log(pickedCard);

    /* Card Graphics */
    let li = document.createElement("li");
    let playerCards = document.getElementById("player-cards");
    cardName = document.createTextNode(pickedCard.name + " of " + pickedCard.suit);
    li.appendChild(cardName);
    playerCards.appendChild(li);

    removeCard(newDeck, index);
    return pickedCard;
    //console.log(newDeck);
}
/* Function to remove a card by passing a card object and the index of the card in the deck */
const removeCard = (newDeck, index) => newDeck.splice(index,1);
    //console.log("Current Deck Size: " + newDeck.length);

/* Get the value of the card as per Blackjack rules */
/* King, Queen, Jack - 11,12,13 = 10 ||| Ace = 1 or 11 ||| Other Cards - As per Index Value */
const getCardValue = (newDeck) => {
    pickedCard = getRandomCard(newDeck);
    if (pickedCard["suit_index"] > 10) {
        return 10;
    } else if (pickedCard["suit_index"] === 1) {
        return getAceValue();
    } else {
        return pickedCard["suit_index"];
    }
}
/* Ace Value Randomizer */
/* Generate Random Number between 0 and 1 and round to nearest whole number, for a boolean-like true-false */
/* If 0 = 1, if 1 = 11 */
const getAceValue = () => {
    const trueFalse = Math.round ( Math.random() );
    if(trueFalse === 0) {
        return 1;
    } else {
        return 11;
    }
}

/* Initialize Defaults and Start Game */
const startGame = () => {
    totalCards = 52;
    newDeck = renderCards();
    shuffleDeck(newDeck);
    document.getElementById("player-cards").innerHTML = "";
    messageEl.style.color = "inherit";
    messageEl.style["font-size"] = "inherit";
    player.isAlive = true;
    player.hasBlackJack = false;
    const firstCard = getCardValue(newDeck);
    const secondCard = getCardValue(newDeck);
    player.cards = [firstCard, secondCard];
    player.cardsum = firstCard + secondCard;
    renderGame();
}

/* Game Rendering with Graphics */
const renderGame = () => {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < player.cards.length; i++) {
        cardsEl.textContent += player.cards[i] + " ";
    }    
    sumEl.textContent = "Sum: " + player.cardsum;
    if (player.cardsum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (player.cardsum === 21) {
        message = "You've got Blackjack!";
        player.hasBlackJack = true;
    } else {
        messageEl.style.color = "crimson";
        messageEl.style["font-size"]= "30px";
        message = "You're out of the game!";
        player.isAlive = false;
    }
    messageEl.textContent = message;
    if(player.isAlive == true && player.hasBlackJack == false)
    {
        newCardButton.style.display = "inline-block";
        holdButton.style.display = "inline-block";
    } else
    {
        newCardButton.style.display = "none";
        holdButton.style.display = "none";
    }
}

/* Function for Drawing a Card*/
const newCard = () => {
    if (player.isAlive === true && player.hasBlackJack === false) {
        const cardValue = getCardValue(newDeck);
        player.cardsum += cardValue;
        player.cards.push(cardValue);
        renderGame();  
    }
}
