/*
server name: api.openweathermap.org
example url forecast: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=f29ed23e97e67d948334f9b71c66421d
docs/examples: https://openweathermap.org/current
 */
//////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////
$(document).ready(function () {
    //Get Weather btn handler
    $(document).on('click', '#get-weather-btn', function (event) {

        $('#conditions-row').show();
        $('#forecast-row').show();

        getConditionsWeather();
    });
})

//////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////

/**
 * Retrieve and render conditions and weather data for a given zip code on click
 */
function getConditionsWeather() {
    //retrieve zipcode
    var zip = $('#add-zip-code').val();

    //retrieve unit type
    var unit = $('#select-units').val();

    //CURRENT URL
    var urlForToday = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=' + unit + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    //FORECAST URL - format url with zipcode and insert unit system
    var urlForApi = 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=' + unit + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    /*CURRENT WEATHER*/
    $.ajax({
        type: 'GET',
        url: urlForToday,
        success: function (weatherData, status) {
            /*header*/
            //append city name to #city-header
            var cityHeaderText = "Current Conditions in " + weatherData.name;
            $('#city-header').append('<h1></h1>').text(cityHeaderText);

            /*current conditions*/
            //icon
            var iconId = weatherData.weather[0].icon;
            var iconSRC = 'http://openweathermap.org/img/w/' + iconId + '.png'

            $('#condition-icon').replaceWith('<img src="' + iconSRC + '" class="img-fluid" alt="Current conditions icon">');

            //description
            var descriptionString = weatherData.weather[0].main + ": " + weatherData.weather[0].description;
            $('#condition-desc').append('<p class="text-center"></p>').text(descriptionString);

            /*stats*/
            var tempString = "Temperature: " + weatherData.main.temp;
            if (unit === "imperial") {
                tempString += "°F";
            } else {
                tempString += "°C";
            }

            var humidString = "Humidity: " + weatherData.main.humidity + "%";

            var windString = "Wind: " + weatherData.wind.speed;
            if (unit === "imperial") {
                windString += " mph";
            } else {
                windString += " km/h";
            }

            $('#temp').append('<p></p><br>').text(tempString);
            $('#humidity').append('<p></p><br>').text(humidString);
            $('#wind').append('<p></p><br>').text(windString);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });

    /*5 DAY FORECAST*/
    $.ajax({
        type: 'GET',
        url: urlForApi,
        success: function (weatherData, status) {
            var forecastArray = weatherData.list; //each day in an array [0-4]


        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}
