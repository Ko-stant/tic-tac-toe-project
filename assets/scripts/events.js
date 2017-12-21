'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

console.log(getFormFields)

const onCellSelect = function () {
  ui.updateCell()
}

const addHandlers = function () {
  $('#tl').on('click', onCellSelect)
}

module.exports = {
  addHandlers
}
