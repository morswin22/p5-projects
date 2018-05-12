class Orbit {
    constructor(x,y,r,l,parent, k, name) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.n = l;
        this.k = k;
        this.name = name;
        this.speed = radians(pow(k, l-1)) / 50;
        this.parent = parent;
        this.child = undefined;
        this.angle = -PI/2;
    }

    show() {
        stroke(255,100);
        noFill();
        ellipse(this.x, this.y, this.r*2, this.r*2);
        if (this.child) this.child.show();
    }

    update() {
        if (this.parent != undefined) {
            this.angle += this.speed;
            if (this.n == 1 && this.angle >= -PI/2 + TWO_PI) {
                window[this.name + 'stopped'] = true;
            }

            let rsum = this.r + this.parent.r;
            this.x = this.parent.x + rsum * cos(this.angle);
            this.y = this.parent.y + rsum * sin(this.angle);
        }

        window[this.name + 'end'] = this;
        if (this.child) this.child.update();
    }

    addChild() {
        let nr = this.r / 3;
        this.child = new Orbit(
            this.x + this.r + nr, 
            this.y, 
            nr, 
            this.n + 1, 
            this,
            this.k,
            this.name
        );
        return this.child;
    }
}