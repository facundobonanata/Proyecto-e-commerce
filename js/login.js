function submitEvenHandler(evento) {// se ejecuta cuando se haga el submit
    evento.preventDefault();// evita qe se haga la petición al servidor enviando los datos
    sessionStorage.setItem('logueado', 'true');
    var usuarioLOG = document.getElementById("nombre_usuario");
    localStorage.setItem("nombre_usuario",usuarioLOG.value);
    window.location.href = 'index.html';// redirige al index.html
    return true; //hace que al final la información se envíe al servidor

}

document.getElementById("loginFORM").addEventListener('submit', submitEvenHandler);
//agrega el evento para cuandos se haga el submit
