new_physics = function () {

    

    return {
        momentum: function (objects) {
            var i;
            for(i = 0; i < objects.length; i += 1) {
                if(objects[i].momentum) {
                    objects[i].momentum();
                }
            }
        }
    };
};