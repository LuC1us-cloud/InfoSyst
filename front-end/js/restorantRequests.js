"use strict"

$( document ).ready(function() {
    $('.logout').click(function() {
        deleteCookie('myCookie');
        window.location.replace('../html/index.html');
    });

    getRestaurantRequests();
}); 

const getRestaurantRequests = function() {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/restaurants/unapproved",
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                renderRestaurantRequests(data);
            }else {
                $('.error__message').html('Įvyko nenumatyta klaida');   
            }
        }
    });
};

const renderRestaurantRequests = function(requests) {
    if(requests.length === 0) {
        $('.error__message').html('Nėra laukiančių užklausų');    
    }
    requests.forEach(element => {
        const {restaurantName, _id} = element;

        $('.table__body').append(`
            <tr>
                <th>${restaurantName}</th>
                <th><a href="#!" class="btn btn--green btn--login btn--login-header accept ${_id}">Priimti</a></th>
                <th><a href="#!" class="btn btn--red decline ${_id}">Atšaukti</a></th>
            </tr>
        `);    
    });


    document.querySelectorAll('.accept').forEach(button => {
        button.addEventListener("click", function(e) {
            toggleRestaurant(e);
        })
    });

    document.querySelectorAll('.decline').forEach(button => {
        button.addEventListener("click", function(e) {
            toggleRestaurant(e);
        })
    });
};

const deleteCookie = function(name) {
    document.cookie = `${name}=;`;
};

const toggleRestaurant = function(e) {
    const id = e.target.classList[5];

    if(e.target.classList[4] === 'accept') {
        $.ajax({
            type: "post",
            url: "http://localhost:3000/toggleRestaurant",
            data: {
                "_id":id
            },
            success: function (data,_,xhr) {
                if(xhr.status === 200) {
                    location.reload();
                }
            }
        });
    }
};
