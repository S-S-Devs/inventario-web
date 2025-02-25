<?php
$servername = "localhost";
$username = "root";
$password = "patito";
$dbname = "inventario_documentos";
$port = 3307; // Cambia este valor al puerto correcto si es necesario

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function registrarDocumento($nombre, $descripcion, $fecha) {
    global $conn;
    
    $sql = "INSERT INTO documentos (nombre, descripcion, fecha) VALUES ('$nombre', '$descripcion', '$fecha')";

    if ($conn->query($sql) === TRUE) {
        return "Documento registrado con éxito.";
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function consultarDocumento($nombre) {
    global $conn;
    $sql = "SELECT * FROM documentos WHERE nombre = '$nombre'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

function modificarDocumento($id, $descripcion) {
    global $conn;

    $sql = "UPDATE documentos SET descripcion='$descripcion' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        return "Documento modificado con éxito.";
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function eliminarDocumento($nombre) {
    global $conn;
    $sql = "DELETE FROM documentos WHERE nombre = '$nombre'";

    if ($conn->query($sql) === TRUE) {
        return "Documento eliminado con éxito.";
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>