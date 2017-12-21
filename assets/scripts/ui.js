'use strict'

const store = require('./store')

// const updateCell = function () {
//   const test = document.getElementsByClassName('game-board')
//   $(test[7]).text('clicked.')
// }

// const getDataset = function () {
//   const boardArray = []
//   const divArray = document.getElementsByClassName('game-board')
//   for (let i = 0; i < divArray.length; i++) {
//     const dataSet = divArray[i].dataset.cellIndex
//     boardArray.push(dataSet)
//   }
//   return boardArray
// }

const updateCell = function (cellIndex) {
  console.log('the array index will be', cellIndex)
}

module.exports = {
  updateCell
}
