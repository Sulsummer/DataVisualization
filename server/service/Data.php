<?php

class Data{
    public static $instance;
    private $vehiclePath = '../../data/vehicle/';
    private $originDataCSV = '../../data/sample.csv';
    private $specificV = '8.06814E+11';
    private $vsIdArrJSON = '../../data/vsIdArr.json';


    private $infoJSON = '../../data/info.json';
    private $timeJSON = '../../data/time.json';
    private $resultJSON = '../../data/result.json';


    public $specificVData = array();
    public $info = array();

    public static function getInstance(){
        if(!self::$instance){
            self::$instance = new Data();
        }
        return self::$instance;
    }

    public function start(){
        //$this->setDataInfo();
        //$this->setVehicleCsv();
        $this->setVehicleInfo();
        //$this->setTimeInfo();
    }

    private function setDataInfo(){
        $file = fopen($this->originDataCSV, 'r');

        $vsIdArr = array();
        $gpsTimeArr = array('2010/9/12  0:00:00','2010/9/12  6:57:00');
        $gpsSpeedStr = '';
        $gpsLonStr = '';
        $gpsLatStr = '';
        $passengerStateArr = array('0', '1');
        $gpsDirectStr = '';

        while($data = fgetcsv($file)){
            if($data[2] !== 'VehicleSimID' && !in_array($data[2], $vsIdArr)){
                array_push($vsIdArr, $data[2]);
            }
        }
        fclose($file);
//        $result = array(
//            'VehicleSimID'  => $vsIdArr,
//            'GPSTime'       => $gpsTimeArr,
//            'GPSSpeed'      => $gpsSpeedStr,
//            'GPSLongitude'  => $gpsLonStr,
//            'GPSLatitude'   => $gpsLatStr,
//            'PassengerState'=> $passengerStateArr,
//            'GPSDirect'     => $gpsDirectStr
//        );

        $result = array(
            'name' => 'data',
            'children' => array(
                array(
                    'name' => 'VehicleSimID',
                    'children' => array(array('name' => '('.$vsIdArr[0].', '.$vsIdArr[1].', ...) (49)'))
                ),
                array(
                    'name' => 'GPSTime',
                    'children'=> array(array('name' => '('.$gpsTimeArr[0].'  ... '.$gpsTimeArr[1].')'))
                ),
                array(
                    'name' => 'GPSSpeed',
                    'children'=> null
                ),
                array(
                    'name' => 'GPSLongitude',
                    'children'=> null
                ),
                array(
                    'name' => 'GPSLatitude',
                    'children'=> null
                ),
                array(
                    'name' => 'PassengerState',
                    'children'=> array(array('name' => '('.$passengerStateArr[0].', '.$passengerStateArr[1].')'))
                ),
                array(
                    'name' => 'GPSDirect',
                    'children'=> null
                ),
                array(
                    'name' => 'CreateDate',
                    'children' => null
                )
            )
        );

        $tmpArrTarget = fopen($this->vsIdArrJSON, 'w');
        fwrite($tmpArrTarget, json_encode($vsIdArr));
        fclose($tmpArrTarget);

        $target = fopen($this->infoJSON, 'w');
        fwrite($target, json_encode($result));
        fclose($target);
    }

    private function setVehicleCsv(){
        $vsIdArr = json_decode(file_get_contents($this->vsIdArrJSON));

        foreach($vsIdArr as $value){
            $resArr = array();
            $file = fopen($this->originDataCSV, 'r');
            while($data = fgetcsv($file)){
                if($data[2] === $value || $data[2] === 'VehicleSimID'){
                    array_push($resArr, $data);
                }
            }
            fclose($file);

            $target = fopen($this->vehiclePath.$value.'.csv', 'w');

            foreach($resArr as $item){
                $count = 0;
                foreach($item as $subItem){
                    if($count < 10){
                        fwrite($target, $subItem.',');
                    }
                    else{
                        fwrite($target, $subItem."\n");
                    }
                    $count ++;
                }

            }
            fclose($target);
        }


    }

    private function setVehicleInfo(){
        $vsIdArr = json_decode(file_get_contents($this->vsIdArrJSON));

        $resultArr = array();

        foreach($vsIdArr as $value){

            $vCount = 0;
            $pCount = 0;
            $larLon = 0;
            $larLat = 0;
            $smaLon = 180;
            $smaLat = 90;

            $file = fopen($this->vehiclePath.$value.'.csv', 'r');
            $flag = false;
            $tmpData = '';
            while($data = fgetcsv($file)){
                if(!$flag){
                    $flag = true;
                }
                else{
                    if($tmpData !== ''){
                        if($tmpData[8] === '0' && $data[8] === '1'){
                            $pCount ++;
                        }
                    }
                    else{
                        if($data[8] === '1'){
                            $pCount ++;
                        }
                    }
                    $tmpData = $data;

                    $vCount ++;

                    if($larLon < (double)$data[4]){
                        $larLon = (double)$data[4];
                    }
                    if($larLat < (double)$data[5]){
                        $larLat = (double)$data[5];
                    }
                    if(($data[5] !== '0') && ($data[4] !== '0')){
                        if($smaLon > (double)$data[4]){
                            $smaLon = (double)$data[4];
                        }
                        if($smaLat > (double)$data[5]){
                            $smaLat = (double)$data[5];
                        }
                    }

                }
            }



            array_push($resultArr, array(
                'id' => $value,
                'vCount' => $vCount,
                'pCount' => $pCount,
                'larLon' => $larLon,
                'larLat' => $larLat,
                'smaLon' => $smaLon,
                'smaLat' => $smaLat
            ));

        }

        $target = fopen($this->resultJSON, 'w');
        fwrite($target, json_encode($resultArr));
        fclose($target);
    }

    private function setTimeInfo(){
        $file = fopen($this->originDataCSV, 'r');

        $gpsArr = array();
        $createArr = array();

        while($data = fgetcsv($file)){
            if(!in_array($data[3],$gpsArr)){
                array_push($gpsArr, $data[3]);
            }
            if(!in_array($data[10],$createArr)){
                array_push($createArr, $data[10]);
            }

        }
        fclose($file);

        $resArr = array(
            'GPSTime' => $gpsArr,
            'CreateTime' => $createArr
        );
        $target = fopen($this->timeJSON, 'w');
        fwrite($target, json_encode($resArr));
        fclose($target);
    }

}