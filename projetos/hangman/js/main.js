import { generateWord } from './api.js';
import { getAllIndexes } from './utils.js';
import { saveChances, getChances, saveGameState, saveLocal, getGameState, getLocal } from './storage.js';
import { clearCanvas, renderHead, renderBody, renderBracket, renderLeftArm, renderLeftLeg, renderRightArm, renderRightLeg } from './canvas.js';

/* RENDER */
const renderChances = () => {
  cleanElement('chances');
  const chancesSection = document.getElementById('chances');
  const chances = getChances();
  const p = document.createElement('p');
  p.innerHTML = `You have <span>${chances}</span> chances`;
  chancesSection.appendChild(p);
};

const renderKeyboard = () => {
  cleanElement('keyboard');
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  const keyboard = document.getElementById('keyboard');
  const disabledLetters = getLocal('disabledLetters');

  alphabet.forEach((letter) => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('key');
    button.disabled = disabledLetters.includes(letter);
    button.addEventListener('click', () => {
      disabledLetters.push(letter);
      button.disabled = true;
      saveLocal(disabledLetters, 'disabledLetters');
      checkWord(letter);
    });
    keyboard.appendChild(button);
  });
};

const cleanElement = (id) => {
  const element = document.getElementById(id);
  element.innerHTML = '';
};

const renderWord = async () => {
  const gameState = getGameState();
  const wordDiv = document.getElementById('word');
  cleanElement('word');

  if (gameState === 'START') {
    const word = await generateWord();
    saveLocal([...word], 'answer');
    const guess = [...word].map((element) => {
      return element == ' ' ? ' ' : '_';
    });
    saveLocal(guess, 'guess');
    saveGameState('PLAYING');
  }

  const guess = getLocal('guess');

  guess.forEach((letter) => {
    const p = document.createElement('p');
    p.textContent = letter;
    p.maxLength = 1;
    wordDiv.appendChild(p);
  });
};

const renderMan = (chances) => {
  clearCanvas();
  renderBracket();
  if (chances < 6) renderHead();
  if (chances < 5) renderBody();
  if (chances < 4) renderLeftArm();
  if (chances < 3) renderRightArm();
  if (chances < 2) renderLeftLeg();
  if (chances < 1) renderRightLeg();
};

/* GAME */
const startGame = async () => {
  if (getGameState() !== 'PLAYING') saveChances(6);
  const chances = getChances();
  renderKeyboard();
  renderMan(chances);
  renderChances(chances);
  await renderWord();
};

const restartGame = () => {
  localStorage.clear();
  saveGameState('START');
  startGame();
};

const finishGame = (message, answer) => {
  setTimeout(() => {
    saveGameState('LOSE');
    alert(`${message} The answer was ${answer}. `);
    restartGame();
  }, 100);
};

const checkGameState = (takeAGuess = false) => {
  const answer = getLocal('answer').join('');
  const guess = getLocal('guess').join('').toLowerCase();
  const chances = getChances();

  if (answer == guess) finishGame(`Congratulations, you won!`, answer);

  if (chances == 0 || takeAGuess) finishGame('Game over.', answer);
};

const checkWord = (letter) => {
  const word = getLocal('answer');

  if (word.includes(letter)) {
    const indexes = getAllIndexes(word, letter);
    updateGuess(letter, indexes);
  } else {
    const chances = getChances() - 1;
    saveChances(chances);
    renderMan(chances);
    renderChances(chances);
  }
  checkGameState();
};

const updateGuess = (letter, indexes) => {
  let guess = getLocal('guess');
  indexes.forEach((index) => {
    guess[index] = index === 0 ? letter.toUpperCase() : letter;
  });
  saveLocal(guess, 'guess');
  renderWord();
};

const takeAGuess = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your guess';
  input.id = 'guess';
  form.appendChild(input);

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Try';
  button.onclick = async () => {
    event.preventDefault();
    form.classList.add('hidden');
    const input = document.getElementById('guess');
    const guess = input.value.toLowerCase();
    saveLocal([...guess], 'guess');
    checkGameState(true);
  };
  form.appendChild(button);

  const div = document.getElementById('guess-form');
  div.append(form);
};

window.onload = async () => {
  const restart = document.getElementById('restart-button');
  const guess = document.getElementById('guess-button');
  restart.addEventListener('click', () => restartGame());
  guess.addEventListener('click', () => takeAGuess());
  await startGame();
};
