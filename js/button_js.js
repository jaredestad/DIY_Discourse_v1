$(document).ready(function() {

    var $startFact = false;
    var $currentDiv = $(".start");

    $("#addfield").click(function(){
        if($startFact == false){
            $startFact = true;
           $currentDiv = $(".showStarter").next(".hideNshow"); 
           $currentDiv.show();
        }
        else{

                $currentDiv = $currentDiv.next(".hideNshow");
                $currentDiv.show();
                if( !$currentDiv.next(".hideNshow").length)
                    $("#addfield").hide();
        }
    });



    $("#clear_button").click(function() {
        console.log("clearing the txt of search key");
        $(".clear-form").val("");
        $("#results").empty();
        $("#comments_table").empty();
    });


    //# referƒs to an id, so this will run when
    //the thing in your html with id="new_button"
    //is clicked.
    $("#new_button").click(function() {
        console.log( "the selected subreddit is: '" + $("#subreddit_input").val() + "'");

        console.log( "my_value is: " + $(this).attr("my_value") + "'");
        if ($(this).attr("my_value") == "blue") {
            $(this).attr("my_value", "green");
        } else {
            $(this).attr("my_value", "blue");
        }

        $.ajax({
            type : "POST",
            data : { subreddit : $("#subreddit_input").val() },

            url : "./get_text.php",
            dataType : "text",

            success : function(result) {
                $("#test_text_area").text( result );
            },

            error : function(jqXHR, textStatus, errorThrown) {
                        $("#test_text_area").text( errorThrown );
                        console.log("error jqXHR: " + jqXHR);
                        console.log("error textStatus: " + textStatus);
                    }
        });


        //the . refers to a class, so in this case
        //it will change the text of everything in
        //your html with class="... other_button ..."
        //$(".other_button").text("I've been clicked!");

        /*
           $(".author_column").each(function( index ) {
           console.log("making the following html bold: '" + $(this).html + "'");
           $(this).text("<b>" + $(this).html() + "</b>");
           });
           */

    });



    $("#search_button2").click("submit", function() {
        console.log("Query in progress.");
        var $str = $("form#getInfo").serialize();
        var $str2 = $("form#getInfo2").serialize();
        var $str3 = $("form#getInfo3").serialize();
        console.log($str);
        console.log($str2);
        console.log($str3);
        $("#results").text($str);
        $("#results2").text($str2);
        $("#results3").text($str3);

        console.log("starting ajax");
        $.ajax({
            type : "POST",
            url : "./search_engine.php",
            data : { keyword_data : $str, feature_data : $str2, numerical_data : $str3 },
            async: false,
            dataType : "text",

            success : function(data) {
            $("#results4").val(data);
            console.log(data);
            },



            error : function(jqXHR, textStatus, errorThrown) {
                        console.log( errorThrown );
                        console.log("error jqXHR: " + jqXHR);
                        console.log("error textStatus: " + textStatus);
                    }
            });
    });




    $("#search_button").click(function() {
        console.log("you clicked the JSON button!");

        $.ajax({
            type : "POST",
            url : "./get_json.php",
            data : { keyword : $("#keyword_search").val(), subreddit : $("#subreddit_search").val(), id : $("#comment_id_search").val(), author : $("#author_search").val(), subreddit_id : $("#subreddit_id_search").val(), parent_id : $("#parent_id_search").val() },

            dataType : "json",

            success : function(result) {
                console.log("result.table_text is: " + result.table_text);
                $("#test_area").text( result );                
                $("#comments_table").html(result.table_text);

                $("#comments_table tr").click(function(){
                    $(this).addClass('selected').siblings().removeClass('selected');
                    var value=$(this).find('td:first').html();
                    alert(value);
                });

            },

            error : function(jqXHR, textStatus, errorThrown) {
                        $("#test_text_area").text( errorThrown );
                        console.log("error jqXHR: " + jqXHR);
                        console.log("error textStatus: " + textStatus);
                    }
        });
    });

});
