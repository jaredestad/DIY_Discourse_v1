$(document).ready(function() {

    $(".chex").change(function() {
        var returnVal = confirm ("Are you sure?");
        $(this).attr("checked", returnVal);


    });



});
