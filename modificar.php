<?php
include 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $documento = consultarDocumento($nombre);

    if ($documento) {
        echo json_encode($documento);
    } else {
        echo json_encode(["error" => "No se encontró ningún documento con ese nombre."]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "PUT") {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'];
    $descripcion = $_PUT['descripcion'];

    $mensaje = modificarDocumento($id, $descripcion);
    echo $mensaje;
}
?>