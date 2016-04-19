<?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    
    require_once('Mustache/Autoloader.php');
    Mustache_Autoloader::register();
    $m = new Mustache_Engine;
    
    $conn = mysql_connect($servername, $username, $password);
    if(! $conn)
    {
        die('Could not connect' . mysql_error());
    }
    
    $load_counter = $_POST['load_counter'];
    
    //delimiter data from ajax
    $str_delimiter = $_POST['delimiter_data'];
    parse_str($str_delimiter, $data_delimiter);
    $delimiter_array = array_values($data_delimiter);
   
    $str_radio = $_POST['radio_data'];
    parse_str($str_radio, $radio_data);
    $radio_titles = array_keys($radio_data);
    $radio_values = array_values($radio_data);
    
    
    //keyword data from ajax
    $str_keyword = $_POST['keyword_data'];
    //print_r($str_keyword);
    parse_str($str_keyword, $data_keyword);
    $keyword_array = array_values($data_keyword);
    //print_r($keyword_array);
    /*
    foreach ($keyword_array as $x)
    {
        echo $x . "\n";
    }*/
    //echo "\n";
    
    //feature data from ajax
    $str_feature = $_POST['feature_data'];
    //print_r($str_feature);
    parse_str($str_feature, $data_feature);
    $feature_array = array_values($data_feature);
    //print_r($feature_array);
    
    //echo "\n";
    
    //numerical data from ajax
    $str_numerical = $_POST['numerical_data'];
    //print_r($str_numerical);
    parse_str($str_numerical, $data_numerical);
    $numerical_array = array_values($data_numerical);
    //print_r($numerical_array);
    
    //echo "\n";
    
    $sql = "SELECT * FROM cinfo WHERE";
    $slen = strlen($sql);
    //create query for keywords
    for($x = 0; $x < count($keyword_array); $x+=3)
    {
        if($keyword_array[$x+1] != "")
        {
            
            //check that at least 1 value exists
            if($start == false)
            {
                $sql .= " (";
                $start = true;
            }
            
            
            if($keyword_array[$x] == "Not")
            {
                if($x != 0)
                    $sql .= " AND NOT";
                else
                    $sql .= " NOT";
            }
            else if($keyword_array[$x] != "")
            {
                $sql .= " " . strtoupper( $keyword_array[$x] ) . " ";
            }
            
            
            
            if($keyword_array[$x+2] == "Keyword")
            {
                    $sql .= " (body LIKE '% " . mysql_real_escape_string( $keyword_array[$x+1] ) . " %' OR body LIKE '" . mysql_real_escape_string( $keyword_array[$x+1] ) . "%' OR body LIKE '% " .  mysql_real_escape_string( $keyword_array[$x+1] ) . "')";
            }
            else if($keyword_array[$x+2] == "Tag")
            {
                $sql .= " (tags Like '% " . mysql_real_escape_string( $keyword_array[$x+1]) . ",%' OR tags LIKE '" . mysql_real_escape_string( $keyword_array[$x+1]) . ",%')";
            }
            else
            {
                    $sql .= " body LIKE '%" . mysql_real_escape_string( $keyword_array[$x+1] ) . "%'";
            }
            
            
            
        }
    
    }
    
    //add closing parenthesis
    if($start == true)
    {
        $sql .= ")";
    }
    
    for($x = 0; $x < count($feature_array); $x++)
    {
        if($feature_array[$x] != "")
        {
            if($slen < strlen($sql))
                $sql .= " AND";
        
        
            if($x == 0)
            {
                $sql .= " subreddit = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 1)
            {
                $sql .= " author = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 2)
            {
                $sql .= " comment_id = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 3)
            {
                $sql .= " subreddit_id = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 4)
            {
                $sql .= " parent_id = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 5)
            {
                $sql .= " link_id = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 6)
            {
                $sql .= " name = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 7)
            {
                $sql .= " author_flair_text = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
            else if($x == 8)
            {
                $sql .= " author_flair_css_class = '" . mysql_real_escape_string( $feature_array[$x] ) . "'";
            }
        }
        
    }
    
    for($x = 0; $x < count($numerical_array); $x++)
    {
        if($numerical_array[$x] != "")
        {
            if($slen < strlen($sql))
                $sql .= " AND";
            
            
            if($x == 0)
            {
                $sql .= " retrieved_on = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 1)
            {
                $sql .= " created_utc = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 2)
            {
                $sql .= " ups = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 3)
            {
                $sql .= " downs = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 4)
            {
                $sql .= " score = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 5)
            {
                $sql .= " gilded = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
            else if($x == 6)
            {
                $sql .= " controversiality = '" . mysql_real_escape_string( $numerical_array[$x] ) . "'";
            }
        }
        
    }
    
    
    
    for($x = 0; $x < count($delimiter_array); $x+=3)
    {
        if($delimiter_array[$x+1] != "")
        {
            if($slen < strlen($sql))
                $sql .= " AND";
            
            $sql .= " ". $delimiter_array[$x+2] ." ". $delimiter_array[$x] ." ". mysql_real_escape_string( $delimiter_array[$x+1]) ."";
        }
        
    }
    
    
    if( (count($radio_values)) > 0)
    {
        for($x = 0; $x < count($radio_values); $x++)
        {
            if($slen < strlen($sql))
                $sql .= " AND";
            
            if( $radio_titles[$x] == "distinguished")
            {
                if($radio_values[$x] == "true")
                {
                    $sql .= " ". $radio_titles[$x] ." IS NULL";
                }
                else
                {
                    $sql .= " ". $radio_titles[$x] ." IS NOT NULL";
                }
            }
            else
            {
                if($radio_values[$x] == "true")
                {
                    $sql .= " ". $radio_titles[$x] ." != 'false'";
                }
                else
                {
                    $sql .= " ". $radio_titles[$x] ." = 'false'";
                }
            }
        }
    }
    
    $load_number = 100*$load_counter;
    
    $sql .= " LIMIT " . $load_number . ";";
    
    //echo $sql . "\n";
    
    
    
    mysql_select_db('reddit');
    mysql_set_charset('utf8mb4', $conn);
    mysql_query("SET NAMES utf8mb4");
    $result = mysql_query($sql, $conn);
    
    
    if(! $result) {
        die('Could not work: ' . mysql_error());
    }
    
    $template_array = array();
    $num = 0;
    while(($row = mysql_fetch_assoc($result)) != null)
    {
        $row["row_id"] = "row_id_" . $num;
        $row["linker"] = substr($row["link_id"], 3);
        //$replacedString = preg_replace("/\\\\u([0-9a-fA-f]{4})/", "&#x$1;", $row["body"]);
        //$row["body"] = mb_convert_encoding($replacedString, 'UTF-8', 'HTML-ENTITIES');
        //print_r($row);
        $num++;
        
        $template_array['my_table'][] = $row;
        
    }
    
    $template_contents = file_get_contents("table_template.html");
    $response = array();
    
    $response['table_text'] = $m->render($template_contents, $template_array);
    echo json_encode($response);//JSON_UNESCAPED_UNICODE
    
    mysql_close($conn);
    
    
    ?>
