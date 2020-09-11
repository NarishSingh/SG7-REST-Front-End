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
        if (validateZip($('#add-zip-code').val())){
            clearErrorMsgs();
            $('#conditions-row').show();
            $('#forecast-row').show();

            getConditionsWeather();
        }
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
    var urlForForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=' + unit
        + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    /*CURRENT WEATHER*/
    $.ajax({
        type: 'GET',
        url: urlForToday,
        success: function (weatherData, status) {
            clearErrorMsgs();

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
    //clear previous forecast


    //get the forecast
    $.ajax({
        type: 'GET',
        url: urlForForecast,
        success: function (weatherData, status) {
            clearErrorMsgs();

            var date = new Set();
            var forecastArray = [];
            var highTemps = [];
            var lowTemps = [];
            var iconStrings = [];
            var descrpStrings = [];
            var ct = 1;

            $.each(weatherData.list, function (i, daysWeather) {
                //get unique dates
                date.add(daysWeather.dt_txt.substring(0, 10));

                //dump all data for one date to arrays
                if (date.size === ct) {
                    lowTemps.push(daysWeather.main.temp_min);
                    highTemps.push(daysWeather.main.temp_max);
                    descrpStrings.push(daysWeather.weather[0].main);
                    iconStrings.push(daysWeather.weather[0].icon);
                } else {
                    //when a new date is added to set, the previous date is complete
                    //find the data points for that complete day and only then do you push it into array
                    var forecast = {};
                    forecast.lowTemp = Math.min.apply(null, lowTemps);
                    forecast.highTemp = Math.max.apply(null, highTemps);
                    forecast.icon = mostOccuring(iconStrings);
                    forecast.description = mostOccuring(descrpStrings);
                    forecastArray.push(forecast);

                    //clear the temporary arrays and increment counter
                    lowTemps = [];
                    highTemps = [];
                    iconStrings = [];
                    descrpStrings = [];
                    ct++;
                }
            });

            //save dates
            const iter = date[Symbol.iterator]();
            forecastArray.forEach(day => {
                var dateString = iter.next().value;
                day.date = dateString;
            });

            forecastArray.forEach(day => {
                var iconUrl = 'http://openweathermap.org/img/w/' + day.icon + '.png'
                var unit = $('#select-units').val();
                var hlString;
                if (unit === "imperial") {
                    hlString = "H: " + day.highTemp + "°F L: " + day.lowTemp + "°F";
                } else {
                    hlString = "H: " + day.highTemp + "°C L: " + day.lowTemp + "°C";
                }

                //render the div
                var daysForecastDiv = '<div class="col text-xl-center" ">' +
                    '<p>' + day.date + '</p>' +
                    '<img src="' + iconUrl + '" alt="Forecast Icon">' +
                    '<p>' + day.description + '</p>' +
                    '<p>' + hlString + '</p>' +
                    '</div>';

                $('#5-days-forecast').append(daysForecastDiv);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}

/**
 * Clear out error messages
 */
function clearErrorMsgs() {
    $('errorMessages').empty();
}

/**
 * Process an array and find the element that occurs the most in an array
 * @param arr an array
 * @returns {Object} the mode of an array
 */
function mostOccuring(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

/**
 * Validate a zip code input
 * @param zipcode {String} must contain 5 digits
 * @returns {boolean} true if valid regex, false otherwise
 */
function validateZip(zipcode) {
    clearErrorMsgs();

    var acceptable = new RegExp("[0-9]{5}"); //must be 5 digits

    if (acceptable.test(zipcode)) {
        return true;
    } else {
        $('#errorMessages')
            .append($('<li>'))
            .attr({class: 'list-group-item list-group-item-danger'})
            .text("5 digits required. Please re-enter a valid zipcode.");

        return false;
    }
}
