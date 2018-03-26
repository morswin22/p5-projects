function Box(x,y,w,h) {
    this.body = Bodies.rectangle(x,y,w,h);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
}

Box.prototype.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    strokeWeight(2);
    stroke(0);
    fill(255);
    rectMode(CENTER);
    translate(pos.x,pos.y);
    rotate(angle);
    rect(0,0,this.w,this.h);
    pop();
}