function loadContacts() {
    clearContactTable();

    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        // url: 'http:/localhost:8080/contacts',
        url: 'https://tsg-contactlist.herokuapp.com/contacts',
        success: function (data, status) {
            alert("connected");

            $.each(data, function (index, contact) {
                var name = contact.firstName + ' ' + contact.lastName;
                var company = contact.company;
                var id = contact.contactId;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + company + '</td>';
                row += '<td><a>Edit</a></td>';
                row += '<td><a>Delete</a></td>';
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

function clearContactTable() {
    $('#contentRows').empty();
}

$(document).ready(function () {

    loadContacts();

    $(document).on('clock', '#add-button', function (event) {
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
        })
    });

});