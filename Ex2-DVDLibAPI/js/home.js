////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////
$(document).ready(function () {
    loadLibrary();

    //create DVD trigger handler
    $(document).on('click', '#create-dvd-btn', function () {
        $('#create-dvd-modal').modal();

        //create DVD button from modal handler
        $(document).on('click', '#create-dvd-modal-btn', function (e) {
            createDvdEntry();
        });
    });

    //search DVD button handler
    $(document).on('click', '#search-dvd-input', function () {
        //TODO implement
    });
});

////////////////////////////////////////////////////////
// Methods
////////////////////////////////////////////////////////
/**
 * Format the HTML element for a dvd entry
 * @param dvd {Object} containing id, title, release year, director, rating, notes
 * @returns {string} HTML strings to be appended and rendered
 */
function formatDvdEntry(dvd) {
    return `<tr>
        <td>${dvd.title}</td>
        <td>${dvd.releaseYear}</td>
        <td>${dvd.director}</td>
        <td>${dvd.rating}</td>
        <td><a href="#" data-dvdid='${dvd.id}' class='editDvd'><i class="far fa-edit"></i></a></td>
        <td><a href="#" data-dvdid='${dvd.id}' class='deleteDvd'><i class="far fa-trash-alt"></i></a></td>
    </tr>`;
}

/**
 * Load all titles from server via GET and render to table
 */
function loadLibrary() {
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvds/',
        success: function (dvdArr, status) {
            $.each(dvdArr, function (i, dvd) {
                let dvdRow = formatDvdEntry(dvd); //render to tr
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

function createDvdEntry() {
    alert("yuh"); //TODO debug only

    $.ajax({
        type: 'POST',
        url: 'https://tsg-dvds.herokuapp.com/dvd/',
        data: JSON.stringify({
            title: $('#create-title-input').val(),
            releaseYear: $('#create-releaseYr-input').val(),
            director: $('#create-director-input').val(),
            rating: $('#create-rating-select').val(),
            notes: $('#create-notes-input').val()
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json',
        success: function (data, status) {
            //TODO implement
            //TODO don't forget to verify the id has been generated
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