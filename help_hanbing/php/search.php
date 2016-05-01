<?php

    header("Content-type: application/json");

    $object = new stdClass();
    $object->user = $_REQUEST['user'];
    $object->test = $_REQUEST['test'];

    print_r(json_encode($object));

?>
