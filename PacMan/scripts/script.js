let aktuelleRichtung = '';
let modus = 'scatter';
let scatterZyklus = 1;
let pellets = 188;
let richtungen = [];
let alterModus;

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
});

let blinkyParent = document.getElementById('10/10');
blinkyParent.classList.add('blinky');
let blinky = document.createElement('div');
blinky.id = 'blinky';
blinkyParent.appendChild(blinky);

let pinkyParent = document.getElementById('12/9');
let pinky = document.createElement('div');
pinky.id = 'pinky';
pinkyParent.appendChild(pinky);

let inkyParent = document.getElementById('12/10');
let inky = document.createElement('div');
inky.id = 'inky';
inkyParent.appendChild(inky);

let clydeParent = document.getElementById('12/11');
let clyde = document.createElement('div');
clyde.id = 'clyde';
clydeParent.appendChild(clyde);

function bewegen(){
    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0)
    spielerElm.classList.remove('spieler');

    let neuerSpielerParent;

    let [y, x] = spielerElm.id.split('/');
    x = parseInt(x);
    y = parseInt(y);

    document.getElementById('spieler').remove();

    let zweiVorSpieler;

    switch(aktuelleRichtung){
        case 'W':
            neuerSpielerParent = document.getElementById(`${y - 1}/${x}`);
            zweiVorSpieler = document.getElementById(`${y - 2}/${x}`);
            break;
        case 'D':
            neuerSpielerParent = document.getElementById(`${y}/${x + 1}`);
            zweiVorSpieler = document.getElementById(`${y}/${x + 2}`);
            if(x == 20){
                neuerSpielerParent = document.getElementById(`${y}/${0}`);
            }
            break;
        case 'S':
            neuerSpielerParent = document.getElementById(`${y + 1}/${x}`);
            zweiVorSpieler = document.getElementById(`${y + 2}/${x}`);
            break;
        case 'A':
            neuerSpielerParent = document.getElementById(`${y}/${x - 1}`);
            zweiVorSpieler = document.getElementById(`${y}/${x - 2}`);
            if(x == 0){
                neuerSpielerParent = document.getElementById(`${y}/${20}`);
            }
            break;
        default:
            zweiVorSpieler = document.getElementById('0/0');
            neuerSpielerParent = document.getElementById(`${y}/${x}`);
    }
    if(aktuelleRichtung == ''){
        richtungen.push(richtungen[richtungen.length - 1])
    }else{
        richtungen.push(aktuelleRichtung)
    }

    let regexPattern = /.*inky/;

    if(regexPattern.test(neuerSpielerParent.className) || neuerSpielerParent.classList.contains('clyde')){
        if(modus == 'frightened'){
            let klasse = neuerSpielerParent.classList;
            let geistName = klasse.item(klasse.length - 1);
            document.getElementById(geistName).remove();
            neuerSpielerParent.classList.remove(geistName);

            switch(geistName){
                case 'blinky':
                    blinkyBewegung = false;
                    break;
                case 'pinky':
                    pinkyBewegung = false;
                    break;
                case 'inky':
                    inkyBewegung = false;
                    break;
                case 'clyde':
                    clydeBewegung = false;
                    break;
            }

            let parentContainer = document.getElementById('12/9');
            let geist = document.createElement('div');
            geist.id = geistName;
            parentContainer.appendChild(geist);

        }else{
            alert('ded');
            location.reload();
        }
    }

    if(neuerSpielerParent.classList.contains('wand')){
        neuerSpielerParent = document.getElementById(`${y}/${x}`);
        aktuelleRichtung = '';
    }

    if(neuerSpielerParent.classList.contains('pelletParent')){
        neuerSpielerParent.classList.remove('pelletParent');
        neuerSpielerParent.removeChild(neuerSpielerParent.firstChild);
        pellets--;
    }
    
    if(neuerSpielerParent.classList.contains('superPelletParent')){
        neuerSpielerParent.classList.remove('superPelletParent');
        neuerSpielerParent.removeChild(neuerSpielerParent.firstChild);
        alterModus = modus;
        modus = 'frightened';

        let style = document.createElement('style');
        style.textContent = '[id*="y"]{background-color: blue !important;}'
        style.id = 'style';
        document.head.appendChild(style)
        setTimeout(function(){
            document.getElementById('style').remove();
            modus = alterModus;
        }, 6000)
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
let blinkyBewegung = true;

function blinkyBewegen(istStuck){
    if(blinkyBewegung){
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
    
        if(modus == 'frightened'){
            if(richtung == 'Oben-Rechts'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Oben-Links'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Unten-Links'){
                richtung ='Oben-Rechts';
            }else if(richtung == 'Unten-Rechts'){
                richtung = 'Oben-Links';
            }
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
    
        setTimeout(function(){
            blinkyStuck = blinkyBewegen(blinkyStuck);
        }, 500);  
    }else{
        setTimeout(function(){
            document.getElementById('blinky').remove;
            blinkyBewegung = true;
            let blinkyParent = document.getElementById('10/10');
            blinkyParent.classList.add('blinky');
            let blinky = document.createElement('div');
            blinky.id = 'blinky';
            blinkyParent.appendChild(blinky);
            blinkyStuck = blinkyBewegen(blinkyStuck)
        }, 3000);
    }
    
    return blinkyStuck;
}

let clydeStuck;
let clydeModus;
let clydeBewegung = true;

function clydeBewegen(istStuck){
    if(clydeBewegung){
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
        if(modus == 'frightened'){
            if(richtung == 'Oben-Rechts'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Oben-Links'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Unten-Links'){
                richtung ='Oben-Rechts';
            }else if(richtung == 'Unten-Rechts'){
                richtung = 'Oben-Links';
            }
        }else if(Math.abs(spielerY - clydeY) < 8 && Math.abs(spielerX - clydeX) < 8){
            clydeModus = 'scatter';
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
        
        setTimeout(function(){
            if(clydeModus == 'scatter'){
                clydeStuck = clydeScatter(clydeStuck);
            }else{
                clydeStuck = clydeBewegen(clydeStuck);
            }
        }, 500); 
    }else{
        setTimeout(function(){
            document.getElementById('clyde').remove;
            clydeBewegung = true;
            let clydeParent = document.getElementById('10/10');
            clydeParent.classList.add('clyde');
            let clyde = document.createElement('div');
            clyde.id = 'clyde';
            clydeParent.appendChild(clyde);
            clydeStuck = clydeBewegen(clydeStuck);
        }, 3000);
    }

    return clydeStuck;
}

function clydeScatter(istStuck){
    let clydeElms = document.getElementsByClassName('clyde');
    let clydeElm = clydeElms.item(0);
    clydeElm.classList.remove('clyde');
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
    
    setTimeout(function(){
        if(clydeModus == 'scatter'){
            clydeStuck = clydeScatter(clydeStuck);
        }else{
            clydeStuck = clydeBewegen(clydeStuck);
        }
    }, 500);

    return clydeStuck;
}

let pinkyStuck;
let pinkyBewegung = true;

function pinkyBewegen(istStuck){
    if(pinkyBewegung){
        let pinkyElms = document.getElementsByClassName('pinky');
        let pinkyElm = pinkyElms.item(0);
        pinkyElm.classList.remove('pinky');
        pinkyStuck = false;
    
        let neuerPinkyParent;
    
        let [pinkyY, pinkyX] = pinkyElm.id.split('/')
        pinkyX = parseInt(pinkyX);
        pinkyY = parseInt(pinkyY);
    
        let spielerElms = document.getElementsByClassName('spieler');
        let spielerElm = spielerElms.item(0);
    
        let [zielY, zielX] = spielerElm.id.split('/');
        zielX = parseInt(zielX);
        zielY = parseInt(zielY);
    
        switch(richtungen[(richtungen.length) - 1]){
            case 'W':
                if(zielY > 1){
                    zielY -= 2;
                }
                break;
            case 'D':
                if(zielX < 19){
                    zielX += 2;
                }
                break;
            case 'S':
                if(zielY < 25){
                    zielY += 2;
                }
                break;
            case 'A':
                if(zielX > 1){
                    zielX += 2;
                }
                break;
        }
    
        let vertikal = '';
        let richtung = '';
    
        if(zielY < pinkyY){
            vertikal = 'Oben';
        }else if(zielY > pinkyY){
            vertikal = 'Unten';
        }
    
        if(zielX < pinkyX){
            richtung = vertikal + '-Links';
        }else{
            richtung = vertikal + '-Rechts';
        }
    
        if(modus == 'scatter'){
            richtung = 'Oben-Links';
        }
    
        if(modus == 'frightened'){
            if(richtung == 'Oben-Rechts'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Oben-Links'){
                richtung = 'Unten-Links';
            }else if(richtung == 'Unten-Links'){
                richtung ='Oben-Rechts';
            }else if(richtung == 'Unten-Rechts'){
                richtung = 'Oben-Links';
            }
        }
    
        let y = pinkyY;
        let x = pinkyX;
        if(richtung == 'Oben-Rechts'){
            if(!istStuck){
                neuerPinkyParent = document.getElementById(`${y - 1}/${x}`);
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
                }
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
                    pinkyStuck = true;
                }
            }else{
                neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
            }
        }else if(richtung == 'Unten-Rechts'){
            if(!istStuck){
                neuerPinkyParent = document.getElementById(`${y + 1}/${x}`);
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
                }
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
                    pinkyStuck = true;
                }
            }else{
                neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
            }
        }else if(richtung == 'Unten-Links'){
            if(!istStuck){
                neuerPinkyParent = document.getElementById(`${y + 1}/${x}`);
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
                }
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
                    pinkyStuck = true;
                }
            }else{
                neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
            }
        }else if(richtung == 'Oben-Links'){
            if(!istStuck){
                neuerPinkyParent = document.getElementById(`${y - 1}/${x}`);
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
                }
                if(neuerPinkyParent.classList.contains('wand')){
                    neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
                    pinkyStuck = true;
                }
            }else{
                neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
            }
        }else if(richtung == '-Links'){
            neuerPinkyParent = document.getElementById(`${y}/${x - 1}`);
            if(neuerPinkyParent.classList.contains('wand')){
                neuerPinkyParent = document.getElementById(`${y - 1}/${x}`);
            }
            if(neuerPinkyParent.classList.contains('wand')){
                neuerPinkyParent = document.getElementById(`${y + 1}/${x}`);
                pinkyStuck = true;
            }
        }else if(richtung == '-Rechts'){
            neuerPinkyParent = document.getElementById(`${y}/${x + 1}`);
            if(neuerPinkyParent.classList.contains('wand')){
                neuerPinkyParent = document.getElementById(`${y + 1}/${x}`);
            }
            if(neuerPinkyParent.classList.contains('wand')){
                neuerPinkyParent = document.getElementById(`${y - 1}/${x}`);
                pinkyStuck = true;
            }
        }
    
        document.getElementById('pinky').remove();
    
        neuerPinkyParent.classList.add('pinky')
    
        let neuerPinkyElm = document.createElement('div');
        neuerPinkyElm.id = 'pinky';
    
        neuerPinkyParent.appendChild(neuerPinkyElm);
        
        setTimeout(function(){
                pinkyStuck = pinkyBewegen(pinkyStuck);
            }, 500); 
    }else{
        setTimeout(function(){
            document.getElementById('pinky').remove;
            pinkyBewegung = true;
            let pinkyParent = document.getElementById('10/10');
            pinkyParent.classList.add('pinky');
            let pinky = document.createElement('div');
            pinky.id = 'pinky';
            pinkyParent.appendChild(pinky);
            pinkyStuck = pinkyBewegen(pinkyStuck)
        }, 3000);
    }

    return pinkyStuck;
}

let inkyStuck;
let inkyBewegung = true;

function inkyBewegen(istStuck){
    if(inkyBewegung){ 
        let inkyElms = document.getElementsByClassName('inky');
    let inkyElm = inkyElms.item(0);
    inkyElm.classList.remove('inky');
    inkyStuck = false;

    let neuerInkyParent;

    let [inkyY, inkyX] = inkyElm.id.split('/')
    inkyX = parseInt(inkyX);
    inkyY = parseInt(inkyY);

    let spielerElms = document.getElementsByClassName('spieler');
    let spielerElm = spielerElms.item(0);

    let [zielY, zielX] = spielerElm.id.split('/');
    zielX = parseInt(zielX);
    zielY = parseInt(zielY);

    let blinkyElms = document.getElementsByClassName('blinky');
    let blinkyElm = blinkyElms.item(0);

    let [blinkyY, blinkyX] = blinkyElm.id.split('/');
    blinkyX = parseInt(blinkyX);
    blinkyY = parseInt(blinkyY);

    switch(richtungen[(richtungen.length) - 1]){
        case 'W':
            if(zielY > 1){
                zielY -= 2;
            }
            break;
        case 'D':
            if(zielX < 19){
                zielX += 2;
            }
            break;
        case 'S':
            if(zielY < 25){
                zielY += 2;
            }
            break;
        case 'A':
            if(zielX > 1){
                zielX += 2;
            }
            break;
    }

    let horizontalDistanz = zielX - blinkyX;
    let vertikalDistanz = zielY - blinkyY;

    zielX = blinkyX + horizontalDistanz * 2;
    zielY = blinkyY + vertikalDistanz * 2

    if(zielY > 26 || zielY < 0 || zielX > 20 || zielX < 0){
        zielX = parseInt(Math.random() * 21)
        zielY = parseInt(Math.random() * 27)
    }

    let vertikal = '';
    let richtung = '';

    if(zielY < inkyY){
        vertikal = 'Oben';
    }else if(zielY > inkyY){
        vertikal = 'Unten';
    }

    if(zielX < inkyX){
        richtung = vertikal + '-Links';
    }else{
        richtung = vertikal + '-Rechts';
    }

    if(modus == 'scatter'){
        richtung = 'Unten-Rechts';
    }

    if(modus == 'frightened'){
        if(richtung == 'Oben-Rechts'){
            richtung = 'Unten-Links';
        }else if(richtung == 'Oben-Links'){
            richtung = 'Unten-Links';
        }else if(richtung == 'Unten-Links'){
            richtung ='Oben-Rechts';
        }else if(richtung == 'Unten-Rechts'){
            richtung = 'Oben-Links';
        }
    }

    let y = inkyY;
    let x = inkyX;
    if(richtung == 'Oben-Rechts'){
        if(!istStuck){
            neuerInkyParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
                inkyStuck = true;
            }
        }else{
            neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Rechts'){
        if(!istStuck){
            neuerInkyParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
            }
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
                inkyStuck = true;
            }
        }else{
            neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
        }
    }else if(richtung == 'Unten-Links'){
        if(!istStuck){
            neuerInkyParent = document.getElementById(`${y + 1}/${x}`);
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
                inkyStuck = true;
            }
        }else{
            neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == 'Oben-Links'){
        if(!istStuck){
            neuerInkyParent = document.getElementById(`${y - 1}/${x}`);
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
            }
            if(neuerInkyParent.classList.contains('wand')){
                neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
                inkyStuck = true;
            }
        }else{
            neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
        }
    }else if(richtung == '-Links'){
        neuerInkyParent = document.getElementById(`${y}/${x - 1}`);
        if(neuerInkyParent.classList.contains('wand')){
            neuerInkyParent = document.getElementById(`${y - 1}/${x}`);
        }
        if(neuerInkyParent.classList.contains('wand')){
            neuerInkyParent = document.getElementById(`${y + 1}/${x}`);
            inkyStuck = true;
        }
    }else if(richtung == '-Rechts'){
        neuerInkyParent = document.getElementById(`${y}/${x + 1}`);
        if(neuerInkyParent.classList.contains('wand')){
            neuerInkyParent = document.getElementById(`${y + 1}/${x}`);
        }
        if(neuerInkyParent.classList.contains('wand')){
            neuerInkyParent = document.getElementById(`${y - 1}/${x}`);
            inkyStuck = true;
        }
    }

    document.getElementById('inky').remove();

    neuerInkyParent.classList.add('inky')

    let neuerInkyElm = document.createElement('div');
    neuerInkyElm.id = 'inky';

    neuerInkyParent.appendChild(neuerInkyElm);
    
    setTimeout(function(){
        inkyStuck = blinkyBewegen(inkyStuck);
    }, 500);   
    }else{
        setTimeout(function(){
            document.getElementById('inky').remove;
            inkyBewegung = true;
            let inkyParent = document.getElementById('10/10');
            inkyParent.classList.add('inky');
            let inky = document.createElement('div');
            inky.id = 'inky';
            inkyParent.appendChild(inky);
            inkyStuck = inkyBewegen(inkyStuck)
        }, 3000);
    }

    return inkyStuck;
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

function ded(){
    regexPattern = /.*inky/;
    for(let i = 1; i < 26; i++){
        for(let j = 1; j < 20; j++){
            let elm = document.getElementById(`${i}/${j}`);
            if((regexPattern.test(elm.className) || elm.classList.contains('clyde')) && elm.classList.contains('spieler')){
                if(modus == 'frightened'){
                    let klasse = elm.classList;
                    let geistName = klasse.item(klasse.length - 1);
                    document.getElementById(geistName).remove();
                    elm.classList.remove(geistName);
        
                    switch(geistName){
                        case 'blinky':
                            blinkyBewegung = false;
                            break;
                        case 'pinky':
                            pinkyBewegung = false;
                            break;
                        case 'inky':
                            inkyBewegung = false;
                            break;
                        case 'clyde':
                            clydeBewegung = false;
                            break;
                    }
        
                    let parentContainer = document.getElementById('12/9');
                    let geist = document.createElement('div');
                    geist.id = geistName;
                    parentContainer.appendChild(geist);
        
                }else{
                    alert('ded');
                    location.reload();
                }
            }
        }
    }
    setTimeout(function(){
        ded();
    }, 500);
}

ded();

modusWechseln();


setInterval(bewegen, 500);

blinkyBewegen(blinkyStuck);

setTimeout(function(){
    document.getElementById('clyde').remove();

    let clydeParent = document.getElementById('10/10');
    clydeParent.classList.add('clyde');
    let clyde = document.createElement('div');
    clyde.id = 'clyde';
    clydeParent.appendChild(clyde);
    
    clydeBewegen(clydeStuck);

    setTimeout(function(){
        document.getElementById('pinky').remove();

        let pinkyParent = document.getElementById('10/10');
        pinkyParent.classList.add('pinky');
        let pinky = document.createElement('div');
        pinky.id = 'pinky';
        pinkyParent.appendChild(pinky);
        
        pinkyBewegen(pinkyStuck);

        setTimeout(function(){
            document.getElementById('inky').remove();

            let inkyParent = document.getElementById('10/10');
            inkyParent.classList.add('inky');
            let inky = document.createElement('div');
            inky.id = 'inky';
            inkyParent.appendChild(inky);

            inkyBewegen(inkyStuck);
        }, 8000);
    }, 8000);
}, 8000);