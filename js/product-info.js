

//Carrusel para mostrar las imágenes
function showImagesGallery(array){

  for(let i = 0; i < array.length; i++){
          let htmlContentToAppend= "";
  
          htmlContentToAppend += `
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="` + array[0] + `" class="img-thumbnail" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + array[1] + `" class="img-thumbnail" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + array[2] + `" class="img-thumbnail" alt="...">
      </div>
      <div class="carousel-item">
        <img src="` + array[3] + `" class="img-thumbnail" alt="...">
      </div>
      <div class="carousel-item">
      <img src="` + array[4] + `" class="img-thumbnail" alt="...">
    </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
          `
  
          document.getElementById("productsImagesGallery").innerHTML = htmlContentToAppend;
      }
    };



//Función para mostrar los productos relacionados

function showRelatedProducts() {

	let htmlContentToAppend = "";

	for(let i = 0; i < relatedProducts.length; i++) {

		let relatedProductsIndex = relatedProducts[i];

		htmlContentToAppend += `
			<div class="card mr-3" style="width: 13rem;">
  					<img src="${relatedProductsIndex.imgSrc}" class="card-img-top">
  				<div class="card-body">
    				<h5 class="card-title">${relatedProductsIndex.name}</h5>
    				<p class="card-text">${relatedProductsIndex.description}</p>
  				</div>
			</div>
		`;
	};

	document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}


//Función para mostrar los comentarios
function showCommentsList(){

  let htmlContentToAppend = "";

  for(let i = 0; i < commentArray.length; i++){
   let comment = commentArray[i];

   var stars = `<span class="fa fa-star checked"></span>`
       {
         htmlContentToAppend += `          
              <div class="d-flex">                 
              <div class="starsRating">` + stars.repeat(comment.score) + `</p>
              </div>
                </div>
                                          
              <span class=""><strong>`+ comment.user +`</strong></span>
              <p class="mb-1"><em>` + comment.description + ` </em></p>
                </div>
                    </div>
                         </div>
              <p class="mb-1">` + comment.dateTime + `</p>
              </div>
                   </div>
                        <hr>
                 `;
      }

      document.getElementById("comments").innerHTML = htmlContentToAppend;
  }};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then((resObj) => {
      if (resObj.status === 'ok') {
         product = resObj.data;
  
        let productName = document.getElementById('productName');
        let productDescription = document.getElementById('productDescription');
        let productCost = document.getElementById('productCost');
        let productCurrency = document.getElementById('productCurrency');
        let productSoldCount = document.getElementById('productSoldCount');
        let productCategory = document.getElementById('productCategory');
  
        productName.innerHTML = product.name;
        productDescription.innerHTML = product.description;
        productCost.innerHTML = product.cost;
        productCurrency.innerHTML = product.currency;
        productSoldCount.innerHTML = product.soldCount;
        productCategory.innerHTML = product.category;
  

        //Muestro las imagenes en forma de galería
        showImagesGallery(product.images);
      }


// Muestro los Comentarios
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if (resultObj.status === "ok")
     commentArray = resultObj.data;
  {                  
      showCommentsList();
  }
});      
});

    // Muestro los Productos Relacionados
		getJSONData(PRODUCTS_URL).then(function (resultObj) {
			if (resultObj.status === "ok") {
				relatedProducts = resultObj.data;
			}
			showRelatedProducts(product.relatedProducts);
		});
	});
  	
  


