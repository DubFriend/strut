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

//nodeA.draw();
//nodeB.draw();
//link.draw();

var Universe = new_universe();

Universe.add(nodeA);
Universe.add(nodeB);
Universe.add(link);

Universe.render();


bind_controls({Universe: Universe});
