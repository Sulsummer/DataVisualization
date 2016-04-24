<?php
    include '../service/Data.php';

    $data = new Data();
    print_r($data->getData()->vehicleCount);
