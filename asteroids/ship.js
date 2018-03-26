function Ship() {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.isBoosting = false;
    this.finished = false;

    this.lasers = [];

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();

        for(let i = 0; i<this.lasers.length; i++) {
            this.lasers[i].render();
        }

        for(let i = 0; i<asteroids.length; i++) {
            if (this.hits(asteroids[i])) {
                this.finished = true;
            }
        }
    }

    this.update = function() {
        this.turn();
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.edges();

        for(let i = 0; i<this.lasers.length; i++) {
            this.lasers[i].update();
            if (this.lasers[i].finished) {
                this.lasers.splice(i,1);
                i--;
            }
        }
    }

    this.boost = function() {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    this.boosting = function(bool) {
        this.isBoosting = bool;
    }

    this.setRotation = function(angle) {
        this.rotation = angle;
    }

    this.turn = function() {
        this.heading += this.rotation;
    }

    this.shoot = function() {
        this.lasers.push(new Laser(this.pos, this.heading));
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

    this.hits = function(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return (d < this.r + asteroid.r);
    }
}