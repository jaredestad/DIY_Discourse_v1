$(document).ready(function() {

    $("#loader_section").hide();
    $("#show_searchfields").hide();
    $("#searchfields").show();

    var $startFact = false;
    var $currentDiv = $(".start");

    $("#hide_searchfields").click(function() {
        $("#searchfields").toggle();
        $("#show_searchfields").show();
        document.getElementById("comments_table2").style.marginTop="10px";

    });
    
    $("#show_searchfields").click(function() {
        $("#searchfields").toggle();
        $("#show_searchfields").hide();
        document.getElementById("comments_table2").style.marginTop="345px";

    });

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
        $("#comments_table2").empty();
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


    var $count = 1;


    $("#search_button2").click("submit", function() {
        console.log("Query in progress.");
        var $str = $("form#getInfo").serialize();
        var $str2 = $("form#getInfo2").serialize();
        var $str3 = $("form#getInfo3").serialize();
        console.log($str);
        console.log($str2);
        console.log($str3);

        $count = 1;

        create_table($str, $str2, $str3, $count);
        $("#load_button").click("submit", function () {
            $count += 1;
            create_table($str, $str2, $str3, $count);
        });


    });


function create_table($str, $str2, $str3, $count) {
    $.ajax({
        type : "POST",
        url : "./search_engine.php",
        data : { keyword_data : $str, feature_data : $str2, numerical_data : $str3, load_counter : $count},
        dataType : "json",

        success : function(result) {
            console.log(result);
            console.log(result.table_text);
            $("#comments_table2").html(result.table_text);
            $("#loader_section").show();

            $(".dropdown input[type='checkbox']").each(function() {
                if( $(this).prop("checked")==false){
                var title = $(this).attr("id");
                title = "." + title;
                $(title).hide();
                }
            });

            $(".dropdown input[type='checkbox']").click(function() {
                var title = $(this).closest("li").find("input[type='checkbox']").attr("id");
                title = "." + title;
                $(title).toggle();
            });


            $(".saver").hide();
            $(".tags_box").attr("disabled", true);
            $(".edit_button").click(function() {
                $(this).hide();
                $(this).next(".saver").show();
                $(this).next(".saver").next(".tags_box").removeProp("disabled");
                console.log( $(this).next(".saver").next(".tags_box") );
                console.log( $(this).next(".saver") );
            });

            $(".save_button").click(function() {
                var $id_value = $(this).closest("tr").find("td:first").text();
                var $row_id = $(this).closest("tr").find("td.row_id_column").text();
                var $tag_area = document.getElementById($row_id+"").value;
                //alert($tag_area);
                //alert($id_value);

                $.ajax({
                    type : "POST",
                    url : "./insert_tag.php",
                    data : { new_tag : $tag_area, cid : $id_value },
                    dataType : "text",


                    success : function(result) {
                        //console.log(result);

                    },


                    error : function(jqXHR, textStatus, errorThrown) {
                                console.log( errorThrown );
                                console.log("error jqXHR: " + jqXHR);
                                console.log("error textStatus: " + textStatus);
                            }

                });

                // alert($id_value);

            });

            $(".saver").click(function() {
                $(this).hide();
                $(this).prev(".edit_button").show();
                $(this).next(".tags_box").attr("disabled", true);
                console.log( $(this).next(".tags_box") );
            });


        },



        error : function(jqXHR, textStatus, errorThrown) {
                    console.log( errorThrown );
                    console.log("error jqXHR: " + jqXHR);
                    console.log("error textStatus: " + textStatus);
                }
    });
};


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
                    var value2 = $(this)[0].nodeName;
                    alert(value2);
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
