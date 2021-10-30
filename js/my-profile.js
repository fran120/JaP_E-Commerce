function mostrarUsuario(){
    //obtengo los datos de el usuario conectado
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    //cargo los valores predeterminados
    document.getElementById("nombreCompleto").innerHTML = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("edad").value  = usuario.edad;
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("imagenPerfil").src = usuario.imgPerfil;
}

function editar(){
    document.getElementById("nombre").disabled = false;
    document.getElementById("apellidos").disabled = false;
    document.getElementById("edad").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("telefono").disabled = false;

    document.getElementById("divEditar").classList.add("invisible");
    document.getElementById("divGuardar").classList.remove("invisible");
    document.getElementById("divCancelar").classList.remove("invisible");
}

function guardar(){
    let nombre = document.getElementById("nombre");
    let apellidos = document.getElementById("apellidos");
    let edad = document.getElementById("edad");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");

    usuario = {};

    usuario.nombre = nombre.value;
    usuario.apellidos = apellidos.value;
    usuario.edad = edad.value;
    usuario.email = email.value;
    usuario.telefono = telefono.value;
    usuario.imgPerfil = document.getElementById("imagenPerfil").src;

    localStorage.setItem("usuario", JSON.stringify(usuario));
    document.getElementById("nombreCompleto").innerHTML = `${usuario.nombre} ${usuario.apellidos}`;
    document.getElementById("dropdownMenuButton").innerHTML = usuario.nombre;

    nombre.disabled = true;
    apellidos.disabled = true;
    edad.disabled = true;
    email.disabled = true;
    telefono.disabled = true;

    document.getElementById("divEditar").classList.remove("invisible");
    document.getElementById("divGuardar").classList.add("invisible");
    document.getElementById("divCancelar").classList.add("invisible");
}

function cancelar(){
    document.getElementById("nombre").disabled = true;
    document.getElementById("apellidos").disabled = true;
    document.getElementById("edad").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("telefono").disabled = true;

    document.getElementById("divEditar").classList.remove("invisible");
    document.getElementById("divGuardar").classList.add("invisible");
    document.getElementById("divCancelar").classList.add("invisible");
}

function editarImg(){
    document.getElementById("editarImg").classList.add("invisible");
    document.getElementById("guardaImg").classList.remove("invisible");
}

function guardarImagen(){
    //donde tengo que actualizar la imágen
    let menuImg = document.getElementById("imgPerfil");
    let mainImg = document.getElementById("imagenPerfil");
    let file = document.querySelector("input[type=file]").files[0];

    let reader = new FileReader(); //nueva instancia del objeto
    reader.onloadend = ()=>{
        menuImg.src = reader.result;
        mainImg.src = reader.result;

        let usuario = JSON.parse(localStorage.getItem("usuario"));
        usuario.imgPerfil = reader.result;
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    if (file) {
        reader.readAsDataURL(file);
    }

    document.getElementById("editarImg").classList.remove("invisible");
    document.getElementById("guardaImg").classList.add("invisible");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarUsuario();
});