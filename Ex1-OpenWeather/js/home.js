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
    var zip = $('#add-zip-code').val().text();

    //retrieve unit type
    var unitType = $('#select-units-dropdown').val($(this)).text();

    //ajax calls by unit system
    if (unitType === "Imperial") {
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=imperial&APPID=f29ed23e97e67d948334f9b71c66421d',
            success: function (data, status) {
                //TODO implement
                //append city name to #city-header
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>'))
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.');
            }
        });
    } else { //metric
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=metric&APPID=f29ed23e97e67d948334f9b71c66421d',
            success: function (data, status) {
                //TODO implement
                //append city name to #city-header
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>'))
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.');
            }
        });
    }

}
