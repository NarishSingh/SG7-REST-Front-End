/*http://tsg-vending.herokuapp.com/*/

// NAMESPACE
let ds = new DataService();
let money = 0.0;
let itemCt = 1;
let itemGrid = $('#vm-item-grid');

///////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////
$(document).ready(function () {
    ds.getAllItems(refreshItems, alertError);
});

///////////////////////////////////////////////////
// Methods
///////////////////////////////////////////////////
/**
 * Format an item from db into HTML for rendering
 * @param item {object} contains id, name, price, quantity
 */
function formatItemBox(item) {
    let itemDiv = `<div class="item-box">
        <p>` + itemCt + `</p>
        <p class="font-weight-bold">${item.name}</p>
        <p>$ ${item.price}</p>
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
    itemCt = 1;
    itemGrid.empty();

    for (let item of itemList) {
        itemGrid.append(formatItemBox(item));
    }
}

/**
 * Add money to machine pre-purchase
 * @param money {float} dollars and cents
 */
function updateMoney(money) {

}

/**
 * Render transaction messages to user
 * @param msg {string} messages concerning items, change, or purchase success
 */
function updateMsg(msg) {

}

/**
 * Render coin return to user
 * @param change {string} containing all change to be returned to user post-purchase
 */
function updateChange(change) {

}

/**
 * Event handler - add a quarter to money
 * @param e {event} button click
 */
function onAddQuarterClicked(e) {

}

/**
 * Event handler - add a dime to money
 * @param e {event} button click
 */
function onAddDimeClicked(e) {

}

/**
 * Event handler - add a nickel to money
 * @param e {event} button click
 */
function onAddNickelClicked(e) {

}

/**
 * Event handler - add a penny to money
 * @param e {event} button click
 */
function onAddPennyClicked(e) {

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

}

/**
 * Error handler - for attempting to purchase out of stock items
 * @param error {error} 422 Unprocessable Entity from API
 */
function handleGetItemsError(error) {

}

/**
 * Error handler - for attempting to purchase a invalid item, or valid item with short change
 * @param error {error} 422 Unprocessable Entity from API
 */
function handleVendItemsError(error) {

}

/**
 * Create an alert out of JSON response
 * @param msg {string} http status from JSON
 */
function alertError(msg) {
    alert(msg.responseJSON.message);
}