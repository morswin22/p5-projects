function Plinko(x,y,r) {
    var options = {
        isStatic: true,
        friction: 0,
    }
    this.body = Bodies.circle(x,y,r,options);
    this.body.label = "plinko";
    this.r = r;
    World.add(world, this.body);
}

Plinko.prototype.show = function () {
    var c = color(100,255,100);
    fill(c);
    stroke(c);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0, this.r * 2);
    pop();
}