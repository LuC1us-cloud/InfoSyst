"use strict";

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    const restaurants = Helper.getRestaurantsData();
    Helper.renderRestaurants(restaurants);

    const {username} = Helper.getCookieData();

    $('.logout').click(function() {
        deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });

     $('.open-profile').click(function() {
        window.location.replace(`../html/profile.html?username=${username}`);
     });

     $('.open-history').click(function() {
        window.location.replace(`../html/history.html`);
     });
});


const deleteCookie = function(name) {
    document.cookie = `${name}=;`;
};