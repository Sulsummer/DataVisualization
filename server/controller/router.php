<?php

    include '../service/Data.php';
    include '../service/Response.php';

    $data = Data::getInstance();
    $response = new Response();

    $type = isset($_GET['type']) ? $_GET['type'] : null;
    //$type = 'vehicleCountPieChart';
    $ve = $data->getData($type);

    $res = $response->setContent($ve);

    echo $res;