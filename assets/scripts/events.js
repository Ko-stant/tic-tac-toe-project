'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

const games = {
  id: null,
  cells: ['', '', '', '', '', '', '', '', ''],
  over: false,
  player_x: {
    id: null,
    email: null
  },
  player_o: {
    id: null,
    email: null
  }
}

let cells = games.cells
let over = games.over
let playerX = games.player_x
let playerO = games.player_o
const playerAvatarX = 'x'
const playerAvatarO = 'o'

let turnCount = 0
const gameOver = () => $('.turn-message').text('The game has finished. Select "New Game".')

const newGame = function () {
  cells = ['', '', '', '', '', '', '', '', '']
  turnCount = 0
  over = false
  $('.token').text('')
  $('.result-message').text('')
  turnMessage()
}

const gameEnd = function (boolean) {
  if (boolean) {
    gameOver()
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
  if ((cells[0] === token && cells[1] === token && cells[2] === token) || (cells[3] === token && cells[4] === token && cells[5] === token) || (cells[6] === token && cells[7] === token && cells[8] === token) || (cells[0] === token && cells[3] === token && cells[6] === token) || (cells[1] === token && cells[4] === token && cells[7] === token) || (cells[2] === token && cells[5] === token && cells[8] === token) || (cells[0] === token && cells[4] === token && cells[8] === token) || (cells[2] === token && cells[4] === token && cells[6] === token)) {
    return true
  } else {
    return false
  }
}

const turnMessage = function () {
  if (isEven(turnCount)) {
    $('.turn-message').text(`Current turn is: ${playerAvatarX.toUpperCase()}`)
  } else {
    $('.turn-message').text(`Current turn is: ${playerAvatarO.toUpperCase()}`)
  }
}

turnMessage()

const gameStatus = function () {
  const turnArray = []
  cells.forEach(function (value) {
    if (value === playerAvatarX || value === playerO.avatar) {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  turnMessage()
  if (turnCount === 9) {
    if (winCheck(playerAvatarX) === true) {
      $('.result-message').text(`${playerAvatarX.toUpperCase()} has won!`)
      gameEnd(true)
    } else {
      $('.result-message').text('There was a tie!')
      gameEnd(true)
    }
  } else if (turnCount === 5 || turnCount === 7) {
    if (winCheck(playerAvatarX) === true) {
      $('.result-message').text(`${playerAvatarX.toUpperCase()} has won!`)
      gameEnd(true)
    }
  } else if (turnCount === 6 || turnCount === 8) {
    if (winCheck(playerO.avatar) === true) {
      $('.result-message').text(`${playerAvatarO.toUpperCase()} has won!`)
      gameEnd(true)
    }
  }
}

const updateCell = function (cellIndex) {
  if (cells[cellIndex] === playerAvatarX || cells[cellIndex] === playerO.avatar) {
    $('.result-message').text('That square is already taken.')
  } else if (isEven(turnCount)) {
    cells[cellIndex] = playerAvatarX
    $('.game-board')[cellIndex].innerHTML = '<p class="token">X</p>'
    $('.result-message').text('')
  } else if (isEven(turnCount) === false) {
    cells[cellIndex] = playerO.avatar
    $('.game-board')[cellIndex].innerHTML = '<p class="token">O</p>'
    $('.result-message').text('')
  }
  gameStatus()
}
// main game function call. prevents game from continuing once it has completed.
const gameAction = function (cellIndex) {
  if (over) {
    gameOver()
  } else {
    updateCell(cellIndex)
  }
}

const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  gameAction(cellIndex)
}

const onNewGame = function (event) {
  newGame()
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

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = function () {
  $('.game-board').on('click', onCellSelect)
  $('#new-game').on('click', onNewGame)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
}

module.exports = {
  addHandlers
}
