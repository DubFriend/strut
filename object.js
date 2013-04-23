
var new_object = function (fig, my) {
    my.Draw = fig.Draw;
    return {
        color: fig.color || COLOR.BLUE,
        position: fig.position,
        velocity: fig.velocity || {x: 0, y: 0},
        width: fig.width || 2,
        draw: function () { throw("override me"); }
    };
};



var new_node = function (fig, my) {
    var my = my || {},
        that = new_object(fig, my),
        distance = function (posA, posB) {
            return Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2));
        };

    that.size = fig.size || 15;
    that.weight = fig.weight || 10;
    if(fig.type) {
        that.type = fig.type.toLowerCase();
    }
    else {
        that.type = "disc";
    }

    that.intersect = function (position) {
        return distance(position, this.position) < this.size;
    };

    that.draw = function (fig) {
        var fig = fig || {},
            color = this.color;
        if(fig.type === "bright") {
            color = my.Draw.brighten_color(color);
        }

        if(this.type === "solid") {
            my.Draw.circle({
                position: this.position,
                size: this.size,
                color: color
            });
        }
        else if(this.type === "disc") {
            my.Draw.disc({
                position: this.position,
                size: this.size,
                color: color,
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
var new_link = function (fig, my) {
    var my = my || {},
        that = new_object(fig, my),
        nodeA = fig.nodeA,
        nodeB = fig.nodeB;

    that.draw = function () {
        my.Draw.line({
            width: this.width,
            color: this.color,
            begin: nodeA.position,
            end: nodeB.position
        });
    };

    return that;
};



//composites are networks of links and nodes.
var new_composite = function (fig, my) {
    var my = my || {},
        that = new_object(fig, my);
};