'use strict';

let score0 = document.querySelector('#score--0')
let score1 = document.getElementById('score--1')
let dice = document.querySelector('.dice')
let current0 = document.getElementById('current--0')
let current1 = document.getElementById('current--1')

const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let totalScores, currentScore, activePlayer, isPlaying

const init = function () {
  score0.textContent = 0
  score1.textContent = 0
  dice.classList.add('hidden')
  totalScores = [0, 0]
  currentScore = 0
  activePlayer = 0
  isPlaying = true

  current0.textContent = 0
  current1.textContent = 0
  player0.classList.remove('player--winner')
  player1.classList.remove('player--winner')
  player0.classList.add('player--active')
  player1.classList.remove('player--winner')
}

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer == 0 ? 1 : 0
  currentScore = 0
  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

// Dice Roll
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // Generate random roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1

    // Display dice
    dice.classList.remove('hidden')
    dice.src = `dice-${diceNumber}.png`

    // Check for 1
    if (diceNumber != 1) {
      // Add dice to current score
      currentScore = currentScore + diceNumber
      document.getElementById(`current--${activePlayer}`).textContent = currentScore

    } else {
      // Switch Player
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // Add current score to active player score
    totalScores[activePlayer] = totalScores[activePlayer] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer]

    // Check if score >= 100, finish the game
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false
      dice.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    } else {
      // Switch Player
      switchPlayer()
    }

  }
})

btnNew.addEventListener('click', init)