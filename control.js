//get mouse position, cross browser compatability
function cursor_position(e) {
    //this section is from http://www.quirksmode.org/js/events_properties.html
    var targ, x, y;

    if (!e) {
        e = window.event;
    }
    if (e.target) {
        targ = e.target;
    }
    else if (e.srcElement) {
        targ = e.srcElement;
    }
    if (targ.nodeType == 3) {
        targ = targ.parentNode;
    }

    x = Math.floor(e.pageX - $(targ).offset().left);
    y = Math.floor(e.pageY - $(targ).offset().top);

    return {x: x, y: y};
};



var new_universe = function (fig) {
    var fig = fig || {},
        that = {},
        objects = [],
        Draw = fig.Draw,
        Physics = fig.Physics
        isMouseDown = false,
        $canvas = fig.canvas || $('#canvas'),
        grabbedObject = null;


    $canvas.mousedown(function (e) {
        grabbedObject = that.get_intersecting_object(cursor_position(e));
        that.remove(grabbedObject);
        isMouseDown = true;
    });

    $canvas.mouseup(function (e) {
        if(grabbedObject) {
            that.add(grabbedObject);
        }
        grabbedObject = null;
        isMouseDown = false;
    });

    $canvas.mousemove(function (e) {
        var newPosition;
        if(isMouseDown && grabbedObject) {
            newPosition = cursor_position(e);
            grabbedObject.velocity = {
                x: (newPosition.x - grabbedObject.position.x) * 0.2,
                y: (newPosition.y - grabbedObject.position.y) * 0.2
            };
            grabbedObject.position = newPosition;
        }
    });

    
    that.add = function (object) {
        objects.push(object);
    };

    that.remove = function (object) {
        var i;
        for(i = 0; i < objects.length; i += 1) {
            if(objects[i] === object) {
                objects.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    that.get_intersecting_object = function (position) {
        var i;
        for(i = 0; i < objects.length; i += 1) {
            if(objects[i].intersect && objects[i].intersect(position)) {
                return objects[i];
            }
        }
    };

    that.apply_physics = function () {
        var i;
        for(i = 0; i < objects.length; i += 1) {
            Physics.momentum(objects);
        }
    };

    that.render =  function () {
        var i;
        Draw.clear();
        for(i = 0; i < objects.length; i += 1) {
            objects[i].draw();
        }
        if(grabbedObject) {
            grabbedObject.draw({type: "bright"});
        }
    };

    return that;
};


//manages game processing.
var new_manager = function (fig) {

    var intervalId,
        isActive = false,
        Universe = fig.Universe;

    return {
        start: function () {
            if(!isActive) {
                intervalId = setInterval(function(){
                    Universe.apply_physics();
                    Universe.render();
                }, 16);
                isActive = true;
            }
        },
        stop: function () {
            if(isActive) {
                clear();
                clearInterval(intervalId);
                isActive = false;
            }
        }
    };

};