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

    // 1. Correo de Notificación (Para EMED)
    $to_admin = "info@emediacion.cl";
    $subject_admin = "Nueva Consulta Web - " . ($program ? $program : "General");

    $email_content_admin = "Has recibido una nueva consulta desde el sitio web:\n\n";
    $email_content_admin .= "Detalles del Contacto:\n";
    $email_content_admin .= "------------------------\n";
    $email_content_admin .= "Nombre: $nombre\n";
    $email_content_admin .= "Email: $email\n";
    $email_content_admin .= "Teléfono: $telefono\n";
    $email_content_admin .= "Ciudad: $ciudad\n";
    $email_content_admin .= "Programa/Interés: $program $interes\n";
    $email_content_admin .= "Horario preferido: $horario\n";
    $email_content_admin .= "Preferencia de contacto: $preferencias\n\n";
    $email_content_admin .= "Mensaje:\n$mensaje\n";

    // Headers para notificación admin
    $headers_admin = "From: web@emediacion.cl\r\n";
    $headers_admin .= "Reply-To: $email\r\n";
    $headers_admin .= "X-Mailer: PHP/" . phpversion();

    // Enviar notificación al admin
    $admin_sent = mail($to_admin, $subject_admin, $email_content_admin, $headers_admin);

    // 2. Correo de Confirmación (Para el Usuario)
    $to_user = $email;
    $subject_user = "Hemos recibido tu consulta - EMED";

    $email_content_user = "Hola $nombre,\n\n";
    $email_content_user .= "Gracias por contactarte con EMED. Hemos recibido tu consulta exitosamente.\n\n";
    $email_content_user .= "Nuestro equipo revisará tu solicitud sobre " . ($program ? $program : "nuestros programas") . " y te contactaremos a la brevedad posible";
    
    if ($horario !== 'Sin preferencia') {
        $email_content_user .= " dentro de tu horario preferido ($horario).";
    } else {
        $email_content_user .= ".";
    }
    
    $email_content_user .= "\n\n";
    $email_content_user .= "Si tienes alguna duda urgente, puedes escribirnos directamente a este correo o contactarnos por WhatsApp al +56 9 6562 0939.\n\n";
    $email_content_user .= "Saludos cordiales,\n";
    $email_content_user .= "Equipo EMED\n";
    $email_content_user .= "www.emediacion.cl";

    // Headers para confirmación usuario
    $headers_user = "From: info@emediacion.cl\r\n";
    $headers_user .= "Reply-To: info@emediacion.cl\r\n";
    $headers_user .= "X-Mailer: PHP/" . phpversion();

    // Enviar confirmación al usuario
    // Nota: El éxito de este envío no determina el status de la API, pero es bueno intentarlo.
    $user_sent = mail($to_user, $subject_user, $email_content_user, $headers_user);

    if ($admin_sent) {
        echo json_encode([
            "status" => "success", 
            "message" => "Mensaje enviado con éxito",
            "debug" => [
                "admin_mail" => $admin_sent,
                "user_mail" => $user_sent
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo de notificación"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
