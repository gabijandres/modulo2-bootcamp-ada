function shuffle(toSuffle) {
    return toSuffle.sort(() => Math.random() - 0.5);
  }

  let primeiro = ""
  const cards = ["🐶", "🐱", "🐭", "🐸", "🐵", "🐨", "🐔", "🐤"]

  const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  // montar UI
  shuffle(array).forEach((value, index) => {
    document.querySelector(".cards").innerHTML += `
    <div class='card-container'>
      <div class='flip-card-back'>
        <img class='icon' src='/js_logo.png' />
      </div>
        <div class='flip-card-front'>
          <div class="emoji">${cards[value - 1]}</div>
        </div>
    </div>
    `;
  })


  const buttons = document.querySelectorAll('.card-container')

  function verificaIgualdade() {
    this.classList.add("flip");

    if (primeiro === "") {
      primeiro = this
      primeiro.removeEventListener("click", verificaIgualdade)
    } else {
      if (primeiro.querySelector(".emoji").innerHTML === this.querySelector(".emoji").innerHTML) {
        //acertou
        console.log("acertou")
        this.removeEventListener("click", verificaIgualdade)
        primeiro = ""
      } else {
        //errou
        setTimeout(()=>{
          this.classList.remove("flip");
          primeiro.classList.remove("flip");
          primeiro.addEventListener("click", verificaIgualdade)
          primeiro = ""
          console.log("errou")
        },500)
      }
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", verificaIgualdade)
  })


