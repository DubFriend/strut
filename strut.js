//Some Language Add Ons a la "JavaScript the Good Parts"
if(typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('curry', function() {
    var slice = Array.prototype.slice;
    args = slice.apply(arguments),
    that = this;
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});


$('#strut').html('<canvas id="canvas" width="' + $('#strut').parent().width() + 
    '" height="' + $('#strut').parent().height() + '"></canvas>');

var CTX = $('#canvas')[0].getContext("2d");
var TWOPI = Math.PI * 2;
var WIDTH = $('#canvas').width();
var HEIGHT = $('#canvas').height();
var COLOR = {
    YELLOW: 'rgba(255, 255, 0, .7)',
    BLUE: 'rgba(31, 48, 240, 0.7)',
    RED: 'rgba(233, 15, 15, 0.74)',
    BLACK: 'rgb(0, 0, 0)'
};

var draw_circle = function (config) {
    CTX.fillStyle = config.color || COLOR.BLUE;
    CTX.beginPath();
    CTX.arc(config.position.x, config.position.y, config.size || 5, 0, TWOPI, true);
    CTX.closePath();
    CTX.fill();
};

var draw_disc = function (config) {
    CTX.strokeStyle = config.color || COLOR.BLUE;
    CTX.lineWidth = config.width || 1;
    CTX.beginPath();
    CTX.arc(config.position.x, config.position.y, config.size || 5, 0, TWOPI, true);
    CTX.closePath();
    CTX.stroke();
};

var draw_line = function (config) {
    CTX.lineWidth = config.width || 1;
    CTX.strokeStyle = config.color || COLOR.BLUE;
    CTX.beginPath();
    CTX.moveTo(config.begin.x, config.begin.y);
    CTX.lineTo(config.end.x, config.end.y);
    CTX.closePath();
    CTX.stroke();
};

draw_circle({
    size: 25,
    position: {x: 300, y: 400},
    color: COLOR.YELLOW
});

draw_disc({
    size: 15,
    width: 2,
    position: {x: 400, y: 500},
    color: COLOR.RED
});

draw_line({
    width: 3,
    begin: {x: 10, y: 20},
    end: {x: 30, y: 50}
});



var new_object = function (fig) {
    return {
        color: fig.color || COLOR.BLUE,
        position: fig.position,
        width: fig.width || 2,
        draw: function () { throw("override me"); }
    };
};


var new_node = function (fig) {
    var that = new_object(fig);

    that.size = fig.size || 15;

    if(fig.type) {
        that.type = fig.type.toLowerCase();
    }
    else {
        that.type = "disc";
    }

    that.draw = function () {
        if(this.type === "solid") {
            draw_circle({
                position: this.position,
                size: this.size,
                color: this.color
            });
        }
        else if(this.type === "disc") {
            draw_disc({
                position: this.position,
                size: this.size,
                color: this.color,
                width: this.width
            });
        }
        else {
            throw("invalid type");
        }
    };

    return that;
};




//links bind two nodes together, they have physics models, shapes, etc.
var new_link = function (fig) {
    var that = new_object(fig),
        nodeA = fig.nodeA,
        nodeB = fig.nodeB;

    that.draw = function () {
        draw_line({
            width: this.width,
            color: this.color,
            begin: nodeA.position,
            end: nodeB.position
        });
    };

    return that;
};




//composites are networks of links and nodes.
var composite = {

};



var node = new_node({
    position: {x: 445, y: 445},
    size: 50,
    color: COLOR.RED,
    type: "solid"
});
node.draw();





//manages game processing.
var manager = (function () {

    var intervalId, active = false,
        clear = function () {
            CTX.clearRect(0, 0, WIDTH, HEIGHT);
        },
        refresh = function () {
            clear();
        };

    return {
        start: function () {
            if(!active) {
                intervalId = setInterval(refresh, 16);
                active = true;
            }
        },
        stop: function () {
            if(active) {
                clear();
                clearInterval(intervalId);
                active = false;
            }
        }
    };

}());
