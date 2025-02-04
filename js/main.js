const API_KEY = '5ba4a3abe3cb313e4586dc88b97e2e08';

const form = document.querySelector('#form');
const input = document.querySelector('.form__input')

form.onsubmit = sumbmitHandler;

async function sumbmitHandler(e) {
    e.preventDefault();

    if (!input.value.trim()) {
        console.log('Enter City name')
        return
    }

    const cityName = input.value.trim();
    input.value = '';

    const cityInfo = await getGeo(cityName); 

    // if (cityInfo.length === 0) return;
    
    const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);

    console.log(weatherInfo);
    console.log(weatherInfo.name);
    console.log(weatherInfo.main.temp);
    console.log(weatherInfo.main.humidity);
    console.log(weatherInfo.wind.speed);
    console.log(weatherInfo.weather[0]['main']);

    const weatherData = {
        city: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        speed: weatherInfo.wind.speed,
        main: weatherInfo.weather[0]['main'],
        // icon: weatherInfo.weather[0]['icon'],
    };

    renderWeatherData(weatherData);
}

async function getGeo(name) {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    return data;
}

async function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    return data;
}

function renderWeatherData(data) {
    // document.querySelector('.weather__info').classList.remove('none')
    // document.querySelector('.weather__details').classList.remove('none')

    const temp = document.querySelector('.weather__temp');
    const city = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const img = document.querySelector('.weather__img');

    temp.innerText = Math.round(data.temp) + '°c';
    city.innerText = data.city;
    humidity.innerText = data.humidity + '%';
    speed.innerText = Math.round(data.speed) + ' km/h';

    const fileNames = {
        'Clouds': 'clouds',
        'Clear': 'clear',
        'Rain': 'rain',
        'Drizzle': 'drizzle',
        'Snow': 'snow',
        'Storm': 'storm',
        'Mist': 'Atmosphere',
    }

    if (fileNames[data.main]) {
        img.src=`./img/weather/${fileNames[data.main]}.png`;
    } else {
        img.src="./img/ui/earth.png"
    }

        // const iconCode = data.icon;
        // img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
