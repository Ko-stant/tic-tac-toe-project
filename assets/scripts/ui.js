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

const winCheck = function (token) {
  if ((boardArray[0] === token && boardArray[1] === token && boardArray[2] === token) || (boardArray[3] === token && boardArray[4] === token && boardArray[5] === token) || (boardArray[6] === token && boardArray[7] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[3] === token && boardArray[6] === token) || (boardArray[1] === token && boardArray[4] === token && boardArray[7] === token) || (boardArray[2] === token && boardArray[5] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[4] === token && boardArray[8] === token) || (boardArray[2] === token && boardArray[4] === token && boardArray[6] === token)) {
    console.log(`${token} is the winner`)
  }
}

let turnCount = 0
const updateCell = function (cellIndex) {
  if (boardArray[cellIndex] === 'x' || boardArray[cellIndex] === 'o') {
    console.log('square is already taken.')
  } else if (isEven(turnCount) === true) {
    boardArray[cellIndex] = 'x'
    $('.game-board')[cellIndex].innerHTML = 'x'
  } else if (isEven(turnCount) === false) {
    boardArray[cellIndex] = 'o'
    $('.game-board')[cellIndex].innerHTML = 'o'
  }
  const turnArray = []
  boardArray.forEach(function (value) {
    if (value === 'x' || value === 'o') {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  console.log('turn array', turnArray)
  console.log('turn count', turnCount)
  console.log('board array', boardArray)
  if (turnCount === (5 || 7 || 9)) {
    winCheck('x')
  } else if (turnCount === (6 || 8)) {
    winCheck('o')
  }
}

module.exports = {
  updateCell
}
