let ds = new DvdDataService();

////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////
$(document).ready(function () {
    loadLibrary();

    //create DVD trigger handler
    $(document).on('click', '#create-dvd-btn', onCreateDvdBtnClicked);

    //Delete DVD icon handler
    $(document).on('click', '.deleteDvd', onDeleteBtnClicked);

    /*
    //search DVD button handler
    $(document).on('click', '#search-dvd-input', function () {

    });

    //Edit DVD icon handle
    $(document).on('click', '.editdvd', function () {
        //get dvd from id and pull in original entries
        //TODO implement

        $('#edit-dvd-modal').modal();


    });
     */

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
 * @param dvd {object} containing id, title, release year, director, rating, notes
 * @returns {string} HTML strings to be appended and rendered
 */
function formatDvdEntry(dvd) {
    return `<tr>
        <td>${dvd.title}</td>
        <td>${dvd.releaseYear}</td>
        <td>${dvd.director}</td>
        <td>${dvd.rating}</td>
        <td><a href="#" data-dvdid='${dvd.id}' class="editDvd"><i class="far fa-edit"></i></a></td>
        <td><a href="#" data-dvdid='${dvd.id}' class="deleteDvd"><i class="far fa-trash-alt"></i></a></td>
    </tr>`;
}

/**
 * Render error message on page
 */
function errorMsg() {
    $('#errorMessages')
        .append($('<li>'))
        .attr({class: 'list-group-item list-group-item-danger'})
        .text("Error Calling Server");
}

/**
 * Load all titles from server via GET and render to table
 */
function loadLibrary() {
    clearLibraryTable();

    ds.readAllDvds(function (dvdArr, status) {
        $.each(dvdArr, function (i, dvd) {
            $('#library-entries').append(formatDvdEntry(dvd));
        });
    }, errorMsg);
}

/**
 * Create a new DVD entry via POST
 */
function createDvdEntry(dvd) {
    ds.createDvd(dvd, function () {
        clearErrorMsgs();
        loadLibrary();
    }, errorMsg);
}

function onCreateDvdBtnClicked(e) {
    $('#create-dvd-modal').modal();

    let dvd = {
        title: $('#create-title-input').val(),
        releaseYear: $('#create-releaseYr-input').val(),
        director: $('#create-director-input').val(),
        rating: $('#create-rating-select').val(),
        notes: $('#create-notes-input').val()
    };

    //create DVD button from modal handler
    $(document).on('click', '#create-confirm-btn', function (e) {
        if (validateReleaseYearInput($('#create-releaseYr-input').val())) {
            createDvdEntry(dvd);

            //reset and hide
            $('#create-title-input').val('');
            $('#create-releaseYr-input').val('');
            $('#create-director-input').val('');
            $('#create-rating-select').val("G"); //Default selection
            $('#create-notes-input').val('');
            $('#create-dvd-modal').modal("hide");
        }
    });
}

function getDvdById(e) {
    e.preventDefault();

    let dvdId = $(this).data("dvdid"); //FIXME value is coming back undefined

    return $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
        success: function () {
            clearErrorMsgs();
            //TODO is there something else to do here?
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

/**
 * DELETE a DVD entry
 * @param dvdId {number} id of an existing dvd in library
 */
function deleteDvdEntry(dvdId) {
    ds.deleteDvd(dvdId, function () {
        clearErrorMsgs();
        loadLibrary();
    }, errorMsg);

    /*
    $.ajax({
        type: 'DELETE',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
        success: function (status) {

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });

     */
}

function onDeleteBtnClicked(e) {
    let dvdId = $(this).data("dvdid");
    $('#del-confirm-modal').modal();

    $(document).on('click', '#delete-confirm-btn', function () {
        deleteDvdEntry(dvdId);
        $('#del-confirm-modal').modal("hide");
    });
}

/**
 * Validate a year input for dvd entry creation or editing
 * @param yearInput {string} a valid year
 * @returns {boolean} true if param has 4 digits
 */
function validateReleaseYearInput(yearInput) {
    // let acceptable = new RegExp('\\d{4}');
    let acceptable = /[0-9]{4}/;

    if (acceptable.test(yearInput)) {
        return true;
    } else {
        $('#errorMessages')
            .append($('<li>'))
            .attr({class: 'list-group-item list-group-item-danger'})
            .text("4 digits required. Please re-enter a valid release year.");

        return false;
    }
}
