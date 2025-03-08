<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/logs/php_error_log');

$servidor = "localhost";
$usuario = "root";
$clave = "patito";
$baseDeDatos = "inventario_documentos";
$port = 3307; // Asegúrate de que el puerto sea el correcto

try {
    $conexion = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos, $port);

    if (!$conexion) {
        throw new Exception("No se ha encontrado el servidor: " . mysqli_connect_error());
    }

    // Obtener datos POST
    $datos = json_decode(file_get_contents('php://input'), true);
    if (!$datos) {
        throw new Exception("Datos inválidos recibidos");
    }
    $nombre = mysqli_real_escape_string($conexion, $datos['nombre']);
    $descripcion = mysqli_real_escape_string($conexion, $datos['descripcion']);
    $fecha = mysqli_real_escape_string($conexion, $datos['fecha']);
    $consulta = "INSERT INTO documentos(nombre, descripcion, fecha) VALUES(?, ?, ?)";
    $sentencia = mysqli_prepare($conexion, $consulta);
    if (!$sentencia) {
        throw new Exception("Error preparando la consulta SQL: " . mysqli_error($conexion));
    }
    mysqli_stmt_bind_param($sentencia, "sss", $nombre, $descripcion, $fecha);
    $resultado = mysqli_stmt_execute($sentencia);
    if (!$resultado) {
        throw new Exception("Error ejecutando la consulta SQL: " . mysqli_stmt_error($sentencia));
    }
    echo json_encode([
        'success' => true,
        'message' => 'Documento registrado con éxito'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ]);
} finally {
    if (isset($conexion)) {
        mysqli_close($conexion);
    }
}