function randomSize() {
    let r = randomGaussian() * 2.5;
    return constrain(abs(r*r), 4, 24);
}

// function randomSize(min, max) {
//     while (true) {
//         let r1 = random(1);
//         let r2 = random(1);
//         if (r2 > r1) {
//             return map(r1,0,1,min,max);
//         }
//     }
// }

class Snowflake {
    constructor(img) {
        this.pos = createVector(random(width), random(-100, -10));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        // this.r = random(4,24);
        // this.r = randomSize(4,24);
        this.r = randomSize();
        this.img = img;
        this.angle = random(0, TWO_PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
        this.xOff = 0;
    }

    applyForce(force) {
        // Parallax Effect hack
        let f = force.copy();
        f.mult(this.r);
        this.acc.add(force);
    }

    update() {

        this.xOff = sin(this.angle) * this.r;

        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2)

        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        this.angle += this.dir * (this.vel.mag()/100);
    }

    render() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0,0, this.r, this.r);
        pop();
    }

    offScreen() {
        return (this.pos.y > height + this.r);
    }
}