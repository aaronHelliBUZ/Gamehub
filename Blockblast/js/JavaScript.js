//Häufig benutzte Elemente
const gameField = document.getElementById("gameField");
const blockChoiceElm = document.getElementById("blockChoice");

const fieldsPerX = 10;
const fieldsPerY = 10;

let mouseX = -3;
let mouseY = -3;

let oldMouseX = -3;
let oldMouseY = -3;

let blockToPlaceColor = "";

let blockIdCounter = 0;

let mouseDown = false;

let clickedBlockElm;
let blocksLeft = 3;

generateField();

generateBlockInblockChoiceElm();

document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    mouseDown = false;
    oldMouseX = -3;
    oldMouseY = -3;

    let mouseElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    mouseElm.classList.add("setted");
    clickedBlockElm.classList.remove("block");
    blockToPlaceColor = clickedBlockElm.classList["value"];
    blockChoiceElm.removeChild(clickedBlockElm);
    blocksLeft--;
    if (blocksLeft <= 0) {
        generateBlockInblockChoiceElm();
    }
});

//Zentriert das Speilfeld und stellt die grösse ein
/*{
    let size = ((window.innerHeight - content.offsetHeight)/6)*5;
    content.style.height = `${size}px`
    content.style.width = `${size*1.6}px`

    content.style.marginTop = `${(((size/5)*6)/12)}px`;
    content.style.marginLeft = `${(window.innerWidth - content.offsetWidth)/2}px`;
    console.log(`${(window.innerWidth - content.offsetHeight)}px`);
}*/

//Felder erstellen
function generateField() {
    console.log("Generate Fields");

    for (let x = 0; x < fieldsPerX; x++) {
        let newFlex = document.createElement("div");
        newFlex.id = "X" + x.toString();
        newFlex.className = "fieldFlex";
        gameField.appendChild(newFlex);

        for (let y = 0; y < fieldsPerY; y++) {
            let newField = document.createElement("div");
            newField.id = "X" + x.toString() + "Y" + y.toString();
            newField.addEventListener("mouseover", function (event) {
                event.preventDefault();
                mouseOver(this);
            });
            newField.className = "field";
            newFlex.appendChild(newField);
        }
    }
}

function mouseClicked() {
    mouseDown = true;
    clickedBlockElm.classList.remove("blockFlex");
    blockToPlaceColor = clickedBlockElm.classList["value"];
    console.log("MOUSECLICKED");
}

function generateBlockInblockChoiceElm() {
    blocksLeft = 3;
    for (let i = 0; i < 3; i++) {
        let colorNumber = Math.floor(Math.random() * 4);
        let figureType = Math.floor(Math.random() * 4);

        let newBlock = document.createElement("div");
        newBlock.id = "B" + blockIdCounter;
        newBlock.classList.add("blockFlex");

        generateInBlockFlex(newBlock);

        if (colorNumber === 0) {
            newBlock.classList.add("bColor1");
        }else if (colorNumber === 1) {
            newBlock.classList.add("bColor2");
        } else if (colorNumber === 2) {
            newBlock.classList.add("bColor3");
        } else if (colorNumber === 3) {
            newBlock.classList.add("bColor4");
        }

        blockChoiceElm.appendChild(newBlock);
        blockIdCounter++;

        //drawFigure(figureType);

        newBlock.addEventListener("mousedown", function (event) {
            event.preventDefault();
            clickedBlockElm = this;
            mouseClicked();
        });
    }
}

function generateInBlockFlex(newBlock) {
    for (let x = 0; x < 5; x++){
        let newFlex = document.createElement("div");
        newFlex.id = "X" + x.toString();
        newFlex.className = "blockFieldFlex";
        newBlock.appendChild(newFlex);
        for (let y = 0; y < 5; y++){
            let newField = document.createElement("div");
            newField.id = "X" + x.toString() + "Y" + y.toString();
            newField.className = "block";
            newFlex.appendChild(newField);
        }
    }
}

function mouseOver(mouseOverElm) {
    if (mouseDown === true) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;

        mouseX = mouseOverElm.id.split("Y")[0].split("X")[1];
        mouseY = mouseOverElm.id.split("Y")[1];
        console.log("X: " + mouseX + "\nY: " + mouseY);
        setFieldToBlockWhileMouseOver();
    }
}

function setFieldToBlockWhileMouseOver() {
    let oldBlockElm = document.getElementById("X" + oldMouseX + "Y" + oldMouseY);
    if (oldBlockElm.classList.contains("setted") === false) {
        oldBlockElm.classList.remove("fieldBlock");
        if (blockToPlaceColor !== "") {
            oldBlockElm.classList.remove(blockToPlaceColor);
        }
    }

    let newBlockElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    newBlockElm.classList.add("fieldBlock");
    if (blockToPlaceColor !== "") {
        newBlockElm.classList.add(blockToPlaceColor);
    }
}

function drawFigure(figureType, drawX, drawY) {
    switch (figureType) {
        case 1:
            dreiUeberEcke(drawX, drawY);
            break;
        case 2:
            vierUeberEcke(drawX, drawY);
            break;
    }
}

function dreiUeberEcke(drawX, drawY) {
    drawAtPosition(drawX, drawY);
    drawAtPosition(drawX, drawY + 1);
    drawAtPosition(drawX - 1, drawY);
}

function vierUeberEcke(drawX, drawY) {
    drawAtPosition(drawX, drawY);
    drawAtPosition(drawX, drawY + 1);
    drawAtPosition(drawX - 1, drawY);
    drawAtPosition(drawX - 2, drawY);
}

function drawAtPosition(drawX, drawY) {
    let elementToDraw = document.getElementById("X" + drawX + "Y" + drawY);
    elementToDraw.classList.add(blockToPlaceColor);
}
