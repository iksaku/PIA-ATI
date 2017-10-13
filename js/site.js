var visitor = getVisitorNumber();

$(function() {
    updateVisitsCount();
    videoHelper();
});

function numberFormatting(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getVisitorNumber() {
    if (!localStorage.getItem("visits")) {
        localStorage.setItem("visits", 999995);
    }
    return localStorage.getItem("visits")
}

function updateVisitsCount() {
    $("#visitCount").text(numberFormatting(++visitor));
    localStorage.setItem("visits", visitor);
    
    if (visitor === 999999) {
        $("#easterEgg1").append($("<button type=\"button\" class=\"btn btn-warning\">Si me ves, <strong>Mancha</strong> te debe una asesoría gratuita.</button>"));
    }
}

function videoHelper() {
    $("video").each(function(index, element) {
        $(this).append($('<div class="panel panel-danger vertical-center"><div class="panel-heading"><i class="fa fa-warning" aria-hidden="true"></i> <strong>Huston... Tenemos un problema</strong> <i class="fa fa-warning" aria-hidden="true"></i></div><div class="panel-body">Tu navegador no soporta la reproducción de videos, sin embargo, puedes descargar el video <a href="' + $(this).attr("src") + '" class="btn btn-xs btn-primary">aquí</a> y reproducirlo con tu aplicación favorita. <i class="fa fa-youtube-play"></i></div></div>'));
    });
}