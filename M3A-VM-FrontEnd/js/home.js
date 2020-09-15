/*http://tsg-vending.herokuapp.com/*/

/*NAMESPACE*/
let ds = new DataService();
let money = 0.0;
let itemCt = 1;
let itemGrid = $('#vm-item-grid');
let itemSelected;

/*MAIN*/
$(document).ready(function () {
    ds.getAllItems(refreshItems, updateMsg);

    /*MONEY CLICK EVENT HANDLERS*/
    $(document).on('click', '#add-dollar-btn', onAddDollarClicked);
    $(document).on('click', '#add-quarter-btn', onAddQuarterClicked);
    $(document).on('click', '#add-dime-btn', onAddDimeClicked);
    $(document).on('click', '#add-nickel-btn', onAddNickelClicked);

    /*PURCHASE EVENT HANDLERS*/
    $(document).on('click', '.item-box', onItemBoxClicked);
    $(document).on('click', '#purchase-btn', onPurchaseItemClicked);
    $(document).on('click', '#change-return-btn', onChangeReturnClicked);
});

/*METHODS*/

/*Rendering*/
/**
 * Format an item from db into HTML for rendering
 * @param item {object} contains id, name, price, quantity
 */
function formatItemBox(item) {
    item.currentItemCount = itemCt; //save item count to item

    //format price
    let itemPrice = parseFloat(item.price);
    let itemPriceString = "$" + itemPrice.toFixed(2);

    let itemDiv = `<div class="item-box" data-itemct='${item.currentItemCount}' data-itemname='${item.name}'>
        <p>` + itemCt + `</p>
        <p class="font-weight-bold">${item.name}</p>
        <p>` + itemPriceString + `</p>
        <p>Quantity: ${item.quantity}</p>
    </div>`;

    itemCt++;

    return itemDiv;
}

/**
 * Render all items to page
 * @param itemList {Array} array from the API response
 */
function refreshItems(itemList) {
    //restart counter and clear grid
    itemCt = 1;
    itemGrid.empty();

    for (let item of itemList) {
        itemGrid.append(formatItemBox(item));
    }
}

/**
 * Add money to machine pre-purchase
 * @param money {number} dollars and cents
 */
function updateMoney(money) {
    let moneyString = '$' + money.toFixed(2);

    $('#money-in').val(moneyString);
}

/**
 * Render transaction messages to user
 * @param msg {string} messages concerning items, change, or purchase success
 */
function updateMsg(msg) {
    $('#purchase-feedback').val(msg);
}

/**
 * Render the temp item count for UI
 * @param itemDescp {string} temp item count from clicked on item
 */
function updateItemSelected(itemDescp) {
    $('#item-to-buy').val(itemDescp);
}

/**
 * Render coin return to user
 * @param change {string} containing all change to be returned to user post-purchase
 */
function updateChange(change) {

}

/*Handlers*/
/**
 * Event handler - add a dollar to money
 * @param e {event} button click
 */
function onAddDollarClicked(e) {
    updateMoney((money += 1.00));
    updateMsg("Dollar added");
}

/**
 * Event handler - add a quarter to money
 * @param e {event} button click
 */
function onAddQuarterClicked(e) {
    updateMoney((money += 0.25));
    updateMsg("Quarter added");
}

/**
 * Event handler - add a dime to money
 * @param e {event} button click
 */
function onAddDimeClicked(e) {
    updateMoney((money += 0.10));
    updateMsg("Dime added");
}

/**
 * Event handler - add a nickel to money
 * @param e {event} button click
 */
function onAddNickelClicked(e) {
    updateMoney((money += 0.05));
    updateMsg("Nickle added");
}

/**
 * Event handler - add a penny to money
 * @param e {event} button click
 */
function onAddPennyClicked(e) {
    updateMoney((money += 0.01));
    updateMsg("Penny added");
}

/**
 * Event handler - select an item by clicking item box
 * @param e {event} button click
 */
function onItemBoxClicked(e) {
    let itemCt = $(this).data('itemct');
    let itemName = $(this).data('itemname');
    let itemString = itemCt + " - " + itemName;

    updateItemSelected(itemString);
}

/**
 * Event handler - attempt purchase
 * @param e {event} button click
 */
function onPurchaseItemClicked(e) {

}

/**
 * Event handler - clear all feedback on screen and money in machine
 * @param e {event} button click
 */
function onChangeReturnClicked(e) {
    money = 0;
    updateMoney(money);
    $('#purchase-feedback').val('');
    $('#item-to-buy').val('');
    $('#change-coins').val('');
}

/*Errors*/
/**
 * Error handler - for attempting to purchase out of stock items
 * @param error {error} 422 Unprocessable Entity from API
 */
function handleOutOfStockError(error) {

}

/**
 * Error handler - for attempting to purchase a valid item with short change
 * @param error {error} 422 Unprocessable Entity from API
 */
function handleShortChangeError(error) {

}

/**
 * Create an alert out of JSON response
 * @param msg {string} http status from JSON
 */
function alertError(msg) {
    alert(msg.responseJSON.message); //debug only
}