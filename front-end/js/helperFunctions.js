export const logout = function(session) {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/login",
        data: {
            "session":session
        },
        success: function (response) {
            if(response === "true") {
                window.location.replace("../html/index.html");
            }
        }
    });
}


export const getRestaurantsData = function() {
    let restaurants = {};

    $.ajax({
        type: "get",
        async: false,
        url: "http://localhost:3000/getRestaurants",
        success: function (data, _, xhr) {
            if(xhr.status === 200) {
                restaurants = data;
            }else {
                $('.table__body').html(`
                    <h1 class="error__message error__message--large u-text-center">Įvyko nenumatyta klaida</h1>
                `)
            }
        }
    });

    return restaurants;
};

export const renderRestaurants = function(restaurants) {
    restaurants.forEach(restaurant => {
        const {restaurantName, approved, openingHours, adress, _id} = restaurant;
        if(approved) {
            $('.grid-container').append(`
                <div class="card card--standard">
                    <div class="card__content card__vissable">
                        <h3 class="heading-third">${restaurantName}</h3>
                    </div>

                    <div class="card__content card__content--back u-text-center card__hidden">
                        <h3 class="heading-third">Adresas: ${adress}</h3>
                        <h3 class="heading-third u-margin-top-small">Darbo laikas: ${openingHours}</h3>
                    </div>

                    <div class="card__button">
                        <a href="restaurant.html?restaurant=${_id}" class="btn--arow restaurant-info">&#8594;</a>
                    </div>
                </div>
            `)
        }
    });
};
