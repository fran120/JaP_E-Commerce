// Si algun dia quiero ser capaz de borrar un elemento de la lista del carrito combiene rearmar 
    // la funcion calcularPrecos y cambiar como los muestro

let productos = [];

function calcularPrecios(){
    // document.getElementsByTagName(""); esto capaz q es util si tengo q volver a hacer la funcion 
    let total = 0;
    for (let index = 0; index < productos.length; index++) {
        if(document.getElementById("count"+index).value < 1){
            document.getElementById("count"+index).value = 1;
        };
        multi = document.getElementById("unitCost"+index).innerHTML * document.getElementById("count"+index).value;
        document.getElementById("subtotal"+index).innerHTML = multi.toFixed(2); //2 cifras significativas
        total += multi;
    };
    document.getElementById("subTotal").innerHTML = total.toFixed(2);
    // Calculo el precio total
    let arrayTipoEnvio = document.getElementsByName("tipoEnvio");
    if(arrayTipoEnvio[0].checked){
        document.getElementById("soloEnvio").innerHTML = (total*0.15).toFixed(2);
        document.getElementById("precioTotal").innerHTML = (total*1.15).toFixed(2);
    } else if(arrayTipoEnvio[1].checked){
        document.getElementById("soloEnvio").innerHTML = (total*0.07).toFixed(2);
        document.getElementById("precioTotal").innerHTML = (total*1.07).toFixed(2);
    } else if(arrayTipoEnvio[2].checked){
        document.getElementById("soloEnvio").innerHTML = (total*0.05).toFixed(2);
        document.getElementById("precioTotal").innerHTML = (total*1.05).toFixed(2);
    }
    
}

function mostrarProductos(){
    let productosInnerHTML = "";
    for (let index = 0; index < productos.length; index++) {
        const producto = productos[index];
        if(producto.currency == "UYU"){
            producto.currency = "USD";
            producto.unitCost = producto.unitCost / 40;
        }
        productosInnerHTML += 
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
    document.getElementById("productosCarrito").innerHTML = productosInnerHTML;
    calcularPrecios();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_CHALLENGE).then(datos => {
        if(datos.status === "ok"){
            productos = datos.data.articles;
            mostrarProductos();
        }
    });

    //es crédito o transferrencia? que muestro?
    document.getElementById("metodoDePago").addEventListener("change", ()=>{
        let valor = document.getElementById("metodoDePago").value;
        if(valor == 0){
            document.getElementById("credito").classList.add("invisible");
            document.getElementById("transferencia").classList.add("invisible");
        } else if(valor == 1){
            document.getElementById("credito").classList.remove("invisible");
            document.getElementById("transferencia").classList.add("invisible");
        } else if(valor == 2){
            document.getElementById("credito").classList.add("invisible");
            document.getElementById("transferencia").classList.remove("invisible");
        }
    });

    //radio del envio
    let arrayTipoEnvio = document.getElementsByName("tipoEnvio");
    for(tipoEnvio of arrayTipoEnvio){
        tipoEnvio.addEventListener("change", ()=> calcularPrecios());
    }
    
});