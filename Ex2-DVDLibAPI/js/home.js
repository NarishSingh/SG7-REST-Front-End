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

    //View DVD title handler
    $(document).on('click', '.dvd-entry', );


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
        <td class="dvd-entry">${dvd.title}</td>
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
 * Validate a year input for dvd entry creation or editing
 * @param yearInput {string} a valid year
 * @returns {boolean} true if param has 4 digits
 */
function validateReleaseYearInput(yearInput) {
    // let acceptable = new RegExp('\\d{4}'); //not working?
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

/**
 * Create a new DVD entry via POST
 */
function createDvdEntry(dvd) {
    ds.createDvd(dvd, loadLibrary, errorMsg);
}

/**
 * DELETE a DVD entry
 * @param dvdId {number} id of an existing dvd in library
 */
function deleteDvdEntry(dvdId) {
    ds.deleteDvd(dvdId, loadLibrary, errorMsg);
}

/*HANDLERS*/
/**
 * Load all titles from server via GET and render to table
 */
function loadLibrary() {
    clearErrorMsgs();
    clearLibraryTable();

    ds.readAllDvds(function (dvdArr, status) {
        $.each(dvdArr, function (i, dvd) {
            $('#library-entries').append(formatDvdEntry(dvd));
        });
    }, errorMsg);
}

/**
 * Handler for create dvd button click and its respective modal
 * @param e {event}
 */
function onCreateDvdBtnClicked(e) {
    $('#create-dvd-modal').modal();

    //create DVD button from modal handler
    $(document).on('click', '#create-confirm-btn', function (e) {
        if (validateReleaseYearInput($('#create-releaseYr-input').val())) {
            let dvd = {
                title: $('#create-title-input').val(),
                releaseYear: $('#create-releaseYr-input').val(),
                director: $('#create-director-input').val(),
                rating: $('#create-rating-select').val(),
                notes: $('#create-notes-input').val()
            };

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

/**
 * Handler for a delete dvd icon and its confirmation modal
 * @param e {event}
 */
function onDeleteBtnClicked(e) {
    let dvdId = $(this).data("dvdid");
    $('#del-confirm-modal').modal();

    $(document).on('click', '#delete-confirm-btn', function (e) {
        deleteDvdEntry(dvdId);
        $('#del-confirm-modal').modal("hide");
    });
}
