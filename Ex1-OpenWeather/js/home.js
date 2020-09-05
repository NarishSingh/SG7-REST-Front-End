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
    var unit = $('#select-units');

    //format url with zipcode and insert unit system
    var urlForApi = 'http://api.openweathermap.org/data/2.5/forecast?q=' + zip + ',us&units=';
    urlForApi += unit + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    $.ajax({
        type: 'GET',
        url: urlForApi,
        success: function (weatherData) {
            alert("Retrieved"); //TODO debug, remove after

            //TODO implement

            //append city name to #city-header
            //FIXME doesn't work at all
            var cityHeaderText = "Current Conditions in " + weatherData.city.name;
            $('#city-header').append('<h1>').text(cityHeaderText);

        },
        error: function () {
            alert("nope"); //TODO debug, remove after

            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}
