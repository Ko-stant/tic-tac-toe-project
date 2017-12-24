'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

// console.log(getFormFields)

const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  ui.gameAction(cellIndex)
}

const onNewGame = function (event) {
  ui.newGame()
}

const addHandlers = function () {
  $('.game-board').on('click', onCellSelect)
  $('#new-game').on('click', onNewGame)
}

module.exports = {
  addHandlers
}
