class Cell{
    constructor(pos, r, c) {
        this.pos = pos || createVector(random(width), random(height));
        this.r = r || 20;
        this.c = c || color(random(100,255), 0, random(100,255), 100);
    }

    update() {
        let vel = p5.Vector.random2D();
        this.pos.add(vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    render() {
        noStroke();
        fill(this.c);
        ellipse(this.pos.x,this.pos.y, this.r*2, this.r*2);
    }

    contains(x, y) {
        return (pow(this.r,2) >= pow(this.pos.x-x,2 )+ pow(this.pos.y-y,2 ));
    }

    mitosis() {
        this.pos.x += random(-this.r, this.r)/2;
        this.pos.y += random(-this.r, this.r)/2;
        return new Cell(this.pos.copy(), this.r/sqrt(2), this.c);
    }
}