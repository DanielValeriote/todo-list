let allItems;
if(localStorage.allItems) allItems = getList()
else {
  allItems = {items: Array()}
  localStorage.setItem('allItems', JSON.stringify(allItems));
}

document.addEventListener('DOMContentLoaded', () => {
  updateListContent(allItems.items, "todoList");
});

document.addEventListener('keyup', (e) => e.key === 'Enter' && submitItem());

function submitItem() {
  const input = document.getElementById('itemInput');
  createItem(input.value, allItems.items);
  input.value = '';
}

function getList(){
  let items = JSON.parse(localStorage.getItem('allItems')).items;
  return items ? items : [];
}

function createItem (text) {
  const itemsList = getList();
  if(text) {
    itemsList.push({id: generateID(), text: text.trim()});
    localStorage.setItem('allItems', JSON.stringify({items: itemsList}));
    updateListContent('todoList');
  } 
  else alert('Um item vazio não pode ser adicionado.');
}

function updateListContent () {
  const itemsList = getList();
  const ul = document.getElementById('todoList');
  ul.innerHTML = '';
  for(let item of itemsList) {
    const li = document.createElement('li');
    li.id = `item_${item.id}`;
    li.innerHTML = 
    `<label class='item-label'>
      <input type='checkbox' class='itemCheckbox'>
      <span class='item-text'>${item.text}</span>
    </label>
    <div class='fn-section'>
      <button class='fn-btn'>
        <img id="removeBtn_${item.id}" src='./img/remove.png'/>
      </Button>
      <button class='fn-btn'>
        <img class='' id="editBtn_${item.id}" src='./img/edit.png'/>
      </Button>
    </div>`;
    li.classList.add('list-item');
    ul.appendChild(li);
    document.getElementById(`removeBtn_${item.id}`).addEventListener('click', el => {
    removeItem(el.target.id, getList());
    });
    document.getElementById(`editBtn_${item.id}`).addEventListener('click', el => {
    editItem(el.target.id, getList());
    });
  };
};

function generateID(IDLength=8) {
  let id = ""
  for(let i=0;i<IDLength;i++) id += getRandomNumber();
  return id.toString().trim();
};

function getRandomNumber () {
  return Math.floor(Math.random() * 9);
};

function removeItem(el, list) {
  const id = el.split('_')[1];
  const item = document.getElementById(`item_${id}`);
  item.remove();
  list = list.filter(i=> id !== i.id);
  localStorage.setItem('allItems', JSON.stringify({items: list}));
};

function editItem(el, list) {
  const id = el.split('_')[1];
  let item = document.getElementById(`item_${id}`);
  let itemToEditIndex;
  item = list.filter((item, index)=> {
    if(id === item.id) {
      itemToEditIndex = index;
      return true;
    };
  })[0];
  let newText = window.prompt('Digite a tarefa já alterada:');
  list[itemToEditIndex].text = newText.trim();
  localStorage.setItem('allItems', JSON.stringify({items: list}));
  updateListContent();
}