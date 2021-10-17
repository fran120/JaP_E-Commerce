// Si algun dia quiero ser capaz de borrar un elemento de la lista del carrito combiene rearmar 
    // la funcion calcularPrecos y cambiar numProd (seguramente borrarlo) y como los muestro

//numProd es  arrayProductos.length de los productos del carrito, aparece en el getJSONData y en calcularPrecios
let numProd = 0; 

function calcularPrecios(){
    // document.getElementsByTagName(""); esto capaz q es util si tengo q volver a hacer la funcion 
    let total = 0;
    let multi = 0;
    for (let index = 0; index < numProd; index++) {
        if(document.getElementById("count"+index).value < 1){
            document.getElementById("count"+index).value = 1;
        };
        multi = document.getElementById("unitCost"+index).innerHTML * document.getElementById("count"+index).value;
        total += multi;
        document.getElementById("subtotal"+index).innerHTML = multi.toFixed(2); //2 cifras significativas
    };
    document.getElementById("subTotal").innerHTML = total.toFixed(2);
    // Calculo el precio total
    document.getElementById("precioTotal").innerHTML = total.toFixed(2);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_CHALLENGE).then(datos => {
        if(datos.status === "ok"){
            let arrayProductos = datos.data.articles;
            let productos = "";
            numProd = arrayProductos.length;
            for (let index = 0; index < arrayProductos.length; index++) {
                const producto = arrayProductos[index];
                if(producto.currency == "UYU"){
                    producto.currency = "USD";
                    producto.unitCost = producto.unitCost / 40;
                }
                productos += 
                `
                <div class="product-box d-md-flex align-items-center justify-content-between mb-30">
                      <!-- Product left-->  
                      <div class="my-4 d-md-flex align-items-center flex-wrap">
                          <div class="mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                          <img src="${producto.src}" alt="" class="img-thumbnail imgCarrito">
                          </div>
                          <div class="product-content">
                              <h5 class="text-center text-md-left">${producto.name}</h5>
                              <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                  <li class="mr-md-4">
                                       <span  id="unitCost${index}">${producto.unitCost}</span> USD por unidad
                                  </li>
                                  <li class="mr-md-4">
                                       <input type="number" min="1" id="count${index}" value="${producto.count}" onchange="calcularPrecios();"> Unidades
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <!-- Product right-->  
                      <div class="my-4 flex-shrink-0">
                          Subtotal:
                          <span id="subtotal${index}">${producto.count * producto.unitCost}</span> USD
                      </div>
                </div>
                `;
            };
            document.getElementById("productosCarrito").innerHTML = productos;
            calcularPrecios();
        }
    })
});