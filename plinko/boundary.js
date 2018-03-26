function Boundary(x,y,w,h) {
    var options = {
        isStatic: true,
    }
    this.body = Bodies.rectangle(x,y,w,h,options);
    this.body.label = "boundary";
    this.w = w;
    this.h = h;
    World.add(world, this.body);
}

Boundary.prototype.show = function () {
    var c = color(255,100,150);
    fill(c);
    stroke(c);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0,0,this.w, this.h);
    pop();
}