$(document).ready(function () {
    // only content in main section should show on load
    $("#akronInfoDiv").hide();
    $("#minneapolisInfoDiv").hide();
    $("#louisvilleInfoDiv").hide();

    $("#akronWeather").hide();
    $("#minneapolisWeather").hide();
    $("louisvilleWeather").hide();

    /*Nav button behavior, default hidden*/
    /*click on weather -> show/hide, default hidden*/
    // click on Akron -> only Akron content must show
    $("#akronButton").on('click', function () {
        $("#minneapolisInfoDiv").hide();
        $("#louisvilleInfoDiv").hide();
        $("#akronInfoDiv").show();
    });

    $("#akronWeatherButton").on('click', function () {
        $("#akronWeather").show;
    });

    // Minneapolis
    $("#minneapolisButton").on('click', function () {
        $("#akronInfoDiv").hide();
        $("#louisvilleInfoDiv").hide();
        $("#minneapolisInfoDiv").show();
    });

    $("#minneapolisWeatherButton").on('click', function () {
        $("#minneapolisWeather").show();
    });

    // Louisville
    $("#louisvilleButton").on('click', function () {
        $("#akronInfoDiv").hide();
        $("#minneapolisInfoDiv").hide();
        $("#louisvilleInfoDiv").show();
    });

    $("#louisvilleWeatherButton").on('click', function () {
        $("#louisvilleWeather").show();
    });

    /*table row*/
    // on hover -> change to WhiteSmoke bg color
    // off hover -> return to white
    // behavior does NOT apply to header
});