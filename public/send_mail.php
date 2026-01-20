<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos JSON o Form Data
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    $nombre = strip_tags($input['nombre'] ?? '');
    $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags($input['telefono'] ?? '');
    $mensaje = strip_tags($input['mensaje'] ?? '');
    $program = strip_tags($input['program'] ?? 'General');
    
    // Campos opcionales
    $ciudad = strip_tags($input['ciudad'] ?? 'No especificada');
    $interes = strip_tags($input['interes'] ?? '');
    $horario = strip_tags($input['horario_preferido'] ?? 'Sin preferencia');
    
    // Preferencias de contacto
    $preferencias = '';
    if (isset($input['contacto_preferencia']) && is_array($input['contacto_preferencia'])) {
        $preferencias = implode(', ', $input['contacto_preferencia']);
    }

    // Validar campos requeridos
    if (empty($nombre) || empty($email) || empty($telefono)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Faltan campos requeridos"]);
        exit;
    }

    $to = "info@emediacion.cl";
    $subject = "Nueva Consulta Web - " . ($program ? $program : "General");

    $email_content = "Has recibido una nueva consulta desde el sitio web:\n\n";
    $email_content .= "Detalles del Contacto:\n";
    $email_content .= "------------------------\n";
    $email_content .= "Nombre: $nombre\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Teléfono: $telefono\n";
    $email_content .= "Ciudad: $ciudad\n";
    $email_content .= "Programa/Interés: $program $interes\n";
    $email_content .= "Horario preferido: $horario\n";
    $email_content .= "Preferencia de contacto: $preferencias\n\n";
    $email_content .= "Mensaje:\n$mensaje\n";

    $headers = "From: web@emediacion.cl\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Mensaje enviado con éxito"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
