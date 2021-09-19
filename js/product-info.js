let product = {};
let comment = {};

const showImagesGallery = (array) => {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend += `
    <div class="col-lg-3 col-md-4 col-6">
      <div class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
      </div>
    </div>
    `
  }
  document.getElementById('productsImagesGallery').innerHTML = htmlContentToAppend;
}

function showCommentsList(){

  let htmlContentToAppend = "";
  for(let i = 0; i < commentArray.length; i++){
      let comment = commentArray[i];
   var stars = `<span class="fa fa-star checked"></span>`
       {
           htmlContentToAppend += `
           
           <div class="">
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
  
        let productNameHTML = document.getElementById('productName');
        let productDescriptionHTML = document.getElementById('productDescription');
        let productCostHTML = document.getElementById('productCost');
        let productCurrencyHTML = document.getElementById('productCurrency');
        let productSoldCountHTML = document.getElementById('productSoldCount');
        let productCategoryHTML = document.getElementById('productCategory');
  
        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCostHTML.innerHTML = product.cost;
        productCurrencyHTML.innerHTML = product.currency;
        productSoldCountHTML.innerHTML = product.soldCount;
        productCategoryHTML.innerHTML = product.category;
  
        showImagesGallery(product.images);
      }
    }); 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          commentArray = resultObj.data;            

          showCommentsList();
      }
  });      
});


