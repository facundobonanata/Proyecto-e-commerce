const PRODUCTS_ASC = "De menor a mayor";
const PRODUCTS_DES = "De mayor a menor";
const PRODUCTS_RELEVANCE = "Relevancia"
let currentProductsArray = [] 
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === PRODUCTS_ASC)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return 1; }
            if ( a.cost < b.cost){ return -1; }
            return 0;
        });
    }else if (criteria === PRODUCTS_DES){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return -1; }
            if ( a.cost < b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === PRODUCTS_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


const showProductsList = () => {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.soldCount) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.soldCount) <= maxCost))){

            htmlContentToAppend += `
		<a href= "product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col-3">
            <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
            </div>
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ products.name + `</h4>
                <small class="text-muted">` + products.soldCount + ` artículos vendidos.</small>
            </div>
		<div>
            <p>`+ products.description + `</p>
             <p> Precio `+ products.currency + "   " + products.cost + `</p>
                     </div>
                </div>
            </div>
        </div>
            `
        }
        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}

const sortAndShowProducts = (sortCriteria, productsArray) =>{
    //funcion para ordenar y mostrar products
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){//compara si productsArray es diferente a undefined
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //mustra los products ordenados
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then((resObj) => {
        if (resObj.status === 'ok') {
            sortAndShowProducts(PRODUCTS_ASC, resObj.data)
        }
    });

    //funcion que al click ordena de forma ascendnete
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(PRODUCTS_ASC);
    });

    // funcion que al click ordena de forma descendente
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(PRODUCTS_DES);
    });

    // funcion que al click ordena por relevancia
    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(PRODUCTS_RELEVANCE);
    });

    // funcion que al click resetea el filtro de cantidad
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });
    
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el minimo y maximo de los intervalos para filtrar por precio de productos
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        //Verifica si minCost y maxCost son undefined o vacios y los parsea devolviendo un entero
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
    
 });