import { shuffleArray } from './utils.js';

const baseUrl = 'https://api.predic8.de';

export const generateWord = async () => {
  const response = await fetch(`${baseUrl}/shop/products/?limit=38`, {
    method: 'GET',
  });

  const products = (await response.json()).products;
  const product = shuffleArray(products)[0]?.name?.toLowerCase();
  return product;
};
