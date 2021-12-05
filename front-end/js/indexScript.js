"use strict";

$( document ).ready(function() {

    $('.btn--login-header').click(function () { 
        $('.popup').toggle();
        $('.form__login').append(
            `<label for="username" class="form__label">Slapyvardis</label>
            <input type="text" id="username-login" name="username" placeholder="Slapyvardis" class="form__input form__input--login" required>

            <label for="password-login" class="form__label">Slaptažodis</label>
            <input type="password" id="password-login" name="password-login" placeholder="Slaptažodis" class="form__input form__input--login" required>
            <i></i></span>

            <p class="error__message"></p>
            <input type="submit" name="login" class="btn btn--green u-margin-top-small" value="Prisijungti" onclick="loginSubmit(event);"/>
        `);
        $('.form__login').toggle();
    });
    
    $('.btn--register').click(function () { 
        $('.popup').toggle();
        $('.form__login').addClass("client");

        $('.form__login').append(
            `<label for="username" class="form__label">Slapyvardis</label>
            <input type="text" id="username-register" name="username" placeholder="Slapyvardis" class="form__input form__input--login" required>

            <label for="password-login" class="form__label">Slaptažodis</label>
            <input type="password" id="password-register" name="password-login" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <label for="password-login-repeat" class="form__label">Pakrtokite slaptažodį</label>
            <input type="password" id="password-register-repeat" name="password-login-repeat" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <p class="error__message"></p>
            <input type="submit" name="login" class="btn btn--green u-margin-top-small" value="Registruotis" onclick="registerSubmit(event);"/>
        `);

        $('.form__login').toggle();
    });

    $('.btn--restoraunt-registration').click(function(e) {
        e.preventDefault();

        $('.popup').toggle();

        $('.form__login').append(
            `<label for="name" class="form__label">Pavadinimas</label>
            <input type="text" id="username-register" name="name" placeholder="Pavadinimas" class="form__input form__input--login" required>
            
            <label for="password-login" class="form__label">Slaptažodis</label>
            <input type="password" id="password-register" name="password-login" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <label for="password-login-repeat" class="form__label">Pakrtokite slaptažodį</label>
            <input type="password" id="password-register-repeat" name="password-login-repeat" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <p class="error__message"></p>
            <input type="submit" name="login" class="btn btn--green u-margin-top-small" value="Registruotis" onclick="registerSubmit(event);"/>
        `);

        $('.form__login').toggle();
    });
    
    $('.popup__close').click(function () { 
        $('.error__message').html("");
        $('.popup').toggle();
    });
});


function loginSubmit(e) {
    e.preventDefault();

    const username = $('#username-login').val();
    const password = $('#password-login').val();

    if(!username || !password) {
        $('.error__message').html("Visi laukai turi būti užpildyti");
        return;
    }

    $.ajax({
        type: "post",
        url: "http://localhost:3000/login",
        data: {
            "username":username,
            "password":password
        },
        success: function (response) {
          if(response === "false") {
            $('.error__message').html("Neteisingas slapyvardis arba slaptažodis");
          }else {
               const { role, id } = response;
               const jsonResp = JSON.stringify(response);
               let cookieContent = `myCookie=${jsonResp};path/InfoSyst/front-end/html/`

               if(role === 'client') {
                cookieContent += 'client.html';
                document.cookie = cookieContent;
                window.location.replace("../html/client.html");
               }else if(role === 'restaurant') {
                    $.ajax({
                        type: "get",
                        url: `http://localhost:3000/getRestaurant/${id}`,
                        data: {
                            "id":id
                        },
                        success: function (data, _, xhr) {
                            if(xhr.status === 200) {
                                if(!data.approved) {
                                    $('.error__message').html("Restorano registracija dar nepatvritinta sistemos administratoriaus");
                                }else {
                                    cookieContent += 'restaurant-client.html';
                                    document.cookie = cookieContent;
                                    window.location.replace("../html/restaurant-client.html");
                                }
                            }
                        }
                    });
               }else {
                    cookieContent += 'administrator.html';
                    document.cookie = cookieContent;
                    window.location.replace("../html/administrator.html");
               }
          }
        }
      });
}

function registerSubmit(e) {
    e.preventDefault();
    const userType = e.target.parentNode.className.includes("client") ? "client" : "restaurant";
    const username = $('#username-register').val();
    const password = $('#password-register').val();
    const repeatPassword = $('#password-register-repeat').val();

    if(!username || !password || !repeatPassword) {
        $('.error__message').html("Visi laukai turi būti užpildyti");
        return;
    }

    if(password != repeatPassword) {
        $('.error__message').html("Slaptažodžiai turi sutapti");
        return;
    }

    if(password.length < 8) {
        $('.error__message').html("Slaptažodžiai turi būti bent 8 simbolių ilgio");
        return;
    }

    $.ajax({
        type: "post",
        url: "http://localhost:3000/register",
        data: {
            "username":username,
            "password":password,
            "role": userType
        },
        success: function (data, _, xhr) {

          if(xhr.status === 200) {
              if(userType === 'client') {
                $('.error__message').html("Jūs buvote sėkmingai užregistruotas, dabar galite prisijungti!");
              }else {
                $('.error__message').html("Užklausa apie registraciją buvo Išsiųsta administratoriui!");
              }
          }else {
            $('.error__message').html("Įvyko nenumatyta klaida");
          }
        }
      });
}

