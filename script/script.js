//Häufig benutzte Elemente
const content = document.getElementById("content");

//Zentriert das Speilfeld
{
    content.style.height = `${((window.innerHeight)/20)*19}px`
    content.style.width = `${((window.innerWidth)/20)*19}px`

    content.style.marginLeft = `${(window.innerWidth - content.offsetWidth)/2}px`;
    content.style.marginTop = `${(window.innerHeight - content.offsetHeight)/2}px`;
}