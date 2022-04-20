import createItem , { updateListContent } from './utils/createItem';
import './styles/index.scss';
var allItems;
if(localStorage.allItems) {
  allItems = JSON.parse(localStorage.getItem('allItems'));
} else {
  allItems = {items: Array()}
  localStorage.setItem('allItems', JSON.stringify(allItems));
} 

document.addEventListener('DOMContentLoaded', ()=>updateListContent(allItems.items, "todoList"));

document.getElementById('addItemBtn').addEventListener("click", () => {
  main()
});
document.addEventListener("keyup", (e) => {
  if(e.key === 'Enter') main()
})

function main() {
  const input = document.getElementById('itemInput')
  createItem(input.value, allItems.items);
  input.value = ''
}