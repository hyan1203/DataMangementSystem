<?php
header("Content-type: application/json");
include("../config.php");
session_start();
$startingdate = $_POST["startingdate"];
$endingdate = $_POST["endingdate"];
$user = $_POST["user"];
//The way to test the checkbox
// if(isset($_POST['temperature'])){
//   echo "succeed";
// }

$spitthisout = [];

try {
  $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
  $STH = $DBH->query("SELECT * from testGas");
  $STH->setFetchMode(PDO::FETCH_OBJ);
 
  while($row = $STH->fetch()) {
    array_push($spitthisout, $row);
    //echo json_encode($row);
  }
  
} catch (Exception $e) {
  echo $e->getMessage();
}


echo json_encode($spitthisout);