<?php
header('Content-Type: application/json');

$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "inventario_documentos";

try {
    $conexion = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

    if (!$conexion) {
        throw new Exception("No se ha encontrado el servidor");
    }

    if (!mysqli_select_db($conexion, $baseDeDatos)) {
        throw new Exception("No se ha podido encontrar la Tabla");
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
        throw new Exception("Error preparando la consulta SQL");
    }
    mysqli_stmt_bind_param($sentencia, "sss", $nombre, $descripcion, $fecha);
    $resultado = mysqli_stmt_execute($sentencia);
    if (!$resultado) {
        throw new Exception("Error ejecutando la consulta SQL");
    }
    echo json_encode([
        'success' => true,
        'message' => 'Documento registrado con éxito'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar la solicitud'
    ]);
} finally {
    if (isset($conexion)) {
        mysqli_close($conexion);
    }
}
?>