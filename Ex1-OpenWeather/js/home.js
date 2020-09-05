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

        //retrieve zipcode
        var zip = $('#add-zip-code').val().text();

        //retrieve unit type
        var unit = $('#select-units-dropdown').val($(this)).text();

        getConditionsWeather(zip, unit);
    });
})

//////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////
/**
 * Retrieve and render conditions and weather data for a given zip code on click
 */
function getConditionsWeather(zipcode, unitType) {


    //format url with zipcode and insert unit system
    var urlForApi = 'http://api.openweathermap.org/data/2.5/forecast?q=' + zipcode + ',us&units=';
    urlForApi += unitType + '&APPID=f29ed23e97e67d948334f9b71c66421d';

    $.ajax({
        type: 'GET',
        url: urlForApi,
        success: function (weatherData) {
            alert("Retrieved");

            //TODO implement

            //append city name to #city-header
            var cityHeaderText = "Current Conditions in " + weatherData.city.name;
            $('#city-header').append('<p>').text(cityHeaderText);

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}
