'use strict';
app.controller('mainCtrl', ['$scope', 'TransSrv', 'MapSrv', 'ToolSrv',
function($scope, TransSrv, MapSrv, ToolSrv){
    var that = $scope;
    $scope.originalData = TransSrv.originalData || [];
    $scope.standardData = [];
    $scope.dataCount = 0;
    
    $scope._init_ = function(){
        if(this.originalData.length === 0){
            d3.csv('data/sample.csv', function(error, data){
                if(error){
                    console.log(error);
                }
                that.originalData = data;
                TransSrv.originalData = data;
                that._preprocess_();
                console.log(that);
            });
        }
        
    }
    $scope.test = function(i){
        return i ++;
    }
    $scope._preprocess_ = function(){
        this.aVehicleSimID = [];
        if(this.originalData.length !== 0){
            for(var i = 0; i < this.originalData.length; i ++){
                // if(!this._deleteErrorData_(this.originalData[i])){
                //     this._divideDataByVehicleSimID_(this.originalData[i], aVehicleSimID);    
                // }
                this.rowData = this.originalData[i];
                this._divideDataByVehicleSimID_(this.rowData, this.aVehicleSimID);
            }
        }
    }
    $scope._deleteErrorData_ = function(rowData){
        // if(rowData){
        //     if(){

        //         return true;
        //     }
        //     else{

        //         return false;
        //     }
        // }
        // else{
        //     return false;
        // }
        return false;
    }
    $scope._divideDataByVehicleSimID_ = function(rowData, aVehicleSimID){
        
        if(!ToolSrv.checkArrayEleExist(rowData.VehicleSimID, aVehicleSimID)){
            aVehicleSimID.push(rowData.VehicleSimID);
            this.standardData.push({
                name: 'data'+that.dataCount,
                vehicleSimID: rowData.VehicleSimID,
                data: []
            });
            this.dataCount++;
        }
        this._setStandardData_(rowData, rowData.VehicleSimID);
    }
    $scope._setStandardData_ = function(rowData, vehicleSimID){
        for(var i = 0; i < this.standardData.length; i ++){
            if(this.standardData[i].VehicleSimID === vehicleSimID){
                this.standardData[i].data.push(rowData);
            }
        }
    }


    // $scope._setMap_ = function(id, markers){
    //     this.map = MapSrv.getMap(id);
    //     if(markers){
    //         this._setMarkers_(markers);
    //     }
    // }

    // $scope._setMarkers_ = function(markers){
    //     this.map = MapSrv.setMarkers(that.map, markers);
    // }

    $scope._init_();
    //console.log($scope.originalData);
    //$scope._setMap_('map', [116.39,39.9]);



}])