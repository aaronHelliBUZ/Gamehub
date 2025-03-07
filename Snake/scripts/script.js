let richtung = ['A', 'A', 'A'];
let laenge = 3;

document.addEventListener('keydown', function(event){
    if(event.code === 'KeyW' || event.code === 'ArrowUp'){
        console.log('W');
        richtung.push('W');
    }else if(event.code === 'KeyD' || event.code === 'ArrowRight'){
        console.log('D');
        richtung.push('D');
    }else if(event.code === 'KeyS' || event.code === 'ArrowDown'){
        console.log('S');
        richtung.push('S');
    }else if(event.code === 'KeyA' || event.code === 'ArrowLeft'){
        console.log('A');
        richtung.push('A');
    }
})

let = schlangeElm = document.createElement('div');
schlangeElm.id = 'Kopf';
schlangeElm.style.position = "relative";
schlangeElm.style.height = "100%";
schlangeElm.style.width = "100%";

let schlangeParent = document.getElementById('4_4');
schlangeParent.classList.add('Kopf');
schlangeParent.classList.add('Schlange');
schlangeParent.appendChild(schlangeElm);

for(let i = 1; i <= 2; i++){
    schlangeElm = document.createElement('div');
    schlangeElm.style.position = "relative";
    schlangeElm.style.height = "100%";
    schlangeElm.style.width = "100%";

    schlangeParent = document.getElementById(`4_${4 + i}`)
    schlangeParent.classList.add('Schlange')

    if(i == 2){
        schlangeElm.id = "Schwanz";
        schlangeParent.classList.add('Schwanz');
    }

    schlangeParent.appendChild(schlangeElm);
}

function randomApfel(){
    let randY = parseInt(Math.random() * 9);
    let randX = parseInt(Math.random() * 10);

    let apfelElm = document.createElement('img');
    apfelElm.src = "img/google-search-snake.png";
    apfelElm.style.height = "100%";
    apfelElm.style.width = "100%";

    let randPosition = document.getElementById(`${randY}_${randX}`);
    if(randPosition.classList.contains('Apfel') || randPosition.classList.contains('Schlange')){
        randomApfel();
    }else{
        randPosition.classList.add('Apfel')
        randPosition.appendChild(apfelElm);
    }
}


function bewegen(){
    let kopfElms = document.getElementsByClassName('Kopf');
    let kopfElm = kopfElms.item(0)
    kopfElm.classList.remove('Kopf');

    let neuerKopfElm;
    
    let [y, x] = kopfElm.id.split('_')
    x = parseInt(x);
    y = parseInt(y);

    document.getElementById('Kopf').remove();

    schlangeElm = document.createElement('div');
    schlangeElm.style.position = "relative";
    schlangeElm.style.height = "100%";
    schlangeElm.style.width = "100%";

    kopfElm.appendChild(schlangeElm);
    if(x > 0){
        neuerKopfElm = document.getElementById(`${y}_${x - 1}`);
    }else{
        sterben();
    }
    if(neuerKopfElm.classList.contains('Apfel')){
        laenge++;
    }else{
        schlangeElm = document.createElement('div');
        schlangeElm.id = 'Kopf';
        schlangeElm.style.position = "relative";
        schlangeElm.style.height = "100%";
        schlangeElm.style.width = "100%";

        neuerKopfElm.classList.add('Kopf');
        neuerKopfElm.classList.add('Schlange');
        neuerKopfElm.appendChild(schlangeElm);

        let schwanzElms = document.getElementsByClassName('Schwanz');
        let schwanzElm = schwanzElms.item(0)
        schwanzElm.classList.remove('Schwanz');
        document.getElementById('Schwanz').remove();

        let [y, x] = schwanzElm.id.split('_')
        x = parseInt(x);
        y = parseInt(y);

        richtungLaenge = richtung.length;

        switch(richtung[(richtungLaenge - 1) - (laenge - 1)]){
            case 'W':
                y--;
                break;
            case 'A':
                x--;
                break;
            case 'S':
                y++;
                break;
            case 'D':
                x++;
                break;
        }

        let neuerSchwanzParent = document.getElementById(`${y}_${x}`);
        let neuerSchwanzElm = neuerSchwanzParent.firstChild;
        neuerSchwanzParent.classList.add('Schwanz');
        neuerKopfElm.classList.add('Schlange');
        neuerSchwanzElm.id = 'Schwanz'
    }
}

//setInterval(bewegen, 1000);

function sterben(){
    alert('Ded');
    location.reload();
}