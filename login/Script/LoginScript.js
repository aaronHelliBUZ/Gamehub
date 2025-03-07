let content = document.getElementById("content")

{
    if (content.style.height == 0){
        content.style.height = `${window.innerHeight}px`;
        content.style.width = `${window.innerWidth}px`;
    }
}

function deleteFunction(){

        const errorMessages = document.querySelectorAll('.errormsg');
        

        errorMessages.forEach(function(errorMessage) {
           errorMessage.remove();
        });
}