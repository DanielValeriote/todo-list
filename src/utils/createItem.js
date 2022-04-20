import generateID from './generateID';
import removeItem from './removeItem';


function createItem (text, itemsList) {
  if(text) {
    itemsList.push({id: generateID(), text: text.trim() })
    localStorage.setItem('allItems', JSON.stringify({items: itemsList}));
    updateListContent(itemsList, "todoList");
  } 
  else alert("Um item vazio não pode ser adicionado.")
}

export function updateListContent (itemsList) {
  const ul = document.getElementById("todoList");
  ul.innerHTML = '';
  for(let item of itemsList) {
    const li = document.createElement('li');
    li.id = `item_${item.id}`
    li.innerHTML = 
    `<label class='item-label'>
      <input type='checkbox' class="itemCheckbox">
      <span>${item.text}</span>
    </label>
    <div class="fn-section">
      <button id="removeBtn_${item.id}" class="remove-item-btn">
        X
      </Button>
    </div>`;
    li.classList.add("list-item");
    ul.appendChild(li);
    document.getElementById(`removeBtn_${item.id}`).addEventListener('click', el => {
    removeItem(el.target.id, JSON.parse(localStorage.getItem('allItems')).items);
  })
  };
}

export default createItem;