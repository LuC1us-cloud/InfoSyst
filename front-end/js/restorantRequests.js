"use strict"

$( document ).ready(function() {
    getRestaurantRequests();
});

const renderResturantRequests = function(restaurants) {
    console.log(restaurants);
};

const getRestaurantRequests = function() {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/restaurants/unapproved",
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                console.log(data);
            }
        }
    });
};

