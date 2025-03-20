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

let clickedFigureType = -3;

generateField();

generateBlockInblockChoiceElm();

document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    mouseDown = false;
    oldMouseX = -3;
    oldMouseY = -3;

    //let mouseElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    //clickedBlockElm.classList.remove("block");

    drawFigure(Number(clickedFigureType), mouseX, mouseY, "", "addSetted");

    clickedFigureType = -3;
    blockToPlaceColor = "";

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
    clickedFigureType = clickedBlockElm.getAttribute("figureType");
    console.log("MOUSECLICKED: FigureType: " + clickedFigureType);
}

function generateBlockInblockChoiceElm() {
    blocksLeft = 3;
    for (let i = 0; i < 3; i++) {
        let colorNumber = Math.floor(Math.random() * 4);
        let figureType = Math.floor(Math.random() * 5) + 1;

        let newBlock = document.createElement("div");
        newBlock.id = "B" + blockIdCounter;
        newBlock.classList.add("blockFlex");

        generateInBlockFlex(newBlock);

        if (colorNumber === 0) {
            newBlock.classList.add("bColor1");
        } else if (colorNumber === 1) {
            newBlock.classList.add("bColor2");
        } else if (colorNumber === 2) {
            newBlock.classList.add("bColor3");
        } else if (colorNumber === 3) {
            newBlock.classList.add("bColor4");
        }

        blockChoiceElm.appendChild(newBlock);
        blockIdCounter++;

        newBlock.addEventListener("mousedown", function (event) {
            event.preventDefault();
            clickedBlockElm = this;
            mouseClicked();
        });

        newBlock.setAttribute("startId", newBlock.id2 + "X" + 0 + "Y" + 0);
        newBlock.setAttribute("figureType", figureType);

        blockToPlaceColor = "noBColor";

        drawFigure(figureType, 0, 0, newBlock.id, "remove");
    }
}

function generateInBlockFlex(newBlock) {
    for (let x = 0; x < 5; x++) {
        let newFlex = document.createElement("div");
        newFlex.id = newBlock.id + "X" + x.toString();
        newFlex.className = "blockFieldFlex";
        newBlock.appendChild(newFlex);
        for (let y = 0; y < 5; y++) {
            let newField = document.createElement("div");
            newField.id = newBlock.id + "X" + x.toString() + "Y" + y.toString();
            newField.className = "block noBColor";
            newFlex.appendChild(newField);
        }
    }
}

function mouseOver(mouseOverElm) {
    if (mouseDown === true && mouseOverElm.classList.contains("setted") === false) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;

        mouseX = mouseOverElm.id.split("Y")[0].split("X")[1];
        mouseY = mouseOverElm.id.split("Y")[1];
        setFieldToBlockWhileMouseOver();
    }
}

function setFieldToBlockWhileMouseOver() {
    //oldBlockElm.classList.remove("fieldBlock");
    if (blockToPlaceColor !== "") {
        //oldBlockElm.classList.remove(blockToPlaceColor);

        drawFigure(Number(clickedFigureType), oldMouseX, oldMouseY, "", "remove");
        console.log("OldX: " + oldMouseX + " OldY: " + oldMouseY);
    }

    //let newBlockElm = document.getElementById("X" + mouseX + "Y" + mouseY);
    //newBlockElm.classList.add("fieldBlock");
    if (blockToPlaceColor !== "") {
        //newBlockElm.classList.add(blockToPlaceColor);

        drawFigure(Number(clickedFigureType), mouseX, mouseY, "", "add");
    }
}

function drawFigure(figureType, drawX, drawY, addition, removeOrAdd) {
    switch (figureType) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return dreiUeberEcke(drawX, drawY, addition, removeOrAdd);
        /*case 2:
            vierUeberEcke(drawX, drawY, addition, removeOrAdd);
            break;
        case 3:
            vierUeberEckeInvertiert(drawX, drawY, addition, removeOrAdd);
            break;
        case 4:
            kleinesT(drawX, drawY, addition, removeOrAdd);
            break;
        case 5:
            grosserBalken(drawX, drawY, addition, removeOrAdd);
            break;*/
    }
}

function dreiUeberEcke(drawX, drawY, addition, removeOrAdd) {
    let removeOrAddInverted;

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAdd) === false) {
            if (drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAdd) === false) {
                return false;
            } else {
                drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAddInverted);
                drawAtPosition(drawX, drawY, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(drawX, drawY, addition, removeOrAddInverted);
        }
    }

    return true;
}

function vierUeberEcke(drawX, drawY, addition, removeOrAdd) {
    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAdd) === false) {
            if (drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAdd) === false) {
                if (drawAtPosition(Number(drawX) + 2, drawY, addition, removeOrAdd) === false) {
                    return false;
                }
            }
        }
    }

    return true;
}

function vierUeberEckeInvertiert(drawX, drawY, addition, removeOrAdd) {
    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAdd) === false) {
            if (drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAdd) === false) {
                if (drawAtPosition(drawX, Number(drawY) + 2, addition, removeOrAdd) === false) {
                    return false;
                }
            }
        }
    }

    return true;
}

function kleinesT(drawX, drawY, addition, removeOrAdd) {
    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(Number(drawX) + 1, Number(drawY) + 1, addition, removeOrAdd) === false) {
            if (drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAdd) === false) {
                if (drawAtPosition(drawX, Number(drawY) + 2, addition, removeOrAdd) === false) {
                    return false;
                }
            }
        }
    }

    return true;
}

function grosserBalken(drawX, drawY, addition, removeOrAdd) {
    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAdd) === false) {
            if (drawAtPosition(Number(drawX) + 2, drawY, addition, removeOrAdd) === false) {
                if (drawAtPosition(Number(drawX) + 3, drawY, addition, removeOrAdd) === false) {
                    if (drawAtPosition(Number(drawX) + 4, drawY, addition, removeOrAdd) === false) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function drawAtPosition(drawX, drawY, addition, removeOrAdd) {
    let elementToDraw = document.getElementById(addition + "X" + drawX + "Y" + drawY);
    if (removeOrAdd === "add") {
        if (blockToPlaceColor !== "" && elementToDraw.classList.contains("setted") === false) {
            elementToDraw.classList.add(blockToPlaceColor);
            return false;
        }
    } else if (removeOrAdd === "remove") {
        if (blockToPlaceColor !== "" && elementToDraw.classList.contains("setted") === false) {
            elementToDraw.classList.remove(blockToPlaceColor);
            return false;
        }
    } else if (removeOrAdd === "addSetted") {
        if (blockToPlaceColor !== "" && elementToDraw.classList.contains("setted") === false) {
            elementToDraw.classList.add(blockToPlaceColor);
            elementToDraw.classList.add("setted");
            return false;
        }
    } else if (removeOrAdd === "removeSetted") {
        if (blockToPlaceColor !== "" && elementToDraw.classList.contains("setted") === true) {
            elementToDraw.classList.remove(blockToPlaceColor);
            elementToDraw.classList.remove("setted");
            return false;
        }
    }

    return true;
}
