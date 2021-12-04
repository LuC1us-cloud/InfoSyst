"use strict";

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    // $('.logout').click(Helper.logout(session))

    const restaurants = Helper.getRestaurantsData();
    Helper.renderRestaurants(restaurants);

     $('.open-profile').click(function() {
        window.location.replace(`../html/profile.html?username=patrikes`);
     });

     $('.open-history').click(function() {
        window.location.replace(`../html/history.html?username=patrikes`);
     });
});
