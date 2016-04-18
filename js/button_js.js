$(document).ready(function() {

    $("#table_contents").hide();
    $("#table_contents2").hide();
    $("#loader_section").hide();
    $("#show_searchfields").hide();
    $("#searchfields").show();

    var $startFact = false;
    var $currentDiv = $(".start");


    $("input[type='radio']").click(function() {

        var name = $(this)[0].name;
        if( $(this).data("waschecked") == true){
           $(this).prop("checked", false);
           $(this).data("waschecked", false);
        }
        else{
            $(this).data("waschecked", true);
        }

        $(this).parent().next().children().data("waschecked", false);
        $(this).parent().prev().children().data("waschecked", false);


    });

    $("#hide_searchfields").click(function() {
        $("#searchfields").toggle();
        $("#show_searchfields").show();
        document.getElementById("table_contents").style.marginTop="55px";
        $("#mover_div").prependTo("#move_spot");

    });

    $("#show_searchfields").click(function() {
        $("#searchfields").toggle();
        $("#show_searchfields").hide();
        document.getElementById("table_contents").style.marginTop="360px";
        $("#mover_div").prependTo("#original_div");

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

    $("#add_num").click(function(){
        if($startFact == false){
            $startFact = true;
            $currentDiv = $(".startOption").next(".nextOption"); 
            $currentDiv.show();
        }
        else{

            $currentDiv = $currentDiv.next(".nextOption");
            $currentDiv.show();
            if( !$currentDiv.next(".nextOption").length)
        $("#add_num").hide();
        }
    });


    $("#clear_button").click(function() {
        console.log("clearing the txt of search key");
        $(".clear-form").val("");
        $("#results").empty();
        $("#comments_table").empty();
        $("#comments_table2").empty();
        $("#loader_section").hide();
        $("#table_contents").hide();
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
        var $str4 = $("form#limiter_options").serialize();
        var $str5 = $("form#radio_options").serialize();
        console.log($str);
        console.log($str2);
        console.log($str3);
        console.log($str4);
        console.log($str5);

        $count = 1;

        create_table($(this), $str, $str2, $str3, $str4, $str5, $count);



        $("#load_button").unbind().click("submit", function () {
            $count += 1;
            console.log($str + " " + $str2 + " " + $str3 + " " + $count);
            create_table($(this), $str, $str2, $str3, $str4, $str5, $count);
        });

    });


    $(".dropdown input[type='checkbox']").click(function() {
        var title = $(this).closest("li").find("input[type='checkbox']").attr("id");
        title = "." + title;
        $(title).toggle();
        console.log(title);
    });


    function create_table($this, $str, $str2, $str3, $str4, $str5, $count) {
        $this.button("loading");
        $.ajax({
            type : "POST",
            url : "./search_engine.php",
            data : { keyword_data : $str, feature_data : $str2, numerical_data : $str3, load_counter : $count, delimiter_data : $str4, radio_data : $str5},
            dataType : "json",

            success : function(result) {
                $this.button("reset");
                console.log(result);
                console.log(result.table_text);
                $("#comments_table2").html(result.table_text);
                $("#table_contents").show();
                $("#loader_section").show();

                $(".dropdown input[type='checkbox']").each(function() {
                    if( $(this).prop("checked")==false){
                        var title = $(this).attr("id");
                        title = "." + title;
                        $(title).hide();
                    }
                });

                $(".saver").hide();
                $(".tags_box").attr("disabled", true);
                $(".edit_button").click(function() {
                    $(this).hide();
                    console.log("button clicked");
                    $(this).next(".saver").show();
                    $(this).next(".saver").next(".tags_div").find(".tags_box").removeProp("disabled");
                    console.log( $(this).next(".saver").next(".tags_div").find(".tags_box").attr("id") );
                    console.log( $(this).next(".saver") );
                });


                $(".save_button").click(function() {
                    var $id_value = $(this).closest("tr").find("td:first").text();
                    var $row_id = $(this).closest("tr").find("td.row_id_column").text();
                    var $tag_area = document.getElementById($row_id+"").value;
                    console.log($tag_area);
                    console.log($id_value);
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

                $(".cancel_button").click(function() {
                    var $id_value2 = $(this).closest("tr").find("td:first").text();
                    var $row_id2 = $(this).closest("tr").find("td.row_id_column").text();
                    console.log("id : " + $id_value2 + " rowid : " + $row_id2);
                    
                    $.ajax({
                        type: "POST",
                        url: "./refresh_tag.php",
                        data: {cid: $id_value2},
                        dataType: "text",

                        success: function(result) {
                            console.log(result);
                            document.getElementById($row_id2).value = result;

                        },

                        error : function(jqXHR, textStatus, errorThrown) {
                                    console.log( errorThrown );
                                    console.log("error jqXHR: " + jqXHR);
                                    console.log("error textStatus: " + textStatus);
                                }
                    });

                });


                $(".saver").click(function() {
                    $(this).hide();
                    $(this).prev(".edit_button").show();
                    $(this).next(".tags_div").find(".tags_box").attr("disabled", true);
                });


            },



            error : function(jqXHR, textStatus, errorThrown) {
                        $this.button("reset");
                        console.log( errorThrown );
                        console.log("error jqXHR: " + jqXHR);
                        console.log("error textStatus: " + textStatus);
                    }
        });
    };



});
