'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
// update with 'X' and 'O' based on turn

// object to keep track of game, in progress or finished

// userData can be constructor to have blank user and games info
// kostant = new UserData    etc

// kostant = {
// each created user to be assigned an ID on user creation
//     user: {
// id will be used when choosing X or O for player
//       id: 1,
//       email: "and@and.com"
//      },
//     games: {
//      id: 1,
//      cells: ["o","x","o","x","o","x","o","x","o"],
// toggle when game win or tie is displayed
//      over: true,
// this is to be able to continue if game is not over
// count is determined by current number of X + O in array
// if even, next play is X, if odd, next play is O if 9, automatically toggle > over: true
//      lastPlay: 9,
//      player_x: {   // will use user.id to generate
//        id: 1
//      },
//      player_o: {
// will use user.id to generate
//        id: 3
// }

// win conditions
//  0  |  1  |  2
//  3  |  4  |  5
//  6  |  7  |  8
// gameBoard [0, 1, 2]
// gameBoard [3, 4, 5]
// gameBoard [6, 7, 8]
// gameBoard [0, 3, 6]
// gameBoard [1, 4, 7]
// gameBoard [2, 5, 8]
// gameBoard [0, 4, 8]
// gameBoard [2, 4, 6]

// if X or O aquires winning combo, win. Check for win starting at move 5.
// if move 7, check O and X for last two moves to see if win is possible.
// trigger tie if not
// if move 9, trigger tie if no winning combo

let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]

// divs are natually boxes, use this to create 3x3 and assign to same style array as gameboard

// update gameBoard indexes per box selected

const even = function(i) {
  if (i % 2) {
    return false
  } else {
    return true
  }
}

// event listener updates turn as well as inserting string into arrays
// when div[i] is selected by player, automatically determine player
// based on playcount
// if play is odd, always update game with X
// if (play === div[i] && even(play) === false) {
//   gameboard[i] = player_x
// }
// // if play is even, always update game with O
// if (play === div[i] && even(play) === true) {
//   gameBoard[i] = player_o
// }

// use bookmarked stack overflow page to help with blur/focus for hiding/showing
// submenus
