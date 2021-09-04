//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    // lo que hago es asegurarme de que si ya se inicio sesion no vuelva a la pagina de login
    if(localStorage.getItem(`usuario`) != null){
        location.href = `index.html`;
    };
    
    document.addEventListener(`keypress`, e => {
        if (e.key == 'Enter'){
         verificar();
        };
    })
});

function verificar(){
    let user = document.getElementById(`usuario`);
    let pss = document.getElementById(`contra`);
    let msj = document.getElementById(`mensaje`);
    let seConecto = {};
    if(user.value.trim() === "" || pss.value.trim() === ""){
        msj.innerHTML = "Los datos ingresados no son correctos";
        msj.style.color = "red";
    } else {
        location.href = `index.html`;
        seConecto.nombre = user.value;
        seConecto.imgPerfil = `img/userCircle.png`;
        localStorage.setItem(`usuario`, JSON.stringify(seConecto));
    }
};

