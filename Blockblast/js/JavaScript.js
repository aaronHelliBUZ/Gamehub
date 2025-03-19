//Häufig benutzte Elemente
const gameField = document.getElementById("gameField");
const content = document.getElementById("content")



//Zentriert das Speilfeld und stellt die grösse ein
{
    let size = ((window.innerHeight - content.offsetHeight)/6)*5;
    content.style.height = `${size}px`
    content.style.width = `${size*1.6}px`

    content.style.marginTop = `${(((size/5)*6)/12)}px`;
    content.style.marginLeft = `${(window.innerWidth - content.offsetWidth)/2}px`;
    console.log(`${(window.innerWidth - content.offsetHeight)}px`);
}

//Felder erstellen
{
    for (let x = 0; x < 8; x++){
        for (let y = 0; y < 8; y++) {
            let field = document.createElement("div");

            field.id = x+"-"+y;
            field.className = "";
            gameField.appendChild(field);
        }
    }
}