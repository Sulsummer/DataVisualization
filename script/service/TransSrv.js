'use strict';
app.service('TransSrv', ['$resource', 'baseURL',
function($resource, baseURL){
    var that = this;

    this.getVehicleCount = function(){
        return $resource(baseURL+'/server/controller/router.php?type=vehicleCountPieChart').get();
    }

    this.getVehiclePassengerCount = function(){
        return $resource(baseURL+'/server/controller/router.php?type=vehiclePassengerCountBarChart').get();
    }


}])