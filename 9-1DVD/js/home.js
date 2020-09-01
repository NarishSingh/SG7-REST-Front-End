const dvdList = [{
    dvdId: 1,
    title: 'Crossroads',
    releaseYear: '1986',
    director: 'Walter Hill',
    rating: 'R'
}];

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

function refreshTable(dvds) {
    let dvdTable = $("#dvdTable>tbody"); //emmet annotations

    dvdTable.empty();

    for (let i = 0; i < dvds.length; i++) {
        const dvd = dvds[i];
        $(dvdTable).append(formatRow(dvd));
    }
}

$(document).ready(function() {
    refreshTable(dvdList);
});