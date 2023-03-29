function saveLocal(lista) {
  localStorage.setItem("@todo", JSON.stringify(lista));
}

function getLocal() {
  return JSON.parse(localStorage.getItem("@todo")) || [];
}

function criaLista(list) {
  function onclickCheck(item) {
    const lista = list.map((item2) => {
      if (item2.text === item.text) {
        return { ...item2, done: !item2.done };
      }
      return item2;
    });
    saveLocal(lista);
    criaLista(lista);
  }

  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  list.map((item) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = item.done;
    input.onclick = () => onclickCheck(item);
    span.textContent = item.text;
    li.className = item.done ? "done" : "";
    li.appendChild(input);
    li.appendChild(span);
    ul.appendChild(li);

    // ul.innerHTML += `<li>
    //     <input type="checkbox" onclick='onclickCheck(\"${JSON.stringify(item)}\")' > ${item.text}
    //     </li>`
  });
}

function onSubmit() {
  event.preventDefault();
  const textoEl = document.querySelector("input");
  const text = textoEl.value;
  const lista = getLocal();
  if (textoEl.value === "") return;
  if (lista.find((item) => item.text === text)) return;
  const item = { text: textoEl.value, done: false };
  lista.push(item);
  saveLocal(lista);
  criaLista(lista);

  textoEl.value = "";
}

window.onload = () => {
  criaLista(getLocal());
};
