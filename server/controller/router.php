<?php

    include '../service/Data.php';
    include '../service/Response.php';

//    $type = isset($_GET['type']) ? $_GET['type'] : null;
//
//    if($type === 'start'){
//        if(Data::getInstance()->start())
//            echo 'success';
//    }

Data::getInstance()->start();

//$test = array('22', '11');
//$file = fopen('../../data/test.json', 'w');
//fwrite($file, json_encode($test));
//fclose($file);
//$res = fopen('../../data/test.json', 'r');
//print_r(json_decode(file_get_contents('../../data/test.json')));
