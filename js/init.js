const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL_CHALLENGE = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  // let usuario = JSON.parse( localStorage.getItem("usuario"));
  // es si quiero acceder a los campos del usuario
  
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  //.indexOf devuelve -1 si el string no esta incluido en el otro string
  // lo que hago es asegurarme que para acceder al contenido de las paginas sea necesario iniciar sesion
  if(location.href.indexOf(`login.html`) === -1 && usuario === null){
    location.href = `login.html`;
  }

  //nombre de usuario y foto de perfil => dropdown menu
  document.getElementById("perfilDropdown").innerHTML = 
  `
  <div id="imgPerfil">
  <img src="${usuario.imgPerfil}" referrerpolicy="no-referrer" alt="" height=30px ></img>
  </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ${usuario.nombre}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="cart.html">Mi carrito</a>
              <a class="dropdown-item" href="my-profile.html">Perfil</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" id="cerrarSesion">Cerrar Sesión</a>
            </div>
          </div>
  `;

  // boton para cerrar sesion
  document.getElementById("cerrarSesion").addEventListener("click", ()=>{
    cerrarSesion();
  });
});

// cerrar sesion local
function cerrarSesion(){
  signOut();
  localStorage.clear();
  location.href = `login.html`;
};
