//Rohan Raina
//C0920990
async function getWeather() {
    const apiKey = '72dd275826b71117cb15824c3f516719'; 
    const cityInput = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === '404') {
        document.getElementById('weatherInfo').innerHTML = 'City not found';
        return;
      }
  
      if (!data.main || !data.main.temp) {
        document.getElementById('weatherInfo').innerHTML = 'Weather data not available';
        return;
      }
      console.log(data);
      
      const country = data.sys && data.sys.country ? `, ${data.sys.country}` : '';
      const weatherDescription = data.weather[0].description;
      const capitalizedWeatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
      const metricSpeed = Math.trunc (data.wind.speed*3.6);
      const weatherGifUrl=getWeatherGifUrl(data.weather[0].main);
      
    const weatherInfo = `
    <div class="weather-info-block">
        <h2>${data.name}${country}</h2>
    </div>
    <div class="weather-info-block">
        <div><b>Temperature:</b> ${data.main.temp}°C</div>
    </div>
        <div class="weather-info-block">
    <div>   <b>Weather:</b> ${capitalizedWeatherDescription}</div>
        <div class="weather-gif-block">
            <img src="${weatherGifUrl}" alt="Weather GIF">
        </div>
    </div>
    <div class="weather-info-block">
        <div><b>Humidity:</b> ${data.main.humidity}%</div>
    </div>
        <div class="weather-info-block">
        <div><b>Wind Speed:</b> ${metricSpeed}Km/h</div>
    </div>
        <div class="weather-info-block">
        <div><b>Feels Like:</b> ${data.main.feels_like}°C</div>
    </div>
        <div class="weather-info-block">
        <div><b>Maximum:</b> ${data.main.temp_max}°C</div>
    </div>
        <div class="weather-info-block">
        <div><b>Minimum:</b> ${data.main.temp_min}°C</div>
    </div>
  
`;
          document.getElementById('weatherInfo').innerHTML = weatherInfo;
      
      
      // Calling the Change background image function
      changeBackground(data.weather[0].main);
    }  catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        document.getElementById('weatherInfo').innerHTML = 'An error occurred';
      }
      

  //Change the background image on the basis of weather
  function changeBackground(weatherCondition) {
    let imageUrl;
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        imageUrl = 'media/clear.jpeg';
        break;
      case 'clouds':
        imageUrl = 'media/cloudy.jpeg';
        break;
      case 'rain':
        imageUrl = 'media/rain.jpeg';
        break;
      case 'snow':
        imageUrl = 'media/snow.jpeg';
        break;
      default:
        imageUrl = 'media/default.jpeg';
    }
    document.body.style.backgroundImage = `url(${imageUrl})`;
  }

  function getWeatherGifUrl(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return 'media/sunny.gif';
      case 'clouds':
        return 'media/cloudy.gif';
      case 'rain':
        return 'media/rainy.gif';
      case 'snow':
        return 'media/snowy.gif';
      default:
        return 'media/sunny.gif';
    }
  }
  
}