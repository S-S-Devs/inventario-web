function handleAction(action) {
    switch(action) {
        case 'registro':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('registro').style.display = 'block';
            break;
        case 'consulta':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('consulta').style.display = 'block';
            document.getElementById('consultaForm').style.display = 'block';
            break;
        case 'modificar':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('modificar').style.display = 'block';
            document.getElementById('modificarForm').style.display = 'block';
            document.getElementById('modificarForm').reset();
            break;
        case 'eliminar':
            document.getElementById('resultadoEliminar').style.display = 'none';
            document.getElementById('eliminarForm').reset();
            document.getElementById('eliminarForm').style.display = 'block';
            document.getElementById('eliminarForm').reset();
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('eliminar').style.display = 'block';
            break;
        case 'salir':
            window.close();
            break;
        case 'volverConsulta':
            document.getElementById('resultadoConsulta').style.display = 'none';
            document.getElementById('consulta').style.display = 'block';
            document.getElementById('consultaForm').style.display = 'block';
            document.getElementById('consultaForm').reset();
            break;
        case 'volver':
            document.getElementById('Menu').style.display = 'block';
            document.getElementById('registro').style.display = 'none';
            document.getElementById('consulta').style.display = 'none';
            document.getElementById('consultaForm').reset();
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

// REGISTROS
function registrarDocumento(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;
    if (!nombre || !descripcion || !fecha) {
        alert('Por favor, rellena todos los campos.');
        return;
    }
    const datos = {
        nombre,
        descripcion,
        fecha
    };
    const opcionesFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(datos)
    };
    fetch('registro.php', opcionesFetch)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Documento registrado exitosamente.');
                document.getElementById('registroForm').reset();
            } else {
                alert('Error al registrar el documento: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al intentar registrar el documento. Por favor, inténtalo nuevamente.');
        });
}
document.getElementById('registroForm').addEventListener('submit', registrarDocumento);

// CONSULTA
function consultarDocumento() {
    const nombre = document.getElementById('nombreConsulta').value.trim();
    if (!nombre) {
        alert('Por favor, ingresa el nombre del documento.');
        return;
    }
    fetch('consulta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            mostrarResultadoConsulta(data.documento);
        } else {
            alert('No se encontró el documento.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al consultar el documento. Por favor, inténtalo nuevamente.');
    });
}

// MODIFICAR
function buscarModificarDocumento() {
    const nombre = document.getElementById('nombreModificar').value.trim();
    if (!nombre) {
        alert('Por favor, ingresa el nombre del documento.');
        return;
    }
    fetch('modificar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        document.getElementById('modificarForm').style.display = 'none';
        document.getElementById('resultadoModificar').style.display = 'block';
        document.getElementById('nombreNuevo').value = data.nombre;
        document.getElementById('descripcionNueva').value = data.descripcion;
        document.getElementById('fechaNueva').value = data.fecha;
        document.getElementById('idDocumento').value = data.id;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el documento. Por favor, inténtalo nuevamente.');
    });
}
function modificarDocumento() {
    const id = document.getElementById('idDocumento').value;
    const descripcion = document.getElementById('descripcionNueva').value.trim();
    if (!descripcion) {
        alert('Por favor, ingresa una descripción.');
        return;
    }
    fetch('modificar.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            id: id,
            descripcion: descripcion
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Documento modificado exitosamente.');
            document.getElementById('modificarForm').style.display = 'block';
            document.getElementById('resultadoModificar').style.display = 'none';
            document.getElementById('modificarForm').reset();
        } else {
            alert('Error al modificar el documento: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al modificar el documento. Por favor, inténtalo nuevamente.');
    });
}
// ELIMINAR
function buscarEliminarDocumento() {
    const nombre = document.getElementById('nombreEliminar').value.trim();
    if (!nombre) {
        alert('Por favor, ingresa el nombre del documento.');
        return;
    }
    fetch('eliminar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        document.getElementById('eliminarForm').style.display = 'none';
        document.getElementById('resultadoEliminar').style.display = 'block';
        document.getElementById('tituloEliminar').textContent = data.nombre;
        document.getElementById('contenidoEliminar').innerHTML = 
            data.descripcion.replace(/\n/g, '<br>');
        document.getElementById('fechaEliminar').textContent = data.fecha;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el documento. Por favor, inténtalo nuevamente.');
    });
}
function eliminarDocumento() {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este documento? Esta acción no se puede deshacer.');
    if (!confirmacion) return;
    const nombre = document.getElementById('nombreEliminar').value;
    const descripcion = document.getElementById('contenidoEliminar').textContent;
    fetch('eliminar.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Documento eliminado exitosamente.');
            handleAction('volver');
        } else {
            alert('Error al eliminar el documento: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al eliminar el documento. Por favor, inténtalo nuevamente.');
    });
}