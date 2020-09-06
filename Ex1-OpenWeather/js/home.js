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
    var unit = $('#select-units');

    //CURRENT URL
    var urlForToday = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&APPID=f29ed23e97e67d948334f9b71c66421d';

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
            /*
            $.ajax({
                type: 'GET',
                url: 'http://openweathermap.org/img/w/' + iconId + '.png',
                success: function (iconPic, status) {
                    alert("Retrieved icon");

                    //TODO append pic, do css to center it
                },
                error: function () {
                    $('#errorMessages')
                        .append($('<li>'))
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service.');
                }
            });
             */

            //description


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
