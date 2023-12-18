<?php
/*
Plugin Name: My Weather Plugin
Description: A simple plugin to fetch weather information using OpenWeatherMap API.
Version: 1.0
Author: Your Name
*/

// Enqueue scripts and styles
function enqueue_my_scripts() {
    // Enqueue jQuery (it's already included, but this is how you'd enqueue it if it wasn't)
    wp_enqueue_script('jquery');

    // Enqueue your custom script
    wp_enqueue_script('my-plugin-script', plugin_dir_url(__FILE__) . 'weather-script.js', array('jquery'), '1.0', true);

    // Pass any localized data to your script if needed
    wp_localize_script('my-plugin-script', 'myPluginData', array(
        'apiKey' => '957bdf6be37e30e782ec6164d487e478'
    ));
}

// Hook into the 'wp_enqueue_scripts' action
add_action('wp_enqueue_scripts', 'enqueue_my_scripts');

function weather_plugin_shortcode() {
    ob_start(); // Start output buffering

    // Output the HTML for your weather plugin
    echo '<div class="container">';
    echo '<label for="city">City Name:</label>';
    echo '<input type="text" id="city" />';
    echo '<br/>';
    echo '<label for="country">Country Code:</label>';
    echo '<input type="text" id="country" />';
    echo '<br/>';
    echo '<button id="getWeatherBtn">Get Weather</button>';
    echo '</div>';

    echo '<div id="weatherInfo"></div>';

    // Return the buffered output
    return ob_get_clean();
}

add_shortcode('weather_plugin', 'weather_plugin_shortcode');

?>
