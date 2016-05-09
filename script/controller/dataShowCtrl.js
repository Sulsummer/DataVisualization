'use strict';

app.controller('dataShowCtrl', ['$rootScope', '$scope', '$timeout', 'TransSrv',
function($rootScope, $scope, $timeout, TransSrv){
    var that = $scope;

    $scope.init = function(){
        this.id = $rootScope.data;
        TransSrv.getData($rootScope.data);
        $timeout(function(){
            that.data =TransSrv.data;
            console.log(typeof that.data);
        }, 3000);
    }

    $scope.init();
    
}])