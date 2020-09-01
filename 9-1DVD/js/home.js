let counter = 2;

const dvdList = [{
    dvdId: 1,
    title: 'Crossroads',
    releaseYear: '1986',
    director: 'Walter Hill',
    rating: 'R'
}];

/*PAGE MANIP*/
/**
 * Format a row of the library table
 * @param {DVD} dvd 
 * @returns {String} formatted html elements for displaying the dvd
 */
function formatRow(dvd) {
    return `<tr>
    <td>${dvd.title}</td>
    <td>${dvd.releaseYear}</td>
    <td>${dvd.director}</td>
    <td>${dvd.rating}</td>
    <td>
        <a href="#" data-dvdid='${dvd.dvdId}' class='editDVD'><i class="fa fa-pencil"></i></a>
        <a href="#" data-dvdid='${dvd.dvdId}' class='deleteDVD'><i class="fa fa-trash"></i></a>
    </td>
</tr>`
}

/**
 * Refresh the library and appends all dvd's for display
 * @param {List} dvds all dvd's in library
 */
function refreshTable(dvds) {
    let dvdTable = $("#dvdTable>tbody"); //emmet annotations

    dvdTable.empty();

    for (let i = 0; i < dvds.length; i++) {
        const dvd = dvds[i];
        $(dvdTable).append(formatRow(dvd));
    }
}

/*DATA MANIP*/
/**
 * Remove a DVD from library list
 * @param {int} dvdId 
 */
function removeDvd(dvdId) {
    let tempList = [];

    for (let i = 0; i < dvdList.length; i++) {
        let dvd = dvdList[i];
        if (dvd.dvdId != dvdId) {
            tempList.push(dvd);
        }
    }

    dvdList = tempList;
}

function getDvdById(dvdId) {
    for (let i = 0; i < dvdList.length; i++) {
        const dvd = dvdList[i];
        if (dvd.dvdId == dvdId) {
            return dvd;
        }
    }

    return null;
}

/*PAGE EVENTS*/
function onAddDvdSubmit(e) {
    e.preventDefault(); //stops button click from other actions

    let form = $(this);

    let dvd = {
        dvdId: counter++,
        title: $("#title").val(), //returns value
        releaseYear: $("#releaseYear").val(),
        director: $("#director").val(),
        rating: $("#rating").val()
    }

    setTimeout(function() {
        dvdList.push(dvd);
        refreshTable(dvdList);
        $(form)[0].reset();
    }, 1000); //wait for 1s to clear table
}

function onDeleteDvdClick(e) {
    e.preventDefault();

    let dvdId = $(this).data('dvdid');
    removeDvd(dvdId);
    refreshTable(dvdList);
}

function onEditDvdClick(e) {
    e.preventDefault();

    let dvdId = $(this).data("dvdid");
    let dvd = getDvdById();
}



/*MAIN*/
$(document).ready(function() {
    refreshTable(dvdList);

    $(document).on('submit', "#addDvd", onAddDvdSubmit);

    $(document).on('click', '.deleteDvd', onDeleteDvdClick);

    $(document).on('click', '.editDvd', onEditDvdClick);
});