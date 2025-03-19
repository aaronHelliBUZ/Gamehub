const content = document.getElementById("content");
let heightGame;
let widthGame;

function script(hoehe, breite, anzahlStartBomben){

    heightGame = hoehe;
    widthGame = breite;
    let style = document.createElement('style');
    let height
    let width

    if(hoehe > breite){
        let compare = breite / hoehe;
        height = "90%";
        width = "auto";

    }
    else if(breite > hoehe){
        let compare = hoehe / breite;
        console.log(compare);
        height = "auto";
        width = "90%";
    }
    else{
        height = "90%";
        width = "auto";
    }

    console.log(height+','+width);


    style.textContent = `
        #Spielfeld{
            height:${height};
            width: ${width};
            grid-template-columns: repeat(${breite + 1}, ${100/(breite+1)}%);
            grid-template-rows: repeat(${hoehe + 1}, ${100/(hoehe+1)}%);
        }
    `

    let spielfeld = new Array(hoehe + 1);

    for(let i = 0; i <= hoehe; i++){
        spielfeld[i] = new Array(breite + 1)
    }

    for(let i = 0; i <= hoehe; i++){
        for(let j = 0; j <= breite; j++){
            spielfeld[i][j] = 0;
        }
    }

    let spielzuege = 0;

    let bomben = [];

    for(let i = 0; i <= hoehe; i++){
        for(let j = 0; j <= breite; j++){
            let imgElm = document.getElementById(`${i}_${j}`);
            imgElm.addEventListener("click", KlickenMitParameter(Klicken, imgElm, 0));
            imgElm.addEventListener("contextmenu", Flagge);
        }
    }

    let anzahlFlaggenInit = document.getElementById('anzahlFlaggen');
    anzahlFlaggenInit.textContent = `Anzahl Flaggen: ${anzahlStartBomben}`

    document.head.appendChild(style)

    function KlickenMitParameter(func, ...args){
        return function(){
            func(...args);
        }
    }

    let j = 0;

    while(j < anzahlStartBomben){
        let randomY = parseInt(Math.random() * (hoehe + 1));
        let randomX = parseInt(Math.random() * (breite + 1));
        let bombElm = document.getElementById(`${randomY}_${randomX}`);
        if(bombElm.className != 'bomb'){
            spielfeld[randomY][randomX] = 1;
            bombElm.className = 'bomb';
            bomben.push(randomY + '_' + randomX);
            j++;
        }
    }

    console.log(spielfeld)
    console.log(bomben)
    
    let beenden = false;
    let timer = 0;
    
    let verfuegbareFlaggen = anzahlStartBomben;
    let anzahlFlaggenElm = document.getElementById('anzahlFlaggen');

    function Klicken(event, clearWenn0){
        let regexFlagged = /.*flagged.*/;
        let regexChecked = /.*checked.*/;
        let [y, x] = event.id.split('_')
        x = parseInt(x);
        y = parseInt(y);

        switch(clearWenn0){
            case 1:
                if((y) > 0 && (x) > 0){
                    event = document.getElementById(`${y - 1}_${x - 1}`)
                    y--;
                    x--;
                }else{
                    Clear0(2, event);
                }
                break;
            case 2:
                if((y) > 0){
                    event = document.getElementById(`${y - 1}_${x}`)
                    y--;
                }else{
                    Clear0(3, event);
                }
                break;
            case 3:
                if((parseInt((y))) > 0 && (x) < breite){
                    event = document.getElementById(`${y - 1}_${x + 1}`)
                    y--;
                    x++;
                }else{
                    Clear0(4, event);
                }
                break;
            case 4:
                if((x) > 0){
                    event = document.getElementById(`${y }_${x - 1}`)
                    x--;
                }else{
                    Clear0(5, event);
                }
                break;
            case 5:
                if((x) < breite){
                    event = document.getElementById(`${y}_${x + 1}`)
                    x++;
                }else{
                    Clear0(6, event);
                }
                break;
            case 6:
                if((parseInt((y))) < hoehe && (x) > 0){
                    event = document.getElementById(`${y + 1}_${x - 1}`)
                    y++;
                    x--;
                }else{
                    Clear0(7, event);
                }
                break;
            case 7:
                if((parseInt((y))) < hoehe){
                    event = document.getElementById(`${y + 1}_${x}`)
                    y++;
                }else{
                    Clear0(8, event);
                }
                break;
            case 8:
                if((parseInt((y))) < hoehe && (x) < breite){
                    event = document.getElementById(`${y + 1}_${x + 1}`)
                    y++;
                    x++;
                }else{
                    Clear0(9, event);
                }
                break;
            default:
                break;
        }

        if(!regexFlagged.test(event.className) && !regexChecked.test(event.className)){
            event.classList.add('checked');
            let aktuellesDiv = document.getElementById(`${y}_${x}div`);
            aktuellesDiv.classList.add('checked');
            let aktuellesElmY = y;
            let aktuellesElmX = x;
            let anzahlBomben = 0;
            if(BombenUeberpruefung(bomben, event)){
                if(spielzuege == 0){
                    verfuegbareFlaggen--;
                    spielfeld[aktuellesElmY][aktuellesElmX] = 0;
                    anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
                }else{
                    explodeField();
                }
            }
            spielzuege++;
            if(spielzuege == ((breite + 1) * (hoehe + 1)) - verfuegbareFlaggen){
                beenden = true;
                //Gewonnen nachricht
                let winMessage = document.createElement("p");
    
                winMessage.innerHTML = "Gewonnen!";
                winMessage.id = "win"
                gameField.appendChild(winMessage);
                setTimeout(function(){
                    Weiterleiten(timer);
                },6000);
            }

            if(aktuellesElmX == 0){
                if(aktuellesElmY == 0){
                    anzahlBomben += spielfeld[0][1];
                    anzahlBomben += spielfeld[1][0];
                    anzahlBomben += spielfeld[1][1];
                }else if(aktuellesElmY == hoehe){
                    anzahlBomben += spielfeld[hoehe - 1][0];
                    anzahlBomben += spielfeld[hoehe - 1][1];
                    anzahlBomben += spielfeld[hoehe][1];
                }else{
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                    anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
                }
            }else if(aktuellesElmX == breite){
                if(aktuellesElmY == 0){
                    anzahlBomben += spielfeld[0][breite -1];
                    anzahlBomben += spielfeld[1][breite -1];
                    anzahlBomben += spielfeld[1][breite];
                }else if(aktuellesElmY == hoehe){
                    anzahlBomben += spielfeld[hoehe - 1][breite - 1];
                    anzahlBomben += spielfeld[hoehe - 1][breite];
                    anzahlBomben += spielfeld[hoehe][breite - 1];
                }else{
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                }
            }else if(aktuellesElmY == 0){
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
            }else if(aktuellesElmY == hoehe){
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
            }else{
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
            }
            
            let anzahlBombenP = document.createElement('p');
            anzahlBombenP.textContent = anzahlBomben;

            let parentContainer = document.getElementById(`${aktuellesElmY}_${aktuellesElmX}div`);
            parentContainer.appendChild(anzahlBombenP);

            if(anzahlBomben == 0){
                Clear0(1, event)
            }
        }
    }

    function Clear0(wiederholungen, event){
        for(let i = wiederholungen; i <= 8; i++){
            Klicken(event, i);
        }
    }

    function BombenUeberpruefung(bomben, aktuellesElm){
        for(let i = 0; i < anzahlStartBomben; i++){
            if(aktuellesElm.id == bomben[i]){
                return true;
            }
        }
        return false;
    }

    function Flagge(event){
        event.preventDefault();
        let regexFlagged = /.*flagged.*/;

        if(verfuegbareFlaggen > 0 && !(regexFlagged.test(event.target.className))){
            event.target.classList.add('flagged');
            verfuegbareFlaggen--;
            spielzuege++;
            anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
            if(spielzuege == ((hoehe + 1) * (breite + 1))){
                beenden = true;
                //Gewonnen nachricht
                let winMessage = document.createElement("p");
    
                winMessage.innerHTML = "Gewonnen!";
                winMessage.id = "win"
                gameField.appendChild(winMessage);
                setTimeout(function(){
                    Weiterleiten(timer);
                },6000);
            }
        }else if((regexFlagged.test(event.target.className))){
            event.target.classList.remove('flagged');
            verfuegbareFlaggen++;
            spielzuege--;
            anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
        }
    }

    function Weiterleiten(zeit){
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'rekord.php'

        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = 'Rekord';
        hiddenField.value = zeit;
        form.appendChild(hiddenField);

        const hiddenField2 = document.createElement('input');
        hiddenField2.type = 'hidden';
        hiddenField2.name = 'Punkte';
        hiddenField2.value = `${(hoehe + 1) * (breite + 1)}/${anzahlStartBomben}`;
        form.appendChild(hiddenField2)

        document.body.appendChild(form);
        form.submit();
    }

    const gameField = document.getElementById('Spielfeld');
    const body = document.getElementById('body');

    //Für die Explosionsannimation
    function explodeField(){
        //Für die Höhe und Breite der Seite
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        //Für jegliche zufällige Zahlen
        let ranNum;
        body.style.backgroundColor = "rgb(253, 238, 154)";

        //Sprengt die Felder
        for (let x = 0; x < widthGame; x++){
            for (let y = 0; y < heightGame; y++) {
                let field = document.getElementById(y+"_"+x);

                //Generiert zufällige Koordinaten
                let randomX = Math.floor(Math.random() * (viewportWidth - field.clientWidth)/2);
                let randomY = Math.floor(Math.random() * (viewportHeight - field.clientHeight)/2);
                

                anzahlFlaggenElm.innerHTML = "";

                gameField.style.visibility = "hidden";

                field.style.transitionDuration = "1s";
                field.style.visibility = "visible";
                field.innerHTML = "";

                field.classList = "explodeFields" ;
            }
        }

        //Erstellt die Flammen
        for (let i = 0; i < 100; i++){
            let fire = document.createElement("div");

            let randomX = Math.floor(Math.random() * (viewportWidth - fire.clientWidth)/2);
            let randomY = Math.floor(Math.random() * (viewportHeight - fire.clientHeight)/2);

            fire.style.transitionDuration = "1s";
            fire.style.visibility = "visible";
            fire.innerHTML = ""
            fire.classList = "fire";

            gameField.appendChild(fire);
            
            //Enscheidet die Farbe der Flamme
            ranNum = Math.floor(Math.random() * 3)+1;
            if (ranNum == 1){
                fire.style.backgroundColor = "red";
            }
            else if (ranNum == 2){
                fire.style.backgroundColor = "orange";
            }
            else if (ranNum == 3){
                fire.style.backgroundColor = "yellow";
            }

            setTimeout(function(){
                //Enscheidet in welche Richtung die Flamme geht
                ranNum = Math.floor(Math.random() * 4)+1;
                console.log(ranNum)
                if(ranNum == 1){
                    fire.style.transform = `translate(${randomX}px, ${randomY}px)`;
                }
                else if(ranNum == 2) {
                    fire.style.transform = `translate(-${randomX}px, ${randomY}px)`;
                }
                else if(ranNum == 3) {
                    fire.style.transform = `translate(${randomX}px, -${randomY}px)`;
                }
                else if(ranNum == 4) {
                    fire.style.transform = `translate(-${randomX}px, -${randomY}px)`;
                }
            },1);
        }
        looseMessage();
    }

    //Erstellt Verloren Nachricht
    function looseMessage(){
        let looseMessageElm = document.createElement("div");
        let timerElm = document.getElementById('Timer');
        let backElm = document.getElementById('back');

        timerElm.style.opacity = 0;
        backElm.style.opacity = 0;

        looseMessageElm.innerHTML = "Verloren";
        looseMessageElm.className = ("looseMessage");
        looseMessageElm.style.fontSize = "0px";

        gameField.appendChild(looseMessageElm);

        setTimeout(function(){
            location.reload();
        },6500);
    }

    let timerElm = document.getElementById('Timer');
    timerElm.textContent = timer;

    function Timer(){
        if(!(beenden)){
            setTimeout(function(){
                timer++;
                timerElm.textContent = timer;
                Timer();
            }, 1000);
        }
    }

    Timer();
}