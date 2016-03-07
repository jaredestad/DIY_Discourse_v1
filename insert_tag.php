<?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    
    
    $conn = mysql_connect($servername, $username, $password);
    if(! $conn)
    {
        die('Could not connect' . mysql_error());
    }
    
    mysql_select_db('reddit');
    mysql_query("SET NAMES utf8");
    $result = mysql_query($sql, $conn);
    
    
    if(! $result) {
        die('Could not work: ' . mysql_error());
    }
    template_contents, $template_array);
    echo json_encode($response);
    
    mysql_close($conn);
    
    
    ?>
