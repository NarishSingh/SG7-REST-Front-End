/**
 * Load contacts from server via GET request
 */
function loadContacts() {
    clearContactTable();

    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        // url: 'http:/localhost:8080/contacts',
        url: 'https://tsg-contactlist.herokuapp.com/contacts',
        success: function (data, status) {
            // alert("connected");

            $.each(data, function (index, contact) {
                var name = contact.firstName + ' ' + contact.lastName;
                var company = contact.company;
                var id = contact.contactId;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + company + '</td>';
                row += '<td class="align-middle" onclick="showEditForm(' + id + ')"><a>Edit</a></td>';
                row += '<td class="align-middle"><a>Delete</a></td>';
                row += '</tr>';

                contentRows.append(row);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>'))
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.');
        }
    });
}

/**
 * Clear all previous rendered contacts
 */
function clearContactTable() {
    $('#contentRows').empty();
}

/**
 * Reveal the edit form, hide table, and retrieve original data for the contact being edited via GET
 * @param contactId {int} the id for the contact to be edited
 */
function showEditForm(contactId) {
    $('errorMessages').empty();

    //retrieve original info for contact
    $.ajax({
        type: 'GET',
        url: 'https://tsg-contactlist.herokuapp.com/contact/' + contactId,
        success: function (data, status) {
            $('#edit-first-name').val(data.firstName);
            $('#edit-last-name').val(data.lastName);
            $('#edit-company').val(data.company);
            $('#edit-email').val(data.email);
            $('#edit-phone').val(data.phone);
            $('#edit-contact-id').val(data.contactId);

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service'));
        }
    });

    //hide table and show edit form
    $('#contactTableDiv').hide();
    $('#editFormDiv').show();
}

/**
 * Clear error msgs and form and hide form
 */
function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-first-name').val('');
    $('#edit-last-name').val('');
    $('#edit-company').val('');
    $('#edit-phone').val('');

    $('#editFormDiv').hide();
    $('#contactTableDiv').show();

}

/**
 * main
 */
$(document).ready(function () {

    loadContacts();

    //add button handler
    $(document).on('click', '#add-button', function (event) {
        $.ajax({
            type: 'POST',
            url: 'https://tsg-contactlist.herokuapp.com/contact',
            data: JSON.stringify({
                firstName: $('#add-first-name').val(),
                lastName: $('#add-last-name').val(),
                company: $('#add-company').val(),
                phone: $('#add-phone').val(),
                email: $('#add-email').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function (data, status) {
                //clear error msgs
                $('#errorMessages').empty();

                //Clear form
                $('#add-first-name').val('');
                $('#add-last-name').val('');
                $('#add-company').val('');
                $('#add-phone').val('');
                $('#add-email').val('');

                //its been POSTed, reload to see new contact
                loadContacts();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>'))
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.');
            }
        });
    });

    //update button handler
    $(document).on('click', '#edit-button', function (event) {
        $.ajax({
            type: 'PUT',
            url: 'https://tsg-contactlist.herokuapp.com/contact/' + $('#edit-contact-id').val(),
            data: JSON.stringify({
                contactId: $('#edit-contact-id').val(),
                firstName: $('#edit-first-name').val(),
                lastName: $('#edit-last-name').val(),
                company: $('#edit-company').val(),
                email: $('#edit-email').val(),
                phone: $('#edit-phone').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty(); //empty error msgs
                hideEditForm();
                loadContacts();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service'));
            }
        });
    });
});