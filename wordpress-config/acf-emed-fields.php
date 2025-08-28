<?php
/**
 * Advanced Custom Fields configuration for EMED Products
 * 
 * Copy this code to your WordPress theme's functions.php file
 * or create a custom plugin with this configuration
 */

if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
    'key' => 'group_emed_product_info',
    'title' => 'EMED - Información del Programa',
    'fields' => array(
        // Tipo de programa
        array(
            'key' => 'field_emed_tipo',
            'label' => 'Tipo de Programa',
            'name' => 'emed_tipo',
            'type' => 'select',
            'instructions' => 'Selecciona si es un Diplomado o Curso',
            'required' => 1,
            'choices' => array(
                'Diplomado' => 'Diplomado',
                'Curso' => 'Curso',
            ),
            'default_value' => 'Curso',
        ),
        
        // Duración
        array(
            'key' => 'field_emed_duracion',
            'label' => 'Duración',
            'name' => 'emed_duracion',
            'type' => 'text',
            'instructions' => 'Ej: "120 horas", "3 meses", etc.',
            'required' => 1,
            'placeholder' => '120 horas',
        ),
        
        // Modalidad
        array(
            'key' => 'field_emed_modalidad',
            'label' => 'Modalidad',
            'name' => 'emed_modalidad',
            'type' => 'select',
            'instructions' => 'Modalidad de dictado del programa',
            'required' => 1,
            'choices' => array(
                'Presencial' => 'Presencial',
                'Online' => '100% Online',
                'Mixto' => 'Presencial + Online',
            ),
            'default_value' => 'Online',
        ),
        
        
        // Programa destacado
        array(
            'key' => 'field_emed_destacado',
            'label' => 'Programa Destacado',
            'name' => 'emed_destacado',
            'type' => 'true_false',
            'instructions' => 'Marcar si este programa debe aparecer destacado en la web',
            'message' => 'Este es un programa destacado',
        ),
        
        // Beneficios
        array(
            'key' => 'field_emed_beneficios',
            'label' => 'Beneficios del Programa',
            'name' => 'emed_beneficios',
            'type' => 'repeater',
            'instructions' => 'Lista de beneficios que obtendrá el estudiante',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Beneficio',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_beneficio_texto',
                    'label' => 'Beneficio',
                    'name' => 'texto',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Certificado reconocido por SENCE',
                ),
            ),
        ),
        
        // Temario
        array(
            'key' => 'field_emed_temario',
            'label' => 'Temario del Programa',
            'name' => 'emed_temario',
            'type' => 'repeater',
            'instructions' => 'Módulos o temas que se cubren en el programa',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Módulo',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_temario_modulo',
                    'label' => 'Módulo',
                    'name' => 'modulo',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Módulo 1: Introducción a la Mediación',
                ),
            ),
        ),
        
        
        // Ubicación
        array(
            'key' => 'field_emed_ubicacion',
            'label' => 'Ubicación',
            'name' => 'emed_ubicacion',
            'type' => 'text',
            'instructions' => 'Lugar donde se dicta el programa (para modalidad presencial)',
            'required' => 0,
            'placeholder' => 'Santiago Centro',
        ),
        
        // Requisitos
        array(
            'key' => 'field_emed_requisitos',
            'label' => 'Requisitos de Ingreso',
            'name' => 'emed_requisitos',
            'type' => 'repeater',
            'instructions' => 'Requisitos necesarios para inscribirse al programa',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Requisito',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_requisito_texto',
                    'label' => 'Requisito',
                    'name' => 'texto',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Título profesional o técnico',
                ),
            ),
        ),
        
        // Metodología
        array(
            'key' => 'field_emed_metodologia',
            'label' => 'Metodología',
            'name' => 'emed_metodologia',
            'type' => 'repeater',
            'instructions' => 'Describe la metodología de enseñanza del programa',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Punto de Metodología',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_metodologia_texto',
                    'label' => 'Metodología',
                    'name' => 'texto',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Clases interactivas con casos prácticos',
                ),
            ),
        ),
        
        // Certificación
        array(
            'key' => 'field_emed_certificacion',
            'label' => 'Certificación',
            'name' => 'emed_certificacion',
            'type' => 'repeater',
            'instructions' => 'Información sobre la certificación que se otorga',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Certificación',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_certificacion_texto',
                    'label' => 'Certificación',
                    'name' => 'texto',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Certificado de participación avalado por EMED',
                ),
            ),
        ),
        
        // Empleabilidad
        array(
            'key' => 'field_emed_empleabilidad',
            'label' => 'Empleabilidad',
            'name' => 'emed_empleabilidad',
            'type' => 'repeater',
            'instructions' => 'Oportunidades laborales y perfil de egreso',
            'required' => 0,
            'layout' => 'block',
            'button_label' => 'Agregar Oportunidad',
            'min' => 0,
            'max' => 0,
            'sub_fields' => array(
                array(
                    'key' => 'field_emed_empleabilidad_texto',
                    'label' => 'Empleabilidad',
                    'name' => 'texto',
                    'type' => 'textarea',
                    'required' => 1,
                    'rows' => 3,
                    'placeholder' => 'Ej: Mediador en centros de familia',
                ),
            ),
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'product',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => 'Campos específicos para los programas EMED',
));

endif;

/**
 * Hook to sync ACF fields with WooCommerce meta data
 * This ensures the fields are accessible via REST API
 */
add_action('acf/save_post', 'sync_emed_acf_to_meta', 20);

function sync_emed_acf_to_meta($post_id) {
    // Only for products
    if (get_post_type($post_id) !== 'product') {
        return;
    }
    
    // Map of ACF field names to meta keys
    $field_map = array(
        'emed_tipo' => '_emed_tipo',
        'emed_duracion' => '_emed_duracion',
        'emed_modalidad' => '_emed_modalidad',
        'emed_destacado' => '_emed_destacado',
        'emed_ubicacion' => '_emed_ubicacion',
    );
    
    // Sync simple fields
    foreach ($field_map as $acf_field => $meta_key) {
        $value = get_field($acf_field, $post_id);
        if ($value !== null) {
            update_post_meta($post_id, $meta_key, $value);
        }
    }
    
    // Sync repeater fields (beneficios, temario, requisitos, metodologia, certificacion, empleabilidad)
    $repeater_fields = array(
        'emed_beneficios' => '_emed_beneficios',
        'emed_temario' => '_emed_temario', 
        'emed_requisitos' => '_emed_requisitos',
        'emed_metodologia' => '_emed_metodologia',
        'emed_certificacion' => '_emed_certificacion',
        'emed_empleabilidad' => '_emed_empleabilidad'
    );
    
    foreach ($repeater_fields as $acf_field => $meta_key) {
        $repeater_data = get_field($acf_field, $post_id);
        if ($repeater_data) {
            $values = array();
            foreach ($repeater_data as $row) {
                if ($acf_field === 'emed_beneficios' && !empty($row['texto'])) {
                    $values[] = $row['texto'];
                } elseif ($acf_field === 'emed_temario' && !empty($row['modulo'])) {
                    $values[] = $row['modulo'];
                } elseif ($acf_field === 'emed_requisitos' && !empty($row['texto'])) {
                    $values[] = $row['texto'];
                } elseif ($acf_field === 'emed_metodologia' && !empty($row['texto'])) {
                    $values[] = $row['texto'];
                } elseif ($acf_field === 'emed_certificacion' && !empty($row['texto'])) {
                    $values[] = $row['texto'];
                } elseif ($acf_field === 'emed_empleabilidad' && !empty($row['texto'])) {
                    $values[] = $row['texto'];
                }
            }
            update_post_meta($post_id, $meta_key, json_encode($values));
        }
    }
}

/**
 * Add custom meta fields to WooCommerce REST API response
 */
add_filter('woocommerce_rest_prepare_product_object', 'add_emed_meta_to_api', 10, 3);

function add_emed_meta_to_api($response, $object, $request) {
    // Add all EMED meta fields to the response
    $emed_meta_keys = array(
        '_emed_tipo',
        '_emed_duracion',
        '_emed_modalidad',
        '_emed_destacado',
        '_emed_beneficios',
        '_emed_temario',
        '_emed_ubicacion',
        '_emed_requisitos',
        '_emed_metodologia',
        '_emed_certificacion',
        '_emed_empleabilidad'
    );
    
    foreach ($emed_meta_keys as $meta_key) {
        $meta_value = get_post_meta($object->get_id(), $meta_key, true);
        if ($meta_value !== '') {
            // Add to meta_data array if not already present
            $found = false;
            foreach ($response->data['meta_data'] as $existing_meta) {
                if ($existing_meta['key'] === $meta_key) {
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                $response->data['meta_data'][] = array(
                    'id' => 0,
                    'key' => $meta_key,
                    'value' => $meta_value
                );
            }
        }
    }
    
    return $response;
}

?>