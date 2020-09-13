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

            //reset and hide
            $('#create-title-input').val('');
            $('#create-releaseYr-input').val('');
            $('#create-director-input').val('');
            $('#create-rating-select').val("G"); //Default selection
            $('#create-notes-input').val('');
            $('#create-dvd-modal').modal("hide");
        });
    });

    //search DVD button handler
    $(document).on('click', '#search-dvd-input', function () {
        //TODO implement
    });

    //Delete DVD icon handler
    $(document).on('click', '.deleteDvd', function (e) {
        if (confirmDelete()){
            deleteDvdEntry();
        }
    });
});

////////////////////////////////////////////////////////
// Methods
////////////////////////////////////////////////////////
/**
 * Clear out all error messages
 */
function clearErrorMsgs() {
    $('#errorMessages').empty();
}

/**
 * Clear out all entries from table to stop duplication
 */
function clearLibraryTable() {
    $('#library-entries').empty();
}

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
                $('#library-entries').append(formatDvdEntry(dvd));
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
        success: function (newDvd, status) {
            clearErrorMsgs();
            clearLibraryTable();
            loadLibrary();
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
function editDvdEntry() {

}

function confirmDelete() {
    
}

function deleteDvdEntry() {
    var dvdId = $(this).data('dvdid');


}