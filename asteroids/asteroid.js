function Asteroid(pos, r) {
    this.pos = pos || createVector(random(width), random(height));
    this.pos = this.pos.copy();
    this.vel = p5.Vector.random2D();

    this.finished = false;

    this.r = random(15,45);
    if (r) {
        this.r = r * 0.5;
    }
    this.total = floor(random(5,15));
    this.offset = [];

    for(let i =0; i<this.total; i++) {
        this.offset[i] = random(-this.r*0.5,this.r*0.5);
    }

    this.update = function() {
        this.pos.add(this.vel);
        this.edges();
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
        beginShape();
        for(let i = 0; i<this.total; i++) {
            let angle = map(i, 0, this.total, 0, TWO_PI);
            let x = (this.r+this.offset[i]) * cos(angle);
            let y = (this.r+this.offset[i]) * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.breakup = function(into = 2) {
        let newA = [];
        for (let i = 0; i< into; i++) {
            newA[i] = new Asteroid(this.pos, this.r); 
        }
        return newA;
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
}