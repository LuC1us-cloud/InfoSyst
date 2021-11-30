"use strict";


$( document ).ready(function() {
    const searchParams = new URLSearchParams(document.location.search);
    
    if(searchParams.has('restaurant')) {
        const restaurantID = searchParams.get('restaurant');
        loadRestaurantData(restaurantID);
        loadRestaurantMenu(restaurantID);
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
                `)
            }
        }
    });
}

const loadRestaurantMenu = function(id) {
    // $.ajax({
    //     type: "method",
    //     url: "url",
    //     data: "data",
    //     dataType: "dataType",
    //     success: function (response) {
            
    //     }
    // });
}

const renderRestaurant = function(restaurant) {
    const {restaurantName, openingHours, adress} = restaurant;

    $('.intro__content--restaurant').html(`
        <h2 class="heading-header"><span class="highlight-dark">${restaurantName}</span></h2>
        <h2 class="heading-header"><span class="highlight-green">Adresas: </span> ${adress}</h2>
        <h2 class="heading-header"><span class="highlight-green">Darbo valandos:</span> ${openingHours}</h2>
    `);
}