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
    var visitor = getVisitorNumber();
    $("#visitCount").text(numberFormatting(++visitor));
    localStorage.setItem("visits", visitor);
    
    if (visitor === 999999) {
        $("#easterEgg1").append($('<div class="panel panel-warning text-center"><div class="panel-heading"><h1 class="panel-title"><span class="fa fa-bell fa-3x faa-ring faa-slow animated"></span><span class="fa fa-gift fa-3x faa-shake animated"></span><span class="fa fa-bell fa-3x faa-ring faa-slow animated"></span></h1></div><div class="panel-body">Si me ves, <strong>Mancha</strong> te debe una asesoria gratuita...</div></div>'));
    }
}

function videoHelper() {
    $("video").each(function(index, element) {
        $(this).append($('<div class="panel panel-danger vertical-center text-center"><div class="panel-heading"><h3 class="panel-title"><span class="fa fa-warning" aria-hidden="true"></span> Huston... Tenemos un problema <span class="fa fa-warning" aria-hidden="true"></span></div><div class="panel-body">Tu navegador no soporta la reproducción de videos, sin embargo, puedes descargar el video <a href="' + $(this).attr("src") + '" class="btn btn-xs btn-primary">aquí</a> y reproducirlo con tu aplicación favorita. <span class="fa fa-youtube-play"></span></h3></div></div>'));
    });
}