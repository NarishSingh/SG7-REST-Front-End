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

    //CURRENT Conditions URL
    var urlForToday = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=' + unit
        + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    //FORECAST URL
    var urlForApi = 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=' + unit
        + '&APPID=f29ed23e97e67d948334f9b71c66421d';

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
            alert("forecasted"); //TODO debug only, remove later

            //note: each day has 8 obj's corresponding to 3hr blocks
            var forecastArray = weatherData.list;
            var highTemps = [];
            var lowTemps = [];
            var iconStrings = [];
            var descrpStrings = [];
            var dateStrings = [];

            var highest = 0;
            var lowest = 999;

            /*Day by day info*/
            //5 days * 8 obj's/day = 40 objs
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 8; j++) {
                    if (forecastArray[(i * 8) + j].main.temp_max > highest) {
                        highest = forecastArray[(i * 8) + j].main.temp_max;
                    }

                    if (forecastArray[(i * 8) + j].main.temp_min < lowest) {
                        highest = forecastArray[(i * 8) + j].main.temp_min;
                    }

                    if (forecastArray[(i * 8) + j].dt_txt.substring(11) === "12:00:00") {
                        //just using 12 noon for now
                        iconStrings.push(forecastArray[(i * 8) + j].weather[0].icon);
                        descrpStrings.push(forecastArray[(i * 8) + j].weather[0].description);
                    }
                }

                highTemps.push(highest);
                lowTemps.push(lowest);
                dateStrings.push(forecastArray[i * 8].dt_txt.substring(0, 9));
            }

            for (let i = 0; i < 5; i++) {
                var iconUrl = 'http://openweathermap.org/img/w/' + iconStrings[i] + '.png'
                var unit = $('#select-units').val();
                var hlString;
                if (unit === "imperial") {
                    hlString = "H: " + highTemps[i] + "°F L: " + lowTemps[i] + "°F";
                } else {
                    hlString = "H: " + highTemps[i] + "°C L: " + lowTemps[i] + "°C";
                }

                var daysForecastDiv = '<div>' +
                    '<p>' + dateStrings[i] + '</p>' +
                    '<img class="img-fluid" src="' + iconUrl + '" alt="Forecast Icon">' +
                    '<p>' + descrpStrings[i] + '</p>' +
                    '<p>' + hlString+ '</p>' +
                    '</div>'

                $('#5-days-forecast').append(daysForecastDiv);
            }

            /*
            var day1Array = [];
            for (var i = 0; i < 8; i++) {
                day1Array.push(forecastArray[i]);
            }

            var day2Array = [];
            for (var i = 8; i < 16; i++) {
                day2Array.push(forecastArray[i]);
            }

            var day3Array = [];
            for (var i = 16; i < 24; i++) {
                day3Array.push(forecastArray[i]);
            }

            var day4Array = [];
            for (var i = 24; i < 32; i++) {
                day4Array.push(forecastArray[i]);
            }

            var day5Array = [];
            for (var i = 32; i < 40; i++) {
                day5Array.push(forecastArray[i]);
            }
             */
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}
