<?php
    include 'RegExp.php';
    class Data{

        public $vehicleCount = array();

        public function test(){

        }
        public function getData(){
            $this->getOriginData();
            return $this;
        }
        private function getOriginData(){
            $file = fopen("../../data/sample.csv", "r");
            while($data = fgetcsv($file)){
                if($this->preProcessAtOneLine($data)){
                    $this->getVehicle($data);
                }

            }
            fclose($file);
        }

        private function preProcessAtOneLine($data){
            //Deal with illegal vehicle id
            if($data[2] != "VehicleSimID"){
                return RegExp::VehicleSimID($data[2]);
            }
        }

        private function getVehicle($data){
            if(!in_array($data[2], $this->vehicleCount) && $data[2] != "VehicleSimID"){
                array_push($this->vehicleCount, $data[2]);
            }
        }
    }