let allItems;
if (localStorage.allItems) allItems = getList();
else setAllItems(Array());

class TodoItem {
  constructor(text) {
    this.id = generateID();
    this.text = text.trim();
    this.checked = 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setColors(getColors());
  updateListContent();
  setTitle(getTitle());
});

document.getElementById("todoList").addEventListener("click", (e) => {
  const datasetKeys = Object.keys(e.target.dataset);
  const methods = {
    edit: (id) => editItem(id),
    remove: (id) => removeItem(id),
    moveup: (id) => moveItem(id, "up"),
    movedown: (id) => moveItem(id, "down"),
    togglecheck: (id) => toggleChecked(id, e.target.checked),
  };
  if (datasetKeys.length > 0) {
    const id = e.target.dataset[datasetKeys[0]];
    methods[datasetKeys[0]](id);
  }
});

document.addEventListener("keyup", (e) => e.key === "Enter" && submitItem());
document
  .getElementById("colorInput")
  .addEventListener("input", handleColorChange);

function submitItem() {
  const input = document.getElementById("itemInput");
  createItem(input.value);
  input.value = "";
}

function getList() {
  let items = JSON.parse(localStorage.getItem("allItems")).items;
  return items ? items : new Array();
}

function createItem(text) {
  const itemsList = getList();
  if (!text) return alert("Um item vazio não pode ser adicionado.");
  itemsList.push(new TodoItem(text));
  setAllItems(itemsList);
  updateListContent();
}

function updateListContent() {
  const itemsList = getList();
  const ul = document.getElementById("todoList");
  ul.innerHTML = "";
  for (let item of itemsList) {
    const li = document.createElement("li");
    li.id = `item_${item.id}`;
    li.innerHTML = getItemInnerHtml(item);
    ul.appendChild(li);
  }
}

function getItemInnerHtml(item) {
  return `<label class='item-label'>
      <input type='checkbox' data-togglecheck='${item.id}' ${
    item.checked ? "checked" : ""
  } class='itemCheckbox'>
      <span class='item-text' style='color: ${
        item.checked ? "var(--checked-color)" : "white"
      }'>${item.text}</span>
    </label>
    <div class='fn-section'>
      <button class='fn-btn remove-btn'>
        <img data-remove='${item.id}' src='./img/remove.png'/>
      </Button>
      <button class='fn-btn edit-btn'>
        <img data-edit='${item.id}' src='./img/edit.png'/>
      </Button>
      <button class='fn-btn upward-btn'>
        <img data-moveup='${item.id}' src='./img/up-arrow.png'/>
      </Button>
      <button class='fn-btn downward-btn'>
        <img data-movedown='${item.id}' src='./img/down-arrow.png'/>
      </Button>
    </div>`;
}

function generateID(IDLength = 8) {
  let id = "";
  for (let i = 0; i < IDLength; i++) id += getRandomNumber(9);
  return id.toString().trim();
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getItemIndex(id) {
  return getList().findIndex((item) => item.id === id);
}

function removeItem(id, list = getList()) {
  document.getElementById(`item_${id}`).remove();
  list = list.filter((item) => id !== item.id);
  setAllItems(list);
}

function editItem(id, list = getList()) {
  let itemIndex = getItemIndex(id);
  let newText = window.prompt(
    "Digite a tarefa já alterada:",
    list[itemIndex].text
  );
  if (newText) {
    list[itemIndex].text = newText.trim();
    setAllItems(list);
    updateListContent();
  }
}

function setAllItems(obj) {
  localStorage.setItem("allItems", JSON.stringify({ items: obj }));
}

// title changing and saving code ->

function requireTitleChange() {
  const newTitle = prompt(
    "Digite o novo título:",
    document.getElementById("editableTitle").innerText
  );
  if (newTitle) setTitle(newTitle.trim());
}

function getTitle() {
  if (localStorage.title) setTitle(localStorage.getItem("title"));
  else
    localStorage.setItem(
      "title",
      document.getElementById("editableTitle").innerText.trim()
    );
}

function setTitle(text) {
  if (!text) return;
  text.trim();
  document.getElementById("editableTitle").innerText = text;
  localStorage.setItem("title", text);
}

function toggleChecked(id, isChecked, newList = getList()) {
  const itemElement = document.querySelector(`#item_${id} .item-text`);
  let itemIndex = getItemIndex(id);

  if (isChecked) {
    itemElement.style.color = "var(--checked-color)";
    newList[itemIndex].checked = 1;
  } else {
    itemElement.style.color = "white";
    newList[itemIndex].checked = 0;
  }
  setAllItems(newList);
}

// color changing and saving code ->

function handleColorChange() {
  setColors({ checkedColor: this.value });
}

function getColors() {
  if (localStorage.colors) return JSON.parse(localStorage.getItem("colors"));
  return { checkedColor: "#008000" };
}

function setColors(obj) {
  document.documentElement.style.setProperty(
    "--checked-color",
    obj.checkedColor
  );
  localStorage.setItem("colors", JSON.stringify(obj));
  document.getElementById("colorInput").value = obj.checkedColor;
}

// Moving items code ->

function moveItem(id, direction, list = getList()) {
  let itemIndex = getItemIndex(id);
  function changeIndex(list, from, to) {
    if (to < 0 || to === list.length) return;
    list.splice(to, 0, list.splice(from, 1)[0]);
    setAllItems(list);
  }
  const movements = {
    up: () => changeIndex(list, itemIndex, itemIndex - 1),
    down: () => changeIndex(list, itemIndex, itemIndex + 1),
  };
  const move = movements[direction];
  move();

  updateListContent();
}

function toggleSettingsMenu() {
  document.querySelector(".settings-menu").classList.toggle("openMenu");
}
