var visitor = getVisitorNumber();

$(function() {
    updateVisitsCount();
    //videoHelper();
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
        console.log($(this).text);
    });
}