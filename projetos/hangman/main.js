const baseUrl = 'https://api.predic8.de';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

/* API */
const generateWord = async () => {
  const response = await fetch(`${baseUrl}/shop/products/?limit=38`, {
    method: 'GET',
  });

  const products = (await response.json()).products;
  const product = shuffleArray(products)[0]?.name?.toLowerCase();
  return product;
};

/* CANVAS */
const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const renderHead = () => {
  context.lineWidth = 5;
  context.beginPath();
  context.arc(100, 50, 25, 0, Math.PI * 2, true);
  context.closePath();
  context.stroke();
};

const renderBody = () => {
  context.beginPath();
  context.moveTo(100, 75);
  context.lineTo(100, 140);
  context.stroke();
};

const renderRightArm = () => {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(60, 100);
  context.stroke();
};
const renderLeftArm = () => {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(140, 100);
  context.stroke();
};

const renderRightLeg = () => {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(80, 190);
  context.stroke();
};
const renderLeftLeg = () => {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(125, 190);
  context.stroke();
};

const renderBracket = () => {
  context.strokeStyle = '#ccc';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(175, 225);
  context.lineTo(5, 225);
  context.moveTo(40, 225);
  context.lineTo(25, 5);
  context.lineTo(100, 5);
  context.lineTo(100, 25);
  context.stroke();
};

/* AUX */
const shuffleArray = (array) => {
  return array
    .map((value) => {
      return { ...value, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort);
};

const getAllIndexes = (array, element) => {
  return array.reduce((acc, letter, index) => {
    if (letter == element) acc.push(index);
    return acc;
  }, []);
};

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

const saveLocal = (array, item) => {
  localStorage.setItem(item, JSON.stringify(array));
};

const getLocal = (item) => {
  return JSON.parse(localStorage.getItem(item)) ?? [];
};

const saveGameState = (state) => {
  localStorage.setItem('state', state);
};

const getGameState = () => {
  return localStorage.getItem('state') ?? 'START';
};

const saveChances = (chances) => {
  localStorage.setItem('chances', chances);
};

const getChances = () => {
  return parseInt(localStorage.getItem('chances'));
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
