const baseUrl = "https://crudcrud.com/api/c301472bff9348148d032b05754b9c52";

function saveLocal(lista) {
  localStorage.setItem("@todo", JSON.stringify(lista));
}

function getLocal() {
  return JSON.parse(localStorage.getItem("@todo")) || [];
}

function saveRemote(item) {
  return fetch(`${baseUrl}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

async function getAll() {
  const response = await fetch(`${baseUrl}/todo`);
  const data = await response.json();
  return data;
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

async function onSubmit() {
  event.preventDefault();
  const textoEl = document.querySelector("input");
  const text = textoEl.value;
  const lista = await getAll();

  if (textoEl.value === "") return;
  if (lista.find((item) => item.text === text)) return;
  const item = { text: textoEl.value, done: false };

  await saveRemote(item);
  const lista2 = await getAll();
  criaLista(lista2);

  textoEl.value = "";
}

window.onload = async () => {
  const lista = await getAll();
  criaLista(lista);
};
