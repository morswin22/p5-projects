function Particle(x,y,r) {
    var options = {
        restitution: 0.5,
        friction: 0,
        density: 1,
    }
    x += random(-1,1);
    this.body = Bodies.circle(x,y,r, options);
    this.body.label = "particle";
    this.r = r;
    World.add(world, this.body);
}

Particle.prototype.offScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height + 50);
}

Particle.prototype.show = function () {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0, this.r * 2);
    pop();
}