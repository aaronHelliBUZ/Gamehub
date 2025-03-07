//Häufig benutzte Elemente
const content = document.getElementById("content");

//Zentriert das Speilfeld
{
    content.style.height = `${((window.innerHeight)/3)*2}px`
    content.style.width = `${((window.innerWidth)/4)}px`

    content.style.marginTop = `${(window.innerHeight - content.offsetHeight)/2}px`;
}