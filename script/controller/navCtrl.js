'use strict';

app.controller('navCtrl', ['$scope', function($scope){
    var that = $scope;

    $scope._init_ = function(){
        //this.intro();
    }

    $scope.intro = function(){
        Custombox.open({
            target: '.intro-box',
            effect: 'fadein'
        }); 

    }


    $scope._init_();
}])