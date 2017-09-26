var visitor = getVisitorNumber();

$(function() {
    $("#visitCount").text(numberFormatting(++visitor));
    localStorage.setItem("visits", visitor);
    
    if (visitor === 999999) {
        $("#easterEgg1").append($("<button type=\"button\" class=\"btn btn-warning\">Si me ves, mancha te debe una asesoría gratuita.</button>"));
    }
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