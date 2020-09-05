/*
server name: api.openweathermap.org
example url forecast: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=f29ed23e97e67d948334f9b71c66421d
docs/examples: https://openweathermap.org/current
 */
//////////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////////
$(document).ready(function () {
    //unit handler
    var unitType = $('#select-units-dropdown').val($(this)).text();

    //Get Weather btn handler
    $(document).on("click", "#get-weather-btn", getConditionsWeather(unitType));
})


//////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////
/**
 * Retrieve and render conditions and weather data for a given zip code on click
 * @param unitType {String} unit system to use, either Imperial or Metric
 */
function getConditionsWeather(unitType) {
    $('#conditions-row').show();
    $('#forecast-row').show();

    //retrieve zipcode

    //append city name to #city-header

    //ajax calls by unit system
    if (unitType === "Imperial") {

    } else { //metric

    }
}

