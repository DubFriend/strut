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

//build canvas and put it on the screen (done this way to get full window height and width.)
$('#strut').html('<canvas id="canvas" width="' + $('#strut').parent().width() + 
    '" height="' + $('#strut').parent().height() + '"></canvas>');

var TWOPI = Math.PI * 2,
    WIDTH = $('#canvas').width(),
    HEIGHT = $('#canvas').height(),
    COLOR = {
        YELLOW: 'rgba(255, 255, 0, 0.7)',
        BLUE: 'rgba(31, 48, 240, 0.7)',
        RED: 'rgba(233, 15, 15, 0.74)',
        BLACK: 'rgb(0, 0, 0)'
    };
