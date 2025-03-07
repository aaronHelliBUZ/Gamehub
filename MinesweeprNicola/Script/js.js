//Variabel für das Ganze Programm
let flagCount = 10;
let firstField = true;
let openFields = 0;

//Häufig benutzte Elemente
const gameField = document.getElementById("gameField");
const flagTxt = document.getElementById("flagNumb");
const flagCounter = document.getElementById("flagCounter");
const content = document.getElementById("content")
const body = document.getElementById("body");


//Zentriert das Speilfeld
{
    content.style.marginLeft = `${(window.innerWidth - content.offsetWidth)/2}px`;
    console.log(`${(window.innerWidth - content.offsetHeight)}px`);
}

//Anzeige für die Flags
{
    flagTxt.style.fontFamily = "sans-serif"
    flagCounter.style.fontFamily = "sans-serif"

    flagTxt.innerHTML = "Anzahl Flaggen: ";
    flagCounter.innerHTML = flagCount;
}


//Felder erstellen
{
    for (let x = 0; x < 8; x++){
        for (let y = 0; y < 10; y++) {
            let field = document.createElement("div");

            field.id = x+"-"+y;
            field.className = "";
            field.addEventListener("click", ClickWithParameter(openField, field));
            field.addEventListener("contextmenu", ClickWithParameter(setFlag, field));
            gameField.appendChild(field);
        }
    }
}

//Funktion um Funktionen mit Parameter den Feldern zuzuweisen
function ClickWithParameter(func, ...args){
    return function(){
        func(...args);
    }
}

//Bomben zuweisen
{
    for (let i = 0;i < 10;){
        let ranNumberY = Math.floor(Math.random()*10);
        let ranNumberX = Math.floor(Math.random()*8);
        let bombField = document.getElementById(ranNumberX+"-"+ranNumberY);

        if (bombField.classList.contains('bomb')){
        }
        else {
            bombField.className = "bomb";
            i++;
        }
    }
}

//Wechselt den Platz der Bombe für Safestart
function safeStart(){
    while(1){
        let ranNumberY = Math.floor(Math.random()*10);
        let ranNumberX = Math.floor(Math.random()*8);
        let bombField = document.getElementById(ranNumberX+"-"+ranNumberY);

        if (bombField.classList.contains('bomb'),bombField.classList.contains('open')){
        }
        else {
            bombField.className = "bomb";
            break;
        }
    }

}

//Function für das öffnen der Felder
function openField(field) {
    if(field.className == "explodeFields"){
        //verhindert das klicken während der Explode annimation
    }
    else if (firstField && field.classList.contains('bomb')){
        //Safe-Start
        field.className = "";
        openField(field);
    }
    else if (field.classList.contains('flag') || field.className === "open"){
        //für geflagte Felder
    }
    else if (!(firstField) && field.classList.contains('bomb')) {
        //wenn auch eine Bombe aktiviert wird
        field.className = "explode"
        explodeField();
    }
    else if (!(field.classList.contains('flag'))){
        //Für felder ohne Bomben
        let bombCount = bombCounter(field); //Zählt nachbarbomben

        field.innerHTML = bombCount;
        field.className = "open";
        openFields++;

        if(openFields == 70){
            //Gewonnen nachricht
            let winMessage = document.createElement("p");

            winMessage.innerHTML = "Gewonnen!";
            winMessage.id = "win"
            gameField.appendChild(winMessage);

            setTimeout(function(){
                location.reload();
            },6000);
        }

        if (bombCount == 0){
            openArround(field)
        }

    }
    firstField = false;
};

//Öffnet die Benachbarten felder
function openArround(field){
    let [x, y] = field.id.split('-')
    let neighborField;

    //Öffnet Rechts
    if (y != 9){
        neighborField = document.getElementById(x+"-"+(parseInt(y)+1));    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Links
    if(y != 0){
        neighborField = document.getElementById(x+"-"+(parseInt(y)-1));    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Unten
    if(x != 7){
        neighborField = document.getElementById((parseInt(x)+1)+"-"+y);    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Oben
    if(x != 0){
        neighborField = document.getElementById((parseInt(x)-1)+"-"+y);    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Unten-Rechts
    if(x != 7 && y != 9){
        neighborField = document.getElementById((parseInt(x)+1)+"-"+(parseInt(y)+1));    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Unten-Links
    if(x != 7 && y != 0){
        neighborField = document.getElementById((parseInt(x)+1)+"-"+(parseInt(y)-1));    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

    //Öffnet Oben-Links
    if(x != 0 && y !=0)
    neighborField = document.getElementById((parseInt(x)-1)+"-"+(parseInt(y)-1));    
    if (neighborField.className != "open"){
        openField(neighborField);
    }

    //Öffnet Oben-Rechts
    if(x != 0 && y != 9){
        neighborField = document.getElementById((parseInt(x)-1)+"-"+(parseInt(y)+1));    
        if (neighborField.className != "open"){
            openField(neighborField);
        }
    }

}

//Überprüft, wo es Bomben hat
function bombCounter(field){
    let bombCount = 0;
    let [x, y] = field.id.split('-')
    let neighborCoordinate;
    let neighborField;

    //Feld unterhalb
    neighborCoordinate = (parseInt(x)+1)+"-"+y;
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 7 && neighborField.classList.contains('bomb')){
        console.log("1");
        bombCount++;
    }

    //Feld oberhalb
    neighborCoordinate = (parseInt(x)-1)+"-"+y;
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 0 && neighborField.classList.contains('bomb')){
        console.log("2");
        bombCount++;
    }

    //Feld rechts
    neighborCoordinate = x+"-"+(parseInt(y)+1);
    neighborField = document.getElementById(neighborCoordinate);
    if(y != 9 && neighborField.classList.contains('bomb')){
        console.log("3");
        bombCount++;
    }

    //Feld links
    neighborCoordinate = x+"-"+(parseInt(y)-1);
    neighborField = document.getElementById(neighborCoordinate);
    if(y != 0 && neighborField.classList.contains('bomb')){
        console.log("4");
        bombCount++;
    }

    //Feld unten-rechts
    neighborCoordinate = (parseInt(x)+1)+"-"+(parseInt(y)+1);
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 7 && y != 9 && neighborField.classList.contains('bomb')){
        console.log("5");
        bombCount++;
    }

    //Feld unten-links
    neighborCoordinate = (parseInt(x)+1)+"-"+(parseInt(y)-1);
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 7 && y != 0 && neighborField.classList.contains('bomb')){
        console.log("6");
        bombCount++;
    }

    
    //Feld oben-rechts
    neighborCoordinate = (parseInt(x)-1)+"-"+(parseInt(y)+1);
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 0 && y != 9 && neighborField.classList.contains('bomb')){
        console.log("7");
        bombCount++;
    }

    //Feld oben-links
    neighborCoordinate = (parseInt(x)-1)+"-"+(parseInt(y)-1);
    neighborField = document.getElementById(neighborCoordinate);
    if(x != 0 && y != 0 && neighborField.classList.contains('bomb')){
        console.log("8");
        bombCount++;
    }
    return bombCount;
}

//Für das Flaggen setzen
function setFlag(field){
    let flagImg = '<img src="../gfx/flag.webp" alt="flag" />' //Bild Flagge

    event.preventDefault();
    if(field.className == "explodeFields"){
        //Schaltet das Flaggensetzen während der Animation aus
    }
    else if (field.classList.contains('flag')){
        //Entfernt die Flagge
        field.classList.remove("flag");
        field.innerHTML = "";

        flagCount++;
    }
    else if (field.className === "open"){
        //Überprüft, ob das Feld schon offen ist
    }
    else if (flagCount != 0){
        //Erstellt eine Flagge
        field.classList.add("flag");
        field.innerHTML = flagImg;

        flagCount--;
    }
    flagCounter.innerHTML = flagCount;
}

//Für die Explosionsannimation
function explodeField(){
    //Für die Höhe und Breite der Seite
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    //Für jegliche zufällige Zahlen
    let ranNum;

    body.style.backgroundColor = "rgb(253, 238, 154)";

    //Sprengt die Felder
    for (let x = 0; x < 8; x++){
        for (let y = 0; y < 10; y++) {
            let field = document.getElementById(x+"-"+y);

            //Generiert zufällige Koordinaten
            let randomX = Math.floor(Math.random() * (viewportWidth - field.clientWidth)/2);
            let randomY = Math.floor(Math.random() * (viewportHeight - field.clientHeight)/2);
            

            flagCounter.innerHTML = "";
            flagTxt.innerHTML = "";

            gameField.style.visibility = "hidden";

            field.style.transitionDuration = "1s";
            field.style.visibility = "visible";
            field.innerHTML = "";

            //Enscheidet in welche Richtung das Quadrat geht
            ranNum = Math.floor(Math.random() * 4)+1;
            if(ranNum == 1){
                field.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
            else if(ranNum == 2) {
                field.style.transform = `translate(-${randomX}px, ${randomY}px)`;
            }
            else if(ranNum == 3) {
                field.style.transform = `translate(${randomX}px, -${randomY}px)`;
            }
            else if(ranNum == 4) {
                field.style.transform = `translate(-${randomX}px, -${randomY}px)`;
            }

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

    looseMessageElm.innerHTML = "Verloren";
    looseMessageElm.className = ("looseMessage");
    looseMessageElm.style.fontSize = "0px";

    gameField.appendChild(looseMessageElm);

    setTimeout(function(){
        location.reload();
    },6500);
}