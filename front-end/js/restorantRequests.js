"use strict"

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    const restaurants = Helper.getRestaurantsData();
    renderResturantRequests(restaurants);
});

const renderResturantRequests = function(restaurants) {
    console.log(restaurants);
};


