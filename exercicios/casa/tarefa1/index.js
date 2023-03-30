const baseUrl = "https://hp-api.onrender.com/api";

const generateRandomCharacter = async () => {
  cleanElement("random-character");
  initLoading();

  const response = await fetch(`${baseUrl}/characters`, {
    method: "GET",
  });

  const characters = await response.json();
  const character = characters[Math.floor(Math.random() * characters.length)];
  console.log(character);

  character.image !== ""
    ? createCharacterElement(character)
    : generateRandomCharacter(character);
};

const saveGeneratedCharacter = (character) => {
  localStorage.setItem("character", JSON.stringify(character));
}

const getGeneratedCharacter = () => {
  return JSON.parse(localStorage.getItem("character"));
}

const createCharacterElement = (character) => {
  saveGeneratedCharacter(character);
  stopLoading();
  createHeadingElement(character.name, "random-character");
  createImageElement(character.image, "random-character");
}

const cleanElement = (id) => {
  const element = document.getElementById("random-character");
  element.innerHTML = "";
}

const createHeadingElement = (name, element) => {
  const heading = document.createElement("h3");
  heading.textContent = name;

  const el = document.getElementById(element);
  el.appendChild(heading);
};

const createImageElement = (src, element) => {
  const img = document.createElement("img");
  img.src = src;

  const el = document.getElementById(element);
  el.appendChild(img);
};

const initLoading = () => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  loader.classList.add("visible");
};

const stopLoading = () => {
  const loader = document.getElementById("loader");
  loader.classList.remove("visible");
  loader.classList.add("hidden");
};

const createSpanElement = (text, element) => {
  const span = document.createElement("span");
  span.textContent = text;

  const el = document.getElementById(element);
  el.appendChild(span);
}

const addCharacterToList = () => {
  const character = getGeneratedCharacter();
  // console.log("add", character);

  const ul = document.getElementById("favorites-characters");
  const li = document.createElement("li");
  li.id = character.id;
  ul.appendChild(li);

  createSpanElement(character.name, character.id);
  createImageElement(character.image, character.id);
};
