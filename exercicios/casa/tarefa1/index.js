const baseUrl = "https://hp-api.onrender.com/api";
const baseDBUrl = "https://crudcrud.com/api/a429a2a9f7d440e69dad53de1ed976f8";

const createCharacter = async (character) => {
  await fetch(`${baseDBUrl}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });
};

const getAllCharacters = async () => {
  const response = await fetch(`${baseDBUrl}/characters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

const deleteCharacter = async (id) => {
  await fetch(`${baseDBUrl}/characters/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateCharacter = async (id, character) => {
  delete character["_id"]; // remove the _id from the request body
  await fetch(`${baseDBUrl}/characters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });
};

const hideActionButtons = (id) => {
  const li = document.getElementById(id);
  li.onmouseover = () => hideElement(id + "-buttons");
  hideElement(id + "-buttons");
}

const openUpdateForm = (character) => {
  hideActionButtons(character.id);

  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Insert a new image URL";
  input.id = character.id + "-input";
  form.appendChild(input);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Update";
  button.classList.add("button-update");
  button.onclick = async () => {
    event.preventDefault();
    const element = document.getElementById(character.id + "-input");
    const newURL = element.value;
    character.image = newURL;
    await updateCharacter(character._id, character);
    form.classList.add("hidden");
    createFavoritesList();
  };
  form.appendChild(button);

  const div = document.getElementById(character.id);
  div.append(form);
};

const addButtonLoading = (id) => {
  const button = document.getElementById(id);
  button.classList.add("loading");
}

const generateRandomCharacter = async () => {
  cleanElement("random-character");
  showElement("loader");
  hideElement("empty-random");
  addButtonLoading("generate-button");

  const response = await fetch(`${baseUrl}/characters`, {
    method: "GET",
  });

  const characters = await response.json();
  const character = characters[Math.floor(Math.random() * characters.length)];

  character.image !== ""
    ? createCharacterElement(character)
    : generateRandomCharacter(character);
};

const saveGeneratedCharacter = (character) => {
  localStorage.setItem("character", JSON.stringify(character));
};

const getGeneratedCharacter = () => {
  return JSON.parse(localStorage.getItem("character"));
};

const removeButtonLoading = (id) => {
  const generateButton = document.getElementById(id);
  generateButton.classList.remove("loading");
}

const createCharacterElement = (character) => {
  saveGeneratedCharacter(character);
  hideElement("loader");
  removeButtonLoading("generate-button");
  showElement("random-character");
  createHeadingElement(character, "random-character");
  createImageElement(character, "random-character");
  createButtonElement(character, "add", "random-character");
};

const cleanElement = (id) => {
  const element = document.getElementById(id);
  element.innerHTML = "";
};

const createHeadingElement = (character, id = character.id) => {
  const heading = document.createElement("h3");
  heading.textContent = character.name;

  const el = document.getElementById(id);
  el.appendChild(heading);
};

const createImageElement = (character, id = character.id) => {
  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;
  img.classList.add("character");

  const el = document.getElementById(id);
  el.appendChild(img);
};

const createButtonElement = (character, action, id = character.id) => {
  const button = document.createElement("button");
  button.type = "submit";
  button.classList.add("button");
  const img = document.createElement("img");

  if (action === "delete") {
    button.onclick = async () => {
      await deleteCharacter(character._id);
      createFavoritesList();
    };
    img.src = "assets/delete.png";
    img.alt = "Delete character";
    button.appendChild(img);
  } else if (action === "update") {
    button.onclick = () => openUpdateForm(character);
    img.src = "assets/edit.png";
    img.alt = "Edit character";
    button.appendChild(img);
  } else if (action === "add") {
    button.onclick = async () => {
      await addCharacterToList();
      createFavoritesList();
    };
    button.textContent = "Add to favorites list";
  }
  const el = document.getElementById(id);
  el.appendChild(button);
};

const showElement = (id) => {
  const element = document.getElementById(id);
  element.classList.remove("hidden");
  element.classList.add("visible");
};

const hideElement = (id) => {
  const element = document.getElementById(id);
  element.classList.remove("visible");
  element.classList.add("hidden");
};

const createSpanElement = (character, id = character.id) => {
  const span = document.createElement("span");
  span.textContent = character.name;

  const el = document.getElementById(id);
  el.appendChild(span);
};

const addCharacterToList = async () => {
  const character = getGeneratedCharacter();
  const favorites = await getAllCharacters();
  if (favorites.find((item) => item.id === character.id)) {
    alert("This character is already in the favorites list");
    return;
  }
  await createCharacter(character);
};

const createFavoritesList = async () => {
  cleanElement("favorites-characters");
  const favorites = await getAllCharacters();
  const ul = document.getElementById("favorites-characters");
  const ret = favorites.map((character) => {
    const li = document.createElement("li");
    li.id = character.id;
    li.onmouseover = () => showElement(character.id + "-buttons");
    li.onmouseleave = () => hideElement(character.id + "-buttons");

    const div = document.createElement("div");
    div.classList.add("buttons");
    div.classList.add("hidden");
    div.id = character.id + "-buttons";
    li.appendChild(div);
    ul.appendChild(li);

    createButtonElement(character, "delete", character.id + "-buttons");
    createButtonElement(character, "update", character.id + "-buttons");
    createSpanElement(character);
    createImageElement(character);

    hideElement("empty-list");
  });

  if (ret.length === 0) showElement("empty-list");
};

window.onload = () => {
  createFavoritesList();
};
