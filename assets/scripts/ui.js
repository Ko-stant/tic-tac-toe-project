'use strict'

const store = require('./store')

const clearFields = function () {
  $('input:text, input:password, input[type=email]').val('')
}

const winCheck = function (token) {
  let score = 0
  for (let i = 0; i < store.games.length; i++) {
    if ((store.games[i].cells[0] === token && store.games[i].cells[1] === token && store.games[i].cells[2] === token) || (store.games[i].cells[3] === token && store.games[i].cells[4] === token && store.games[i].cells[5] === token) || (store.games[i].cells[6] === token && store.games[i].cells[7] === token && store.games[i].cells[8] === token) || (store.games[i].cells[0] === token && store.games[i].cells[3] === token && store.games[i].cells[6] === token) || (store.games[i].cells[1] === token && store.games[i].cells[4] === token && store.games[i].cells[7] === token) || (store.games[i].cells[2] === token && store.games[i].cells[5] === token && store.games[i].cells[8] === token) || (store.games[i].cells[0] === token && store.games[i].cells[4] === token && store.games[i].cells[8] === token) || (store.games[i].cells[2] === token && store.games[i].cells[4] === token && store.games[i].cells[6] === token)) {
      score++
    }
  }
  return score
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
  $('.score').text(0)
  clearFields()
}

const getStatsSuccess = function (data) {
  store.games = data.games
  const tokenX = winCheck('x')
  const tokenO = winCheck('o')
  const tie = store.games.length - (tokenX + tokenO)
  $('.stats-games').text(`${store.games.length}`)
  $('.stats-wins').text(`${tokenX}`)
  $('.stats-ties').text(`${tie}`)
  $('.stats-losses').text(`${tokenO}`)
}

const getStatsFailure = function (error) {
  console.error(error)
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
  $('.score').text(0)
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
  updateGameFailure,
  getStatsSuccess,
  getStatsFailure
}
