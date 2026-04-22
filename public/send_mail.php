<?php
// Habilitar reporte de errores para debug en desarrollo (puedes comentar esto en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir las clases de PHPMailer manualmente
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos JSON o Form Data
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    // ==========================================
    // PROTECCIÓN ANTI-SPAM
    // ==========================================
    require_once __DIR__ . '/spam_protection.php';
    checkHoneypot($input);
    verifyTurnstile($input['cf-turnstile-response'] ?? '', $_SERVER['REMOTE_ADDR'] ?? '');
    checkRateLimit($_SERVER['REMOTE_ADDR'] ?? 'unknown');

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

    // ==========================================
    // CONFIGURACIÓN SMTP (desde archivo externo)
    // ==========================================
    $smtp_config = require __DIR__ . '/smtp_config.php';
    $smtp_host = $smtp_config['host'];
    $smtp_username = $smtp_config['username'];
    $smtp_password = $smtp_config['password'];
    $smtp_port = $smtp_config['port'];

    // Crear contenido del correo para el administrador
    $to_admin = "manager@emediacion.cl";
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

    // Instancia principal de PHPMailer para enviar correos
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor (Común para ambos envíos)
        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_username;
        $mail->Password = $smtp_password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Habilita encriptación SSL implícita
        $mail->Port = $smtp_port;
        $mail->CharSet = 'UTF-8';

        // 1. Enviar Notificación a EMED (Admin)
        $mail->setFrom($smtp_username, 'EMED Web');
        $mail->addAddress($to_admin, 'Manager EMED'); // Quién recibe la notificación
        $mail->addReplyTo($email, $nombre);           // Si el admin responde, le llega al cliente

        $mail->isHTML(false); // Texto plano
        $mail->Subject = $subject_admin;
        $mail->Body = $email_content_admin;

        // Enviar al administrador
        $mail->send();
        $admin_sent = true;

        // Limpiar destinatarios para el siguiente correo
        $mail->clearAddresses();
        $mail->clearReplyTos();

        // 2. Enviar Confirmación al Usuario (Cliente)
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

        $mail->setFrom($smtp_username, 'EMED Centro de Mediación');
        $mail->addAddress($email, $nombre);           // Quién recibe la confirmación (el cliente)
        $mail->addReplyTo($smtp_username, 'EMED');    // Si el cliente responde, le llega a info@

        $mail->Subject = $subject_user;
        $mail->Body = $email_content_user;

        // Intentar enviar al usuario (si falla no abortamos el proceso entero, ya que lo importante era el admin)
        try {
            $mail->send();
            $user_sent = true;
        } catch (Exception $e) {
            $user_sent = false;
        }

        echo json_encode([
            "status" => "success",
            "message" => "Mensaje enviado con éxito",
            "debug" => [
                "admin_mail" => $admin_sent,
                "user_mail" => $user_sent
            ]
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Error al enviar el correo de notificación",
            "mailer_error" => $mail->ErrorInfo
        ]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>