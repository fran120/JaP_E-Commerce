
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
                // https://getbootstrap.com/docs/4.3/examples/album/#
                 // lindo ejempo de como usar este estilo con responsive
                htmlContentToAppend += `
                    <div class="col-md-4">
                        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top"  src="${producto.imgSrc}">
                            <h3 class="m-3">${producto.name}</h3>
                            <div class="card-body">
                              <p class="card-text">${producto.description}</p>
                               Obtengalo por tan solo ${producto.cost} ${producto.currency}
                            </div>
                        </a>
                    </div>
                `;
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