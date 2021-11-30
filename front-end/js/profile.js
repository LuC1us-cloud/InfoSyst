"use strict";

// import * as Helper from "./helperFunctions.js";


$( document ).ready(function() {
    // $('.logout').click(Helper.logout(session));

    const searchParams = new URLSearchParams(document.location.search);

    if(searchParams.has('username')) {
        const userData = loadProfileData(searchParams.get('username'));
        appendProfileData(userData);
    }

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

const loadProfileData = function(username) {
    let userData = {};
    $.ajax({
        type: "get",
        async: false,
        url: `http://localhost:3000/profile/${username}`,
        data: {
            "username":username
        },
        success: function (response) {
            userData = response;
        }
    });

    return userData;
}

const appendProfileData = function(userData) {
    const {name, surname, adress} = userData;

    if(name) $('#username-profile').val(name);

    if(surname) $('#surname-profile').val(name);    

    if(adress) $('#surname-profile').val(name);
    
}

const deleleteProfileConfirmed = function() {
    // $.ajax({
    //     type: "delete",
    //     url: "http://localhost:3000/profile",
    //     data: {

    //     },
    //     success: function (data, _, xhr) {
    //         if(xhr.status === 200) {
    //             window.location.replace("../html/index.html");
    //         }
    //     }
    // });
}


