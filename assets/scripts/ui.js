'use strict'

const store = require('./store')

const clearFields = function () {
  $('input:text, input:password, input[type=email]').val('')
}

// checks for wins of token 'x' or 'o' and counts them
const winCheck = function (token) {
  let score = 0
  for (let i = 0; i < store.games.length; i++) {
    if ((store.games[i].cells[0] === token && store.games[i].cells[1] === token && store.games[i].cells[2] === token) || (store.games[i].cells[3] === token && store.games[i].cells[4] === token && store.games[i].cells[5] === token) || (store.games[i].cells[6] === token && store.games[i].cells[7] === token && store.games[i].cells[8] === token) || (store.games[i].cells[0] === token && store.games[i].cells[3] === token && store.games[i].cells[6] === token) || (store.games[i].cells[1] === token && store.games[i].cells[4] === token && store.games[i].cells[7] === token) || (store.games[i].cells[2] === token && store.games[i].cells[5] === token && store.games[i].cells[8] === token) || (store.games[i].cells[0] === token && store.games[i].cells[4] === token && store.games[i].cells[8] === token) || (store.games[i].cells[2] === token && store.games[i].cells[4] === token && store.games[i].cells[6] === token)) {
      score++
    }
  }
  return score
}

// creates a username based on email
const users = function (email) {
  const ampersand = email.indexOf('@')
  const userName = email.substring(0, ampersand)
  return userName
}

// displays message to user on successful account creation and pushes the email used to the sign-in form
const signUpSuccess = function (data) {
  const email = $('#sign-up-email').val()
  clearFields()
  $('#sign-in-email').val(email)
  $('.status-message-sign-up').text('Account created. Please Sign In')
}

// displays message on successful sign in - sets nav bar to signed in state - updates store data to match user - sets user to truncated email - sets score to 0
const signInSuccess = function (data) {
  $('.sign-in-nav').css('display', 'none')
  $('#navbar').attr('id', 'sign-in-nav')
  $('.account-nav').css('display', 'block')
  $('#account-nav').attr('id', 'navbar')
  store.user = data.user
  $('.player-x').text(`${users(store.user.email)}`)
  $('.result-message').text('Signed in succesfully.')
  $('.score').text(0)
  clearFields()
}

// displays correct user stats each request
const getStatsSuccess = function (data) {
  store.games = data.games
  const tokenX = winCheck('x')
  const tokenO = winCheck('o')
  const tie = store.games.length - (tokenX + tokenO)
  $('.stats-failure').css('display', 'none')
  $('.stats-success').css('display', 'block')
  $('.stats-games').text(`${store.games.length}`)
  $('.stats-wins').text(`${tokenX}`)
  $('.stats-ties').text(`${tie}`)
  $('.stats-losses').text(`${tokenO}`)
}

// display message to user is unable to retrieve stats data
const getStatsFailure = function (error) {
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true || errorStatus.startsWith('5') === true || errorStatus.startsWith('0') === true) {
    $('.stats-success').css('display', 'none')
    $('.stats-failure').css('display', 'block')
  }
}

// update store data to match created game
const createGameSuccess = function (data) {
  store.game = data.game
}

// update store data to match updated game
const updateGameSuccess = function (data) {
  store.game = data.game
}

// Until game is configured to handle storing previously logged in status and store games until available to patch again, these functions are not needed.

// const updateGameFailure = function (error) {
//   const errorStatus = error.status.toString()
// }

// display message to user if sign in is unsuccessful
const signInFailure = function (error) {
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true) {
    $('.status-message-sign-in').text('Incorrect Email or Password.')
  } else if (errorStatus.startsWith('5') === true || errorStatus.startsWith('0') === true) {
    $('.status-message-sign-in').text('Unable to contact server.')
  }
  clearFields()
}

// display message to user if account creation is unsuccessful
const signUpFailure = function (error) {
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true) {
    $('.status-message-sign-up').text('Invalid Email or Password.')
  } else if (errorStatus.startsWith('5') === true || errorStatus.startsWith('0') === true) {
    $('.status-message-sign-up').text('Unable to contact server.')
  }
  clearFields()
}

// Display message to user if password change is successful
const changePasswordSuccess = function (data) {
  $('.status-message-change-password').text('Successfully changed password.')
  clearFields()
}

// Display message to user if password change is unsuccessful
const changePasswordFailure = function (error) {
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true) {
    $('.status-message-change-password').text('Incorrect Old Password.')
  } else if (errorStatus.startsWith('5') === true || errorStatus.startsWith('0') === true) {
    $('.status-message-change-password').text('Unable to contact server.')
  }
  clearFields()
}

// on sign out - change nav back to default - set players back to Guest - set score back to 0 - display signed-out message - remove stored text on 'sign in' and 'change password'
const signOutSuccess = function () {
  $('.account-nav').css('display', 'none')
  $('#navbar').attr('id', 'account-nav')
  $('.sign-in-nav').css('display', 'block')
  $('#sign-in-nav').attr('id', 'navbar')
  $('.player-x').text('Guest')
  $('.player-o').text('Guest')
  $('.score').text(0)
  $('.result-message').text('Signed out succesfully.')
  $('.status-message-sign-up').text('')
  $('.status-message-change-password').text('')
  store.user = undefined
}

// Until game is configured to handle storing previously logged in status and store games until available to patch again, these functions are not needed.

// const signOutFailure = function (error) {
//   console.error(error)
// }

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  // signOutFailure,
  createGameSuccess,
  updateGameSuccess,
  // updateGameFailure,
  getStatsSuccess,
  getStatsFailure
}
