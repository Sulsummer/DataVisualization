'use strict';
app.service('MapSrv', [function(){
    var that = this;

      

    this.getMap = function(id){
        return new AMap.Map(id, {zoom:10});
    }

    this.setMarkers = function(map, markers){
        var marker = new AMap.Marker({
            map: map,
            position: markers
        });
        map.setCenter(markers);
        return map;
    }
}]) 