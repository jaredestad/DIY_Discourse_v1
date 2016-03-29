$(document).ready(function() {

    var elmnt = document.getElementById("table_contents");
    //http://stackoverflow.com/questions/17643751/creating-a-scroll-to-top-button
    $(window).scroll(function() {
        
        
        document.getElementById("fieldholder").style.left = "445px";
        document.getElementById("loader_section").style.left = "445px";

        var leftOffset2 = parseInt($("#loader_section").css("left"));
        var leftOffset = parseInt($("#fieldholder").css("left"));
        var maxScrollLeft = elmnt.scrollWidth;
        console.log(maxScrollLeft);
        console.log(leftOffset);
            $("#fieldholder").css({"left": $(this).scrollLeft() + leftOffset});
            $("#loader_section").css({"left": $(this).scrollLeft() + leftOffset2});


        //alert("works");
        if($(this).scrollTop() > 100){
            $("#toTop").stop().animate({left: "20px"}, 500);
        }
        else{
            $("#toTop").stop().animate({left: "-100px"}, 500);
        }
    });

    $("#toTop").click(function() {
        $("html, body").stop().animate({scrollTop: 0}, 500, function() {
            $("#toTop").stop().animate({left: "-100px"}, 500);
        });

    });


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

    $(document).bind("click", function(e) {
        var $clicked = $(e.target);
        if(! $clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();


    });


});
