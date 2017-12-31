'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  ui.gameAction(cellIndex)
}

const onNewGame = function (event) {
  ui.newGame()
}

const signInModal = function (event) {
  $('#sign-in-modal').css('display', 'block')
}

const signUpModal = function (event) {
  $('#sign-up-modal').css('display', 'block')
}

const passwordModal = function (event) {
  $('#password-modal').css('display', 'block')
}

const closeSignIn = function (event) {
  $('#sign-in-modal').css('display', 'none')
}

const closeSignUp = function (event) {
  $('#sign-up-modal').css('display', 'none')
}

const closePassword = function (event) {
  $('#password-modal').css('display', 'none')
}

const blurAllModals = function (event) {
  const modalText = event.target.id
  if (modalText === 'sign-in-modal' || modalText === 'sign-up-modal') {
    $('#sign-in-modal').css('display', 'none')
    $('#sign-up-modal').css('display', 'none')
  }
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = function () {
  $('.game-board').on('click', onCellSelect)
  $('#new-game').on('click', onNewGame)
  $('#sign-in').on('click', signInModal)
  $('#sign-up').on('click', signUpModal)
  $('#changepw-btn').on('click', passwordModal)
  $('.close-sign-in').on('click', closeSignIn)
  $('.close-sign-up').on('click', closeSignUp)
  $('.close-password').on('click', closePassword)
  $(window).on('click', blurAllModals)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
