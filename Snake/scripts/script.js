function randomApfel(){
    let randY = parseInt(Math.random() * 9);
    let randX = parseInt(Math.random() * 10);

    let apfelElm = document.createElement('img');
    apfelElm.src = "img/google-search-snake.png";
    apfelElm.style.height = "100%";
    apfelElm.style.width = "100%";

    let randPosition = document.getElementById(`${randY}_${randX}`);
    if(randPosition.classList.contains('apfel')){
        randomApfel();
    }else{
        randPosition.classList.add('apfel')
        randPosition.appendChild(apfelElm);
    }
}
