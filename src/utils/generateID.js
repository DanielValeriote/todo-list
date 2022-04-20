function generateID(IDLength=8) {
  let id = ""
  for(let i=0;i<IDLength;i++) {
    id += getRandomNumber();
  }
  return id.toString().trim();
}

function getRandomNumber () {
  return Math.floor(Math.random() * 9)
}

export default generateID