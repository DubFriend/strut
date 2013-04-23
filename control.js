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
        objects = [],
        Render = fig.Draw || Draw;

    return {
        add: function (object) {
            objects.push(object);
        },
        remove: function (object) {
            var i;
            for(i = 0; i < objects.length; i += 1) {
                if(objects[i] === object) {
                    objects.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        render: function () {
            var i;
            Render.clear();
            Physics.apply(objects);
            for(i = 0; i < objects.length; i += 1) {
                objects[i].draw();
            }
        },
        get_intersecting_object: function (position) {
            var i;
            for(i = 0; i < objects.length; i += 1) {
                if(objects[i].intersect && objects[i].intersect(position)) {
                    return objects[i];
                }
            }
        }
    };
};


var bind_controls = function (fig) {
    var fig = fig || {},
        $canvas = fig.canvas || $('#canvas'),
        Universe = fig.Universe,
        isMouseDown = false;

    $canvas.mousedown(function (e) {
        var object = Universe.get_intersecting_object(cursor_position(e));
        isMouseDown = true;
        if(object) {
            alert("object clicked");
        }
    });

    $canvas.mouseup(function (e) {
        isMouseDown = false;
    });

    $canvas.mousemove(function (e) {
        $('#cursor').html(JSON.stringify(cursor_position(e)));
    });
};



//manages game processing.
var new_manager = function (fig) {

    var intervalId,
        isActive = false;

    return {
        start: function () {
            if(!isActive) {
                intervalId = setInterval(function(){}, 16);
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