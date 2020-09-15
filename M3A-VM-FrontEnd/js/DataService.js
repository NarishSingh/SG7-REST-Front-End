let DataService = function () {
    let self = this;

    self.getAllItems = function (callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'http://tsg-vending.herokuapp.com/items',
            success: callback,
            error: errorFunc
        });
    };

    self.vendItem = function (moneyInput, itemId, callback, errorFunc) {
        $.ajax({
            type: 'POST',
            url: 'http://tsg-vending.herokuapp.com/money/' + moneyInput + '/item/' + itemId,
            success: callback,
            error: errorFunc
        });
    }
}
