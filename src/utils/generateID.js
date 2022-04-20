function generateID(IDLength=10) {
  let id = ""
  for(let i=0;i<IDLength;i++) {
    id += getRandomNumber();
  }
  return id.toString();
}

function getRandomNumber () {
  return Math.floor(Math.random() * 9)
}

export default generateID