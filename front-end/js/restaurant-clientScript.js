"use strict"

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    const {id} = Helper.getCookieData();

    $('.open-profile').click(function() {
        window.location.replace(`../html/restaurant-profile.html?id=${id}`);
    });

    $('.restaurant-orders').click(function() {

    });
});