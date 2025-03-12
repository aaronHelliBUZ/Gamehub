let richtung = ['A', 'A', 'A'];
let aktuelleRichtung = 'A';
let laenge = 3;

document.addEventListener('keydown', function(event){
    if(event.code === 'KeyW' || event.code === 'ArrowUp'){
        aktuelleRichtung = 'W';
    }else if(event.code === 'KeyD' || event.code === 'ArrowRight'){
        aktuelleRichtung = 'D';
    }else if(event.code === 'KeyS' || event.code === 'ArrowDown'){
        aktuelleRichtung = 'S';
    }else if(event.code === 'KeyA' || event.code === 'ArrowLeft'){
        aktuelleRichtung = 'A';
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

for(let i = 1; i <= 3; i++){
    randomApfel();
}

function bewegen(){
    let kopfElms = document.getElementsByClassName('Kopf');
    let kopfElm = kopfElms.item(0)
    kopfElm.classList.remove('Kopf');

    let neuerKopfElm;
    
    let [y, x] = kopfElm.id.split('_')
    x = parseInt(x);
    y = parseInt(y);
    
    richtungLaenge = richtung.length;
    console.log(richtungLaenge)

    document.getElementById('Kopf').remove();

    schlangeElm = document.createElement('div');
    schlangeElm.style.position = "relative";
    schlangeElm.style.height = "100%";
    schlangeElm.style.width = "100%";

    kopfElm.appendChild(schlangeElm);

    
    switch(aktuelleRichtung){
        case 'W':
            console.log(richtung[richtungLaenge - 1])
            if(richtung[richtungLaenge - 1] == 'S'){
                neuerKopfElm = document.getElementById(`${y + 1}_${x}`);
                richtung.push('S');
                console.log(richtung);
                break;
            }
            neuerKopfElm = document.getElementById(`${y - 1}_${x}`);
            richtung.push('W');
            console.log(richtung);
            break;
        case 'S':
            console.log(richtung[richtungLaenge - 1])
            if(richtung[richtungLaenge - 1] == 'W'){
                neuerKopfElm = document.getElementById(`${y - 1}_${x}`);
                richtung.push('W');
                console.log(richtung);
                break;
            }
            neuerKopfElm = document.getElementById(`${y + 1}_${x}`);
            richtung.push('S');
            console.log(richtung);
            break;
        case 'A':
            console.log(richtung[richtungLaenge - 1])
            if(richtung[richtungLaenge - 1] == 'D'){
                neuerKopfElm = document.getElementById(`${y}_${x + 1}`);
                richtung.push('D');
                console.log(richtung);
                break;
            }
            neuerKopfElm = document.getElementById(`${y}_${x - 1}`);
            richtung.push('A');
            console.log(richtung);
            break;
        case 'D':
            console.log(richtung[richtungLaenge - 1])
            if(richtung[richtungLaenge - 1] == 'A'){
                neuerKopfElm = document.getElementById(`${y}_${x - 1}`);
                richtung.push('A');
                console.log(richtung);
                break;
            }
            neuerKopfElm = document.getElementById(`${y}_${x + 1}`);
            richtung.push('D');
            console.log(richtung);
            break;
    }
    if(x == 0 && richtung[richtungLaenge] == 'A' || x == 9 && richtung[richtungLaenge] == 'D' || y == 0 && richtung[richtungLaenge] == 'W' || y == 8 && richtung[richtungLaenge] == 'S'){
        sterben();
    }
    if(neuerKopfElm.classList.contains('Apfel')){
        laenge++;

        if(laenge == 90){
            alert('win');
            location.reload;
        }

        schlangeElm = document.createElement('div');
        schlangeElm.id = 'Kopf';
        schlangeElm.style.position = "relative";
        schlangeElm.style.height = "100%";
        schlangeElm.style.width = "100%";
        
        neuerKopfElm.removeChild(neuerKopfElm.firstChild);
        neuerKopfElm.classList.add('Kopf');
        neuerKopfElm.classList.add('Schlange');
        neuerKopfElm.classList.remove('Apfel');
        if(laenge < 88){
            randomApfel();
        }
        neuerKopfElm.appendChild(schlangeElm);
    }else if(neuerKopfElm.classList.contains('Schlange') && !(neuerKopfElm.classList.contains('Schwanz'))){
        sterben();
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
        schwanzElm.classList.remove('Schlange');
        document.getElementById('Schwanz').remove();

        let [y, x] = schwanzElm.id.split('_')
        x = parseInt(x);
        y = parseInt(y);

        switch(richtung[(richtungLaenge) - (laenge - 1)]){
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
        neuerSchwanzElm.id = 'Schwanz';
    }
}

setInterval(bewegen, 520);

function sterben(){
    alert('Ded');
    location.reload();
}