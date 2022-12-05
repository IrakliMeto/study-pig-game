'use strict';

// საწყისი ელემენტები
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let whoPlays;
let playining;

// საწყისი ფუნქცია
const init = function () {
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  playining = true;
  whoPlays = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  
  document.querySelector('#name--0').textContent = "PLAYER 1"
  document.querySelector('#name--1').textContent = "PLAYER 2"
};

init();

const startGame = ()=> {
    // ივენთი როლის
    btnRoll.addEventListener('click',()=> {
      if(playining) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      if(whoPlays == 0) {
        if(dice === 1) {
          current0El.innerHTML = 0;
          whoPlays = 1;
          player0El.classList.remove('player--active');
          player1El.classList.add('player--active');

        } else {
          let sum = parseInt(current0El.textContent);
          sum += dice
          current0El.textContent = sum;
        }

        btnHold.addEventListener('click', () => {
          player0Hold()
        })
        return
      }

      if(whoPlays == 1) {
        if(dice === 1) {
          current1El.innerHTML = 0;
          whoPlays = 0;
          player0El.classList.add('player--active');
          player1El.classList.remove('player--active');
          
        } else {
          let sum = parseInt(current1El.textContent);
          sum += dice
          current1El.textContent = sum;
        }
      
        btnHold.addEventListener('click', () => {
          player1Hold();
        })
      }
    }
  });
}

startGame();

const player0Hold = ()=> {
  let player0Sum =  parseInt(score0El.textContent);
  player0Sum += parseInt(current0El.textContent);
  score0El.textContent = player0Sum;
  current0El.textContent = 0;
  whoPlays = 1;
  player0El.classList.remove('player--active');
  player1El.classList.add('player--active');
  diceEl.classList.add('hidden');

  if(player0Sum >= 10) {
    player0El.classList.remove('player--active');
    player0El.classList.add('player--winner');
    document.querySelector('#name--0').textContent = "PLAYER 1 WIN"
    playining = false;
    return
  }
}

const player1Hold = ()=> {
  let player1Sum = parseInt(score1El.textContent);
  player1Sum += parseInt(current1El.textContent);
  score1El.textContent = player1Sum;
  current1El.textContent = 0;
  whoPlays = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  if(player1Sum >= 10) {
    player1El.classList.remove('player--active');
    player1El.classList.add('player--winner');
    document.querySelector('#name--1').textContent = "PLAYER 2 WIN"
    playining = false;
    return
  }
}

btnNew.addEventListener('click', init)


