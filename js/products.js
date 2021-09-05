
//guardo en productos el fetch de productos y sus futuras modificaciones
let productos = [];
//usare fmin y fmax para guardar los datos para realizar el filtrado del array
let fmin = undefined;
let fmax = undefined;
//usare aEncontrar para guardar el texto que buscara el buscador
let aEncontrar = "";

function mostrarProductos(){
    //primero filtro a los productos si es que hay o no una busqueda
    let productosBuscados = productos.filter(producto => {
        return ((producto.name.toLowerCase().indexOf(aEncontrar)>-1) || (producto.description.toLowerCase().indexOf(aEncontrar)>-1));
    });

    let htmlContentToAppend = '';

        for(producto of productosBuscados){
            
            // este if esta para poder filtrar los elementos a mostrar en pantalla
            if ( ((fmin == undefined) || parseInt(producto.cost) >= fmin) &&
            ((fmax == undefined) || parseInt(producto.cost) <= fmax) ){

                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                  <div class="row">
                      <div class="col-3">
                         <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                     </div>
                      <div class="col">
                         <div class="d-flex w-100 justify-content-between">
                               <h4 class="mb-1">`+ producto.name +`</h4>
                            </div>
                            <p class="mb-1">` + producto.description + `</p>
                         <p class="mb-1"> Obtengalo por tan solo ${producto.cost} ${producto.currency} </p>
                      </div>
                 </div>
              </a>
             ` 
            }
        }
        document.getElementById("vanProductos").innerHTML = htmlContentToAppend;
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(respuesta => respuesta.json())
        .then(arrayDeProductos => {
            productos = arrayDeProductos;
            mostrarProductos();
    });

    document.getElementById(`sortAscProd`).addEventListener(`click`, ()=>{
        productos.sort((a,b) => {return b.cost-a.cost})
        mostrarProductos();
    });
    document.getElementById(`sortDesProd`).addEventListener(`click`, ()=>{
        productos.sort((a,b) => {return a.cost-b.cost})
        mostrarProductos();
    });

    document.getElementById(`filtrar`).addEventListener(`click`, ()=>{
        fmin = document.getElementById(`precioMin`).value;
        fmax = document.getElementById(`precioMax`).value;
        
        if ((fmin != undefined) && (parseInt(fmin)) >= 0){
            fmin = parseInt(fmin);
        } else{ fmin = undefined; }

        if ((fmax != undefined) && (parseInt(fmax)) >= 0){
            fmax = parseInt(fmax);
        } else{ fmax = undefined; }
        
        mostrarProductos();
    });
    document.getElementById(`limpiarFiltro`).addEventListener(`click`, ()=>{
        fmin = undefined;
        fmax = undefined;
        document.getElementById(`precioMin`).value = undefined;
        document.getElementById(`precioMax`).value = undefined;
        mostrarProductos();
    });

    document.getElementById(`buscador`).addEventListener(`keyup`, ()=>{
        aEncontrar = document.getElementById(`buscador`).value.toLowerCase();
        mostrarProductos();
    });

});