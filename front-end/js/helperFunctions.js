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

