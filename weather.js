const weatherSection = document.querySelector("#weather-text");

navigator.geolocation.getCurrentPosition((position) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=5f0fd73cb9852b70620d5bb757a80db3`)
  .then(response => response.json())
  .then(data => {
    weatherSection.innerText = `${data.weather[0].main} | ${data.main.temp}°C | ${data.name}`;
  })
  .catch(error => weatherSection.innerText = "Error");
}, () => {
    weatherSection.innerText = "Unkown";
});