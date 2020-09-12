////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////
$(document).ready(function () {
    loadLibrary();

    //create DVD button handler
    $(document).on('click', '#create-dvd-btn', function () {

    });

    //search DVD button handler
    $(document).on('click', '#search-dvd-input', function () {

    });
});

////////////////////////////////////////////////////////
// Methods
////////////////////////////////////////////////////////
/**
 * Load all titles from server via GET and render to table
 */
function loadLibrary() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/dvds',
        success: function (dvdArr, status) {
            $.each(dvdArr, function (i, dvd) {
                //extract fields, no need to display id nor notes
                let title = dvd.title;
                let releaseYr = dvd.releaseYear;
                let director = dvd.director;
                let rating = dvd.rating;

                //render to tr
                let dvdRow = '<tr>';
                dvdRow += '<td>' + title + '</td>';
                dvdRow += '<td>' + releaseYr + '</td>';
                dvdRow += '<td>' + director + '</td>';
                dvdRow += '<td>' + rating + '</td>';
                dvdRow += '<td onclick="onEditDVD()"><i class="far fa-edit"></i></td>'; //edit
                dvdRow += '<td onclick="onDeleteDVD()"><i class="far fa-trash-alt"></i></td>'; //delete

                $('#library-entries').append(dvdRow);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}

//TODO implement this for tr's -> edit and delete
function onEditDVD() {


}

function onDeleteDVD() {

}