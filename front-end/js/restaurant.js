"use strict";

import * as Helper from "./helperFunctions.js";

let orderedElements = [];
let orderTotal = 0;

$( document ).ready(function() {
    const searchParams = new URLSearchParams(document.location.search);
    const {username} = Helper.getCookieData();

    if(searchParams.has('restaurant')) {
        const restaurantID = searchParams.get('restaurant');
        loadRestaurantData(restaurantID);
    }

    $('.open-profile').click(function() {
        window.location.replace(`../html/profile.html?username=${username}`);
    });

    $('.popup__close').click(() => {$('.popup').toggle();});

    $('.btn--bottom').click(function() {
        $('.order__content').html('');
        if(orderedElements.length === 0) {
            $('.order__content').html(`<p class="error__message u-text-center" style="font-size:2rem">
            Krepšelis yra tuščias</p>`);
        }else {
            orderedElements.forEach(element => {
                let orderedItem, price;
                [orderedItem, price] = element.split('-');
                orderTotal += parseFloat(price);

                $('.order__content').append(`
                    <h3 class="parahraph">${orderedItem}</h3>
                    <h3 class="parahraph u-float-right">${price}</h3>
                    <br>
                `);
            })

            $('.order__content').append(`
                <hr class="line u-margin-top-small u-margin-bottom-small">
            
                <h3 class="parahraph">Suma</h3>
                <h3 class="parahraph u-float-right">${orderTotal.toFixed(2)}</h3> 
            `);
        }

        $('.popup').toggle();
    });

    $('.cancel').click(function() {
        clearOrder();
    });

    $('.logout').click(function() {
        deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });

    $('.confirm-order').click(function() {
        const {id} = Helper.getCookieData();
        const restaurantID = searchParams.get('restaurant');

        $.ajax({
            type: "post",
            url: "http://localhost:3000/orderFood",
            data: {
                "client_id":id,
                "restaurant_id":restaurantID,
                "order_total_price":orderTotal,
                "order_items":orderedElements,
                "tip":0,
                "order_address":"adress",
                "order_phone":"112",
                "order_notes":""
            },
            success: function (data,_,xhr) {
                if(xhr.status === 200){
                    successfullOrder();
                }else{

                }
            }
        });
    });
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

    document.querySelectorAll('.card__button').forEach(button => {
        button.addEventListener('click', function(e) {
            if(e.target.className ==='fas fa-shopping-cart') {
                orderedElements.push(e.target.parentNode.id);
            }else {
                orderedElements.push(e.target.id);
            }
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

const clearOrder = function() {
    orderedElements = [];
    orderTotal = 0;
    $('.order__content').html('');
    $('.order-count').addClass('u-visibility-hidden');

    $('.popup').toggle();
}

const successfullOrder = function() {
    clearOrder();
    $('.message').toggle();

    setTimeout(() => {
        $('.message').toggle();
    }, 4000);
};

const deleteCookie = function(name) {
    document.cookie = `${name}=;`;
};

