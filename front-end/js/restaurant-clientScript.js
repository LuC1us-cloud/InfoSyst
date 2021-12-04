"use strict"

$( document ).ready(function() {

    $.ajax({
        type: "get",
        url: "http://localhost:3000/getRestaurants",
        success: function (response) {
            console.log(response);
        }
    });

    $('.open-profile').click(function() {
        
    });

    $('.restaurant-orders').click(function() {

    });
});