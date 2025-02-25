document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#registroForm button[type='button']").addEventListener("click", registrarDocumento);
});

function handleAction(action) {
    switch(action) {
        case 'registro':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('registro').style.display = 'block';
            break;
        case 'consulta':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('consulta').style.display = 'block';
            break;
        case 'modificar':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('modificar').style.display = 'block';
            break;
        case 'eliminar':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('eliminar').style.display = 'block';
            break;
        case 'salir':
            window.close();
            break;
        case 'volver':
            document.getElementById('Menu').style.display = 'block';
            document.getElementById('registro').style.display = 'none';
            document.getElementById('consulta').style.display = 'none';
            document.getElementById('modificar').style.display = 'none';
            document.getElementById('eliminar').style.display = 'none';
            document.getElementById('resultadoConsulta').style.display = 'none';
            document.getElementById('resultadoModificar').style.display = 'none';
            document.getElementById('resultadoEliminar').style.display = 'none';
            break;
        default:
            alert('Acción no reconocida');
    }
}

function registrarDocumento() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;

    if (!nombre || !descripcion || !fecha) {
        alert('Por favor, rellena todos los campos.');
        return;
    }

    fetch('registro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombre}&descripcion=${descripcion}&fecha=${fecha}`
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("Documento registrado con éxito")) {
            alert('Documento registrado exitosamente.');
            document.getElementById('registroForm').reset();
        } else {
            alert('Error al registrar el documento.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function consultarDocumento() {
    const nombre = document.getElementById('nombreConsulta').value;

    fetch('consulta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombre}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('consultaForm').style.display = 'none';
            document.getElementById('resultadoConsulta').style.display = 'block';
            document.getElementById('tituloConsulta').innerText = `Nombre: ${data.nombre}`;
            document.getElementById('contenidoConsulta').innerText = `Descripción: ${data.descripcion}`;
            document.getElementById('fechaConsulta').innerText = `Fecha de creación: ${data.fecha}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function buscarModificarDocumento() {
    const nombre = document.getElementById('nombreModificar').value;

    fetch('modificar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombre}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('modificarForm').style.display = 'none';
            document.getElementById('resultadoModificar').style.display = 'block';
            document.getElementById('nombreNuevo').value = data.nombre;
            document.getElementById('descripcionNueva').value = data.descripcion;
            document.getElementById('fechaNueva').value = data.fecha;
            document.getElementById('idDocumento').value = data.id;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function modificarDocumento() {
    const id = document.getElementById('idDocumento').value;
    const descripcion = document.getElementById('descripcionNueva').value;

    fetch('modificar.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&descripcion=${descripcion}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        handleAction('volver');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function buscarEliminarDocumento() {
    const nombre = document.getElementById('nombreEliminar').value;

    fetch('eliminar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombre}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('eliminarForm').style.display = 'none';
            document.getElementById('resultadoEliminar').style.display = 'block';
            document.getElementById('tituloEliminar').innerText = `Nombre: ${data.nombre}`;
            document.getElementById('contenidoEliminar').innerText = `Descripción: ${data.descripcion}`;
            document.getElementById('fechaEliminar').innerText = `Fecha de creación: ${data.fecha}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function eliminarDocumento() {
    const nombre = document.getElementById('nombreEliminar').value;

    fetch('eliminar.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombre}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        handleAction('volver');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}