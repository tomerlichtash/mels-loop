---
title: "BLACKJACK GAME By Mel Kaye of Librascope Inc. RPC 4000 Program W1-01.0"
author: Mel Kaye
# date: "2020-01-02"
source_name: Mel's Writeup for the Blackjack Program
source_url: http://bitsavers.trailing-edge.com/pdf/royalPrecision/RPC-4000/programWriteups/W1-01.0_Blackjack_Game.pdf
---

This program is designed to simulate a game of Blackjack between one player (the machine operator) and a dealer a dealer (the computer). This write-up is intended to provide the player with the information necessary to play the game.

Before playing Blackjack, set 4 typewriter tab stops to provide for 4 columns of printing. The following is the suggested column lengths (left to right) and their content.

1. 15 spaces. This column will contain alphabetic questions and the player's responses.
2. 12 spaces. This column will contain the player's cards and their numeric total or an alphabetic comment.
3. 12 spaces. This column will contain the dealer's (computer's) cards and their numeric total or an alphabetic comment.
4. 12 spaces. This column will contain the score at the end of each hand.

The standard RPC-4000 bootstrap loading procedure will load the hexadecimal program tape (no check sum) into locations 00000 through 00928. The program begins at location 00000. After the tape is input, the program selects the typewriter for input and output and then prints "How much do you bet?"
Type the amount of your bet in Pennis and press the stop code. e.g., 150\* bets $1.50.

Next, the program prints "Shuffling". Depress SENSE SWITCH 1 to terminate the shuffling procedure. The program then prints "Cut" and simulates cutting the deck until SENSE SWITCH 1 is raised. The program then deals cards and the game proceeds.

All questions from the program must be answered on the typewriter keyboard, and must be followed by depressing the stop code (_) key. Permissible affirmative answers are: yes_, ok*, si*, ja*, oui*. Permissible negative answers are: no*, non*, nein*, nope*, \* (only the stop code).

If the player's first two cards total 11, the program prints "Press?"
An affirmative answer will cause the program to deal the player one card only, and to double the amount of bet for this hand. Any non-affirmative answer to Press causes the program to proceed normally and ask wether the player wants a card.

## PLAYING CONVENTIONS

1. Player's Blackjack pays double.
2. Program pays double for player's 5 cards without exceeding 21. Triple is paid for 7 cards.
3. Equal totals are considered a standoff. The score remains unchanged.
4. Shuffling occurs at the end of a hand after any of the following occur:
   a. Thirty-nine or more cards have been dealt.
   b. Three or more aces have been dealt.
   c. SENSE SWITCH 4 is depressed.
5. The program will stop after each complete hand unless SENSE SWITCH 16 is depressed.
6. The amount of bet will be changed at the end of a hand if SENSE SWITCH 8 is depressed. Any three digit number may be entered.
7. Blackjack by either dealer or player will cause the hand to end and the new score to be printed in column 4.
8. If SENSE SWITCH 32 is depressed, there is a better than normal chance of an ace being dealt as the player's first card.

## LOADING THE PROGRAM TAPE

1. Place tape in Reader
2. Select Reader input
3. Depress ONE OPERATION
4. Depress EXECUTE LOWER
5. Depress SET INPUT
6. Depress START READ on the Reader
7. Raise EXECUTE LOWER
8. Depress SET INPUT
9. Raise ONE OPERATION
10. Depress START READ on the Reader.

NOTE
After the program tape has been stored in memory, control is transferred to 00000. Since the Blackjack Program begins at location 000000 it is very easy to transfer to it. (Depress SET INPUT, EXECUTE LOWER, and START.)
