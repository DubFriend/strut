
var new_object = function (fig, my) {
    my.Draw = fig.Draw || Draw;
    return {
        color: fig.color || COLOR.BLUE,
        position: fig.position,
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

    that.draw = function () {
        if(this.type === "solid") {
            my.Draw.circle({
                position: this.position,
                size: this.size,
                color: this.color
            });
        }
        else if(this.type === "disc") {
            my.Draw.disc({
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