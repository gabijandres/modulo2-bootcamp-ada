const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

export const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const renderHead = () => {
  context.lineWidth = 5;
  context.beginPath();
  context.arc(100, 50, 25, 0, Math.PI * 2, true);
  context.closePath();
  context.stroke();
};

export const renderBody = () => {
  context.beginPath();
  context.moveTo(100, 75);
  context.lineTo(100, 140);
  context.stroke();
};

export const renderRightArm = () => {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(60, 100);
  context.stroke();
};
export const renderLeftArm = () => {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(140, 100);
  context.stroke();
};

export const renderRightLeg = () => {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(80, 190);
  context.stroke();
};
export const renderLeftLeg = () => {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(125, 190);
  context.stroke();
};

export const renderBracket = () => {
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
