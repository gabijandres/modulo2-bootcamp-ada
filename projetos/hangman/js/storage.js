export const saveLocal = (array, item) => {
  localStorage.setItem(item, JSON.stringify(array));
};

export const getLocal = (item) => {
  return JSON.parse(localStorage.getItem(item)) ?? [];
};

export const saveGameState = (state) => {
  localStorage.setItem('state', state);
};

export const getGameState = () => {
  return localStorage.getItem('state') ?? 'START';
};

export const saveChances = (chances) => {
  localStorage.setItem('chances', chances);
};

export const getChances = () => {
  return parseInt(localStorage.getItem('chances'));
};
