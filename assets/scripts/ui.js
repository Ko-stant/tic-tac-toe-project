'use strict'

const store = require('./store')

let boardArray = ['', '', '', '', '', '', '', '', '']
let turnCount = 0
let over = false

const clearFields = function () {
  $('input:text, input:password, input[type=email]').val('')
}

const signUpSuccess = function (data) {
  console.log(data)
  clearFields()
}

const signInSuccess = function (data) {
  console.log(data)
  $('.sign-in-nav').css('display', 'none')
  $('#navbar').attr('id', 'sign-in-nav')
  $('.account-nav').css('display', 'block')
  $('#account-nav').attr('id', 'navbar')
  store.user = data.user
  console.log(store)
  clearFields()
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
  console.log(store)
}

const signOutFailure = function (error) {
  console.error(error)
}

const newGame = function () {
  boardArray = ['', '', '', '', '', '', '', '', '']
  turnCount = 0
  over = false
  $('.token').text('')
  $('.result-message').text('')
  turnMessage()
}

const gameEnd = function (boolean) {
  if (boolean) {
    $('.turn-message').text('The game has finished. Select "New Game".')
    over = true
  }
}

// will be used to determine turn based on even/odd
const isEven = function (i) {
  if (i % 2) {
    return false
  } else {
    return true
  }
}

const winCheck = function (token) {
  if ((boardArray[0] === token && boardArray[1] === token && boardArray[2] === token) || (boardArray[3] === token && boardArray[4] === token && boardArray[5] === token) || (boardArray[6] === token && boardArray[7] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[3] === token && boardArray[6] === token) || (boardArray[1] === token && boardArray[4] === token && boardArray[7] === token) || (boardArray[2] === token && boardArray[5] === token && boardArray[8] === token) || (boardArray[0] === token && boardArray[4] === token && boardArray[8] === token) || (boardArray[2] === token && boardArray[4] === token && boardArray[6] === token)) {
    return true
  } else {
    return false
  }
}

const turnMessage = function () {
  if (isEven(turnCount)) {
    $('.turn-message').text('Current turn is: X')
  } else {
    $('.turn-message').text('Current turn is: O')
  }
}

turnMessage()

const updateCell = function (cellIndex) {
  if (boardArray[cellIndex] === 'x' || boardArray[cellIndex] === 'o') {
    $('.result-message').text('That square is already taken.')
  } else if (isEven(turnCount)) {
    boardArray[cellIndex] = 'x'
    $('.game-board')[cellIndex].innerHTML = '<p class="token">X</p>'
    $('.result-message').text('')
  } else if (isEven(turnCount) === false) {
    boardArray[cellIndex] = 'o'
    $('.game-board')[cellIndex].innerHTML = '<p class="token">O</p>'
    $('.result-message').text('')
  }
  const turnArray = []
  boardArray.forEach(function (value) {
    if (value === 'x' || value === 'o') {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  turnMessage()
  if (turnCount === 9) {
    if (winCheck('x') === true) {
      $('.result-message').text('X has won!')
      gameEnd(true)
    } else {
      $('.result-message').text('There was a tie!')
      gameEnd(true)
    }
  } else if (turnCount === 5 || turnCount === 7) {
    if (winCheck('x') === true) {
      $('.result-message').text('X has won!')
      gameEnd(true)
    }
  } else if (turnCount === 6 || turnCount === 8) {
    if (winCheck('o') === true) {
      $('.result-message').text('O has won!')
      gameEnd(true)
    }
  }
}
// main game function call. prevents game from continuing once it has completed.
const gameAction = function (cellIndex) {
  if (over) {
    $('.turn-message').text('The game has finished. Select "New Game".')
  } else {
    updateCell(cellIndex)
  }
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
  gameAction,
  newGame
}
