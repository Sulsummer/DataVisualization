'use strict';
app.service('TransSrv', ['$http', '$timeout', 'baseURL',
function($http, $timeout, baseURL){
    var that = this;

    this.start = function(){
        this._http_('start');
    }

    this._http_ = function(type){
        if(type === 'start'){
            d3.json(baseURL+'/data/info.json', function(err, data) {
                if(err){
                    console.log(err);
                }
                that.info = data;
            });
            d3.json(baseURL+'/data/result.json', function(err, data){
                if(err){
                    console.log(err);
                }
                that.vehicleInfo = data;
            });

        }
    }

    this.getData = function(id){
        d3.csv(baseURL+'/data/vehicle/'+id+'.csv', function(err, data) {
            if(err){
                console.log(err);
            }
            that.data = data;
        });
    }
}])