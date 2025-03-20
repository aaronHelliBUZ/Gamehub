let root = document.querySelector(':root');
let content = document.getElementById("content");

root.style.setProperty('--size', (content.offsetHeight)+'px');