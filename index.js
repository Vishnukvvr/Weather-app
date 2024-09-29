document.querySelector('button').addEventListener('click', function () {
    const city = document.querySelector('input').value.trim(); 
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    getWeather(city);
});

async function getWeather(city) {
    const apiKey = '0a329fb68d731c76e2a98eac8d258b31';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${data.wind.speed} KM/h`;
        const weatherIcon = document.querySelector('.weather-icon');
        const weatherCondition = data.weather[0].main.toLowerCase();
        setWeatherIcon(weatherCondition, weatherIcon);
    } catch (error) {
        alert(error.message);
    }
}

function setWeatherIcon(condition, weatherIcon) {
    switch (condition) {
        case 'clear':
            weatherIcon.src = 'images/clear.png';
            break;
        case 'clouds':
            weatherIcon.src = 'images/clouds.png';
            break;
        case 'rain':
            weatherIcon.src = 'images/rain.png';
            break;
        case 'snow':
            weatherIcon.src = 'images/snow.png';
            break;
        default:
            weatherIcon.src = 'images/default.png';
            break;
    }

    document.querySelector(".weather").style.display="block";
}
