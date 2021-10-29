
let articlesArray = [];

let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

let currency = false;

function showArticles(array) {
	let htmlContentToAppend = "";
	let index = 0;

	for (let article of array) {

		htmlContentToAppend += `
		<ul class="list-group-item list-group-item-action">
			<div class="row d-flex justify-content-around">
				<div class="col-2 d-flex align-items-center justify-content-center">
					<img src="${article.src}" class="img-thumbnail">
				</div>
				<div class="col-2 d-flex align-items-center justify-content-start">
					<div class="d-flex align-items-center">
						<h6 class="text-muted">${article.name}</h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center">
					<div class="d-flex w-100 justify-content-end align-items-center">
						<h6 class="text-muted">${article.currency} <span id="newCostDOM-${index}" class="costDOM">${article.unitCost}</span></h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center justify-content-center">
					<div class="w-75 d-flex justify-content-center align-items-center">
              			<input type="number" class="form-control" id="articleCount-${index}" value="${article.count}" min="0" onchange="updateValues();">
					</div>
				</div>
				</div>
			</div>
		</ul>
		`;				

		index++; // Aumento el valor del Index
		
		document.getElementById("carritoContenido").innerHTML = htmlContentToAppend;

	};

	updateValues();
}

function updateValues() {
	let subTotalDOM = document.getElementById("subTotalDOM");
	let costDOM = document.querySelectorAll(".costDOM");
	let articleCountNum = 0;
	subTotalCost = 0;


	// Accedo a la cantidad de elementos en base a la Clase ".costDOM"
	for (let i = 0; i < costDOM.length; i++) {
		let cartCountDOM = document.getElementById("cartCountDOM");
		let countID = `articleCount-${i}`;
		let count = document.getElementById(countID).value;

        // Calculo Cantidad de Articulos
		articleCountNum += +count;
        // Muestro Cantidad de Articulos
	    cartCountDOM.innerHTML = articleCountNum;

		 
		if (i == 0) {
			if(currency){
			subTotalCost = ((costDOM[i].textContent * count) / 40);
			}else{
			subTotalCost = ((costDOM[i].textContent * count))
			}
			
			} else {
			if(currency){
			subTotalCost += costDOM[i].textContent * count;
			
			}else{
			subTotalCost += costDOM[i].textContent * count*40;
			
			}
			
			}
         
        
         
		
		// Muestro Subtotal
		subTotalDOM.innerHTML = DOLLAR_SYMBOL + subTotalCost.toLocaleString();
        subTotalDOM.innerHTML = MONEY_SYMBOL + subTotalCost.toLocaleString(); // .toLocaleString valida el numero y agrega el "." donde corresponde

	}	
} 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
		if (resultObj.status === "ok") {
			var articles = resultObj.data;
			articlesArray = articles.articles;
		}
		showArticles(articlesArray);
    })

    
	document.getElementById("pesoCurrency").addEventListener("change", () => {
		currency = false;
		MONEY_SYMBOL = PESO_SYMBOL;
		updateValues();
	});
	document.getElementById("dollarCurrency").addEventListener("change", () => {
		currency = true;
		MONEY_SYMBOL = DOLLAR_SYMBOL;
		updateValues();
	});

	document.getElementById("productCurrency").addEventListener("change", function(){
        if (this.value == DOLLAR_CURRENCY)
        {
            MONEY_SYMBOL = DOLLAR_SYMBOL;
        } 
        else if (this.value == PESO_CURRENCY)
        {
            MONEY_SYMBOL = PESO_SYMBOL;
        }

        updateValues();
    });
})

