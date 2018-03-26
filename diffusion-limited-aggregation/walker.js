function Walker(x,y,stuck) {
    if (x && y) {
        this.pos = createVector(x,y);
    } else {
        this.pos = randomPoint();
    }
    this.r = r;
    this.stuck = stuck || false;

    this.walk = function() {
        let vel = p5.Vector.random2D();
        this.pos.add(vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    this.checkStuck = function(other) {
        for (let p of other) {
            let d = distSq(this.pos, p.pos);
            if (d < (this.r*this.r*4)) {
                this.stuck = true;
                return true;
                break;
            }
        }
        return false;
    }

    this.show = function() {
        stroke(255, 100);
        if (this.stuck) {
            fill(255, 0, 100);
        } else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}

function randomPoint() {
    return createVector(random(width), random(height));
}

function distSq(a,b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    return dx*dx+dy*dy;
}