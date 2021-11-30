"use strict";

// import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    // $('.logout').click(Helper.logout(session))

    const restaurants = getRestaurantsData();
    // REMOVE THIS ONCE BACKEDN WILL BE FIXED
    restaurants.splice(0,1);
    renderRestaurants(restaurants)

    $('.open-profile').click(function() {
        const username = "patrikes";

        window.location.replace(`../html/profile.html?username=${username}`);
    });

    // $('.card--standard').hover(function(e) {
    //     $('.card__content--back').toggle("slow");
    // })
});


const getRestaurantsData = function() {
    let restaurants = {};

    $.ajax({
        type: "get",
        async: false,
        url: "http://localhost:3000/getRestaurants",
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                restaurants = data;
            }else {
                $('.table__body').html(`
                    <h1 class="error__message error__message--large u-text-center">Įvyko nenumatyta klaida</h1>
                `)
            }
        }
    });

    return restaurants;
};

const renderRestaurants = function(restaurants) {
    restaurants.forEach(restaurant => {
        const {restaurantName, approved, openingHours, adress, _id} = restaurant;
        if(approved) {
            $('.grid-container').append(`
                <div class="card card--standard">
                    <div class="card__content card__vissable">
                        <h3 class="heading-third">${restaurantName}</h3>
                    </div>

                    <div class="card__content card__content--back u-text-center card__hidden">
                        <h3 class="heading-third">Adresas: ${adress}</h3>
                        <h3 class="heading-third u-margin-top-small">Darbo laikas: ${openingHours}</h3>
                    </div>

                    <div class="card__button">
                        <a href="" class="btn--arow btn--${_id}">&#8594;</a>
                    </div>
                </div>
            `)
        }
    });
}