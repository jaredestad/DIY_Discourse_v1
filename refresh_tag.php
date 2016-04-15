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
    
    $sql = "SELECT tags FROM cinfo WHERE id = '" . $comment_id . "';";
    
    
    mysql_select_db('reddit');
    mysql_query("SET NAMES utf8");
    $result = mysql_query($sql, $conn);
    
    
    while(($row = mysql_fetch_assoc($result)) != null)
    {
        echo $row["tags"];
    }
    
    
    if(! $result) {
        die('Could not work: ' . mysql_error());
    }
   
    
    mysql_close($conn);
    
    
    ?>
