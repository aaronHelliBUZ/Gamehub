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

let clydeParent = document.getElementById('10/11');
clydeParent.classList.add('clyde');
let clyde = document.createElement('div');
clyde.id = 'clyde';
clydeParent.appendChild(clyde);

let pinkyParent = document.getElementById('10/12');
pinkyParent.classList.add('pinky');
let pinky = document.createElement('div');
pinky.id = 'pinky';
pinkyParent.appendChild(pinky);

function bewegen(){
    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0)
    spielerElm.classList.remove('spieler');

    let neuerSpielerParent;

    let [y, x] = spielerElm.id.split('/');
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

let blinkyStuck = false;

function blinkyBewegen(istStuck){
    let blinkyElms = document.getElementsByClassName('blinky');
    let blinkyElm = blinkyElms.item(0);
    blinkyElm.classList.remove('blinky');
    blinkyStuck = false;

    let neuerBlinkyParent;

    let [blinkyY, blinkyX] = blinkyElm.id.split('/')
    blinkyX = parseInt(blinkyX);
    blinkyY = parseInt(blinkyY);

    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0);

    let [spielerY, spielerX] = spielerElm.id.split('/');
    spielerX = parseInt(spielerX);
    spielerY = parseInt(spielerY);

    let vertikal = '';
    let richtung = '';

    if(spielerY < blinkyY){
        vertikal = 'Oben';
    }else if(spielerY > blinkyY){
        vertikal = 'Unten';
    }

    if(spielerX < blinkyX){
        richtung = vertikal + '-Links';
    }else{
        richtung = vertikal + '-Rechts';
    }

    if(modus == 'scatter'){
        richtung = 'Oben-Rechts';
    }


    let y = blinkyY;
    let x = blinkyX;

    if(richtung == 'Oben-Rechts'){
        if(!istStuck){
            neuerBlinkyParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
                blinkyStuck = true;
            }
        }else{
            neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Rechts'){
        if(!istStuck){
            neuerBlinkyParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
                blinkyStuck = true;
            }
        }else{
            neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Links'){
        if(!istStuck){
            neuerBlinkyParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
                blinkyStuck = true;
            }
        }else{
            neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == 'Oben-Links'){
        if(!istStuck){
            neuerBlinkyParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerBlinkyParent.classList.contains('wand')){
                neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
                blinkyStuck = true;
            }
        }else{
            neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == '-Links'){
        neuerBlinkyParent = document.getElementById(`${y}/${x - 1}`);
        if(neuerBlinkyParent.classList.contains('wand')){
            neuerBlinkyParent = document.getElementById(`${y - 1}/${x}`);
        }
        if(neuerBlinkyParent.classList.contains('wand')){
            neuerBlinkyParent = document.getElementById(`${y + 1}/${x}`);
            blinkyStuck = true;
        }
    }else if(richtung == '-Rechts'){
        neuerBlinkyParent = document.getElementById(`${y}/${x + 1}`);
        if(neuerBlinkyParent.classList.contains('wand')){
            neuerBlinkyParent = document.getElementById(`${y + 1}/${x}`);
        }
        if(neuerBlinkyParent.classList.contains('wand')){
            neuerBlinkyParent = document.getElementById(`${y - 1}/${x}`);
            blinkyStuck = true;
        }
    }

    document.getElementById('blinky').remove();

    neuerBlinkyParent.classList.add('blinky')

    let neuerBlinkyElm = document.createElement('div');
    neuerBlinkyElm.id = 'blinky';

    neuerBlinkyParent.appendChild(neuerBlinkyElm);

    return blinkyStuck;
}

let clydeStuck;
let clydeModus;

function clydeBewegen(istStuck){
    let clydeElms = document.getElementsByClassName('clyde');
    let clydeElm = clydeElms.item(0);
    clydeElm.classList.remove('clyde');
    clydeStuck = false;

    let neuerclydeParent;

    let [clydeY, clydeX] = clydeElm.id.split('/')
    clydeX = parseInt(clydeX);
    clydeY = parseInt(clydeY);

    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0);

    let [spielerY, spielerX] = spielerElm.id.split('/');
    spielerX = parseInt(spielerX);
    spielerY = parseInt(spielerY);

    let vertikal = '';
    let richtung = '';

    if(spielerY < clydeY){
        vertikal = 'Oben';
    }else if(spielerY > clydeY){
        vertikal = 'Unten';
    }

    if(spielerX < clydeX){
        richtung = vertikal + '-Links';
    }else{
        richtung = vertikal + '-Rechts';
    }

    if(modus == 'scatter'){
        richtung = 'Unten-Links';
    }

    if(Math.abs(spielerY - clydeY) < 8 && Math.abs(spielerX - clydeX) < 8){
        clydeModus = 'frightened';
    }


    let y = clydeY;
    let x = clydeX;
    if(richtung == 'Oben-Rechts'){
        if(!istStuck){
            neuerclydeParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
                clydeStuck = true;
            }
        }else{
            neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Rechts'){
        if(!istStuck){
            neuerclydeParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
                clydeStuck = true;
            }
        }else{
            neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Links'){
        if(!istStuck){
            neuerclydeParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
                clydeStuck = true;
            }
        }else{
            neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == 'Oben-Links'){
        if(!istStuck){
            neuerclydeParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerclydeParent.classList.contains('wand')){
                neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
                clydeStuck = true;
            }
        }else{
            neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == '-Links'){
        neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y - 1}/${x}`);
        }
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y + 1}/${x}`);
            clydeStuck = true;
        }
    }else if(richtung == '-Rechts'){
        neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y + 1}/${x}`);
        }
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y - 1}/${x}`);
            clydeStuck = true;
        }
    }

    document.getElementById('clyde').remove();

    neuerclydeParent.classList.add('clyde')

    let neuerclydeElm = document.createElement('div');
    neuerclydeElm.id = 'clyde';

    neuerclydeParent.appendChild(neuerclydeElm);

    return clydeStuck;
}

function clydeFrightened(istStuck){
    let clydeElms = document.getElementsByClassName('clyde');
    let clydeElm = clydeElms.item(0);
    clydeElm.classList.remove('clyde');
    console.log(clydeElm);
    clydeStuck = false;

    let neuerclydeParent;

    let [y, x] = clydeElm.id.split('/')
    x = parseInt(x);
    y = parseInt(y);

    if(!istStuck){
        neuerclydeParent = document.getElementById(`${y + 1}/${x}`);
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y}/${x - 1}`);
        }
        if(neuerclydeParent.classList.contains('wand')){
            neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
            clydeStuck = true;
            clydeModus = 'normal';
        }
    }else{
        neuerclydeParent = document.getElementById(`${y}/${x + 1}`);
    }

    document.getElementById('clyde').remove();

    neuerclydeParent.classList.add('clyde')

    let neuerclydeElm = document.createElement('div');
    neuerclydeElm.id = 'clyde';

    neuerclydeParent.appendChild(neuerclydeElm);

    return clydeStuck;
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


setInterval(bewegen, 500);

setInterval(function(){
    blinkyStuck = blinkyBewegen(blinkyStuck);
}, 500);

setInterval(function(){
    if(clydeModus == 'frightened'){
        clydeStuck = clydeFrightened(clydeStuck);
    }else{
        clydeStuck = clydeBewegen(clydeStuck);
    }
}, 500);