'use strict';

app.controller('mainCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$document', '$state', 'TransSrv', 'MapSrv', 'ToolSrv',
function($rootScope, $scope, $http, $timeout, $document, $state, TransSrv, MapSrv, ToolSrv){
    var that = $scope;
    
    $scope._init_ = function(){
        TransSrv.start();
        $timeout(function(){
            that._infoTree_();
            that._vehicleCountPieChart_();
            that._vehicleCountBarChart_();
            that._vehiclePassengerBarChart_();
            that.getInfoMap();

            that._run_();
        }, 3000);
        
    }

    $scope.test = function(){

    }

    $scope._goDown_ = function(){
        
    }

    $scope._run_ = function(){
        $('.plan').each(function(){
            var _this_ = $(this);
            _this_.on('mouseover', function(){
                if(!_this_.is(':animated')){
                    if(_this_.css('top') !== -20){
                         _this_.animate({
                            marginTop: '-20px'
                        }, 100, 'linear');
                    }
                }
            });
            _this_.on('mouseout', function(){ 
                if(!_this_.is(':animated')){
                    if(_this_.css('top') !== 0){
                        _this_.animate({
                            marginTop: '0'
                        }, 100, 'linear');
                    }
                }    
            });
        });
    }

    $scope.veiwData = function(id){
        $rootScope.data = id;
        $state.go('data');
    }

    $document.bind('click', function(e){
        that.$apply(function(){
            if((e.target.tagName === 'path') && (ToolSrv.data !== undefined)){
                that.data = ToolSrv.data;
                that.data.time = '[]';
            }
        });
    });

    $scope._infoTree_ = function(){
        ToolSrv.infoTreeChart(TransSrv.info, $('.tree-chart'), '.tree-chart');
    } 
    $scope._vehicleCountPieChart_ = function(){
        ToolSrv.vehicleCountPieChart(TransSrv.vehicleInfo, $('.pie-chart'), '.pie-chart')
                .renderSvg()
                .renderBody()
                .renderPie();
    }
    $scope._vehicleCountBarChart_ = function(){
        ToolSrv.vehicleCountBarChart(TransSrv.vehicleInfo, $('.bar-chart-count'), '.bar-chart-count')
                .renderSvg()
                .renderBody()
                .renderAxis()
                .renderBar()
                .renderLabel();
    }
    $scope._vehiclePassengerBarChart_ = function(){
        ToolSrv.vehiclePassengerBarChart(TransSrv.vehicleInfo, $('.bar-chart-passenger'), '.bar-chart-passenger')
                .renderSvg()
                .renderBody()
                .renderAxis()
                .renderBar()
                .renderLabel();
    }


    $scope.intro = function(){

        alert();
    }

    $scope.getInfoMap = function(pos){
        MapSrv.getInfoMap('info-map', pos);
    }

    $scope._init_();



}])