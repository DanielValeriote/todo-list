import createItem from './utils/createItem';
import './styles/index.scss';
const allItems = [];

document.getElementById('addItemBtn').addEventListener("click", () => {
  const input = document.getElementById('itemInput')
  createItem(input.value, allItems, "todoList");
  input.value = ""
});