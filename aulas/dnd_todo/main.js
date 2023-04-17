const items = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".column");

let draggableItem = null;

function dragStart() {
  draggableItem = this;
  setTimeout(() => {
    this.classList.add("hide");
  }, 0);
}
function dragEnd() {
  this.classList.remove("hide");
  console.log("dragEnd");
}

function dragDrop() {
  event.preventDefault();

  if (draggableItem) {
    this.append(draggableItem);
    draggableItem = null;
  }
}

function dragOver() {
  event.preventDefault();
  console.log("dragOver");
}

function keyboardMove() {
  if (event.code == "ArrowRight") {
    columns[1].append(this);
  }
}

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", dragDrop);
});

items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.addEventListener("keydown", keyboardMove);
});
