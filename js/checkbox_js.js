$(document).ready(function() {



    $(".dropdown dt#firstdt").click(function() {
        
        if($(".dropdown dd ul").is(":visible"))
            {
                $(".dropdown dd ul").hide();
            }
            else
            {
                $(".dropdown dd ul").show();
            }
        });



});
