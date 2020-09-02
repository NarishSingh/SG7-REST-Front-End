$(document).ready(function () {

    /**
     * Retrieve all contacts
     */
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/contacts',
        success: function (contactArray) {
            //check if cross origin is working, webstorm seems to handle it already...
            // alert("success");

            // get a reference to the 'allContacts' div
            var contactsDiv = $('#allContacts');

            // go through each of the returned contacts and append the info to the contactsDiv
            // render to a p div
            $.each(contactArray, function (index, contact) {
                var contactInfo = '<p>';
                contactInfo += 'Name: ' + contact.firstName + ' ' + contact.lastName + '<br>';
                contactInfo += 'Company: ' + contact.company + '<br>';
                contactInfo += 'Email: ' + contact.email + '<br>';
                contactInfo += 'Phone: ' + contact.phone + '<br>';
                contactInfo += '<hr>';

                contactsDiv.append(contactInfo);
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("FAILURE!");
        }
    });

    /**
     * On click, add new contact using the form data
     */
    $('#add-button').on('click', function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/contact',
            //converts obj to JSON string form
            data: JSON.stringify({
                firstName: $('#add-first-name').val(),
                lastName: $('#add-last-name').val(),
                company: $('#add-company').val(),
                phone: $('#add-phone').val(),
                email: $('#add-email').val()
            }),
            //specifies content type to accept from the POST
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json', //TODO figure out what this is, probably just specifies data type
            success: function (contact) {
                // get a reference to the 'newContact' div
                var newContactDiv = $('#newContact');

                // append contact info to the newContact div and render to page
                var contactInfo = '<p>';
                contactInfo += 'Name: ' + contact.firstName + ' ' + contact.lastName + '<br>';
                contactInfo += 'Company: ' + contact.company + '<br>';
                contactInfo += 'Email: ' + contact.email + '<br>';
                contactInfo += 'Phone: ' + contact.phone + '<br>';
                contactInfo += '<hr>';

                newContactDiv.append(contactInfo);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('FAILURE');
            }
        });

    });

})
