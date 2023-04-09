const card = document.querySelector('#card');
const divs = card.children;

let index = 0;

setInterval(() => {
  divs[index].classList.add('hide');
  
  index = (index + 1) % divs.length;
  
  divs[index].classList.remove('hide');
}, 5000);