
async function getWeather() {
    let city = document.getElementById("city").value.trim();
    let result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name!";
        return;
    }

    result.innerHTML = "Loading...";

    try {
        // Get city coordinates
        let geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

        let geoResponse = await fetch(geoURL);
        if (!geoResponse.ok) throw new Error("Network error");

        let geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found!");
        }

        let place = geoData.results[0];

        // Get weather information
        let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        let weatherResponse = await fetch(weatherURL);
        if (!weatherResponse.ok) throw new Error("Weather data unavailable!");

        let weatherData = await weatherResponse.json();
        let weather = weatherData.current;

        result.innerHTML = `
            <h3>${place.name}, ${place.country}</h3>
            <p>Temperature: ${weather.temperature_2m} °C</p>
            <p>Humidity: ${weather.relative_humidity_2m}%</p>
            <p>Wind Speed: ${weather.wind_speed_10m} km/h</p>
            <p>Weather Code: ${weather.weather_code}</p>
        `;
    }
    catch (error) {
        result.innerHTML = error.message;
    }
}
