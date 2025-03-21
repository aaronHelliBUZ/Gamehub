richtung = '',
modus = 'scatter';
scatterZyklus = 1;
pellets = 188;

document.addEventListener('keydown', function(event){
    if(event.code === 'KeyW' || event.code === 'ArrowUp'){
        richtung = 'W';
    }else if(event.code === 'KeyD' || event.code === 'ArrowRight'){
        richtung = 'D';
    }else if(event.code === 'KeyS' || event.code === 'ArrowDown'){
        richtung = 'S';
    }else if(event.code === 'KeyA' || event.code === 'ArrowLeft'){
        richtung = 'A';
    }
});

let blinkyParent = document.getElementById('10/10');
blinkyParent.classList.add('blinky');
let blinky = document.createElement('div');
blinky.id = 'blinky';
blinkyParent.appendChild(blinky);

function bewegen(){
    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0)
    spielerElm.classList.remove('spieler');

    let neuerSpielerParent;

    let [y, x] = spielerElm.id.split('/')
    x = parseInt(x);
    y = parseInt(y);

    document.getElementById('spieler').remove();

    switch(richtung){
        case 'W':
            neuerSpielerParent = document.getElementById(`${y - 1}/${x}`);
            break;
        case 'D':
            neuerSpielerParent = document.getElementById(`${y}/${x + 1}`);
            if(x == 20){
                neuerSpielerParent = document.getElementById(`${y}/${0}`);
            }
            break;
        case 'S':
            neuerSpielerParent = document.getElementById(`${y + 1}/${x}`);
            break;
        case 'A':
            neuerSpielerParent = document.getElementById(`${y}/${x - 1}`);
            if(x == 0){
                neuerSpielerParent = document.getElementById(`${y}/${20}`);
            }
            break;
        default:
            neuerSpielerParent = document.getElementById(`${y}/${x}`);
    }

    if(neuerSpielerParent.classList.contains('wand')){
        neuerSpielerParent = document.getElementById(`${y}/${x}`);
        richtung = '';
    }

    if(neuerSpielerParent.classList.contains('pelletParent')){
        neuerSpielerParent.classList.remove('pelletParent');
        neuerSpielerParent.removeChild(neuerSpielerParent.firstChild);
        pellets--;
    }
    
    if(neuerSpielerParent.classList.contains('superPelletParent')){
        neuerSpielerParent.classList.remove('superPelletParent');
        neuerSpielerParent.removeChild(neuerSpielerParent.firstChild);
    }

    neuerSpielerParent.classList.add('spieler')

    let neuerSpielerElm = document.createElement('div');
    neuerSpielerElm.id = 'spieler';

    neuerSpielerParent.appendChild(neuerSpielerElm);

    setTimeout(function(){
        if(pellets == 0){
            alert('Gewonnen');
            location.reload();
        }
    }, 100);
}

let links = false;

function blinkyBewegen(istStuck){
    

    console.log(modus);

    if(modus == 'scatter'){
        let blinkyElms = document.getElementsByClassName('blinky');
        let blinkyElm = blinkyElms.item(0)
        blinkyElm.classList.remove('blinky');
        links = false;
    
        let neuerBlinkyParent;
    
        let [y, x] = blinkyElm.id.split('/')
        x = parseInt(x);
        y = parseInt(y);
        
        if(!istStuck){
            neuerBlinkyParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`)
                links = true;
            }
        }else{
            neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`)
        }

        document.getElementById('blinky').remove();

        neuerBlinkyParent.classList.add('blinky')

        let neuerBlinkyElm = document.createElement('div');
        neuerBlinkyElm.id = 'blinky';

        neuerBlinkyParent.appendChild(neuerBlinkyElm);

        return links;
    }
}

function modusWechseln() {
    if (modus === 'chase') {
        setTimeout(function () {
            modus = 'scatter';
            scatterZyklus++;
            modusWechseln();
        }, 20000);
    }else if (modus === 'scatter' && scatterZyklus <= 2) {
        setTimeout(function () {
            modus = 'chase';
            modusWechseln();
        }, 7000);
    }else if (modus === 'scatter' && scatterZyklus <= 4) {
        setTimeout(function () {
            modus = 'chase';
            modusWechseln();
        }, 5000);
    }else if (modus === 'scatter') {
        modus = 'chase';
    }
}

modusWechseln();


setInterval(bewegen, 380);

setInterval(function(){
    links = blinkyBewegen(links);
}, 500);