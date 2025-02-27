<?php
include 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $fecha = $_POST['fecha'];

    $mensaje = registrarDocumento($nombre, $descripcion, $fecha);
    echo $mensaje;
}
?>