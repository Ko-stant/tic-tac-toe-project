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

const updateCell = function (cellIndex) {
  let count = 0
  for (let i = 0; i < boardArray.length - 1; i++) {
    if (boardArray[i] === 'x' || boardArray[i] === 'o') {
      count++
    }
  }
  if (isEven(count) === true) {
    boardArray[cellIndex] = 'x'
  } else {
    boardArray[cellIndex] = 'o'
  }
  console.log(boardArray)
  console.log(count)
}

module.exports = {
  updateCell
}
