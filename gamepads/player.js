class Player {
    constructor(box) {
        this.box = box;
        this.pos = p5.Vector.random2D();
        this.pos.x = box.x + this.pos.x*box.w;
        this.pos.y = box.y + this.pos.y*box.h;
        this.speed = 3;
        this.angle = random(TWO_PI);
        this.angleAxel = undefined;
    }

    rotate(axel) { // im stuck with this rotate...
        if (abs(axel.value.x) > 0.3 || abs(axel.value.y) > 0.3) {
            this.angleAxel = {
                x: (axel.value.x < 0) ? 1 : -1,
                y: (axel.value.y < 0) ? 1 : -1,
            }
            this.angle = this.pos.angleBetween(createVector(
                axel.value.x, 
                axel.value.y
            ));
        }
    }

    move(axel) {
        if (abs(axel.value.x) >= 0.09) { 
            this.pos.x += this.speed * axel.value.x;
        }
        this.pos.x = constrain(this.pos.x, this.box.x, this.box.x+this.box.w);

        if (abs(axel.value.y) >= 0.09) { 
            this.pos.y += this.speed * axel.value.y;
        }
        this.pos.y = constrain(this.pos.y, this.box.y, this.box.y+this.box.h);
    }

    render() {
        stroke(0);
        noFill();
        rect(this.box.x, this.box.y, this.box.w, this.box.h);

        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, 10, 10);
        
        if (this.angleAxel) {
            noStroke();
            fill(255,0,0);
            let pointer = p5.Vector.fromAngle(this.angle,7);
            ellipse(this.pos.x + (pointer.x*this.angleAxel.x), this.pos.y + (pointer.y*this.angleAxel.y), 4, 4);
        }
    }
}