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
    
    //keyword data from ajax
    $str_keyword = $_POST['keyword_data'];
    print_r($str_keyword);
    parse_str($str_keyword, $data_keyword);
    $keyword_array = array_values($data_keyword);
    print_r($keyword_array);
    foreach ($keyword_array as $x)
    {
        echo $x . "\n";
    }
    
    //feature data from ajax
    $str_feature = $_POST['feature_data'];
    print_r($str_feature);
    parse_str($str_feature, $data_feature);
    $feature_array = array_values($data_feature);
    print_r($feature_array);
    /*
    foreach ($feature_array as $x)
    {
        echo mysql_real_escape_string($x) . "\n";
    }*/
    
    //numerical data from ajax
    $str_numerical = $_POST['numerical_data'];
    print_r($str_numerical);
    parse_str($str_numerical, $data_numerical);
    $numerical_array = array_values($data_numerical);
    print_r($numerical_array);
    /*
    foreach ($numerical_array as $x)
    {
            echo mysql_real_escape_string($x) . "\n";
    }*/
    
  
    echo count($keyword_array) . "\n";
    
    $sql = "SELECT id, author, subreddit, body FROM cinfo WHERE";
    
    //create query for keywords
    for($x = 0; $x < count($keyword_array); $x+=3)
    {
        echo $keyword_array[$x+1] . "here\n";
        echo $x;
        if($keyword_array[$x+1] != "")
        {
            
            //check that at least 1 value exists
            if($start == false)
            {
                $sql .= " (";
                $start = true;
            }
            
            echo $keyword_array[$x+1] . "here\n";
            
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
                    $sql .= " body LIKE '% " . mysql_real_escape_string( $keyword_array[$x+1] ) . " %'";
            }
            else
            {
                    $sql .= " body LIKE '% " . mysql_real_escape_string( $keyword_array[$x+1] ) . " %'";
            }
            
            
            
        }
    
    }
    
    //add closing parenthesis
    if($start == true)
    {
        $sql .= ")";
    }
    
    
    
    
    
    
    
    
    
    
    echo $sql . "\n";
    
    
    
    mysql_select_db('reddit');
    mysql_query("SET NAMES utf8");
    //$result = mysql_query($sql, $conn);
    
    /*
    if(! $result) {
        die('Could not work: ' . mysql_error());
    }*/
    
    mysql_close($conn);
    
    echo "\n";
    echo "keyword 0 is " . $keyword_array[2] . " ha";
    
    ?>
