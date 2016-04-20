'use strict';
app.service('TransSrv', [function(){
    var that = this;

    this.getD3CSV = function(){
        
        return that.data;
    }


}])