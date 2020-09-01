$(document).ready(function () {
    // center h1
    $('H1').addClass("text-center");

    // center h2
    $('H2').addClass("text-center");

    // replace class containing "team up!" w the class page-header
    $("#myBanner").removeClass("myBannerHeading");
    $("#myBanner").addClass("page-header");

    // change text of "the squad" to "yellow team"
    $("#yellowHeading").text("Yellow Team");

    // change container bg color to match name of team
    $("#orangeTeamList").css('background-color', 'orange');
    $("#blueTeamList").css('background-color', 'blue');
    $("#redTeamList").css('background-color', 'red');
    $("#yellowTeamList").css('background-color', 'yellow');

    // add joseph banks and simon jones to yellow
    $("#yellowTeamList").append("<li>Joseph Banks</li>");
    $("#yellowTeamList").append("<li>Simon Jones</li>");

    // hide "hide me!"
    $("#oops").hide();

    // remove "bogus contact info" from footer
    $("#footerPlaceholder").remove();

    // add p with your name and email in footer, Courier 24 font
    $('.footer').addClass("p").text("Narish Singh | email@address.com");
    $('.footer').css({
        'font-family': 'Courier',
        'font-size': '24px'
    })
});