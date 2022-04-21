export default function getList(){
  return JSON.parse(localStorage.getItem('allItems')).items
}