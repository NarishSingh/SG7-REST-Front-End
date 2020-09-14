/*9-14 Lecture Notes*/
let dataService = function () {
    let self = this; //get the "pkg"

    //setup methods
    self.getAllItems = function (callback, errorFunc) {
        $.ajax({
            type: 'GET',
            url: 'http://tsg-vending.herokuapp.com/items',
            success: callback, //we pass in functions as params, this is what we want to happen when something returns
            error: errorFunc // or errors out
        });
    };

    self.vendItem = function (callback, errorFunc) {
        //TODO need double moneyTotal, and either Item item or int itemId as params also for url

        $.ajax({
            type: 'POST',
            url: '',
            success: callback,
            error: errorFunc
        });
    }
}
