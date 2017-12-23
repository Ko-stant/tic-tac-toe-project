'use strict'

const store = require('./store')

// will be used to determine turn based on even/odd
const isEven = function (i) {
  if (i % 2) {
    return false
  } else {
    return true
  }
}
const boardArray = ['', '', '', '', '', '', '', '', '']

let turnCount = 0
const winCheck = function (token) {
  if ((boardArray[0] === token && boardArray[1] === token && boardArray[2] === token) || (boardArray[3] === token && boardArray[4] === token && boardArray[5] === token) || (boardArray[6] === token && boardArray[7] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[3] === token && boardArray[6] === token) || (boardArray[1] === token && boardArray[4] === token && boardArray[7] === token) || (boardArray[2] === token && boardArray[5] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[4] === token && boardArray[8] === token) || (boardArray[2] === token && boardArray[4] === token && boardArray[6] === token)) {
    return true
  } else {
    return false
  }
}

let over = false

const turnMessage = function () {
  if (isEven(turnCount)) {
    $('.turn-message').text('Current turn is: X')
  } else {
    $('.turn-message').text('Current turn is: O')
  }
}

turnMessage()

const updateCell = function (cellIndex) {
  if (boardArray[cellIndex] === 'x' || boardArray[cellIndex] === 'o') {
    $('.result-message').text('That square is already taken.')
  } else if (isEven(turnCount) === true) {
    boardArray[cellIndex] = 'x'
    $('.game-board')[cellIndex].innerHTML = '<p class="token">X</p>'
    $('.result-message').text('')
  } else if (isEven(turnCount) === false) {
    boardArray[cellIndex] = 'o'
    $('.game-board')[cellIndex].innerHTML = '<p class="token">O</p>'
    $('.result-message').text('')
  }
  const turnArray = []
  boardArray.forEach(function (value) {
    if (value === 'x' || value === 'o') {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  if (turnCount === 9) {
    if (winCheck('x') === true) {
      $('.result-message').text('X has won!')
      over = true
    } else {
      $('.result-message').text('There was a tie!')
      over = true
    }
  } else if (turnCount === 5 || turnCount === 7) {
    if (winCheck('x') === true) {
      $('.result-message').text('X has won!')
      over = true
    }
  } else if (turnCount === 6 || turnCount === 8) {
    if (winCheck('o') === true) {
      $('.result-message').text('O has won!')
      over = true
    }
  }
  turnMessage()
}

const gameAction = function (cellIndex) {
  if (over) {
    $('.turn-message').text('The game has finished. Select new game.')
  } else {
    updateCell(cellIndex)
  }
}

module.exports = {
  gameAction
}
