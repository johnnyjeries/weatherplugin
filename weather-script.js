// my-script.js

jQuery(document).ready(function ($) {
    // Access the API key from the localized data
    const apiKey = myPluginData.apiKey;
    console.log(apiKey);


    $('#getWeatherBtn').click(function () {
        const city = $('#city').val();
        const country = $('#country').val();

        // Make a request to the OpenWeatherMap Geo API to get latitude and longitude
        const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=${apiKey}`;

        $.ajax({
            url: geoApiUrl,
            method: 'GET',
            success: function (geoResponse) {
                console.log(geoResponse);
                // Extract latitude and longitude
                const lat = geoResponse[0].lat;
                const lon = geoResponse[0].lon;

                // Make a request to the OpenWeatherMap One Call API
                const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;

                $.ajax({
                    url: weatherApiUrl,
                    method: 'GET',
                    success: function (weatherResponse) {
                        console.log(weatherResponse);
                        // Display the weather information
                        const weatherInfo = `
                            <p>Temperature: ${weatherResponse.current.temp} °C</p>
                            <p>Description: ${weatherResponse.current.weather[0].description}</p>
                            <p>Humidity: ${weatherResponse.current.humidity}%</p>
                        `;
                        $('#weatherInfo').html(weatherInfo);
                    },
                    error: function (weatherError) {
                        console.error('Error fetching weather data:', weatherError);
                    }
                });
            },
            error: function (geoError) {
                console.error('Error fetching geocoding data:', geoError);
            }
        });
    });
});
