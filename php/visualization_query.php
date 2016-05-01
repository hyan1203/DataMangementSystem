<?php
header("Content-type: application/json");
include("../config.php");
session_start();

$startingdate = $_REQUEST["vs_startingdate"];
$endingdate = $_REQUEST["vs_endingdate"];
$user = $_REQUEST["user"];
$col = $_REQUEST["vs_data"];

$username = "homedbuser"; 
$password = "homedbuser";   
$host = "localhost";
$database="homedb";

$server = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
$connection = mysql_select_db(DB_NAME, $server);

$myquery = "SELECT time, $col from testGas where name = '$user' and time between '$startingdate' and '$endingdate' ORDER BY time ASC";
$query = mysql_query($myquery);

if ( ! $query ) {
echo mysql_error();
die;
}

$data = array();

while($row=mysql_fetch_assoc($query)){
	$data[] = $row;
}
//error_log(print_r($data, True));
echo json_encode($data);     

mysql_close($server);
?>
