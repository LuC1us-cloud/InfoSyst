"use strict";

import * as Helper from "./helperFunctions.js";

let orderedElements = [];

$( document ).ready(function() {
    const searchParams = new URLSearchParams(document.location.search);
    const {username} = Helper.getCookieData();

    $('.open-profile').click(function() {
        window.location.replace(`../html/profile.html?username=${username}`);
     });

    
    if(searchParams.has('restaurant')) {
        const restaurantID = searchParams.get('restaurant');
        loadRestaurantData(restaurantID);
    }
});

const loadRestaurantData = function(id) {
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
                $('.intro__content--restaurant').html(`
                    <h1 class="error__message error__message--large u-text-center">Įvyko nenumatyta klaida</h1>
                `);
            }
        }
    });
}

const loadRestaurantMenu = function(menuid, resutaurantName) {
    $.ajax({
        type: "get",
        url: `http://localhost:3000/menu/${menuid}`,
        data: {
            "menuId": menuid
        },
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                renderRestaurantMenu(data, resutaurantName);
            }
        }
    });

}

const renderRestaurantMenu = function(menu, restaurantName) {
    $('.menu-header').html(`
        <span class="highlight-green">${restaurantName}</span>
        <span class="highlight-dark">meniu</span>
    `);

    const { items } = menu;
    items.forEach(element => {
        const { description, name, price } = element;

        $('.grid-container').append(`
            <div class="card card--small">
            <div class="card__content card__vissable">
                <h3 class="heading-third">${name}</h3>
            </div>

            <div class="card__content card__content--back u-text-center card__hidden">
                <h3 class="heading-third">${description}</h3>
                <h3 class="heading-third u-margin-top-small">Kaina: ${price}</h3>
            </div>

            <div class="card__button">
                <a href="#!" class="btn--cart restaurant-info" id="${name}-${price}"><i class="fas fa-shopping-cart"></i></a>
            </div>
        </div>
        `);
    });

    document.querySelectorAll('.btn--cart').forEach(button => {
        button.addEventListener('click', function(e) {
            orderedElements.push(e.target.parentNode.id);
            $('.order-count').html(`${orderedElements.length}`)

            if($('.order-count').css('visibility') === 'hidden') {
                $('.order-count').removeClass('u-visibility-hidden');
            }
        });
    }); 
};

const renderRestaurant = function(restaurant) {
    const {restaurantName, openingHours, adress, menu} = restaurant;

    $('.intro__content--restaurant').html(`
        <h2 class="heading-header"><span class="highlight-dark">${restaurantName}</span></h2>
        <h2 class="heading-header"><span class="highlight-green">Adresas: </span> ${adress}</h2>
        <h2 class="heading-header"><span class="highlight-green">Darbo valandos:</span> ${openingHours}</h2>
    `);

    loadRestaurantMenu(menu[0], restaurantName);
};