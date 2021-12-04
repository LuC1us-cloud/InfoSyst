"use strict";

import * as Helper from "./helperFunctions.js"; 

$( document ).ready(function() {
    const restaurants = Helper.getRestaurantsData();
    Helper.renderRestaurants(restaurants);  

    
});
