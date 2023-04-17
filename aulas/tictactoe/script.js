const items = [...document.querySelectorAll(".area")];
let symbol = true //true = X, false = O
let player = symbol ? "X": "O"
let turn = 0;
const stateENUM = {
   START: "START",
   PLAYING: "PLAYING",
   WIN: "WIN",
   DRAW: "DRAW",
}

let state = stateENUM.START;

const v1H = [0,1,2];
const v2H = [3,4,5];
const v3H = [6,7,8];

const v1V = [0,3,6];
const v2V = [1,4,7];
const v3V = [2,5,8];

const v1D = [0,4,8];
const v2D = [6,4,2];


function validaLinha(){
  let ganhou = false
  const l1r = v1H.every((indice)=>items[indice].innerText === player)
  const l2r = v2H.every((indice)=>items[indice].innerText === player)
  const l3r = v3H.every((indice)=>items[indice].innerText === player)

  const l1v = v1V.every((indice)=>items[indice].innerText === player)
  const l2v = v2V.every((indice)=>items[indice].innerText === player)
  const l3v = v3V.every((indice)=>items[indice].innerText === player)

  const l1d = v1D.every((indice)=>items[indice].innerText === player)
  const l2d = v2D.every((indice)=>items[indice].innerText === player)

  if([l1r,l2r,l3r,l1v,l2v,l3v,l1d,l2d].includes(true)){
    state = stateENUM.WIN;
    console.log("ganhou o jogador= ",player)
  }

}

function vitoria(){

  if(items[0].innerText === player && items[1].innerText ===  player && items[2].innerText === player){
    state = stateENUM.WIN;

  }else if(items[3].innerText === player && items[4].innerText ===  player && items[5].innerText === player){
    state = stateENUM.WIN;
  }else if(items[6].innerText === player && items[7].innerText ===  player && items[8].innerText === player){
    state = stateENUM.WIN;
  }else if(items[0].innerText === player && items[3].innerText ===  player && items[3].innerText === player){
    state = stateENUM.WIN;
  }else if(items[1].innerText === player && items[4].innerText ===  player && items[7].innerText === player){
    state = stateENUM.WIN;
  }else if(items[2].innerText === player && items[5].innerText ===  player && items[8].innerText === player){
    state = stateENUM.WIN;
  }else if(items[0].innerText === player && items[4].innerText ===  player && items[8].innerText === player){
    state = stateENUM.WIN;
  }else if(items[2].innerText === player && items[4].innerText ===  player && items[6].innerText === player){
    state = stateENUM.WIN;
  }

}


function changeOnClick() {
  if(state === stateENUM.START){
    state = stateENUM.PLAYING
  }

  if([stateENUM.WIN, stateENUM.DRAW].includes(state)) return

  if (this.innerText !== "") return



  this.innerText = symbol ? "X": "O"
  player = symbol ? "X": "O"
  validaLinha()
  symbol = !symbol;
  // vitoria()
  turn = turn + 1
  if(turn=== 9) {
    state = stateENUM.DRAW
  }

  document.querySelector(".results").innerHTML = `${player} -${state} `
}


items.forEach((item) => {
  item.addEventListener("click", changeOnClick)
})