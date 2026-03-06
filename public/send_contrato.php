<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Datos del formulario
    $nombre = strip_tags($_POST['nombre'] ?? '');
    $rut = strip_tags($_POST['rut'] ?? '');
    $telefono = strip_tags($_POST['telefono'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $direccion = strip_tags($_POST['direccion'] ?? '');
    $region = strip_tags($_POST['region'] ?? '');
    $profesion = strip_tags($_POST['profesion'] ?? '');
    $programa = strip_tags($_POST['programa'] ?? '');
    $otroprograma = strip_tags($_POST['otroprograma'] ?? '');

    // Validar campos requeridos
    if (empty($nombre) || empty($email) || empty($telefono) || empty($rut) || empty($programa)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Faltan campos requeridos"]);
        exit;
    }

    // Validar archivos
    $max_size = 5 * 1024 * 1024; // 5MB
    $allowed = ['application/pdf', 'image/jpeg', 'image/png'];

    foreach (['cedula', 'certificado'] as $fileKey) {
        if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Falta el archivo: $fileKey"]);
            exit;
        }
        if ($_FILES[$fileKey]['size'] > $max_size) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "El archivo $fileKey supera 5 MB"]);
            exit;
        }
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $_FILES[$fileKey]['tmp_name']);
        finfo_close($finfo);
        if (!in_array($mime, $allowed)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Formato no permitido en $fileKey. Use PDF, JPG o PNG."]);
            exit;
        }
    }

    $programa_completo = $programa === 'Otro' && !empty($otroprograma) ? "Otro: $otroprograma" : $programa;

    // SMTP config
    $smtp_config = require __DIR__ . '/smtp_config.php';

    // Email content for admin
    $body_admin = "═══════════════════════════════════════\n";
    $body_admin .= "  CONTRATO FIRMADO ELECTRÓNICAMENTE\n";
    $body_admin .= "═══════════════════════════════════════\n\n";
    $body_admin .= "INDIVIDUALIZACIÓN DEL TITULAR\n";
    $body_admin .= "------------------------\n";
    $body_admin .= "Nombre: $nombre\n";
    $body_admin .= "RUT: $rut\n";
    $body_admin .= "Teléfono: $telefono\n";
    $body_admin .= "Email: $email\n";
    $body_admin .= "Dirección: $direccion\n";
    $body_admin .= "Región: $region\n";
    $body_admin .= "Profesión: $profesion\n\n";
    $body_admin .= "PROGRAMA A CONTRATAR\n";
    $body_admin .= "------------------------\n";
    $body_admin .= "$programa_completo\n\n";
    $body_admin .= "ACEPTACIÓN DE TÉRMINOS\n";
    $body_admin .= "------------------------\n";
    $body_admin .= "Aceptado en conformidad al art. 2 letra F y art. 3 de la Ley 19799\n\n";
    $body_admin .= "DOCUMENTOS ADJUNTOS\n";
    $body_admin .= "------------------------\n";
    $body_admin .= "1. Cédula de Identidad: " . $_FILES['cedula']['name'] . "\n";
    $body_admin .= "2. Certificado de Título: " . $_FILES['certificado']['name'] . "\n\n";
    $body_admin .= "═══════════════════════════════════════\n";
    $body_admin .= "Fecha: " . date('d/m/Y H:i:s') . "\n";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $smtp_config['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_config['username'];
        $mail->Password = $smtp_config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $smtp_config['port'];
        $mail->CharSet = 'UTF-8';

        // 1. Admin email with attachments
        $mail->setFrom($smtp_config['username'], 'EMED Web - Contrato');
        $mail->addAddress('manager@emediacion.cl', 'Manager EMED');
        $mail->addReplyTo($email, $nombre);
        $mail->isHTML(false);
        $mail->Subject = "Contrato Firmado - $nombre - $programa_completo";
        $mail->Body = $body_admin;

        // Attach files
        $mail->addAttachment($_FILES['cedula']['tmp_name'], 'Cedula_' . $nombre . '.' . pathinfo($_FILES['cedula']['name'], PATHINFO_EXTENSION));
        $mail->addAttachment($_FILES['certificado']['tmp_name'], 'Certificado_' . $nombre . '.' . pathinfo($_FILES['certificado']['name'], PATHINFO_EXTENSION));

        $mail->send();

        // 2. Confirmation to student
        $mail->clearAddresses();
        $mail->clearReplyTos();
        $mail->clearAttachments();

        $body_user = "Estimado/a $nombre,\n\n";
        $body_user .= "Hemos recibido tu contrato firmado electrónicamente para el programa: $programa_completo.\n\n";
        $body_user .= "Documentos recibidos:\n";
        $body_user .= "- Cédula de Identidad\n";
        $body_user .= "- Certificado de Título\n\n";
        $body_user .= "Nuestro equipo revisará tu documentación y te contactará para continuar con el proceso.\n\n";
        $body_user .= "Si tienes consultas, escríbenos a este correo o por WhatsApp al +56 9 6562 0939.\n\n";
        $body_user .= "Saludos cordiales,\nEquipo EMED\nwww.emediacion.cl";

        $mail->setFrom($smtp_config['username'], 'EMED Centro de Mediación');
        $mail->addAddress($email, $nombre);
        $mail->Subject = "Confirmación de Contrato - EMED";
        $mail->Body = $body_user;

        try { $mail->send(); $user_sent = true; } catch (Exception $e) { $user_sent = false; }

        echo json_encode(["status" => "success", "message" => "Contrato enviado con éxito"]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar", "mailer_error" => $mail->ErrorInfo]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
