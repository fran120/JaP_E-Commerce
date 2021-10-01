
function mostrarImagenesProducto(array){
    let imagenesTotales = "";
    
    for(imagen of array){
        imagenesTotales += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${imagen}" alt="">
            </div>
        </div>
        `;
    }

    document.getElementById("productImagesGallery").innerHTML = imagenesTotales;
}

function starRating(numero){
    let texto = "";
    let clase = "";
    // uso el switch para definir la clase de mis estrellitas
        //en otras palabras, eligo su color con esto
    switch(numero){
        case 1:
            clase = `<label class="fas fa-star estrellita1" for=""></label>`;
            break;
        case 2:
        case 3:
        case 4:
            clase = `<label class="fas fa-star estrellita234" for=""></label>`;
            break;
        case 5:
            clase = `<label class="fas fa-star estrellita5" for=""></label>`;
            break;
    }
    // estilos de font awesome
        // fas es para con relleno, far es para sin relleno
    for (let i = 1; i <= 5; i++) {
        if(i <= numero){
            //doy la estrellita colorida con la clase clase
            texto += clase;
        } else {
            //doy la estrellita con la clase de indefinida
            texto += `<label class="far fa-star" for=""></label>`;
        }
    }
    return texto;
}

function mostrarProductosRelacionados(array){
    getJSONData(PRODUCTS_URL).then(datos => {
        if(datos.status === "ok"){
            let arrayProductos = datos.data;
            let prodsRel = ``;
            array.forEach(productoRel => {
                prodsRel += 
                `
            <div class="col-md-4">
              <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="${arrayProductos[productoRel].imgSrc}">
                <h3 class="m-3">${arrayProductos[productoRel].name} ${arrayProductos[productoRel].currency} ${arrayProductos[productoRel].cost}</h3>
                <div class="card-body">
                  <p class="card-text">${arrayProductos[productoRel].description}</p>
                </div>
              </a>
            </div>
                `;
            });
            document.getElementById("prodRelacionados").innerHTML = prodsRel;
        }
    });
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //cargo la informacion del producto
    getJSONData(PRODUCT_INFO_URL).then(datos => {
        if(datos.status === "ok"){

            let producto = datos.data;
            
            document.getElementById("productName").innerHTML = producto.name;
            document.getElementById("productDescription").innerHTML = producto.description;
            document.getElementById("productSold").innerHTML = producto.soldCount;
            document.getElementById("productCategory").innerHTML = producto.category;
            document.getElementById("productCost").innerHTML = `${producto.currency} ${producto.cost}`

            mostrarImagenesProducto(producto.images);
            mostrarProductosRelacionados(producto.relatedProducts);
        }
    })
    //cargo los comentarios del producto
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(datos => {
        if(datos.status === "ok"){
            let arrayComentarios = datos.data;
            let comentarios = "";
            for( comentario of arrayComentarios){
                comentarios += `
                <div class="row list-group-item list-group-item-action">
                      <div class="d-flex w-100 justify-content-between">
                         <h4 class="mb-1"> 
                            <img src="img/userCircle.png" referrerpolicy="no-referrer" alt="" height=30px ></img> 
                            ${comentario.user} 
                         </h4>
                        <small class="text-muted"> ${comentario.dateTime} </small>
                    </div>
                    <div class="stars"> ${starRating(comentario.score)} </div>
                     <p class="mb-1"> ${comentario.description} </p>
                </div>
                `;
            }
            document.getElementById("comentarios").innerHTML= comentarios;
        }
    })
});

function comentar(){
    if(document.getElementById("cuerpo").value.trim() == "" ||
        !(document.getElementById(`star-1`).checked == true ||
            document.getElementById(`star-2`).checked == true ||
            document.getElementById(`star-3`).checked == true ||
            document.getElementById(`star-4`).checked == true ||
            document.getElementById(`star-5`).checked == true) ){
        document.getElementById("alerta").innerHTML = "Los datos ingresados no son correctos";
        document.getElementById("alerta").style.color = "red";
    }else{
        document.getElementById("alerta").innerHTML = "";
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let comment = document.getElementById("cuerpo").value;
        let score = 1;
        let i = 5;
        while(i > 1 && score == 1) {
            if(document.getElementById(`star-${i}`).checked == true){
                score = i;
            }
            i--;
        }
        document.getElementById("comentarios").innerHTML+= `
        <div class="row list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> 
                    <img src="${usuario.imgPerfil}" referrerpolicy="no-referrer" alt="" height=30px ></img> 
                    ${usuario.nombre} 
                </h4>
                <small class="text-muted"> Recién </small>
            </div>
            <div class="stars"> ${starRating(score)} </div>
            <p class="mb-1"> ${comment} </p>
        </div>
        `;
    }
}