'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')
const store = require('./store')

// gameboard
let cells = ['', '', '', '', '', '', '', '', '']
let over = false
let turnCount = 0

const gameOver = () => $('.turn-message').text('The game has finished. Select "New Game".')

// resets game values, game board, and result message (winner or tie)
const newGame = function () {
  cells = ['', '', '', '', '', '', '', '', '']
  turnCount = 0
  apiCheck = 0
  over = false
  $('.token').text('')
  $('.result-message').text('')
  turnMessage()
  $('.new-game-button').css('display', 'none')
}

// sets over to true and displays game over message
const gameEnd = function (boolean) {
  if (boolean) {
    gameOver()
    $('.new-game-button').css('display', 'inline-block')
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

// checks for win based on 'x' or 'o' from local gameboard
const winCheck = function (token) {
  if ((cells[0] === token && cells[1] === token && cells[2] === token) || (cells[3] === token && cells[4] === token && cells[5] === token) || (cells[6] === token && cells[7] === token && cells[8] === token) || (cells[0] === token && cells[3] === token && cells[6] === token) || (cells[1] === token && cells[4] === token && cells[7] === token) || (cells[2] === token && cells[5] === token && cells[8] === token) || (cells[0] === token && cells[4] === token && cells[8] === token) || (cells[2] === token && cells[4] === token && cells[6] === token)) {
    return true
  } else {
    return false
  }
}

// this may seem redundant, but due to how turns are being handled both of these are needed for player tokens
const playerAvatarX = 'x'
const playerAvatarO = 'o'

const playerAvatar = function (turnCount) {
  if (isEven(turnCount - 1)) {
    return 'x'
  } else {
    return 'o'
  }
}

// dispays message every turn for current player
const turnMessage = function () {
  if (isEven(turnCount)) {
    $('.turn-message').text(`Current turn is: ${playerAvatarX.toUpperCase()}`)
  } else {
    $('.turn-message').text(`Current turn is: ${playerAvatarO.toUpperCase()}`)
  }
}
turnMessage()

let apiCheck = 0
const updateCell = function (cellIndex) {
  // updates UI to display player token if space is available, if unavailable do not allow square to be taken and display message to user
  if (cells[cellIndex] === playerAvatarX || cells[cellIndex] === playerAvatarO) {
    $('.result-message').text('That square is already taken.')
  } else if (isEven(turnCount)) {
    cells[cellIndex] = playerAvatarX
    $('.game-board')[cellIndex].innerHTML = '<p class="token">X</p>'
    $('.result-message').text('')
  } else if (isEven(turnCount) === false) {
    cells[cellIndex] = playerAvatarO
    $('.game-board')[cellIndex].innerHTML = '<p class="token">O</p>'
    $('.result-message').text('')
  }
  // this array/function combo determines the current turn count by creating an empty array each call and then pushing the current filled cells into it and counting the length
  const turnArray = []
  cells.forEach(function (value) {
    if (value === playerAvatarX || value === playerAvatarO) {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  // call turn message before handling final win check
  turnMessage()
  // which checker for moves 5-9, display results, sets game to over and updates score
  if (turnCount === 9) {
    if (winCheck(playerAvatarX) === true) {
      $('.result-message').text(`${playerAvatarX.toUpperCase()} has won!`)
      gameEnd(true)
      let winX = $('.win-x').text()
      $('.win-x').text(`${++winX}`)
    } else {
      $('.result-message').text('There was a tie!')
      gameEnd(true)
      let tie = $('.tie').text()
      $('.tie').text(`${++tie}`)
    }
  } else if (turnCount === 5 || turnCount === 7) {
    if (winCheck(playerAvatarX) === true) {
      $('.result-message').text(`${playerAvatarX.toUpperCase()} has won!`)
      gameEnd(true)
      let winX = $('.win-x').text()
      $('.win-x').text(`${++winX}`)
    }
  } else if (turnCount === 6 || turnCount === 8) {
    if (winCheck(playerAvatarO) === true) {
      $('.result-message').text(`${playerAvatarO.toUpperCase()} has won!`)
      gameEnd(true)
      let winO = $('.win-o').text()
      $('.win-o').text(`${++winO}`)
    }
  }
  // updates API with correct token per turn and sets over value to true
  // only runs if user is signed in
  const turnValue = playerAvatar(turnCount)
  if (store.user) {
    const data = {
      game: {
        id: store.game.id,
        cell: {
          index: cellIndex,
          value: turnValue
        },
        over
      }
    }
    // prevents api call if square is taken
    if (apiCheck !== turnCount) {
      apiCheck += 1
      api.updateGame(data)
        .then(ui.updateGameSuccess)
        // .catch(ui.updateGameFailure)
    }
  }
}
// main game function. prevents game from continuing once it has completed.
const gameAction = function (cellIndex) {
  if (over) {
    gameOver()
  } else {
    updateCell(cellIndex)
  }
}

// gets cell data to pass to gameAction
const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  gameAction(cellIndex)
}

// creates new local game and (if signed in) API game
const onNewGame = function () {
  newGame()
  if (store.user) {
    api.createGame()
      .then(ui.createGameSuccess)
      .catch(ui.createGameFailure)
  }
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// signs in user, creates new game on server and locally - pushes user stats to stats field
const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
    .then(api.createGame)
    .then(ui.createGameSuccess)
    .then(api.getStats)
    .then(ui.getStatsSuccess)
    .then(newGame())
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

// create a new local game upon signout
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .then(newGame())
    // .catch(ui.signOutFailure)
}

// only run when dropdown menu is closed, this prevents another call from happening if the menu is already open
const onGetStats = function (event) {
  if ($(this).attr('aria-expanded') === 'false' || $(this).attr('aria-expanded') === undefined) {
    api.getStats()
      .then(ui.getStatsSuccess)
      .catch(ui.getStatsFailure)
  }
}

const addHandlers = function () {
  $('.game-board').on('click', onCellSelect)
  $('#new-game').on('click', onNewGame)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out').on('click', onSignOut)
  $('.player-stats-menu').on('click', onGetStats)
}

module.exports = {
  addHandlers
}
