export default function removeItem(el, list) {
  const id = el.split('_')[1];
  const item = document.getElementById(`item_${id}`);
  item.remove();
  list = list.filter(i=> id !== i.id);
  localStorage.setItem('allItems', JSON.stringify({items: list}))
}