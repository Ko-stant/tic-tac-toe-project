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
// turnCount is set to 0 inside of function to do a check each time the function is called. The function takes in the index value from events.js and uses that as the array index for board array. Depending on the even/odd value of the turnCount the array is updated with the correct string.
const updateCell = function (cellIndex) {
  let turnCount = 0
  for (let i = 0; i < boardArray.length - 1; i++) {
    if (boardArray[i] === 'x' || boardArray[i] === 'o') {
      turnCount++
    }
  }
  if (boardArray[cellIndex] === 'x' || boardArray[cellIndex] === 'o') {
    console.log('square is already taken.')
  } else if (isEven(turnCount) === true) {
    boardArray[cellIndex] = 'x'
  } else if (isEven(turnCount) === false) {
    boardArray[cellIndex] = 'o'
  }
  console.log(boardArray)
  console.log(turnCount)
}

module.exports = {
  updateCell
}
