let allItems;
if(localStorage.allItems) allItems = getList();
else {
  // allItems = {items: Array()}
  // localStorage.setItem('AllItems', JSON.stringify())
  setAllItems(Array())
};

document.addEventListener('DOMContentLoaded', () => {
  updateListContent();
  setTitle(getTitle())
});

document.addEventListener('keyup', (e) => e.key === 'Enter' && submitItem());

function submitItem() {
  const input = document.getElementById('itemInput');
  createItem(input.value);
  input.value = '';
};

function getList(){
  let items = JSON.parse(localStorage.getItem('allItems')).items;
  return items ? items : new Array();
};

function createItem (text) {
  const itemsList = getList();
  if(text) {
    itemsList.push({id: generateID(), text: text.trim(), checked: 0});
    setAllItems(itemsList);
    updateListContent();
  } 
  else alert('Um item vazio não pode ser adicionado.');
};

function updateListContent () {
  const itemsList = getList();
  const ul = document.getElementById('todoList');
  ul.innerHTML = '';
  for(let item of itemsList) {
    const li = document.createElement('li');
    li.id = `item_${item.id}`;
    li.innerHTML = 
    `<label class='item-label'>
      <input type='checkbox' ${item.checked ? 'checked' : ''} id='checkBox_${item.id}' class='itemCheckbox'>
      <span class='item-text' style='color: ${item.checked ? 'green' : 'white'}'>${item.text}</span>
    </label>
    <div class='fn-section'>
      <button class='fn-btn remove-btn'>
        <img id="removeBtn_${item.id}" src='./img/remove.png'/>
      </Button>
      <button class='fn-btn edit-btn'>
        <img id="editBtn_${item.id}" src='./img/edit.png'/>
      </Button>
      <button class='fn-btn upward-btn'>
        <img id="upwardBtn_${item.id}" src='./img/up-arrow.png'/>
      </Button>
      <button class='fn-btn downward-btn'>
        <img id="downwardBtn_${item.id}" src='./img/down-arrow.png'/>
      </Button>
    </div>`;
    li.classList.add('list-item');
    ul.appendChild(li);
    const id = item.id;
    document.getElementById(`checkBox_${item.id}`).addEventListener('change', (el) => {
      toggleChecked(id, el.target.checked)
    });
    document.getElementById(`removeBtn_${item.id}`).addEventListener('click', () => {
      removeItem(id, getList());
    });
    document.getElementById(`upwardBtn_${item.id}`).addEventListener('click', () => {
      moveItem(id, 'up');
    });
    document.getElementById(`downwardBtn_${item.id}`).addEventListener('click', () => {
      moveItem(id, 'down');
    });
    document.getElementById(`editBtn_${item.id}`).addEventListener('click', () => {
      editItem(id, getList());
    });
  };
};

function generateID(IDLength=8) {
  let id = "";
  for(let i=0;i<IDLength;i++) id += getRandomNumber();
  return id.toString().trim();
};

function getRandomNumber () {
  return Math.floor(Math.random() * 9);
};

function getItemIndex(id) {
  let itemIndex;
  getList().forEach((item, index) => item.id === id && (itemIndex = index));
  return itemIndex;
}

function removeItem(id, list) {
  const item = document.getElementById(`item_${id}`);
  item.remove();
  list = list.filter(i=> id !== i.id);
  setAllItems(list);
};

function editItem(id, list) {
  let itemIndex = getItemIndex(id);
  let newText = window.prompt('Digite a tarefa já alterada:',list[itemIndex].text);
  if(newText) {
    list[itemIndex].text = newText.trim();
    setAllItems(list);
    updateListContent();
  }
}

// title changing and saving code ->

function requireTitleChange () {
  const newTitle = prompt('Digite o novo título:', document.getElementById('editableTitle').innerText);
  if(newTitle) setTitle(newTitle.trim());
}

function getTitle () {
  if(localStorage.title)
  setTitle(localStorage.getItem('title'));
  else
  localStorage.setItem('title', document.getElementById('editableTitle').innerText.trim());
}

function setTitle(text) {
  if(text) {
    text = text.trim();
    document.getElementById('editableTitle').innerText = text;
    localStorage.setItem('title', text);
  }
}

function toggleChecked (id, isChecked) {
  const itemElement = document.querySelector(`#item_${id} .item-text`);
  const newList = getList();
  let newColor = 'var(--checked-color)';
  let itemIndex = getItemIndex(id);

  if(isChecked) {
    itemElement.style.color = newColor;
    newList[itemIndex].checked = 1;
  } else {
    itemElement.style.color = 'white';
    newList[itemIndex].checked = 0;
  }
  setAllItems(newList);
}

function setAllItems(obj) {
  localStorage.setItem('allItems', JSON.stringify({items: obj}));
};

// Moving items code ->

function moveItem(id, direction) {
  const list = getList();
  let itemIndex = getItemIndex(id);
  function changeIndex(list, from, to) {
    if(to < 0 || to === list.length) return;
    list.splice(to, 0, list.splice(from, 1)[0]);
    setAllItems(list);
  };
  const movements = {
    up: () => {
      changeIndex(list, itemIndex, itemIndex-1)
    },
    down: () => {
      changeIndex(list, itemIndex, itemIndex+1)
    }
  };
  movements[direction]();
  updateListContent();
}