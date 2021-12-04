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
                console.log(data);
            }else {

            }
        }
    });
};