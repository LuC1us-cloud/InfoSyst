"use strict";

import * as Helper from "./helperFunctions.js";


$( document ).ready(function() {
    $('.logout').click(Helper.logout(session))
});