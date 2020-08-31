$(document).ready(function () {
    // remove a class from an element
    $("#first").removeClass("text-center");

    // add two classes to an element
    $("#newButton").addClass("btn btn-default");

    // create a new HTML element
    $("#emptyDiv").append("p").text("A new paragraph of text...");
    $("#emptyDiv").prepend("p").text("yerrrr");

    //css styling to all h1 elements
    $('H1').css("color", "red");

    // set a CSS style on an element
    // will override previous
    $("#first").css("color", "blue");

    //css styling to container
    $("#myDiv").append("p").text("Testing a cornflower blue styling");
    $("#myDiv").css({
        'width': '400',
        'background-color': 'CornflowerBlue'
    });

    //
    
})
