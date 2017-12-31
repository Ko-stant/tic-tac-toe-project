'use strict'

const store = require('./store')

const clearFields = function () {
  $('input:text, input:password, input[type=email]').val('')
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
  store.user = {}
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
