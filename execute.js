/*draw_circle({
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
});*/



var nodeA = new_node({
    position: {x: 445, y: 445},
    size: 50,
    color: COLOR.RED,
    type: "solid"
});


var nodeB = new_node({
    position: {x: 600, y: 600},
    size: 15,
    color: COLOR.YELLOW,
    type: "disc"
});

var link = new_link({
    nodeA: nodeA,
    nodeB: nodeB
});

nodeA.draw();
nodeB.draw();
link.draw();

