"use strict";

import * as Helper from "./helperFunctions.js"; 

$( document ).ready(function() {
    const restaurants = Helper.getRestaurantsData();
    Helper.renderRestaurants(restaurants);  

    $('.logout').click(function() {
        deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });
});


const deleteCookie = function(name) {
    document.cookie = `${name}=;`;
};