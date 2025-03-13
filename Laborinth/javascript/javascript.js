console.clear();

const playingFieldElement = document.getElementById("playingField");

const fieldsPerX = 15;
const fieldsPerY = 15;

let oldPlayerX = 0;
let oldPlayerY = 0;
let playerX = 0;
let playerY = 0;

generateLabyrinthFields();

let startElm = document.getElementById("X0Y0");

startElm.classList.add("start");

let endElm = document.getElementById("X" + ((fieldsPerX - 1) * 2) + "Y" + ((fieldsPerY - 1) * 2));

endElm.classList.add("end");

generateLabyrinth();

let player = document.getElementById("X" + playerX + "Y" + playerY);

player.classList.add("player");

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
        event.preventDefault();
        if (checkPlayerIsRightToMove(playerX - 1, playerY)) {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerX--;
            movePlayer(playerY, playerX);
        }
    }
    if (event.code === "ArrowDown" || event.code === "KeyS") {
        event.preventDefault();
        if (checkPlayerIsRightToMove(playerX + 1, playerY)) {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerX++;
            movePlayer(playerY, playerX);
        }
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
        event.preventDefault();
        if (checkPlayerIsRightToMove(playerX, playerY + 1)) {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY++;
            movePlayer(playerY, playerX);
        }
    }
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        event.preventDefault();
        if (checkPlayerIsRightToMove(playerX, playerY - 1)) {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY--;
            movePlayer(playerY, playerX);
        }
    }
});

function movePlayer(playerY, playerX) {
    let oldPlayer = document.getElementById("X" + oldPlayerX + "Y" + oldPlayerY);
    let player = document.getElementById("X" + playerX + "Y" + playerY);

    console.log(oldPlayer);
    console.log(player);

    oldPlayer.classList.remove("player");
    player.classList.add("player");

    if(player === endElm){
        window.alert("Du hast gewonnen!");
    }
}

function checkPlayerIsRightToMove(playerToCheckX, playerToCheckY) {
    let playerToCheck = document.getElementById("X" + playerToCheckX + "Y" + playerToCheckY);

    if(playerToCheck.classList.contains("visited")){
        return true;
    }
    return false;
}

function generateLabyrinthFields() {
    console.log("Generate Labyrinth Fields");

    for (let x = 0; x < fieldsPerX * 2 - 1; x++) {
        let newFlex = document.createElement("div");

        playingFieldElement.appendChild(newFlex);

        newFlex.id = "X" + x.toString();

        newFlex.className = "fieldFlex";

        for (let y = 0; y < fieldsPerY * 2 - 1; y++) {
            let newField = document.createElement("div");

            newFlex.appendChild(newField);

            newField.id = "X" + x.toString() + "Y" + y.toString();

            newField.className = "field";
        }
    }
}

function generateLabyrinth() {
    let genX = 0;
    let genY = 0;

    for (let i = 1; i <= fieldsPerX * fieldsPerY * 3; i++) {
        let genElement = document.getElementById("X" + genX + "Y" + genY);

        genElement.classList.add("visited");

        let neighborXYSingleArray = getRandomNeighborField(genX, genY);

        if (neighborXYSingleArray == undefined) {
            let genXYArray = getBack(genX, genY);
            if (genXYArray !== undefined) {
                genX = genXYArray[0];
                genY = genXYArray[1];
            }
        } else {
            let neighborWallElement = document.getElementById("X" + neighborXYSingleArray[2] + "Y" + neighborXYSingleArray[3]);

            let neighborElement = document.getElementById("X" + neighborXYSingleArray[0] + "Y" + neighborXYSingleArray[1]);

            neighborWallElement.classList.add("visited");

            neighborElement.classList.add("visited");

            genX = neighborXYSingleArray[0];
            genY = neighborXYSingleArray[1];
        }
    }
}

function getRandomNeighborField(fieldFromLookX, fieldFromLookY) {
    let neighborToLookX = fieldFromLookX + 2;
    let neighborToLookY = fieldFromLookY;

    let wallX = fieldFromLookX + 1;
    let wallY = fieldFromLookY;

    let neighborsToLookArray = [];
    let neighborsToLookHelpArray = [];
    let counterNeighborsToLookArrayPushed = 0;

    neighborsToLookHelpArray = neighborsToLookHelpArrayPush(neighborToLookX, neighborToLookY, wallX, wallY);

    if (neighborsToLookHelpArray != undefined) {
        neighborsToLookArray.push(neighborsToLookHelpArray);
        counterNeighborsToLookArrayPushed++;
    }

    neighborToLookX = fieldFromLookX;
    neighborToLookY = fieldFromLookY + 2;

    wallX = fieldFromLookX;
    wallY = fieldFromLookY + 1;

    neighborsToLookHelpArray = neighborsToLookHelpArrayPush(neighborToLookX, neighborToLookY, wallX, wallY);

    if (neighborsToLookHelpArray != undefined) {
        neighborsToLookArray.push(neighborsToLookHelpArray);
        counterNeighborsToLookArrayPushed++;
    }

    neighborToLookX = fieldFromLookX - 2;
    neighborToLookY = fieldFromLookY;

    wallX = fieldFromLookX - 1;
    wallY = fieldFromLookY;

    neighborsToLookHelpArray = neighborsToLookHelpArrayPush(neighborToLookX, neighborToLookY, wallX, wallY);

    if (neighborsToLookHelpArray != undefined) {
        neighborsToLookArray.push(neighborsToLookHelpArray);
        counterNeighborsToLookArrayPushed++;
    }

    neighborToLookX = fieldFromLookX;
    neighborToLookY = fieldFromLookY - 2;

    wallX = fieldFromLookX;
    wallY = fieldFromLookY - 1;

    neighborsToLookHelpArray = neighborsToLookHelpArrayPush(neighborToLookX, neighborToLookY, wallX, wallY);

    if (neighborsToLookHelpArray != undefined) {
        neighborsToLookArray.push(neighborsToLookHelpArray);
        counterNeighborsToLookArrayPushed++;
    }

    let randomIndexForNeighborsToLookArray = Math.floor(Math.random() * counterNeighborsToLookArrayPushed);

    return neighborsToLookArray[randomIndexForNeighborsToLookArray];
}

function neighborsToLookHelpArrayPush(neighborToLookX, neighborToLookY, wallX, wallY) {
    let neighborsToLookHelpArray = [];
    let neighborToLookElement;

    if (neighborToLookX >= 0 && neighborToLookY >= 0 && neighborToLookX < fieldsPerX * 2 && neighborToLookY < fieldsPerY * 2) {
        neighborToLookElement = document.getElementById("X" + neighborToLookX + "Y" + neighborToLookY);

        if (neighborToLookElement.classList.contains("visited") === false) {
            neighborsToLookHelpArray.push(neighborToLookX, neighborToLookY, wallX, wallY);

            return neighborsToLookHelpArray;
        }
    }
}

function getBack(fieldStuckX, fieldStuckY) {
    returnWallXYArray = getNoWall(fieldStuckX, fieldStuckY);

    if (returnWallXYArray !== undefined) {
        let wallToVisit = document.getElementById("X" + returnWallXYArray[2] + "Y" + returnWallXYArray[3]);

        wallToVisit.classList.add("finished");
    }

    return returnWallXYArray;
}

function getNoWall(fieldStuckX, fieldStuckY) {
    console.log("GET NO WALL");

    let checkIfWallX = fieldStuckX + 1;
    let checkIfWallY = fieldStuckY;

    if (isNoWall(checkIfWallX, checkIfWallY)) {
        return [checkIfWallX + 1, checkIfWallY, checkIfWallX, checkIfWallY];
    }

    checkIfWallX = fieldStuckX;
    checkIfWallY = fieldStuckY + 1;

    if (isNoWall(checkIfWallX, checkIfWallY)) {
        return [checkIfWallX, checkIfWallY + 1, checkIfWallX, checkIfWallY];
    }

    checkIfWallX = fieldStuckX - 1;
    checkIfWallY = fieldStuckY;

    if (isNoWall(checkIfWallX, checkIfWallY)) {
        return [checkIfWallX - 1, checkIfWallY, checkIfWallX, checkIfWallY];
    }

    checkIfWallX = fieldStuckX;
    checkIfWallY = fieldStuckY - 1;

    if (isNoWall(checkIfWallX, checkIfWallY)) {
        return [checkIfWallX, checkIfWallY - 1, checkIfWallX, checkIfWallY];
    }
}

function isNoWall(checkIfWallX, checkIfWallY) {
    let isNoWallElement = document.getElementById("X" + checkIfWallX + "Y" + checkIfWallY);

    if (isNoWallElement !== null && isNoWallElement.classList.contains("visited") === true && isNoWallElement.classList.contains("finished") !== true) {
        return true;
    } else {
        return false;
    }
}
