'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')
const store = require('./store')

let cells = ['', '', '', '', '', '', '', '', '']
let over = false
let turnCount = 0

const gameOver = () => $('.turn-message').text('The game has finished. Select "New Game".')

const newGame = function () {
  cells = ['', '', '', '', '', '', '', '', '']
  turnCount = 0
  apiCheck = 0
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
const playerAvatarX = 'x'
const playerAvatarO = 'o'

const playerAvatar = function (turnCount) {
  if (isEven(turnCount - 1)) {
    return 'x'
  } else {
    return 'o'
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

let apiCheck = 0
const updateCell = function (cellIndex) {
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
  const turnArray = []
  cells.forEach(function (value) {
    if (value === playerAvatarX || value === playerAvatarO) {
      turnArray.push(value)
    }
  })
  turnCount = turnArray.length
  turnMessage()
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
        .catch(ui.updateGameFailure)
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

const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  gameAction(cellIndex)
}

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

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .then(newGame())
    .catch(ui.signOutFailure)
}

const onGetStats = function (event) {
  if ($(this).attr('aria-expanded') === 'false') {
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
