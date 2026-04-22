<?php
// ==========================================
// PROTECCIÓN ANTI-SPAM — Compartido por todos los handlers
// Capa 1: Honeypot | Capa 2: Cloudflare Turnstile | Capa 3: Rate Limiting
// ==========================================

define('TURNSTILE_SECRET', '0x4AAAAAACyTSq8VdwOkwAGCAwkldCmcMR4');

/**
 * Capa 1: Honeypot
 * Si el campo oculto "website" tiene contenido, es un bot.
 * Responde 200 silencioso para no dar pistas.
 */
function checkHoneypot(array $input): void {
    if (!empty($input['website'])) {
        http_response_code(200);
        echo json_encode(['status' => 'success']);
        exit;
    }
}

/**
 * Capa 1b: Honeypot para $_POST directo (send_contrato.php)
 */
function checkHoneypotPost(): void {
    if (!empty($_POST['website'])) {
        http_response_code(200);
        echo json_encode(['status' => 'success']);
        exit;
    }
}

/**
 * Capa 2: Cloudflare Turnstile
 * Verifica el token contra la API de Cloudflare.
 */
function verifyTurnstile(string $token, string $ip): void {
    if (empty($token)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Verificación de seguridad requerida. Recarga la página e inténtalo de nuevo.']);
        exit;
    }

    $response = @file_get_contents(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        false,
        stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query([
                'secret'   => TURNSTILE_SECRET,
                'response' => $token,
                'remoteip' => $ip,
            ]),
            'timeout' => 10,
        ]])
    );

    if ($response === false) {
        // Si no se puede contactar a Cloudflare, dejar pasar (no bloquear usuarios legítimos)
        return;
    }

    $result = json_decode($response, true);
    if (!($result['success'] ?? false)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Verificación de seguridad fallida. Recarga la página e inténtalo de nuevo.']);
        exit;
    }
}

/**
 * Capa 3: Rate limiting por IP (máx 3 envíos por minuto por defecto)
 * Usa archivos temporales, sin dependencias extra.
 */
function checkRateLimit(string $ip, int $maxPerMinute = 3): void {
    $dir = sys_get_temp_dir() . '/emed_rl/';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . md5($ip) . '.json';
    $now  = time();

    $data = ['count' => 0, 'window_start' => $now];
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        if ($raw !== false) {
            $data = json_decode($raw, true) ?? $data;
        }
    }

    if ($now - $data['window_start'] > 60) {
        // Nueva ventana de 1 minuto
        $data = ['count' => 1, 'window_start' => $now];
    } else {
        $data['count']++;
        if ($data['count'] > $maxPerMinute) {
            http_response_code(429);
            echo json_encode(['status' => 'error', 'message' => 'Demasiados intentos. Por favor espera un momento antes de intentarlo de nuevo.']);
            exit;
        }
    }

    @file_put_contents($file, json_encode($data), LOCK_EX);
}
