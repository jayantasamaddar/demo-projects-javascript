CHANGELOG
---------
v1.0

- Define a 13 Card Suit of 13 cards and assign suit_index value to each of them (Ace = 1, King = 13). Each card is an object.
- Created a renderCards function to render a 52 Card Deck using the 13 Card Suit for all 4 Suits (Hearts, Diamonds, Spades, Clubs) and return a cardsDeck array containing all 52 Card objects.
- Created a shuffleCards function that takes in the cardsDeck array of cards and shuffles the order using Fisher-Yates (aka Knuth) Shuffle Algorithm. Assigns a deck_index value to each of the shuffled cards that refreshes itself everytime the cards are shuffled.
- A total of four loops have been used used.

v1.1
- Const variables have been used wherever possible.

v1.2
The goal has been to shorten the code and make it more concise
---------------------------------------------------------------
- Arrow functions replace traditional function declaration.
- Assuming there is no reusability of the getCardSuit function, it now lives inside the renderCards function.
- The conditional (ternary) operator has been used instead of if-else wherever it makes sense.
- The onclick Event has been replaced with JavaScript Event Handlers.
- Template Literals have been used instead of long concatenations wherever possible.
