function revisar(elemento) {
    if (elemento.value == "") {
        elemento.className = "form-control is-invalid"
        return false;
    } else {
        elemento.className = "form-control is-valid"
        return true;
    }
}
function validarEmail(input) {
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid"
        return false;
    }
}
function validarConsulta(texto) {
    if (texto.value != "" && texto.value.length >= 10) {
        texto.className = "form-control is-valid";
        return true;
    } else {
        texto.className = "form-control is-invalid";
        return false;
    }
}
function validarGeneral(event) {
    event.preventDefault();
    if (revisar(document.getElementById("nombre")) && validarEmail(document.getElementById("email")) &&
        validarConsulta(document.getElementById("consulta"))
    ) {
        enviarEmail();

    } else {
        alert("Se produjo un Error en el Envio")
    }
}
function enviarEmail() {
    let template_params = {
        "from_name": document.getElementById("nombre").value,
        "message_html": `Mensaje: ${document.getElementById("consulta").value} - Email ${document.getElementById("email").value}`
    }

    let service_id = "default_service";
    let template_id = "template_sEfoCHH2";
    emailjs.send(service_id, template_id, template_params).then(
        function (response) {
            console.log("Respuesta se envio" + response);
            document.getElementById("msjEnvio").className = "alert alert-warning my-4";
            document.getElementById("msjEnvio").innerText = "Su respuesta fue enviada"
        }, function (error) {
            console.log("Se produjo un error" + error);
            document.getElementById("msjEnvio").className = "alert alert-Danger my-4";
            document.getElementById("msjEnvio").innerText = "Ocurrio un Error en el Envio"
        }
    )
}
