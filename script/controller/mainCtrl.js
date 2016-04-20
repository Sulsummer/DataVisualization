'use strict';
app.controller('mainCtrl', ['$scope', 'TransSrv', 'MapSrv',
function($scope, TransSrv, MapSrv){
    var that = $scope;
    $scope.data = TransSrv.data || [];
    
    $scope._init_ = function(){
        if(this.data.length === 0){
            d3.csv('data/sample.csv', function(error, data){
                if(error){
                    console.log(error);
                }
                that.data = data;
                TransSrv.data = data;
                that._preprocess_();
            });
        }
    }
    $scope._preprocess_ = function(){
        if(this.data.length !== 0){
            // for(var i = 0; i < this.data.length; i ++){
            //     this._delete_();
            //     this._divide_();
            // }
            alert();
        }
    }
    $scope._delete_ = function(){

    }
    $scope._divide_ = function(){

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
    //console.log($scope.data);
    //$scope._setMap_('map', [116.39,39.9]);



}])