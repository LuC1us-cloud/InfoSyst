"use strict"

import * as Helper from "./helperFunctions.js";

$( document ).ready(function() {
    const {id} = Helper.getCookieData();
    getUserHistory(id);

    $('.open-profile').click(function() {
        window.location.replace(`../html/profile.html?username=${username}`);
     });

    $('.logout').click(function() {
        Helper.deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });
});

const getUserHistory = function(id) {
    $.ajax({
        type: "get",
        url: `http://localhost:3000/orders/${id}`,
        data: {
            "client_id":id
        },
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                renderUserHistory(data);
            }else {
                $('.error__message').html('Įvyko nenumatyta klaidą')
            }
        }
    });
};

const renderUserHistory = function(orders) {
    orders.forEach(order => {
        const {order_status, order_time, order_total_price, restaurant_id} = order;
        const restaurantName = getRestaurantName(restaurant_id);
        const date = new Date(order_time);
        console.log(date.getFullYear());
        $('.table__body').append(`
            <tr>
                <td>${date.getFullYear()}-${date.getMonth()}-${date.getDate()}</td>
                <td>${restaurantName}</td>
                <td>${order_total_price}</td>
                <td>${order_status}</td>
            </tr>         
        `);
    });
};

const getRestaurantName = function(id) {
    let restaurantName;
    $.ajax({
        type: "get",
        async: false,
        url: `http://localhost:3000/getRestaurant/${id}`,
        data: {
            "id":id
        },
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                restaurantName = data.restaurantName;
            }
        }
    });

    return restaurantName;
}