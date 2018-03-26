function Particle(x,y, rgb, firework) {
    
    this.pos = createVector(x,y);
    if (firework) {
        this.vel = createVector(random(-1.5,1.5),random(-14,-8))
    } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2,10));
    }
    this.acc = createVector(0,0);

    this.firework = firework;
    this.lifespan = 255;
    this.rgb = rgb;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        if (!this.firework) {
            this.vel.mult(0.85);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.done = function() {
        return (this.lifespan < 0);
    }

    this.show = function() {
        if (!this.firework) {
            strokeWeight(2);
            stroke(this.rgb[0], this.rgb[1], this.rgb[2], this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.rgb);
        }
        point(this.pos.x, this.pos.y);
    }

}