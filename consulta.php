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
}
?>