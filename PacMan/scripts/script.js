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

function modusWechseln() {
    if (modus === 'chase') {
        setTimeout(function () {
            modus = 'scatter';
            scatterZyklus++;
            console.log(modus + `${scatterZyklus}`);
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

console.log('scatter1')
modusWechseln();


setInterval(bewegen, 380);