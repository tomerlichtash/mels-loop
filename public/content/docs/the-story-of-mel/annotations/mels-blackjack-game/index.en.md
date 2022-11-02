---
source_name: Blackjack Writeup
source_url: /docs/blackjack-writeup
source_author: Mel Kaye
---

Mel's Blackjack Program was used as a demo for marketing purposes to showcase the capabilities of the LGP-30, and as such became the flagship program of the company for this purpose.

After porting it to the RPC-4000, Mel added a write-up in which he explained how to operate the program: The interaction between the player ("the machine operator") to the computer was via the Flexorwriter. The output (dealer's prompt questions, card list etc.) was printed out, and the input was typed on the typewriter machine. First, the computer prompted the question "How much do you bet?"; the player typed the amount, and afterwords added an astriek which was used a stop command. (e.g. "`150*` - bets $1.50"). Once the amount is submitted, the Flexowriter will print out "Shuffling" and the computer will siumulate the shuffling of the deck. In order to continue with the game, the shuffling simulation had to be manually stopped (by raising `SENSE SWITCH 1`). Then, the program printed "Cut" and simulated a cut of the deck. Again, this had to be stopped manually in order to complete the cut (by lowering `SENSE SWITCH 1`). Then, the program would deal the cards, and the game continued. All questions from the program must be answered on the typewriter keyboard, and must be followed by depressing the stop code key. Permissible affirmative answers are: `yes*`, `ok*`, `si*`, `ja*`, `oui*`. Permissible negative answers are: `no*`, `non*`, `nein*`, `nope*`, or only the `astriek` symbol stop code. Another thing to keep in mind, is that prior to the usage, the player had to setup the machine properly in order to see get a fitting User Interface for the machine's output.

As Mel mentions in his [write-up for the blackjack game](/docs/blackjack-writeup):

> "Before playing Blackjack, set 4 typewriter tab stops to provide for 4 columns of printing. The following is the suggested column lengths (left to right) and their content

1. 15 spaces. This column will contain alphabetic questions and the player's responses
2. 12 spaces. This column will contain the player's cards and their numeric total or an alphabetic comment
3. 12 spaces. This column will contain the dealer's (computer's) cards and their numeric total or an alphabetic comment
4. 12 spaces. This column will contain the score at the end of each hand.

> Secondly, the machine operator had to load the tape to the machine in 10 simple steps:

1. Place tape in Reader
2. Select Reader input
3. Depress `ONE OPERATION`
4. Depress `EXECUTE LOWER`
5. Depress `SET INPUT`
6. Depress `START READ` on the Reader
7. Raise `EXECUTE LOWER`
8. Depress `SET INPUT`
9. Raise `ONE OPERATION`
10. Depress `START READ` on the Reader.
