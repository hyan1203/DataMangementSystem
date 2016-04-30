<?php
header("Content-type: application/json");
include("../config.php");
session_start();

$startingdate = $_REQUEST["startingdate"];
$endingdate = $_REQUEST["endingdate"];
$user = $_REQUEST["user"];
// The way to test the checkbox
// if(isset($_POST['temperature'])){
//   echo "succeed";
// }

$spitthisout = [];

try {
  $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
  $STH = $DBH->query("SELECT * from testGas where name = '$user' and time between '$startingdate' and '$endingdate' ORDER BY time ASC");
  $STH->setFetchMode(PDO::FETCH_OBJ);
 
  while($row = $STH->fetch()) {
    array_push($spitthisout, $row);
    //echo $spitthisout;
  }
  
} catch (Exception $e) {
  echo $e->getMessage();
}


echo json_encode($spitthisout);