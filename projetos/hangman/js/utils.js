export const shuffleArray = (array) => {
  return array
    .map((value) => {
      return { ...value, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort);
};

export const getAllIndexes = (array, element) => {
  return array.reduce((acc, letter, index) => {
    if (letter == element) acc.push(index);
    return acc;
  }, []);
};