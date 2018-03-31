class Blob {
    constructor (x,y,r) {
        this.pos = createVector(x,y);
        this.r = r;
        this.vel = createVector(0,0);
        this.yoff = 0;
        this.zoff = random(99999);
        if (r == 16) {
            this.col = color(random(255),random(255),random(255));
        } else {
            this.col = color(255,255,255);
        }
    }

    update() {
        let newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    }

    eats(other) {
        let d = this.pos.dist(other.pos);
        if (d < this.r + other.r) {
            let sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI);
            return true;
        }
        return false;
    }

    show() {
        fill(this.col);
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        let xoff = 0;
        for (let a = 0; a < TWO_PI; a += TWO_PI/32) {
            let offset = map(sin(noise(xoff, this.yoff, this.zoff)), 0, 1, -this.r/4, this.r/4);
            let r = this.r + offset;
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x,y);
            xoff += 0.1;
        }
        endShape();
        pop();

        this.yoff += 0.01;
    }
}