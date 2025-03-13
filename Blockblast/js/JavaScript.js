//Häufig benutzte Elemente
const gameField = document.getElementById("gameField");
const blockChoiceElm = document.getElementById("blockChoice");

const fieldsPerX = 10;
const fieldsPerY = 10;

let mouseX = -3;
let mouseY = -3;

let oldMouseX = -3;
let oldMouseY = -3;

let blockIdCounter = 0;

let mouseDown = false;

generateField();

for (let i = 0; i < 3; i++) {
    generateBlockInblockChoiceElm();
}

document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    mouseDown = false;
    oldMouseX = -3;
    oldMouseY = -3;

    let mouseElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    mouseElm.classList.add("setted");
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

/*document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    console.log("X: " + mouseX + " Y: " + mouseY);
});*/

function mouseClicked() {
    mouseDown = true;
    console.log("MOUSECLICKED");
    console.log("OldX: " + oldMouseX + "\nOldY: " + oldMouseY);
}

function generateBlockInblockChoiceElm() {
    let newBlock = document.createElement("div");
    newBlock.id = "B" + blockIdCounter;
    newBlock.classList.add("block");
    blockChoiceElm.appendChild(newBlock);
    blockIdCounter++;

    newBlock.addEventListener("mousedown", function (event) {
        event.preventDefault();
        mouseClicked();
    });
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
    console.log("OldX2: " + oldMouseX + "\nOldY2: " + oldMouseY);
    let oldBlockElm = document.getElementById("X" + oldMouseX + "Y" + oldMouseY);
    if (oldBlockElm.classList.contains("setted") === false) {
        oldBlockElm.classList.remove("fieldBlock");
    }

    let newBlockElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    newBlockElm.classList.add("fieldBlock");
}
