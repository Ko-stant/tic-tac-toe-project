'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

// console.log(getFormFields)

const onCellSelect = function (event) {
  const cellData = event.target.dataset
  const cellIndex = cellData.cellIndex
  ui.updateCell(cellIndex)
}

const addHandlers = function () {
  $('.game-field').on('click', onCellSelect)
}

module.exports = {
  addHandlers
}
