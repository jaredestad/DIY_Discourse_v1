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

$subreddit = mysql_real_escape_string( $_POST['subreddit'] );

//the creation of our msql query
$sql = "SELECT id, author, subreddit, body FROM cinfo WHERE";
$slen = strlen($sql);
if( $subreddit != "")
{
    if( $slen < strlen($sql))
    {
        $and = " AND";
        $sql .= $and; 
    }
    $subreddit_query = " subreddit = '" . $subreddit . "'";
    $sql .= $subreddit_query;
}

$end_query = " LIMIT 100;";
$sql .= $end_query;

    
mysql_select_db('reddit');
mysql_query("SET NAMES utf8");
$result = mysql_query($sql, $conn);


if(! $result) {
    die('Could not work: ' . mysql_error());
}

$template_array = array();
while (($row = mysql_fetch_assoc($result)) != null) {
    $template_array['my_table'][] = $row;
}


$template_contents = file_get_contents("table_template.html");

$response = array();

$response['table_text'] = $m->render($template_contents, $template_array);
mysql_close($conn);
echo json_encode( $response);
    
?>
