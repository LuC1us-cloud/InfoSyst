"use strict";

$( document ).ready(function() {

    

    $('.btn--login-header').click(function () { 
        $('.popup').toggle();
        $('.form__login').append(
            `<label for="username" class="form__label">Slapyvardis</label>
            <input type="text" id="username" name="username" placeholder="Slapyvardis" class="form__input form__input--login" required>

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
        $('.form__login').append(
            `<label for="username" class="form__label">Slapyvardis</label>
            <input type="text" id="username" name="username" placeholder="Slapyvardis" class="form__input form__input--login" required>
            
            <label for="name" class="form__label">Vardas</label>
            <input type="text" id="name" name="name" placeholder="Vardas" class="form__input form__input--login" required>

            <label for="surname" class="form__label">Pavardė</label>
            <input type="text" id="surname" name="surname" placeholder="Pavardė" class="form__input form__input--login" required>

            <label for="address" class="form__label">Adresas</label>
            <input type="text" id="address" name="address" placeholder="Adresas" class="form__input form__input--login" required>

            <label for="password-login" class="form__label">Slaptažodis</label>
            <input type="password" id="password-login" name="password-login" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <label for="password-login-repeat" class="form__label">Pakrtokite slaptažodį</label>
            <input type="password" id="password-login-repeat" name="password-login-repeat" placeholder="Slaptažodis" class="form__input form__input--login" required>

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
            <input type="text" id="name" name="name" placeholder="Pavadinimas" class="form__input form__input--login" required>
            
            <label for="address" class="form__label">Adresas</label>
            <input type="text" id="address" name="address" placeholder="Adresas" class="form__input form__input--login" required>

            <label for="description" class="form__label">Aprašas</label>
            <textarea id="description" name="description" class="form__textarea" rows="4" cols="50" required></textarea>

            <label for="password-login" class="form__label">Slaptažodis</label>
            <input type="password" id="password-login" name="password-login" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <label for="password-login-repeat" class="form__label">Pakrtokite slaptažodį</label>
            <input type="password" id="password-login-repeat" name="password-login-repeat" placeholder="Slaptažodis" class="form__input form__input--login" required>

            <p class="error__message"></p>
            <input type="submit" name="login" class="btn btn--green u-margin-top-small" value="Registruotis" onclick="registerSubmit(event);"/>
        `);

        $('.form__login').toggle();
    });
    
    $('.popup__close').click(function () { 
        $('.popup').toggle();
    });
});

