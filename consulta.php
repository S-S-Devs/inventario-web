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

    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$datos || !isset($datos['nombre'])) {
        throw new Exception("Datos inválidos recibidos");
    }

    $nombre = mysqli_real_escape_string($conexion, $datos['nombre']);

    $consulta = "SELECT nombre, descripcion, fecha FROM documentos WHERE nombre LIKE ?";
    
    $sentencia = mysqli_prepare($conexion, $consulta);
    
    if (!$sentencia) {
        throw new Exception("Error preparando la consulta SQL");
    }

    mysqli_stmt_bind_param($sentencia, "s", $nombre);
    $resultado = mysqli_stmt_execute($sentencia);
    $datosConsulta = mysqli_stmt_get_result($sentencia);
    $documento = mysqli_fetch_assoc($datosConsulta);

    if (!$documento) {
        echo json_encode([
            'success' => false,
            'message' => 'Documento no encontrado'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'documento' => $documento
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