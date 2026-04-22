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

    // ==========================================
    // PROTECCIÓN ANTI-SPAM
    // ==========================================
    require_once __DIR__ . '/spam_protection.php';
    checkHoneypotPost();
    verifyTurnstile($_POST['cf-turnstile-response'] ?? '', $_SERVER['REMOTE_ADDR'] ?? '');
    checkRateLimit($_SERVER['REMOTE_ADDR'] ?? 'unknown', 2); // contrato: máx 2 por minuto

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

    $fileLabels = ['cedula' => 'Cédula de Identidad', 'certificado' => 'Certificado de Título'];
    foreach (['cedula', 'certificado'] as $fileKey) {
        $label = $fileLabels[$fileKey];
        if (!isset($_FILES[$fileKey])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No se recibió el archivo: $label. Por favor selecciónalo y vuelve a intentarlo."]);
            exit;
        }
        $uploadError = $_FILES[$fileKey]['error'];
        if ($uploadError !== UPLOAD_ERR_OK) {
            $uploadMessages = [
                UPLOAD_ERR_INI_SIZE   => "$label supera el límite de tamaño del servidor (máx. 5 MB). Comprime el archivo e intenta de nuevo.",
                UPLOAD_ERR_FORM_SIZE  => "$label supera el tamaño máximo permitido (5 MB).",
                UPLOAD_ERR_PARTIAL    => "$label se subió de forma incompleta. Revisa tu conexión e inténtalo de nuevo.",
                UPLOAD_ERR_NO_FILE    => "No se seleccionó ningún archivo para $label.",
                UPLOAD_ERR_NO_TMP_DIR => "Error del servidor al procesar $label. Por favor contáctanos.",
                UPLOAD_ERR_CANT_WRITE => "Error del servidor al guardar $label. Por favor contáctanos.",
            ];
            $msg = $uploadMessages[$uploadError] ?? "Error desconocido al subir $label (código: $uploadError). Por favor contáctanos.";
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => $msg]);
            exit;
        }
        if ($_FILES[$fileKey]['size'] > $max_size) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "$label supera el máximo de 5 MB. Comprime el archivo o envíalo en menor resolución."]);
            exit;
        }
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $_FILES[$fileKey]['tmp_name']);
        finfo_close($finfo);
        if (!in_array($mime, $allowed)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "El formato de $label no es compatible (se recibió: $mime). Usa PDF, JPG o PNG."]);
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
    
    $texto_contrato = "
═══════════════════════════════════════
CONTRATO DE CAPACITACIÓN — CENTRO DE ESTUDIOS DE MEDIACIÓN S.A.
═══════════════════════════════════════

Centro de Estudios de Mediación S.A, pionero en la Mediación en nuestro país, está comprometido con la formación de profesionales en las diferentes áreas de la mediación, otorgándoles herramientas teóricas y prácticas acordes a las necesidades de nuestra sociedad.

PRIMERO: OBJETO DEL CONTRATO
El presente contrato de capacitación define los derechos y obligaciones del Alumno y de Centro de Estudios de Mediación S.A. respecto de la prestación del servicio de capacitación.

SEGUNDO: CONDICIONES GENERALES; REGLAMENTO ACADÉMICO
1.- FECHA DE INICIO Y TÉRMINO
El Diplomado se inicia y culmina formalmente, los días indicados en el calendario de origen, enviado a su correo electrónico, cuando solicitó información del programa de estudio.

2.- MALLA CURRICULAR, MATERIAL DE ESTUDIO Y OTROS INSUMOS
a) Malla Curricular: Documento en el cual se encuentra especificado, el contenido académico del diplomado, objetivos generales y específicos, metodología, mecanismos de evaluación y staff de docentes del programa contratado.
b) Material de Estudio: Contenido académico al cual el alumno accede de manera remota en nuestra plataforma on line a través de un usuario y contraseña una vez que se ha finalizado su proceso de incorporación.
c) Calendario Académico: Documento en el que se encuentra la programación del diplomado con fecha de inicio y cierre. En dicho documento se encuentran establecidas las fechas de entrega de cuestionarios, reflexiones, jornadas zoom y presenciales en su caso.
d) Carpeta virtual con materiales académicos complementarios: Carpeta que se encuentra alojada en Drive, y a la cual el alumno accede a través de un enlace que comparte al inicio del Diplomado. Dicha carpeta incluye material de apoyo, presentaciones en power point de cada una de las clases.

3.- HORARIOS DE CLASES PRESENCIALES (APLICA SOLO PARA FORMACIÓN DE MEDIADORES FAMILIARES)
El ciclo de clases presenciales inicia y finaliza en las fechas y horarios indicadas en el calendario. Cada estudiante podrá acceder, durante dichas jornadas a dos servicios de café diarios (mañana y tarde). El servicio de café es un menú básico que consiste en café, té, agua y galletas. Durante las jornadas presenciales se encuentra programado un receso para almuerzo de una hora, entre 13:00 y 14:00 hrs. El almuerzo será de costo de cada alumno. La última jornada, el día de término del diplomado finalizará a las 18:00 hrs. Se recomienda adquirir pasajes posterior a las 21:00 hrs de ese día o al día siguiente.

4.- MODALIDAD
El Diplomado se realiza en una modalidad Online o Semi-Presencial, según sea el caso, y acredita las horas de estudio indicadas en la Malla Académica.

5.- EVALUACIÓN
El alumno contará con los plazos que están fijados en su calendario académico para realizar sus evaluaciones.
- El estudiante deberá contestar cada cuestionario verificador de contenidos en los plazos establecidos, con dos intentos por cuestionario.
- El alumno podrá canalizar sus consultas a través de la plataforma e-training. El profesor tendrá 5 días para contestar.
- Las evaluaciones se efectuarán en escala de 1.0 a 7.0, debiendo ser aprobadas con un mínimo de 4.0.
- Diplomado Familiar: Cuestionarios + trabajos ponderan 50%, pasantías ponderan 50%.
- Programas online: Se evalúan promediando el total de los cuestionarios verificadores.

6.- ASISTENCIA
Para el Diplomado de Mediadores Familiares, las jornadas presenciales son obligatorias con asistencia del 100%. Las conferencias en tiempo real también requieren 100% de asistencia.

7.- REQUISITOS DE APROBACIÓN
- Aprobación de todas las cátedras con nota mínima 4.0
- Asistencia 100% a clases por videoconferencia y presenciales si aplica
- Arancel al día

8.- ENTREGA DE CERTIFICADOS
El Certificado y Diploma serán entregados en un plazo máximo de 7 semanas desde la finalización del programa.

9.- FORMAS DE ENTREGA DE CERTIFICADO
a) Retiro en dependencias, personalmente o por tercero.
b) Envío por correo privado ($14.000), despacho por Correos de Chile o Chilexpress.

10.- ORIENTACIÓN ACADÉMICA
El Titular declara haber recibido orientación académica en el proceso de inscripción y haber resuelto todas sus inquietudes.

TERCERO: SOLICITUD DE DOCUMENTOS ANEXOS
El alumno podrá solicitar los siguientes documentos previo pago del arancel:
- Certificado de Alumno Regular — 0,12 UF
- Certificado de Documentos en Trámite — 0,12 UF
- Duplicado de Concentración de Notas — 0,20 UF
- Duplicado de Certificado de Aprobación — 0,20 UF
- Otro Certificado relativo a su formación — 0,12 UF

CUARTO: APLICA SOLO AL DIPLOMADO DE FORMACIÓN DE MEDIADORES EN CONFLICTOS FAMILIARES
El alumno declara haber recibido información completa respecto del proceso de inscripción en el Registro Único de Mediadores del Ministerio de Justicia. Requisitos exigidos por la Ley N° 19.968:
1. Poseer título profesional de carrera de al menos ocho semestres.
2. Poseer título o diploma de especialización en mediación (mínimo 180 horas teóricas y 40 horas de práctica efectiva).
3. No haber sido condenado por delito que merezca pena aflictiva ni por actos de violencia intrafamiliar.
4. Disponer de un lugar adecuado para desarrollar la mediación.

QUINTO: CANALES FORMALES DE COMUNICACIÓN
Centro de Estudios de Mediación utiliza como canal formal de comunicación el correo electrónico. La comunicación vía telefónica o vía WhatsApp u otro medio no constituyen información oficial.

SEXTO: PAGO DE MATRÍCULA Y ARANCEL
El alumno acepta pagar el arancel y matrícula vigente para la capacitación contratada, comprometiéndose a formalizar el pago antes de la fecha de inicio del programa.

SÉPTIMO: DEVOLUCIÓN DE MATRÍCULA O ARANCEL
La devolución solo procede en caso de cancelación de la actividad de capacitación. No procederá restitución por causas imputables al alumno.

OCTAVO: POSTERGACIÓN DE ACTIVIDADES PRESENCIALES
1.- Por requerimiento de autoridad sanitaria: Se ofrecerán nuevas alternativas de fecha. Los alumnos podrán reprogramar durante los 3 años siguientes sin costo adicional.
2.- A requerimiento del alumno: La no asistencia no exime del compromiso de pago. El alumno tendrá 12 meses para completar su capacitación sin cobro adicional. Transcurrido dicho plazo deberá cancelar el 50% del arancel vigente. Transcurridos 3 años prescribirá la opción de reprogramar.

NOVENO: RESOLUCIÓN DE CONFLICTOS
Toda discrepancia será resuelta a través de procesos de diálogos. En caso de no ser satisfactorio, se podrá solicitar un proceso de mediación. Los honorarios del mediador serán de $30.000 por sesión de 40 minutos, pagados en partes iguales.

DÉCIMO: CESIÓN DE DERECHOS
Las obligaciones y derechos no podrán cederse ni subrogarse a favor de otra persona. Ninguna otra persona puede asistir a las clases en lugar del alumno.

DÉCIMO PRIMERO: FACTORIZACIÓN DE DOCUMENTOS
En caso de pago con documentos a plazo, estos podrán ser factorizados. En caso de mora, el estudiante asumirá los gastos de cobranza e interés. EMED retendrá la entrega de documentos de certificación hasta la regularización del arancel.

La suscripción del presente contrato se efectúa bajo las normas del artículo 2, letra F y artículo 3 de La Ley 19799 \"de documentos electrónicos, firma electrónica y los servicios de certificación de dicha firma\". Declara el alumno haber recibido copia del mismo y manifiesta su conformidad.

DÉCIMO SEGUNDO: DOMICILIO
Para los efectos legales derivados del presente contrato, las partes fijan domicilio en la ciudad de Santiago.

CLÁUSULA ADICIONAL — Pago por Suscripción con Tarjeta
Las siguientes disposiciones solo serán aplicables en el caso de que el Alumno elija la modalidad de pago mediante suscripción con tarjeta de débito o crédito.
1. OBJETO: Regular el pago del Diplomado mediante cuotas con tarjeta de débito o crédito.
2. PAGO EN CUOTAS: El alumno pagará entre 3 y 10 cuotas según la opción seleccionada al inscribirse. Las cuotas se programarán automáticamente.
3. PRIMER PAGO: El acceso a la plataforma se habilitará después del pago de la primera cuota.
4. ACCESO A PRÁCTICAS: Para participar en prácticas presenciales, deberá haber completado el pago total.
5. INCUMPLIMIENTO Y MORA: La mora genera un interés de 0,007 UF diarias y la suspensión del acceso a instancias formativas.
6. ADELANTO DE PAGO: Solicitar por escrito a finanzas@emediacion.cl.
7. SUSPENSIÓN: Por única vez, de 3 a 12 meses. Reactivación con tarifa de 0,5 UF.
8. CAMBIO DE FORMA DE PAGO: Una vez seleccionada la modalidad de cuotas, no podrá cambiar a otra modalidad con beneficios adicionales.
";

    $body_admin .= "\nTEXTO ÍNTEGRO DEL CONTRATO ACEPTADO\n";
    $body_admin .= "------------------------\n";
    $body_admin .= $texto_contrato . "\n\n";

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
        $body_user .= "A continuación, adjuntamos una copia del contrato que has aceptado:\n\n";
        $body_user .= $texto_contrato . "\n\n";
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
