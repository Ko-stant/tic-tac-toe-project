'use strict'

const store = require('./store')

const clearFields = function () {
  $('input:text, input:password, input[type=email]').val('')
}

const users = function (email) {
  const ampersand = email.indexOf('@')
  const userName = email.substring(0, ampersand)
  return userName
}

const signUpSuccess = function (data) {
  clearFields()
}

const signInSuccess = function (data) {
  $('.sign-in-nav').css('display', 'none')
  $('#navbar').attr('id', 'sign-in-nav')
  $('.account-nav').css('display', 'block')
  $('#account-nav').attr('id', 'navbar')
  store.user = data.user
  $('.player-x').text(`${users(store.user.email)}`)
  clearFields()
}

const createGameSuccess = function (data) {
  store.game = data.game
}

const updateGameSuccess = function (data) {
  store.game = data.game
}

const updateGameFailure = function (error) {
  console.error(error)
}

const signInFailure = function (error) {
  console.error(error)
  clearFields()
}

const signUpFailure = function (error) {
  console.error(error)
  clearFields()
}

const changePasswordSuccess = function (data) {
  clearFields()
}

const changePasswordFailure = function (error) {
  console.error(error)
  clearFields()
}

const signOutSuccess = function () {
  $('.account-nav').css('display', 'none')
  $('#navbar').attr('id', 'account-nav')
  $('.sign-in-nav').css('display', 'block')
  $('#sign-in-nav').attr('id', 'navbar')
  $('.player-x').text('Guest')
  $('.player-o').text('Guest')
  store.user = undefined
}

const signOutFailure = function (error) {
  console.error(error)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createGameSuccess,
  updateGameSuccess,
  updateGameFailure
}
