import { shuffleArray } from './utils.js';

const fruitBaseUrl = 'https://api.predic8.de';
const randomBaseUrl = 'https://random-word-api.herokuapp.com';

export const generateWord = async (theme) => {
  return theme === 'fruits' ? generateFruit() : generateRandom();
};

const generateFruit = async () => {
  const response = await fetch(`${fruitBaseUrl}/shop/products/?limit=38`, {
    method: 'GET',
  });

  const products = (await response.json()).products;
  const product = shuffleArray(products)[0]?.name?.toLowerCase();
  return product;
};

const generateRandom = async () => {
  const response = await fetch(`${randomBaseUrl}/word`, {
    method: 'GET',
  });

  const random = (await response.json())[0];
  return random;
};
