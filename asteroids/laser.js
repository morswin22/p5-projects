function Laser(pos, heading) {
    this.pos = pos.copy();
    this.vel = p5.Vector.fromAngle(heading);
    this.vel.mult(10);

    this.r = 4;

    this.finished = false;

    this.update = function() {
        this.pos.add(this.vel);
        this.edges();

        let newaster = asteroids.slice();
        for (let i = 0; i < asteroids.length; i++) {
            if (!this.finished && this.hits(asteroids[i])) {
                if (asteroids[i].r > 10) {
                    let newAsteroids = asteroids[i].breakup();
                    newaster = newaster.concat(newAsteroids);
                }
                // score ?
                this.finished = true;
                newaster.splice(i, 1);
                break;
            }
        }
        asteroids = newaster;
    }
    this.render = function() {
        push();
        stroke(255);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.finished = true;
        } else if (this.pos.x < -this.r) {
            this.finished = true;
        }
        if (this.pos.y > height + this.r) {
            this.finished = true;
        } else if (this.pos.y < -this.r) {
            this.finished = true;
        }
    }

    this.hits = function(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return (d < this.r + asteroid.r);
    }
}