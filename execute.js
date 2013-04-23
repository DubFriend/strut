var Draw = new_draw();

var Physics = new_physics();

var nodeA = new_node({
    position: {x: 445, y: 445},
    size: 50,
    color: COLOR.RED,
    type: "solid",
    Draw: Draw
});

var nodeB = new_node({
    position: {x: 600, y: 600},
    size: 15,
    color: COLOR.YELLOW,
    type: "disc",
    Draw: Draw
});

var link = new_link({
    nodeA: nodeA,
    nodeB: nodeB,
    Draw: Draw
});


var Universe = new_universe({
    Draw: Draw,
    Physics: Physics
});

Universe.add(nodeA);
Universe.add(nodeB);
Universe.add(link);


var Manager = new_manager({Universe: Universe});
Manager.start();

//Universe.render();

