let DvdDataService = function () {
    let self = this;

    self.readAllDvds = function (callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvds/',
            success: callback,
            error: errorFunc
        });
    }

    self.readDvdById = function (dvdId, callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
            success: callback,
            error: errorFunc
        });
    }

    self.readDvdByTitle = function (title, callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvds/title/' + title,
            success: callback,
            error: errorFunc
        });
    }

    self.readDvdByReleaseYr = function (releaseYr, callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvds/year/' + releaseYr,
            success: callback,
            error: errorFunc
        });
    }

    self.readDvdByDirector = function (director, callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvds/director/' + director,
            success: callback,
            error: errorFunc
        });
    }

    self.readDvdByRating = function (rating, callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'https://tsg-dvds.herokuapp.com/dvds/rating/' + rating,
            success: callback,
            error: errorFunc
        });
    }

    self.createDvd = function (callback, errorFunc) {
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
            success: callback,
            error: errorFunc
        });
    }
    
    self.updateDvd = function (dvdId, callback, errorFunc) {
        $.ajax({
            type: 'PUT',
            url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
            data: JSON.stringify({
                id: dvdId,
                title: $('#edit-title-input').val(),
                releaseYear: $('#edit-releaseYr-input').val(),
                director: $('#edit-director-input').val(),
                rating: $('#edit-rating-select').val(),
                notes: $('#edit-notes-input').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: callback,
            error: errorFunc
        });
    }

    self.deleteDvd = function (dvdId, callback, errorFunc) {
        $.ajax({
           type: 'DELETE',
           url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
            success: callback,
            error: errorFunc
        });
    }
}