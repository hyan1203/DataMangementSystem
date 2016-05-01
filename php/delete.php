<?php
header("Content-type: application/json");
include("../config.php");
session_start();
$user = $_REQUEST["user"];
$time = $_REQUEST["time"];

try {
  $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
  $STH = $DBH->exec("Delete from testGas where name = '$user' and time = '$time'");
  echo "succeed";
} catch (Exception $e) {
  echo "fail";
}

?>