'use strict';
app.service('MapSrv', [function(){
    var that = this;

    this._getMap_ = function(id){
        return new AMap.Map(id, {
            zooms: [3, 15],
            center: [118, 32]
        });
    }

    this._getLngLat_ = function(lng, lat){
        return new AMap.LngLat(lng, lat);
    }

    this.getInfoMap = function(id, pos){
        var map = this._getMap_(id);
        if(pos){
            var southEase = this._getLngLat_(pos.larLon, pos.larLat),
                northWest = this._getLngLat_(pos.smaLon, pos.smaLat),
                southWest = this._getLngLat_(pos.smaLon, pos.larLat),
                northEast = this._getLngLat_(pos.larLon, pos.smaLat),
                polyline = new AMap.Polyline({
                    path: [southEase, southWest, northWest, northEast, southEase],
                    strokeColor: "#F00",
                    strokeOpacity: 0.4,
                    strokeWeight: 3,
                    strokeStyle: "dashed",
                    strokeDasharray: [10,5]
                });
            polyline.setMap(map);
        }
    }


    // this.getMap = function(id){
    //     return new AMap.Map(id, {zoom:10});
    // }

    // this.setMarkers = function(map, markers){
    //     var marker = new AMap.Marker({
    //         map: map,
    //         position: markers
    //     });
    //     map.setCenter(markers);
    //     return map;
    // }

    // this.getSpecificVehicleMap = function(id, opt){
    //     var map = new AMap.Map(id, {
    //             zooms: [3, 15],
    //             scrollWheel: false,
    //             mapStyle: 'fresh'
    //         }),
    //         southEase = new AMap.LngLat(opt.largeLongitude, opt.largeLatitude),
    //         northWest = new AMap.LngLat(opt.smallLongitude, opt.smallLatitude),
    //         southWest = new AMap.LngLat(opt.smallLongitude, opt.largeLatitude),
    //         northEast = new AMap.LngLat(opt.largeLongitude, opt.smallLatitude),
    //         bound = new AMap.Bounds(southWest, northEast);

    //     map.setBounds(bound);

    //     var polyline = new AMap.Polyline({
    //         path: [southEase, southWest, northWest, northEast, southEase],
    //         strokeColor:"#F00",
    //         strokeOpacity:0.4,
    //         strokeWeight:3,
    //         strokeStyle:"dashed",
    //         strokeDasharray:[10,5]
    //     });
    //     polyline.setMap(map);
    //     console.log(bound.getCenter());

    //     return map;
    // }

    // this.getLngLat = function(lng, lat){
    //     if(typeof lng === 'string'){
    //         lng = lng - 0;
    //         lat = lat - 0;
    //     }
    //     return new AMap.LngLat(lng, lat);
    // }

    // this.getMarker = function(map, data, opt){
    //     var position = this.getLngLat(data.GPSLongitude, data.GPSLatitude);
    //     var content = data.ID;
    //     var marker = new AMap.Marker({
    //         map: map,
    //         position: position
    //     });
    //     marker.content = content;
    //     marker.on('click', function(e){
    //         var info = new AMap.InfoWindow();
    //         info.setContent(e.target.content);
    //         info.open(map, e.target.getPosition());
    //     });


    // }   
        
}]) 