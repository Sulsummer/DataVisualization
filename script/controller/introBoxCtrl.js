'use strict';

app.controller('introBoxCtrl', ['$scope', function($scope){
    var that = $scope;

    $scope.arr = [1, 2, 3];
    $scope.pointer = 0;

    $scope.prev = function(){
        this._move_('prev');
    }
    $scope.next = function(){
        this._move_('next');
    }

    $scope._move_ = function(dir){
        if(dir === 'prev'){
            this.pointer --;
            if(this.pointer < 0){
                this.pointer = 2
            }
        }
        else if(dir === 'next'){
            this.pointer ++;
            if(this.pointer > 2){
                this.pointer = 0;
            }
        }
        else{
            return false;
        }

        

        AnimateTransition({
            container: '.intro-box>.content',
            blockIn: '.intro-box>.content>.item'+that.arr[that.pointer],
            animation: 'fade-in',
            onTransitionStart: function (blockIn, blockOut, container, event) {

            },
            onTransitionEnd: function (blockIn, blockOut, container, event) {

            }
        });
    }
    $scope._setPointer_ = function(mark){

    }
}])