function onPrepend() {
    let box = $("#emptyDiv"); //var decl

    $(box).prepend("<p>Line was prepended</p>");
}

function onAppend() {
    let box = $("#emptyDiv"); //var decl

    $(box).append("<p>Line was appended</p>");
}

$(document).ready(function () {
    // $("h1").text("Goodbye!"); //select by tag
    $("#hello").text("Goodbye!");
    $(".pageHeader").text("Later, class"); //select by class
    $("#thirdHeader").text("98513"); //select by id

    /*prepend/append & remove*/
    // This is the more dynamic way to create click listeners, prefer over in lesson
    $(document).on("click", "#prependButton", onPrepend);
    $(document).on('click', "#appendButton", onAppend);
});
