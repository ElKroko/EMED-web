<?php
ini_set('display_errors', 0);
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
    checkRateLimit($_SERVER['REMOTE_ADDR'] ?? 'unknown', 2); // newsletter: máx 2 por minuto

    // Validar email
    $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Email inválido']);
        exit;
    }

    $smtp_config = require __DIR__ . '/smtp_config.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $smtp_config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_config['username'];
        $mail->Password   = $smtp_config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $smtp_config['port'];
        $mail->CharSet    = 'UTF-8';

        // Notificación al administrador
        $mail->setFrom($smtp_config['username'], 'EMED Web');
        $mail->addAddress('manager@emediacion.cl', 'Manager EMED');
        $mail->isHTML(false);
        $mail->Subject = 'Nueva suscripción al newsletter';
        $mail->Body    = "Nueva suscripción al newsletter EMED:\n\nEmail: $email\nFecha: " . date('d/m/Y H:i');
        $mail->send();

        echo json_encode(['status' => 'success', 'message' => '¡Te has suscrito exitosamente!']);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error al procesar la suscripción']);
    }

} else {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
