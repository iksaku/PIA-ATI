$(function() {
    databaseHelper();
    updateVisitsCount();
    videoHelper();
});

function numberFormatting(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

careers = {
    "its": "Ingeniería en Tecnologías de Software",
    "imtc": "Ingeniería en Mecatrónica"
};

databaseModel = {
    "visits": 999996,
    "users": [
        {
            "username": "j.gonzalez",
            "name": "Jorge Alejandro González Guerra",
            "career": "its",
            "photo": "images/Jorge.jpeg"
        },
        {
            "username": "g.caldera",
            "name": "Gerardo Jahir Caldera Perez",
            "career": "imtc",
            "photo": "images/Jahir.jpg"
        },
        {
            "username": "l.orrante",
            "name": "Luis Fernando Orrante Vales",
            "career": "imtc",
            "photo": "images/Luis.jpg"
        },
        {
            "username": "e.ferrer",
            "name": "Eduardo Ferrer Treviño",
            "career": "its",
            "photo": "images/Eduardo.jpg"
        },
        {
            "username": "h.solis",
            "name": "Habib Yosef Natanael Solis Flores",
            "career": "its",
            "photo": "images/Habib.jpg"
        },
        {
            "username": "anonimo",
            "name": "Algún Humano",
            "career": "",
            "photo": "../images/Anonimo.png"
        }
    ],
    "comments": {
        "p01": [],
        "p02": [],
        "p03": [],
        "p04": []
    }
};

var database = {
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get: function(key) {
        var item = localStorage.getItem(key);
        return !item ? false : JSON.parse(item);
    }
};

function databaseHelper() {
    Object.keys(databaseModel).forEach(function(k) {
        if (!database.get(k)) {
            database.set(k, databaseModel[k]);
        }
    })
}

function updateVisitsCount() {
    var visitor = database.get("visits");
    $("#visitCount").text(numberFormatting(++visitor));
    database.set("visits", visitor);
}

function videoHelper() {
    $("video").each(function() {
        var src = $(this).attr("src");
        $(this).append(
            $("<div></div>").addClass("panel panel-danger vertical-center text-center").append(
                $("<div></div>").addClass("panel-heading").append(
                    $("<h3></h3>").addClass("panel-title").text("<span class=\"fa fa-warning\" aria-hidden=\"true\"></span> Huston... Tenemos un problema <span class=\"fa fa-warning\" aria-hidden=\"true\"></span>")
                ),
                $("<div></div>").addClass("panel-body").text("Tu navegador no soporta la reproducción de videos, sin embargo, puedes descargar el video <a href=\"" + src + "\" class=\"btn btn-xs btn-primary\">aquí</a> y reproducirlo con tu aplicación favorita. <span class=\"fa fa-youtube-play\"></span>")
            )
        );
    });
}

function getUserData(username) {
    var users = database.get("users");
    for (var i in users) {
        var user = users[i];
        if (user.username != username) continue;
        return user;
    }
}

comments = {
    pageId: null,
    
    // Loads all default comments and appends them
    load: function(pageId) {
        comments.pageId = pageId;
        var commentList = database.get("comments")[pageId];
        for (var i in commentList) {
            comments.appendComment(commentList[i]);
        }
    },
    
    // Saves a comment in DB and appends it to HTML
    submitComment: function(pageId, comment) {
        var commentList = database.get("comments");
        commentList[pageId].push(comment);
        database.set("comments", commentList);
        
        comments.appendComment(comment);
    },
    
    // Appends the comment to the HTML
    appendComment: function(comment) {
        var user = getUserData(comment.author);
        var date = new Date(comment.timestamp);
        $(".comment-list").append(
            $("<article></article>").addClass("row").append(
                $("<div></div>").addClass("col-md-2 col-sm-2 hidden-xs").append(
                    $("<figure></figure>").addClass("thumbnail").append(
                        $("<img></img>").addClass("img-responsive img-circle center-block").attr("src", user.photo),
                        $("<figcaption></figcaption>").addClass("text-center").text(comment.author)
                    )
                ),
                $("<div></div>").addClass("col-md-10 col-sm-10").append(
                    $("<div></div>").addClass("panel panel-default arrow left").append(
                        $("<div></div>").addClass("panel-body").append(
                            $("<header></header>").addClass("text-left").append(
                                $("<div></div>").addClass("comment-user").append(
                                    $("<span></span>").addClass("fa fa-user"),
                                    " " + user.name
                                ),
                                $("<time></time>").addClass("comment-date").attr("datetime", [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-")).append(
                                    $("<span></span>").addClass("fa fa-clock-o"),
                                    " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
                                )
                            ),
                            $("<div></div>").addClass("comment-post").append(
                                $("<p></p>").text(comment.content)
                            )
                        )
                    )
                )
            )
        );
    }
}

$("#commentForm").submit(function(event) {
    event.preventDefault();
    var comment = {
        "author": "anonimo",
        "timestamp": Date.now(),
        "content": $("#commentContent").val()
    };
    comments.submitComment(comments.pageId, comment);
    $("#commentContent").val("");
});