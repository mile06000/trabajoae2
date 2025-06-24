
const solicitudesTitulo = document.querySelector(".solicitudes h2");
const conexionesTitulo = document.querySelector(".conexiones h2");
const botonesAceptar = document.querySelectorAll(".aceptar");
const botonesRechazar = document.querySelectorAll(".rechazar");

function actualizarContadores(deltaSolicitudes, deltaConexiones = 0) {

  let solicitudesTexto = solicitudesTitulo.textContent;
  let conexionesTexto = conexionesTitulo.textContent;

  let solicitudesNum = parseInt(solicitudesTexto.match(/\d+/)[0]);
  let conexionesNum = parseInt(conexionesTexto.match(/\d+/)[0]);

  solicitudesNum += deltaSolicitudes;
  conexionesNum += deltaConexiones;

  solicitudesTitulo.textContent = `Solicitudes de Conexión (${solicitudesNum})`;
  conexionesTitulo.textContent = `Tus Conexiones (${conexionesNum}+)`;
}


function manejarAccion(event, aceptar) {
  const usuario = event.target.closest(".usuario");
  if (!usuario) return;

  usuario.remove(); 

  if (aceptar) {
    actualizarContadores(-1, 1); 
  } else {
    actualizarContadores(-1); 
  }
}

botonesAceptar.forEach(boton => {
  boton.addEventListener("click", e => manejarAccion(e, true));
});

botonesRechazar.forEach(boton => {
  boton.addEventListener("click", e => manejarAccion(e, false));
});

const botonEditar = document.querySelector(".editar");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");

botonEditar.addEventListener("click", function () {

  const nombreCompleto = nombre.textContent;
  const primerNombre = nombreCompleto.split(" ")[0]; // Tomamos solo 'Wilson'

  const descripcionActual = descripcion.innerHTML;

  nombre.innerHTML = `<input type="text" id="input-nombre" value="${primerNombre}" />`;
  descripcion.innerHTML = `<textarea id="input-descripcion" rows="8">${descripcionActual.replace(/<br>/g, '\n')}</textarea>`;

  botonEditar.textContent = "Guardar perfil";

  botonEditar.onclick = function () {
    const nuevoNombre = document.getElementById("input-nombre").value;
    const nuevaDescripcion = document.getElementById("input-descripcion").value;

    
    nombre.innerText = nuevoNombre;
    descripcion.innerHTML = nuevaDescripcion.replace(/\n/g, "<br>");

    botonEditar.textContent = "Editar perfil";
    botonEditar.onclick = arguments.callee;
  };
});
