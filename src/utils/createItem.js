function createItem (text, itemsList, listId) {
  
  if(text) {
    itemsList.push(String(text).trim());
    updateListContent(itemsList, listId);
  } 
  else alert("Um item vazio não pode ser adicionado.")
}

function updateListContent (itemsList, listId) {
  const ul = document.getElementById(listId);
  ul.innerHTML = '';
  for(let item of itemsList) {
    const li = document.createElement('li');
    li.innerHTML = `<label class='item-label'><input type='checkbox' class="itemCheckbox">${item}</label>`;
    li.classList.add("list-item");
    ul.appendChild(li);
  };
}

export default createItem;