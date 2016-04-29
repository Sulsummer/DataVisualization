<?php
    include 'RegExp.php';
    class Data{
        private static $instance;

        //车牌号数量
        public $vehicleType = array();
        //每个车牌对应的记录数量
        public $vehicleCount = array();
        //每辆车载客数量
        public $vehiclePassengerCount = array();

        public static function getInstance(){
            if (!(self::$instance instanceof self)) {
                self::$instance = new self;
            }
            return self::$instance;
        }

        public function test(){

        }
        public function getData($type){
            $resultFile1 = null;
            $resultFile2 = null;
            if($type === 'vehicleCountPieChart'){
                $resultFile1 = '../../data/vehicleCountPieChart.csv';
                $resultFile2 = 'data/vehicleCountPieChart.csv';
            }
            else if($type === 'vehiclePassengerCountBarChart'){
                $resultFile1 = '../../data/vehiclePassengerCountBarChart.csv';
                $resultFile2 = 'data/vehiclePassengerCountBarChart.csv';
            }
            else{}
            if(!file_exists($resultFile1)){
                $this->getOriginData();
            }

            return $resultFile2;

        }
        private function getOriginData(){
            $file = fopen("../../data/sample.csv", "r");
            while($data = fgetcsv($file)){
                if($this->preProcessAtOneLine($data)){
                    $this->getAllVehicle($data);
                    $this->getVehicleCount($data);
                    $this->getVehiclePassengerCount($data);
                }
            }
            fclose($file);

            $this->setVehicleCountCsv('../../data/vehicleCountPieChart.csv');
            $this->setVehiclePassengerCountCsv('../../data/vehiclePassengerCountBarChart.csv');

        }

        private function preProcessAtOneLine($data){
            //Deal with illegal vehicle id
            if($data[2] != 'VehicleSimID'){
                return RegExp::VehicleSimID($data[2]);
            }
            if($data[8] != 'PassengerState'){
                return RegExp::PassengerState($data[8]);
            }
        }







        private function getAllVehicle($data){
            if(!in_array($data[2], $this->vehicleType) && $data[2] != "VehicleSimID"){
                array_push($this->vehicleType, $data[2]);
            }
        }
        private function getVehiclePassengerCount($data){
            if(isset($this->vehicleCount[$data[2]])){
                if($data[8] === "1"){
                    $this->vehiclePassengerCount[$data[2]] += 1;
                }
            }
            else{
                $this->vehiclePassengerCount[$data[2]] = 0;
            }
        }
        private function getVehicleCount($data){
            if(isset($this->vehicleCount[$data[2]])){
                $this->vehicleCount[$data[2]] += 1;
            }
            else{
                $this->vehicleCount[$data[2]] = 0;
            }
        }

        //csv: vehicleId,count
        private function setVehicleCountCsv($resultFile){
            $file = fopen($resultFile, 'w');
            fwrite($file, "vehicleId,count\n");
            foreach($this->vehicleCount as $key => $value){
                fwrite($file, $key.','.$value."\n");
            }
            fclose($file);
        }

        //csv: vehicleId, time, passengerCount
        private function setVehiclePassengerCountCsv($resultFile){
            $file = fopen($resultFile, 'w');
            fwrite($file, "vehicleId,passengerCount\n");
            foreach($this->vehiclePassengerCount as $key => $value){
                fwrite($file, $key.','.$value."\n");
            }
            fclose($file);
        }

    }
