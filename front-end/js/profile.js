"use strict";

// import * as Helper from "./helperFunctions.js";


$( document ).ready(function() {
    // $('.logout').click(Helper.logout(session));
    $('.cancel').click(() => { $('.popup').toggle(); });
    $('.confirm-delete').click(deleleteProfileConfirmed());
});


function updateProfile(e) {
    e.preventDefault();
    const name = $('#username-profile').val();
    const surname = $('#surname-profile').val();
    const address = $('#address-profile').val();

    if(!name || !surname || !address) {
        $('.error__message').html("Visi laukai turi būti užpildyti");
        return;
    }

}

function deleteProfile(e) {
    e.preventDefault();
    $('.popup').toggle();
}

const deleleteProfileConfirmed = function() {
    $.ajax({
        type: "delete",
        url: "http://localhost:3000/profile",
        data: {

        },
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                
            }
        }
    });
}


