let dataService = function () {
    let self = this;

    self.getAllItems = function (callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'http://tsg-vending.herokuapp.com/items',
            success: callback,
            error: errorFunc
        });
    };

    self.vendItem = function (callback, errorFunc, moneyInput, itemId) {
        $.ajax({
            type: 'POST',
            url: 'http://tsg-vending.herokuapp.com/money/' + moneyInput + '/item/' + itemId,
            success: callback,
            error: errorFunc
        });
    }
}
