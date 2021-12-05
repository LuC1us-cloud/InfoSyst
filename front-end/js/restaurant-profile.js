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
    const {adress, name, openingHours, restaurantName, surname, website} = restaurant;

    if(adress) $('#adsressRestaurant-profile').val(adress);
    if(name) $('#name2Restaurant-profile').val(name);
    if(openingHours) $('#hoursRestaurant-profile').val(openingHours);
    if(restaurantName) $('#nameRestaurant-profile').val(restaurantName);
    if(surname) $('#surnameRestaurant-profile').val(surname);
    if(website) $('#websiteRestaurant-profile').val(website);
}

function deleleteProfileConfirmed(e) {

}

function updateProfile(e) {
    e.preventDefault();

    const adress = $('#adsressRestaurant-profile').val();
    const name = $('#name2Restaurant-profile').val();
    const openingHours = $('#hoursRestaurant-profile').val();
    const restaurantName = $('#nameRestaurant-profile').val();
    const surname = $('#surnameRestaurant-profile').val();
    const website = $('#websiteRestaurant-profile').val();

    $.ajax({
        type: "post",
        url: "http://localhost:3000/editRestaurant",
        data: {
            'restaurantName':restaurantName,
            'restaurantAddress':adress,
            'name':name,
            'surname':surname,
            'openingHours':openingHours,
            'website':website
        },
        success: function (response, _, xhr) {
            if(xhr.status === 200) {
                location.reload();
            }
        }
    });
}