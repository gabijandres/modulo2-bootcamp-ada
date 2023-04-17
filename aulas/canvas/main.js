const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function head() {
  context.lineWidth = 5;
  context.beginPath();
  context.arc(100, 50, 25, 0, Math.PI * 2, true);
  context.closePath();
  context.stroke();
}

function body() {
  context.beginPath();
  context.moveTo(100, 75);
  context.lineTo(100, 140);
  context.stroke();
}

function rightArm() {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(60, 100);
  context.stroke();
}
function leftArm() {
  context.beginPath();
  context.moveTo(100, 85);
  context.lineTo(140, 100);
  context.stroke();
}

function rightLeg() {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(80, 190);
  context.stroke();
}
function leftLeg() {
  context.beginPath();
  context.moveTo(100, 140);
  context.lineTo(125, 190);
  context.stroke();
}

function suporte() {
  context.strokeStyle = '#444';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(175, 225);
  context.lineTo(5, 225);
  context.moveTo(40, 225);
  context.lineTo(25, 5);
  context.lineTo(100, 5);
  context.lineTo(100, 25);
  context.stroke();
}

suporte();
head();
body();
leftArm();
rightArm();
leftLeg();
rightLeg();

const canvas2 = document.querySelector("#screenshot");
const video = document.querySelector("video");
const context2 = canvas2.getContext("2d");

setInterval(() => {
  context2.drawImage(video, 0, 0);
}, 0);
