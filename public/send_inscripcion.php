<?php
// Habilitar reporte de errores para debug en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir PHPMailer
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }

    // ==========================================
    // DATOS DEL FORMULARIO
    // ==========================================

    // Programa
    $postula = strip_tags($input['postula'] ?? '');
    $continuacion = strip_tags($input['continuacion'] ?? '');
    $otroprograma = strip_tags($input['otroprograma'] ?? '');

    // Datos personales
    $nombre = strip_tags($input['nombre'] ?? '');
    $rut = strip_tags($input['rut'] ?? '');
    $telefono = strip_tags($input['telefono'] ?? '');
    $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $direccion = strip_tags($input['direccion'] ?? '');
    $region = strip_tags($input['region'] ?? '');

    // Información profesional
    $cargo = strip_tags($input['cargo'] ?? '');
    $titulo_profesional = strip_tags($input['titulo_profesional'] ?? '');
    $semestres = strip_tags($input['semestres'] ?? '');

    // Intereses
    $interes_personal = strip_tags($input['interes_personal'] ?? '');
    $expectativas = strip_tags($input['expectativas'] ?? '');

    // Validar campos requeridos
    if (empty($nombre) || empty($email) || empty($telefono) || empty($postula) || empty($rut) || empty($titulo_profesional)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Faltan campos requeridos (nombre, email, teléfono, RUT, programa y título profesional)"]);
        exit;
    }

    // Determinar nombre completo del programa
    $programa_completo = $postula;
    if ($postula === 'Otro' && !empty($otroprograma)) {
        $programa_completo = "Otro: " . $otroprograma;
    }

    // ==========================================
    // CONFIGURACIÓN SMTP
    // ==========================================
    $smtp_config = require __DIR__ . '/smtp_config.php';
    $smtp_host = $smtp_config['host'];
    $smtp_username = $smtp_config['username'];
    $smtp_password = $smtp_config['password'];
    $smtp_port = $smtp_config['port'];

    // ==========================================
    // CORREO AL ADMINISTRADOR
    // ==========================================
    $to_admin = "manager@emediacion.cl";
    $subject_admin = "Nueva Inscripción Paso 1 - " . $programa_completo;

    $email_content_admin = "═══════════════════════════════════════\n";
    $email_content_admin .= "  NUEVA INSCRIPCIÓN - PASO 1\n";
    $email_content_admin .= "═══════════════════════════════════════\n\n";

    $email_content_admin .= "¿A QUÉ PROGRAMA POSTULA?\n";
    $email_content_admin .= "------------------------\n";
    $email_content_admin .= "Programa: $postula\n";
    if (!empty($continuacion)) {
        $email_content_admin .= "Tipo de inscripción: $continuacion\n";
    }
    if (!empty($otroprograma)) {
        $email_content_admin .= "Otro programa: $otroprograma\n";
    }

    $email_content_admin .= "\nDATOS PERSONALES\n";
    $email_content_admin .= "------------------------\n";
    $email_content_admin .= "Nombre: $nombre\n";
    $email_content_admin .= "RUT: $rut\n";
    $email_content_admin .= "Teléfono: $telefono\n";
    $email_content_admin .= "Email: $email\n";
    if (!empty($direccion)) {
        $email_content_admin .= "Dirección: $direccion\n";
    }
    if (!empty($region)) {
        $email_content_admin .= "Región: $region\n";
    }

    $email_content_admin .= "\nINFORMACIÓN PROFESIONAL\n";
    $email_content_admin .= "------------------------\n";
    if (!empty($cargo)) {
        $email_content_admin .= "Lugar y cargo actual: $cargo\n";
    }
    $email_content_admin .= "Título Profesional: $titulo_profesional\n";
    if (!empty($semestres)) {
        $email_content_admin .= "Semestres de Formación: $semestres\n";
    }

    $email_content_admin .= "\nINTERESES\n";
    $email_content_admin .= "------------------------\n";
    if (!empty($interes_personal)) {
        $email_content_admin .= "Interés personal: $interes_personal\n";
    }
    if (!empty($expectativas)) {
        $email_content_admin .= "Expectativas: $expectativas\n";
    }

    $email_content_admin .= "\n═══════════════════════════════════════\n";
    $email_content_admin .= "Enviado desde el formulario Paso 1 - Inscripción\n";
    $email_content_admin .= "Fecha: " . date('d/m/Y H:i:s') . "\n";

    // ==========================================
    // ENVIAR CORREOS
    // ==========================================
    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_username;
        $mail->Password = $smtp_password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $smtp_port;
        $mail->CharSet = 'UTF-8';

        // 1. Enviar al administrador
        $mail->setFrom($smtp_username, 'EMED Web - Inscripción');
        $mail->addAddress($to_admin, 'Manager EMED');
        $mail->addReplyTo($email, $nombre);

        $mail->isHTML(false);
        $mail->Subject = $subject_admin;
        $mail->Body = $email_content_admin;

        $mail->send();
        $admin_sent = true;

        // Limpiar para siguiente correo
        $mail->clearAddresses();
        $mail->clearReplyTos();

        // 2. Enviar confirmación al alumno
        $subject_user = "Confirmación de Inscripción - EMED";

        $email_content_user = "Estimado/a $nombre,\n\n";
        $email_content_user .= "Hemos recibido exitosamente tu formulario de inscripción al programa: $programa_completo.\n\n";
        $email_content_user .= "A continuación, un resumen de los datos enviados:\n\n";
        $email_content_user .= "DATOS DE INSCRIPCIÓN\n";
        $email_content_user .= "------------------------\n";
        $email_content_user .= "Programa: $postula\n";
        if (!empty($continuacion)) {
            $email_content_user .= "Tipo: $continuacion\n";
        }
        $email_content_user .= "Nombre: $nombre\n";
        $email_content_user .= "RUT: $rut\n";
        $email_content_user .= "Email: $email\n";
        $email_content_user .= "Teléfono: $telefono\n";
        $email_content_user .= "Título Profesional: $titulo_profesional\n";
        $email_content_user .= "\n------------------------\n\n";
        $email_content_user .= "Nuestro equipo académico revisará tu solicitud y te contactará a la brevedad para continuar con el proceso de inscripción.\n\n";
        $email_content_user .= "Si tienes alguna consulta, puedes escribirnos a este correo o contactarnos por WhatsApp al +56 9 6562 0939.\n\n";
        $email_content_user .= "Saludos cordiales,\n";
        $email_content_user .= "Equipo EMED\n";
        $email_content_user .= "www.emediacion.cl";

        $mail->setFrom($smtp_username, 'EMED Centro de Mediación');
        $mail->addAddress($email, $nombre);
        $mail->addReplyTo($smtp_username, 'EMED');

        $mail->Subject = $subject_user;
        $mail->Body = $email_content_user;

        try {
            $mail->send();
            $user_sent = true;
        } catch (Exception $e) {
            $user_sent = false;
        }

        echo json_encode([
            "status" => "success",
            "message" => "Inscripción enviada con éxito",
            "debug" => [
                "admin_mail" => $admin_sent,
                "user_mail" => $user_sent
            ]
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Error al enviar el correo de inscripción",
            "mailer_error" => $mail->ErrorInfo
        ]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
