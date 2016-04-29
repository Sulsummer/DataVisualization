'use strict';

app.controller('mainCtrl', ['$scope', '$http', 'TransSrv', 'MapSrv', 'ToolSrv',
function($scope, $http, TransSrv, MapSrv, ToolSrv){
    var that = $scope;
    
    $scope._init_ = function(){
        //this.test();
        this._getVehicleCount_();
        this._getVehiclePassengerCount_();
    }

    $scope.test = function(){
        d3.csv('data/sample.csv', function(error, data){
            console.log(data);
        })
    }

    $scope._getVehicleCount_ = function(){
        TransSrv.getVehicleCount().$promise
        .then(function(success){
            that.vehicleCountUrl = success.url;
            d3.csv(that.vehicleCountUrl, function(error, data) {
                if(error){
                    console.log(error);
                }
                that.vehicleCount = data;
                that._mergeLightVehicleCount_();
                that._renderVehicleCountPieChart_();
             });
        });
    }
     
    $scope._renderVehicleCountPieChart_ = function(){
        ToolSrv.vehicleCountPieChart(that.vehicleCount, $('.pie-chart'), '.pie-chart')
                .renderSvg()
                .renderBody()
                .renderPie();
    }
    $scope._mergeLightVehicleCount_ = function(){
        var vehicleCount = this.vehicleCount,
            otherCount = 0,
            newArr = [];
        for(var i = 0; i < vehicleCount.length; i ++){
            if(vehicleCount[i].count - 0 >= 18000){
                newArr.push({
                    vehicleId: vehicleCount[i].vehicleId,
                    count: vehicleCount[i].count - 0
                });
                
            }
            else{
                otherCount += (vehicleCount[i].count-0);
            }  
        }
        newArr.push({
            vehicleId: 'other',
            count: otherCount
        });
        this.vehicleCount = newArr;
    }


    $scope._getVehiclePassengerCount_ = function(){
        TransSrv.getVehiclePassengerCount().$promise
        .then(function(success){
            that.vehiclePassengerCountUrl = success.url;
            d3.csv(that.vehiclePassengerCountUrl, function(error, data) {
                if(error){
                    console.log(error);
                }
                that.vehiclePassengerCount = data;
                that._renderVehiclePassengerCountBarChart_();
             });
        });
    }
    $scope._renderVehiclePassengerCountBarChart_ = function(){
        ToolSrv.vehiclePassengerCountBarChart(that.vehiclePassengerCount, $('.bar-chart'), '.bar-chart')
                .renderSvg()
                .renderBody()
                .renderAxis()
                .renderBar();
    }


    $scope._init_();
    //console.log($scope.originalData);
    //$scope._setMap_('map', [116.39,39.9]);



}])