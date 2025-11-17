async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const weatherBox = document.getElementById("weatherBox");

    if (!location) {
        alert("Please enter a location!");
        return;
    }

    const apiKey = "7b629271ee8443fe990133358251711";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            weatherBox.style.display = "block";
            weatherBox.innerHTML = `<p style="color:red;">${data.error.message}</p>`;
            return;
        }

        const html = `
            <img src="https:${data.current.condition.icon}" alt="weather icon">

            <div class="temp">${data.current.temp_c}°C</div>

            <div class="condition">${data.current.condition.text}</div>

            <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        `;

        weatherBox.innerHTML = html;
        weatherBox.style.display = "block";

        // Trigger fade animation
        weatherBox.style.animation = "none";
        void weatherBox.offsetWidth; 
        weatherBox.style.animation = "fadeWeather 0.8s ease";

    } catch (error) {
        weatherBox.style.display = "block";
        weatherBox.innerHTML = `<p style="color:red;">Failed to fetch weather data.</p>`;
    }
}
