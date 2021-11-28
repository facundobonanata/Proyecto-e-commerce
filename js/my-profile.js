
let profileName = document.getElementById("profileName");
let profileLastName = document.getElementById("profileLastName");
let profileAge = document.getElementById("profileAge");
let profileEmail = document.getElementById("profileEmail");
let profileNumber = document.getElementById("profileNumber");
let profileImage = document.getElementById('profileImage');

let myProfile = {};


//funcion para guardar los datos en localStorage//
function saveProfile() {

	myProfile.name = profileName.value;
	myProfile.lastName = profileLastName.value;
	myProfile.Age = profileAge.value;
	myProfile.email = profileEmail.value;
	myProfile.number = profileNumber.value;
	myProfile.image = profileImage.src;

	localStorage.setItem("myProfile", JSON.stringify(myProfile))

	
	//muestro los cambios guardados//
	showProfile();
}

//funcion para acceder y mostrar los datos ingresados//
function showProfile() {
	
	let profileNameDOM = document.getElementById("profileNameDOM");
	let profileAgeDOM = document.getElementById("profileAgeDOM");
	let profileEmailDOM = document.getElementById("profileEmailDOM");
	let profileNumberDOM = document.getElementById("profileNumberDOM");

	profileNameDOM.innerHTML = profileName.value + " " + profileLastName.value;
	profileAgeDOM.innerHTML = profileAge.value + ' años';
	profileEmailDOM.innerHTML = profileEmail.value;
	profileNumberDOM.innerHTML = profileNumber.value;
}

//funcion para seleccionar una imagen local//
function openFile(event) {
	let file = event.target.files[0];

	let reader = new FileReader();
	
	reader.onloadend = function () {
		let dataURL = reader.result;
		profileImage.src = dataURL;
	};
	reader.readAsDataURL(file);
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	let myProfileData = JSON.parse(localStorage.myProfile);

	profileName.value = myProfileData.name;
	profileLastName.value = myProfileData.lastName;
	profileAge.value = myProfileData.Age;
	profileEmail.value = myProfileData.email;
	profileNumber.value = myProfileData.number;
	profileImage.src = myProfileData.image;

		showProfile();

});
