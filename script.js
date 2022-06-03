var APIKey = '451106ee2d8f4c322ae25a778b2d207a';
var cityInput = document.querySelector('#cityInput'); 
var searchBtn = document.querySelector('#searchBtn');
var formEl = document.querySelector('#form');
var display = document.querySelector('#displayAPI');
var displayCityName = document.querySelector('#displayCity');

var searchCity = function(event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();
   
    getWeather(cityName).then(function (data) {
        return callOtherAPI(data.coord.lat, data.coord.lon);
    })
    cityInput.value = '';
    
};

var getWeather = function (city) {
    var APIUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    // displayCity(city);
    return fetch(APIUrl)
        .then(function(response) {
           return response.json()
        })   
        
    ;       
};

var displayData = function(data) {
    console.log(data);

    var pastButton = document.createElement('button');
    pastButton.textContent = data.city.name;
    pastButton.classList.add('.newBtn');
    formEl.appendChild(pastButton);

    pastButton.addEventListener('click', pastBtnSearch);

    display.innerHTML = '';

    var nameOfCity = document.createElement('h3');
    nameOfCity.textContent = 'Weather in ' + data.city.name;
    display.appendChild(nameOfCity);

    
    // var daysData = data.list[i];
    for (var i = 0; i < data.list.length; i++) {

        var container = document.createElement('div');
        container.classList.add('.space');
        display.appendChild(container);
        
        var date = document.createElement('h4');
        date.textContent = data.list[i].dt_txt;
        container.appendChild(date);

        var temp = document.createElement('p');
        temp.textContent = 'Temp: ' + data.list[i].main.temp;
        container.appendChild(temp);

        // Creating this for temp because I don't have access to UV data; done to prove ability / functionality
        var tempColor = function() {
            if (data.list[i].main.temp >= 80) {
                temp.style.backgroundColor = 'red';
            } else if (80 > data.list[i].main.temp <= 50){
                temp.style.backgroundColor = 'yellow';
            } else {
                temp.style.backgroundColor = 'blue';
            }
        };

        tempColor();

        var weather = document.createElement('p');
        var currentWeather = data.list[i].weather[0].main;
        weather.textContent = 'Weather: ' + currentWeather;
        container.appendChild(weather);

        var weatherIcon = function() {
            if (currentWeather === 'Clouds') {
                weather.textContent = "Weather: ☁"; 
            } else if (currentWeather = 'Rain') {
                weather.textContent = "Weather: 💦";
            } else if (currentWeather = 'Clear') {
                weather.textContent = 'Weather: 🌞';
            }
        }
        weatherIcon();

        var wind = document.createElement('p');
        wind.textContent = 'Wind Speed: ' + data.list[i].wind.speed;
        container.appendChild(wind);

        var humidity = document.createElement('p');
        humidity.textContent = 'Humidity: ' + data.list[i].main.humidity;
        container.appendChild(humidity);

        var space = document.createElement('br');
        display.appendChild(space);
    }  
}; 

var callOtherAPI = function (lat, long) {
    var APIUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&cnt=5&units=imperial&appid=' + APIKey;
    return fetch(APIUrl).then(function(response) {
        response.json().then(function(data){
            displayData(data);
        })
    })   
}

var pastBtnSearch = function(target) {
    target.preventDefault();

    cityName = target.innerText;
    console.log(cityName);

};

searchBtn.addEventListener('click', searchCity);

