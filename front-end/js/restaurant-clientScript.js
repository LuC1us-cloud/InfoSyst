"use strict"

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    const {id} = Helper.getCookieData();

    $('.logout').click(function() {
        deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });

    $('.open-profile').click(function() {
        window.location.replace(`../html/restaurant-profile.html?id=${id}`);
    });

    $('.restaurant-orders').click(function() {

    });
});

const deleteCookie = function(name) {
    document.cookie = `${name}=;`;
};