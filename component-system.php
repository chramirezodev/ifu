<?php
/**
 * Sistema de componentes reutilizables para el sitio IFU
 * Permitirá construir páginas de manera modular y mantener consistencia visual
 */

/**
 * Función para renderizar componentes
 * @param string $component_name Nombre del componente
 * @param array $args Argumentos para el componente
 */
function ifu_component($component_name, $args = []) {
    // Verificar que el componente existe
    $component_path = get_template_directory() . '/template-parts/' . $component_name . '.php';
    
    if (file_exists($component_path)) {
        // Establecer argumentos para el componente
        if (!empty($args)) {
            extract($args);
        }
        
        // Incluir el componente
        include $component_path;
    } else {
        echo '<!-- Componente "' . $component_name . '" no encontrado -->';
    }
}

/**
 * Componentes disponibles:
 * - hero (título, subtítulo, imagen, botón)
 * - service-card (título, ícono, descripción, enlace)
 * - testimonial (nombre, servicio, texto, calificación)
 * - contact-form (título, destinatario, campos)
 * - cta-whatsapp (texto, número, mensaje)
 * - image-text (imagen, título, texto, posición)
 * - process-steps (pasos del proceso migratorio)
 */

/**
 * Ejemplo de uso:
 * 
 * <?php 
 * ifu_component('hero', [
 *    'title' => 'Servicios de Inmigración Profesionales',
 *    'subtitle' => 'Expertos en trámites migratorios en Estados Unidos',
 *    'image' => get_field('hero_image'),
 *    'button_text' => 'Contáctanos',
 *    'button_url' => '#contact'
 * ]); 
 * ?> 