## GAME LINK
[My Tic Tac Toe on gh-pages](https://ko-stant.github.io/tic-tac-toe-project/ "K-Stant Tic-Tac-Toe")

## TECHNOLOGIES USED

-__HTML__
-__SCSS__
-__JAVASCRIPT__
-__JQUERY__
-__AJAX__

## GAME INFO

### FIRST PAGE LOAD

-New game is created.

-Score is set to 0.

-UI displays Create Account || Sign Up

Completed√

### GAMEBOARD

-Properly updates when a cell is clicked

-New Game wipes the board and resets turn counter and creates new game on the
API when signed in

Completed√

### GAME LOGIC

-Win checks are working properly

-When game is over, properly updating game score

-Does not allow same square to be taken if already done

-Game is no longer able to be played once it is over

Completed√

### ACCOUNTS

-Creating new account functions as one would assume

-Signing in runs several functions to:

..-log user data

..-create a new game on screen and API

..-send get request for player stats

-Changing password functions properly

-Games stats are correctly updated to reflect the signed in user

-Sign out clears logged data and changes navbar to reflect being signed out

-UI updates to display errors to user and some success messages as well

Completed√


### TODO

-Bonuses

### FUTURE POTENTIAL
_these may make it into future updates_

-create sign in and API data for O

-Allow for another user to play game from a different device

-Allow for game searches to take place to find unfinished games and load the game state.

-Store games locally after loss of network connection and upload results when connection is restored. This should be able to be handled by creating a games object after a successful sign in, and then each error of game actions (create, update cell, game over) while signed in will push game data to the games object setting their ids to 0. When games are over attempt to run loop through object for all with id of 0 with post requests to server and update game id on successful API call

## WIREFRAMES & USER STORIES

### WIREFRAMES

[Version1](./tree/master/images/wireframe-v1.jpg)
[Version2](./tree/master/images/wireframe-v2.jpg)

### USER STORIES
#### Initial goals

- As a potential user I want to be able to sign in easily
- As a signed-in user I want to be able to know that I am signed in
- As a player I want to be able to know what piece I’m playing with
- As a player I want to be able to see the current sessions score
- As a player I want to be able to start a new game

#### More in depth/bonus

- As a signed-in user I want to see my win/loss/tie history
- As a single-player I want to be able to play by myself
- As a player I want to play against a remote player
- As a player without a great internet connection, I want to be able to keep playing a cached game
