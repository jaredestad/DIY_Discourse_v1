<?php
    $servername = "localhost";
    $username = "root";
    $password = "password";
    
    
    $conn = mysql_connect($servername, $username, $password);
    if(! $conn)
    {
        die('Could not connect' . mysql_error());
    }
    
    $comment_id = mysql_real_escape_string( $_POST['cid'] );
    $new_tags = mysql_real_escape_string( $_POST['new_tag'] );
    
    $sql = "UPDATE cinfo SET tags = '" . $new_tags . "' WHERE id = '" . $comment_id . "';";
    
    
    mysql_select_db('reddit');
    mysql_query("SET NAMES utf8");
    $result = mysql_query($sql, $conn);
    
    
    if(! $result) {
        die('Could not work: ' . mysql_error());
    }
   
    
    mysql_close($conn);
    
    
    ?>
