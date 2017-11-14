$(function() {
    databaseHelper();
    updateVisitsCount();
    videoHelper();
});

function numberFormatting(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
        }
    ],
    "comments": {
        "p01": [
            {
                "author": "j.gonzalez",
                "timestamp": "1510172639616",
                "content": "Tttt"
            }
        ]
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
        )
    });
}

comments = {
    load: function(pageID) {
        // TODO: Recursive scan post's comments and append
    },
    
    comment: function(pageID, comment) {
        // TODO: Comments ID
        // TODO: Append comment to post on DB
        // TODO: Append comment to post in browser 
    }
}