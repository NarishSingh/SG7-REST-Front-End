$(document).ready(function () {
    // only content in main section should show on load
    $("#akronInfoDiv").hide();
    $("#minneapolisInfoDiv").hide();
    $("#louisvilleInfoDiv").hide();

    $("#akronWeather").hide();
    $("#minneapolisWeather").hide();
    $("#louisvilleWeather").hide();

    /*Nav button behavior, default hidden*/
    /*click on weather -> show/hide, default hidden*/
    // click on Akron -> only Akron content must show
    $("#akronButton").on('click', function () {
        $("#minneapolisInfoDiv").hide();
        $("#louisvilleInfoDiv").hide();
        $("#akronInfoDiv").toggle();
    });

    $("#akronWeatherButton").on('click', function () {
        $("#akronWeather").toggle();
    });

    // Minneapolis
    $("#minneapolisButton").on('click', function () {
        $("#akronInfoDiv").hide();
        $("#louisvilleInfoDiv").hide();
        $("#minneapolisInfoDiv").toggle();
    });

    $("#minneapolisWeatherButton").on('click', function () {
        $("#minneapolisWeather").toggle();
    });

    // Louisville
    $("#louisvilleButton").on('click', function () {
        $("#akronInfoDiv").hide();
        $("#minneapolisInfoDiv").hide();
        $("#louisvilleInfoDiv").toggle();
    });

    $("#louisvilleWeatherButton").on('click', function () {
        $("#louisvilleWeather").toggle();
    });

    /*table row*/
    // on hover -> change to WhiteSmoke bg color
    // off hover -> return to white
    // behavior does NOT apply to header

    //TODO figure out how to not select the header row

    $("tr").hover(
        function () {
            $(this).css('background-color', 'WhiteSmoke');
        },
        function () {
            $(this).css('background-color', 'White');
        }
    );

});