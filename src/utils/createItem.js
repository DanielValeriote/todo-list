import generateID from './generateID';

function createItem (text, itemsList) {
  if(text) {
    itemsList.push({id: generateID(), text: text })
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
    li.innerHTML = `<label id=item_${item.id} class='item-label'><input type='checkbox' class="itemCheckbox">${item.text}</label>`;
    li.classList.add("list-item");
    ul.appendChild(li);
  };
}

export default createItem;