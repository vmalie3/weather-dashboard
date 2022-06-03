var APIKey = '451106ee2d8f4c322ae25a778b2d207a';
// var city;
var cityInput = document.querySelector('#cityInput'); 
var searchBtn = document.querySelector('#searchBtn');
var formEl = document.querySelector('#form');
var display = document.querySelector('#displayAPI');
var displayCityName = document.querySelector('#displayCity');

var searchCity = function(event) {
    event.preventDefault();

    var cityName = cityInput.value.trim().toLowerCase();

    if (cityName) {
        getWeather(cityName).then(function (data) {
            var lat = data.coord.lat;
            var long = data.coord.lon;
            console.log(data);

            return callOtherAPI(lat, long);
        })
        cityInput.value = '';
    }
};

var getWeather = function (city) {
    var APIUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    console.log(city);
    console.log(APIUrl);
    displayCity(city);
    return fetch(APIUrl)
        .then(function(response) {
           return response.json()
        })   
        
    ;       
};

var displayData = function(data) {
    console.log(data);
    console.log(data.list[0].main.temp);
    // var daysData = data.list[i];
    for (var i = 0; i < data.list.length; i++) {
        var container = document.createElement('div');
        display.appendChild(container);
        
        var date = document.createElement('h4');
        date.textContent = data.list[i].dt_txt;
        container.appendChild(date);

        var temp = document.createElement('p');
        temp.textContent = 'Temp: ' + data.list[i].main.temp;
        container.appendChild(temp);

        
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
                weather.textContent = "☁"; 
            } else if (currentWeather = 'Rain') {
                weather.textContent = "💦";
            } else if (currentWeather = 'Clear') {
                weather.textContent = '🌞';
            } else {
                weather.textContent = '';
            }
        }
        weatherIcon();

        var wind = document.createElement('p');
        wind.textContent = 'Wind Speed: ' + data.list[i].wind.speed;
        container.appendChild(wind);

        var humidity = document.createElement('p');
        humidity.textContent = 'Humidity: ' + data.list[i].main.humidity;
        container.appendChild(humidity);
    }  
}; 
// var displayData = function(data) {
//     console.log(data);
//     console.log(data.list[0].main.temp);

//     var temp = document.createElement('p');
//     temp.textContent = 'Temp: ' + data.list[0].main.temp;
//     display.appendChild(temp);
// };

var callOtherAPI = function (lat, long) {
    var APIUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&cnt=5&units=imperial&appid=' + APIKey;
    return fetch(APIUrl)
        .then(function(response) {
            response.json().then(function(data){
                displayData(data);
            })
            
           
        })   
}

var displayCity = function(city) {
    displayCityName.textContent = city;
    console.log(city); 
};



searchBtn.addEventListener('click', searchCity);

