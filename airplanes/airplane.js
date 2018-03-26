class Airplane {
    constructor(x,y,n) {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.w = 16;
        this.h = 16;
        this.n = n;
        this.lpos = createVector(x,y);
    }

    show() {

        push();
        translate(this.pos.x,this.pos.y+this.h/2)
        rotate(this.vel.y);
        imageMode(CENTER);
        image(texture, 0, 0, this.w, this.h);
        pop();

        tails.colorMode(HSB);
        tails.stroke(map(this.n,0,5,0,300),255,255);
        tails.strokeWeight(2.5);
        tails.line(this.lpos.x, this.lpos.y+this.h/2,this.pos.x, this.pos.y+this.h/2);
        tails.colorMode(RGB);

        tails.fill(bg);
        tails.noStroke();
        let x = this.pos.x-width/1.5;
        if (x <= 0) {
            x += width + this.w*2;
        }
        tails.rect(x,0,20,height);
    }

    update() {
        this.vel.x = 1.8;

        this.vel.y = sin(a/(this.n+1))/2;

        this.lpos.set(this.pos);
        this.pos.add(this.vel);
        this.edges();
    }

    edges() {
        let out = false;
        if (this.pos.x > width + this.w) {
            this.pos.x = -this.w;
            out = true;
        }
        if (this.pos.y < -this.h) {
            this.pos.y = height-this.h/3;
            out = true;
        } else if (this.pos.y > height) {
            this.pos.y = -this.h+this.h/3;
            out = true;
        }
        if (out) {
            this.lpos.set(this.pos);
        }
    }
}