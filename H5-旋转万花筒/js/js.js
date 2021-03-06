var range = document.getElementById("points");
 var num = document.getElementById("num");
 var c = document.getElementById("c");
 var ctx = c.getContext("2d");
 var cw = c.width = window.innerWidth,
    X = 0;
 var ch = c.height = window.innerHeight,
    Y = 0;
 ctx.strokeStyle = "white";
 //ctx.fillStyle = "rgba(0,0,0,.25)";
 var R = 100;
 var r = 40;
 var numPoints = 15;
 var rad = Math.PI / 180;
 var h = 0;
 var k = 5
 var p, a, h;
 function Draw() {
    var pointsRy = []
    R += k;
    r += k;
    if ((100 - r / 2.2) > 0) {
        l = 100 - r / 2.5;
    } else {
        l = 0;
    }
    ctx.strokeStyle = "hsl(0,0%," + l + "%)"
    p = numPoints * 2;
    a = 360 / (p);
    for (var i = 0; i <= p; i++) {
        pointsRy[i] = {};
        if (i % 2 == 0) {
            radio = R
        } else {
            radio = r
        }
        pointsRy[i].radio = radio;
        pointsRy[i].x = X + radio * Math.cos(a * i * rad);
        pointsRy[i].y = Y + radio * Math.sin(a * i * rad);
        //ctx.lineTo(pointsRy[i].x, pointsRy[i].y);
    }
    //ctx.arc(pointsRy[1].x, pointsRy[1].y,3,0,2*Math.PI)
    ctx.beginPath();
    ctx.moveTo(pointsRy[1].x, pointsRy[1].y);
    for (var b = 3; b < pointsRy.length; b += 2) {
        ctx.quadraticCurveTo(pointsRy[b - 1].x, pointsRy[b - 1].y, pointsRy[b].x, pointsRy[b].y);
    }
    ctx.quadraticCurveTo(pointsRy[0].x, pointsRy[0].y, pointsRy[1].x, pointsRy[1].y);
    //ctx.closePath();
    ctx.stroke()
 }
 ctx.translate(cw / 2, ch / 2);
 function guilloche() {
    numPoints = range.value;
    num.innerHTML = range.value;
    h = 18 * numPoints;
    ctx.fillStyle = "hsl(" + h + ",100%,30%)";
    console.log(ctx.fillStyle);
    ctx.fillRect(-cw, -ch, 2 * cw, 2 * ch);
    R = 100;
    r = 30;
    k = 3
    for (j = 0; j < 40; j++) {
        Draw();
        ctx.rotate(1 * rad);
    }
    R = 100;
    r = 40;
    k = 5
    for (j = 0; j < 40; j++) {
        Draw();
        ctx.rotate(-1 * rad);
    }
    R = 50;
    r = 1;
    k = 3
    for (j = 0; j < 30; j++) {
        Draw();
    }
 }
 range.addEventListener("input", guilloche, false);
 window.addEventListener("load", guilloche, false);