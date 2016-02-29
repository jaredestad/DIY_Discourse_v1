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

$keyword = mysql_real_escape_string( $_POST['keyword'] );
$subreddit = mysql_real_escape_string( $_POST['subreddit'] );
$id = mysql_real_escape_string( $_POST['id'] );
$author = mysql_real_escape_string( $_POST['author'] );
$subreddit_id = mysql_real_escape_string( $_POST['subreddit_id'] );
$parent_id = mysql_real_escape_string( $_POST['parent_id'] );

//the creation of our msql query
$sql = "SELECT id, author, subreddit, body FROM cinfo WHERE";
$slen = strlen($sql);
if( $keyword != "")
{
   $keyword_query = " (body LIKE '% " . $keyword . " %'"; 
   $keyword_query2 = " OR body LIKE '" . $keyword . " %'";
   $keyword_query3 = " OR body LIKE '% " . $keyword . "')";
   $sql .= $keyword_query;
   $sql .= $keyword_query2;
   $sql .= $keyword_query3;
} 
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
if( $id != "")
{
    if( $slen < strlen($sql))
    {
        $and = " AND";
        $sql .= $and; 
    }
    $id_query = " id = '" . $id . "'";
    $sql .= $id_query;
}
if( $author != "")
{
    if( $slen < strlen($sql))
    {
        $and = " AND";
        $sql .= $and; 
    }
    $author_query = " author = '" . $author . "'";
    $sql .= $author_query;
}
if( $subreddit_id != "")
{
    if( $slen < strlen($sql))
    {
        $and = " AND";
        $sql .= $and; 
    }
    $subreddit_id_query = " subreddit_id = '" . $subreddit_id . "'";
    $sql .= $subreddit_id_query;
}
if( $parent_id != "")
{
    if( $slen < strlen($sql))
    {
        $and = " AND";
        $sql .= $and; 
    }
    $parent_id_query = " parent_id = '" . $parent_id . "'";
    $sql .= $parent_id_query;
}
$end_query = " LIMIT 100;";
$sql .= $end_query;

//$sql = "SELECT id, author, subreddit, body FROM cinfo WHERE body LIKE '%" . $keyword . "%' LIMIT 100;";
//$sql = "SELECT id, author, score, body FROM cinfo WHERE subreddit = '" . $subreddit . "' LIMIT 100;";
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
