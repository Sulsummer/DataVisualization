app.service('ToolSrv', [function(){
    var that = this;
    this.checkArrayEleExist = function(array, ele){
        for(var i = 0; i < array.length; i ++){
            if(array[i] === ele){
                return true;
            }
        }
        return false;
    }
}])