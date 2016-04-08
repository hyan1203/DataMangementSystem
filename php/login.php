<?php
header("Content-type: application/json");
include("../config.php");
session_start();
if (isSet($_POST["username"]) && isSet($_POST["password"])) {
	$username = $_POST["username"];
	$password = $_POST["password"];
	try {
	    $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
	    $STH = $DBH->query("SELECT * from Users where username='{$username}' and password='{$password}'");
      $rows_affected = $STH->rowCount();
      if($rows_affected > 0){
      	echo("true");
      }
      else{
      	echo("false");
      }
	}
	catch(PDOException $e) {
	    echo $e->getMessage();
	}
}
?>
