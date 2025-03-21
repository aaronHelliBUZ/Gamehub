let root = document.querySelector(':root');
let content = document.getElementById("content");

root.style.setProperty('--size', (content.offsetHeight)+'px');

console.log(content.offsetHeight)

//Häufig benutzte Elemente
const gameField = document.getElementById("gameField");
const blockChoiceElm = document.getElementById("blockChoice");
const pointCounterElm = document.getElementById("pointCounter");

const fieldsPerX = 10;
const fieldsPerY = 10;

const countFigures = 7;

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
let direction = -3;

let pointCounter = 0;

generateField();

generateBlockInblockChoiceElm();

document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    mouseDown = false;
    oldMouseX = -3;
    oldMouseY = -3;

    drawFigure(Number(clickedFigureType), mouseX, mouseY, "", "addSetted", Number(direction));

    clickedFigureType = -3;
    direction = -3;
    blockToPlaceColor = "";

    blockChoiceElm.removeChild(clickedBlockElm);
    blocksLeft--;
    if (blocksLeft <= 0) {
        generateBlockInblockChoiceElm();
    }

    checkForARow();
    checkForAColumn();
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
    direction = clickedBlockElm.getAttribute("direction");
    console.log("MOUSECLICKED: Direction: " + direction);
}

function generateBlockInblockChoiceElm() {
    blocksLeft = 3;
    for (let i = 0; i < 3; i++) {
        let colorNumber = Math.floor(Math.random() * 4);
        let figureType = Math.floor(Math.random() * countFigures) + 1;
        let direction = Math.floor(Math.random() * 4) + 1;

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
        newBlock.setAttribute("direction", direction);

        blockToPlaceColor = "noBColor";

        drawFigure(figureType, 0, 0, newBlock.id, "remove", direction);
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
    if (mouseDown === true/* && mouseOverElm.classList.contains("setted") === false*/) {
        oldMouseX = mouseX;
        oldMouseY = mouseY;

        mouseX = mouseOverElm.id.split("Y")[0].split("X")[1];
        mouseY = mouseOverElm.id.split("Y")[1];
        setFieldToBlockWhileMouseOver();
    }
}

function setFieldToBlockWhileMouseOver() {
    if (blockToPlaceColor !== "") {
        drawFigure(Number(clickedFigureType), oldMouseX, oldMouseY, "", "remove", Number(direction));
        console.log("OldX: " + oldMouseX + " OldY: " + oldMouseY);
    }

    if (blockToPlaceColor !== "") {
        drawFigure(Number(clickedFigureType), mouseX, mouseY, "", "add", Number(direction));
    }
}

function drawFigure(figureType, drawX, drawY, addition, removeOrAdd, direction) {
    switch (figureType) {
        case 1:
            dreiUeberEcke(drawX, drawY, addition, removeOrAdd, Number(direction));
            break;
        case 2:
            vierUeberEcke(drawX, drawY, addition, removeOrAdd, direction);
            break;
        case 3:
            vierUeberEckeInvertiert(drawX, drawY, addition, removeOrAdd, direction);
            break;
        case 4:
            kleinesT(drawX, drawY, addition, removeOrAdd, direction);
            break;
        case 5:
            grosserBalken(drawX, drawY, addition, removeOrAdd, direction);
            break;
        case 6:
            zweiMalEins(drawX, drawY, addition, removeOrAdd, direction);
            break;
        case 7:
            zweiMalZwei(drawX, drawY, addition, removeOrAdd, direction);
            break;
    }
}

function dreiUeberEcke(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);
    let calcedDrawXBlock3 = Number(drawX);
    let calcedDrawYBlock3 = Number(drawY);

    switch (direction) {
        case 1:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            break;
        case 2:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 1;
            break;
        case 3:
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            break;
        case 4:
            calcedDrawXBlock1 = Number(drawX) + 1;
            calcedDrawYBlock1 = Number(drawY) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            if (drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAdd) === false) {
                return false;
            } else {
                drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function vierUeberEcke(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);
    let calcedDrawXBlock3 = Number(drawX);
    let calcedDrawYBlock3 = Number(drawY);
    let calcedDrawXBlock4 = Number(drawX);
    let calcedDrawYBlock4 = Number(drawY);

    switch (direction) {
        case 1:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawXBlock4 = Number(drawX) + 2;
            break;
        case 2:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawYBlock4 = Number(drawY) + 2;
            break;
        case 3:
            calcedDrawYBlock1 = Number(drawY) + 1;
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 2;
            calcedDrawYBlock3 = Number(drawY) + 1;
            calcedDrawXBlock4 = Number(drawX) + 2;
            break;
        case 4:
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 1;
            calcedDrawXBlock4 = Number(drawX) + 1;
            calcedDrawYBlock4 = Number(drawY) + 2;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            if (drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAdd) === false) {
                if (drawAtPosition(calcedDrawXBlock4, calcedDrawYBlock4, addition, removeOrAdd) === false) {
                    return false;
                } else {
                    drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
                }
            } else {
                drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function vierUeberEckeInvertiert(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);
    let calcedDrawXBlock3 = Number(drawX);
    let calcedDrawYBlock3 = Number(drawY);
    let calcedDrawXBlock4 = Number(drawX);
    let calcedDrawYBlock4 = Number(drawY);

    switch (direction) {
        case 1:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawXBlock4 = Number(drawX) + 1;
            break;
        case 2:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 1;
            calcedDrawXBlock4 = Number(drawX) + 2;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
        case 3:
            calcedDrawXBlock1 = Number(drawX) + 1;
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawYBlock4 = Number(drawY) + 2;
            break;
        case 4:
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawXBlock3 = Number(drawX) + 2;
            calcedDrawXBlock4 = Number(drawX) + 2;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            if (drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAdd) === false) {
                if (drawAtPosition(calcedDrawXBlock4, calcedDrawYBlock4, addition, removeOrAdd) === false) {
                    return false;
                } else {
                    drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
                }
            } else {
                drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function kleinesT(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);
    let calcedDrawXBlock3 = Number(drawX);
    let calcedDrawYBlock3 = Number(drawY);
    let calcedDrawXBlock4 = Number(drawX);
    let calcedDrawYBlock4 = Number(drawY);

    switch (direction) {
        case 1:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawXBlock4 = Number(drawX) + 1;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
        case 2:
            calcedDrawXBlock1 = Number(drawX) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 1;
            calcedDrawXBlock4 = Number(drawX) + 2;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
        case 3:
            calcedDrawXBlock1 = Number(drawX) + 1;
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawXBlock3 = Number(drawX) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
        case 4:
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawXBlock3 = Number(drawX) + 2;
            calcedDrawXBlock4 = Number(drawX) + 1;
            calcedDrawYBlock4 = Number(drawY) + 1;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            if (drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAdd) === false) {
                if (drawAtPosition(calcedDrawXBlock4, calcedDrawYBlock4, addition, removeOrAdd) === false) {
                    return false;
                } else {
                    drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
                }
            } else {
                drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function grosserBalken(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);
    let calcedDrawXBlock3 = Number(drawX);
    let calcedDrawYBlock3 = Number(drawY);
    let calcedDrawXBlock4 = Number(drawX);
    let calcedDrawYBlock4 = Number(drawY);
    let calcedDrawXBlock5 = Number(drawX);
    let calcedDrawYBlock5 = Number(drawY);

    switch (direction) {
        case 1:
        case 3:
            calcedDrawYBlock2 = Number(drawY) + 1;
            calcedDrawYBlock3 = Number(drawY) + 2;
            calcedDrawYBlock4 = Number(drawY) + 3;
            calcedDrawYBlock5 = Number(drawY) + 4;
            break;
        case 2:
        case 4:
            calcedDrawXBlock2 = Number(drawX) + 1;
            calcedDrawXBlock3 = Number(drawX) + 2;
            calcedDrawXBlock4 = Number(drawX) + 3;
            calcedDrawXBlock5 = Number(drawX) + 4;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            if (drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAdd) === false) {
                if (drawAtPosition(calcedDrawXBlock4, calcedDrawYBlock4, addition, removeOrAdd) === false) {
                    if (drawAtPosition(calcedDrawXBlock5, calcedDrawYBlock5, addition, removeOrAdd) === false) {
                        return false;
                    } else {
                        drawAtPosition(calcedDrawXBlock4, calcedDrawYBlock4, addition, removeOrAddInverted);
                        drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAddInverted);
                        drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                        drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
                    }
                } else {
                    drawAtPosition(calcedDrawXBlock3, calcedDrawYBlock3, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                    drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
                }
            } else {
                drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAddInverted);
                drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function zweiMalEins(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    let calcedDrawXBlock1 = Number(drawX);
    let calcedDrawYBlock1 = Number(drawY);
    let calcedDrawXBlock2 = Number(drawX);
    let calcedDrawYBlock2 = Number(drawY);

    switch (direction) {
        case 1:
        case 3:
            calcedDrawYBlock2 = Number(drawY) + 1;
            break;
        case 2:
        case 4:
            calcedDrawXBlock2 = Number(drawX) + 1;
            break;
    }

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAdd) === false) {
        if (drawAtPosition(calcedDrawXBlock2, calcedDrawYBlock2, addition, removeOrAdd) === false) {
            return false;
        } else {
            drawAtPosition(calcedDrawXBlock1, calcedDrawYBlock1, addition, removeOrAddInverted);
        }
    }

    return true;
}

function zweiMalZwei(drawX, drawY, addition, removeOrAdd, direction) {
    let removeOrAddInverted;

    if (removeOrAdd === "add") {
        removeOrAddInverted = "remove";
    } else if (removeOrAdd === "addSetted") {
        removeOrAddInverted = "removeSetted";
    }

    if (drawAtPosition(drawX, drawY, addition, removeOrAdd) === false) {
        if (drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAdd) === false) {
            if (drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAdd) === false) {
                if (drawAtPosition(Number(drawX) + 1, Number(drawY) + 1, addition, removeOrAdd) === false) {
                    return false;
                } else {
                    drawAtPosition(drawX, Number(drawY) + 1, addition, removeOrAddInverted);
                    drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAddInverted);
                    drawAtPosition(drawX, drawY, addition, removeOrAddInverted);
                }
            } else {
                drawAtPosition(Number(drawX) + 1, drawY, addition, removeOrAddInverted);
                drawAtPosition(drawX, drawY, addition, removeOrAddInverted);
            }
        } else {
            drawAtPosition(drawX, drawY, addition, removeOrAddInverted);
        }
    }

    return true;
}

function drawAtPosition(drawX, drawY, addition, removeOrAdd) {
    let elementToDraw = document.getElementById(addition + "X" + drawX + "Y" + drawY);

    if (elementToDraw !== null) {
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
    } else {
        console.log("TRUE");
    }

    return true;
}

async function checkForARow() {
    let continueRows;
    for (let x = 0; x < fieldsPerX; x++) {
        continueRows = true;
        for (let y = 0; y < fieldsPerY && continueRows === true; y++) {
            let elementToCheck = document.getElementById("X" + x + "Y" + y);
            if (elementToCheck.classList.contains("setted") === false) {
                continueRows = false;
            }
        }

        if (continueRows === true) {
            console.log("ROW FOUND");
            for (let y = 0; y < fieldsPerY; y++) {
                let elementToReset = document.getElementById("X" + x + "Y" + y);
                animation(elementToReset);
                resetElement(elementToReset);
                await sleep(200);
            }
            await sleep(500);
            deleteBreaks();
            pointCounter += fieldsPerY;
            updatePointCounterElm();
        }
    }
}

async function checkForAColumn() {
    let continueColumns;
    for (let y = 0; y < fieldsPerY; y++) {
        continueColumns = true;
        for (let x = 0; x < fieldsPerX && continueColumns === true; x++) {
            let elementToCheck = document.getElementById("X" + x + "Y" + y);
            if (elementToCheck.classList.contains("setted") === false) {
                continueColumns = false;
            }
        }

        if (continueColumns === true) {
            console.log("COLUMN FOUND");
            for (let x = 0; x < fieldsPerX; x++) {
                let elementToReset = document.getElementById("X" + x + "Y" + y);
                animation(elementToReset);
                resetElement(elementToReset);
                await sleep(200);  
            }
            await sleep(500);
            deleteBreaks();
            pointCounter += fieldsPerX;
            updatePointCounterElm();
        }
    }
}

async function animation(elementToReset) {
    for(let i = 1; i <= 4; i++){
        addBreak(i,elementToReset);
    }
    
}

function addBreak(numb, elementToReset){
    
    console.log(elementToReset.offsetLeft);
    console.log(elementToReset.offsetTop);

    console.log(elementToReset.offsetHeight+"hh");

    let sizef = (elementToReset.offsetHeight)/2;
    let breakElm = document.createElement("div");
    breakElm.classList.add("breaks");

    if(elementToReset.classList.contains("bColor1")){
        breakElm.classList.add("bColor1");
    }
    else if(elementToReset.classList.contains("bColor2")){
        breakElm.classList.add("bColor2");
    }
    else if(elementToReset.classList.contains("bColor3")){
        breakElm.classList.add("bColor3");
    }
    else if(elementToReset.classList.contains("bColor4")){
        breakElm.classList.add("bColor4");
    }
    if(numb == 1){
        breakElm.style.top = elementToReset.offsetTop+"px";
        breakElm.style.left = elementToReset.offsetLeft+"px";
        breakElm.classList.add("numb1");
    }
    else if (numb == 2){
        breakElm.style.top = ((elementToReset.offsetTop)+sizef)+"px";
        breakElm.style.left = elementToReset.offsetLeft+"px";
        breakElm.classList.add("numb2");
    }
    else if (numb == 3){
        breakElm.style.top = elementToReset.offsetTop+"px";
        breakElm.style.left = ((elementToReset.offsetLeft)+sizef)+"px";
        breakElm.classList.add("numb3");
    }
    else if (numb == 4){
        breakElm.style.top = ((elementToReset.offsetTop)+sizef)+"px";
        breakElm.style.left = ((elementToReset.offsetLeft)+sizef)+"px";
        breakElm.classList.add("numb4");
    }
    console.log(sizef+"h");

    content.appendChild(breakElm);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deleteBreaks(){
    let breaks = document.querySelectorAll('.breaks');
    breaks.forEach(element => {
        element.remove();
    });
}
  

function resetElement(elementToReset) {
        elementToReset.classList.remove("setted");
        elementToReset.classList.remove("bColor1");
        elementToReset.classList.remove("bColor2");
        elementToReset.classList.remove("bColor3");
        elementToReset.classList.remove("bColor4");
}

function updatePointCounterElm() {
    pointCounterElm.innerHTML = pointCounter;
}
