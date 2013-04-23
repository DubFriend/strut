var Draw = (function () {

    var ctx = $('#canvas')[0].getContext("2d");
    
    return {
        clear: function () {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        },
        circle: function (fig) {
            ctx.fillStyle = fig.color || COLOR.BLUE;
            ctx.beginPath();
            ctx.arc(fig.position.x, fig.position.y, fig.size || 5, 0, TWOPI, true);
            ctx.closePath();
            ctx.fill();
        },
        disc: function (fig) {
            ctx.strokeStyle = fig.color || COLOR.BLUE;
            ctx.lineWidth = fig.width || 1;
            ctx.beginPath();
            ctx.arc(fig.position.x, fig.position.y, fig.size || 5, 0, TWOPI, true);
            ctx.closePath();
            ctx.stroke();
        },
        line: function (fig) {
            ctx.lineWidth = fig.width || 1;
            ctx.strokeStyle = fig.color || COLOR.BLUE;
            ctx.beginPath();
            ctx.moveTo(fig.begin.x, fig.begin.y);
            ctx.lineTo(fig.end.x, fig.end.y);
            ctx.closePath();
            ctx.stroke();
        }
    };

}());