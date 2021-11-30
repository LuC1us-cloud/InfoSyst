"use strict";

$( document ).ready(function() {
    const searchParams = new URLSearchParams(document.location.search);

    if(searchParams.has('id')) {
        loadProfileData(searchParams.get('id'));
    }

    $('.cancel').click(() => { $('.popup').toggle(); });
    $('.confirm-delete').click(deleleteProfileConfirmed());
});

function deleteProfile(e) {
    e.preventDefault();
    $('.popup').toggle();
}

const loadProfileData = function(id) {
    $.ajax({
        type: "get",
        url: `http://localhost:3000/getRestaurant/${id}`,
        data: {
            "id":id
        },
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                renderRestaurant(data);
            }else {
                $('.error__message').val(`Įvyko nenumatyta klaida`)
            }
        }
    });
}

const renderRestaurant = function(restaurant) {
    
}