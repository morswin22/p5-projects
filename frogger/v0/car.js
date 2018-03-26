class Car extends Rectangle {

    constructor(x,y,w,h,s) {
        super(x,y,w,h);
        this.speed = s;
    }

    update() {
        this.x = this.x + this.speed;
    }

    show() {
        fill(200);
        rect(this.x, this.y, this.w, this.h);
    }

    edges() {
        if (this.speed > 0 && this.x > width + grid) {
            this.x = - this.w - grid;
        } else if (this.speed < 0 && this.x < -this.w - grid) {
            this.x = width + grid;
        }
    }

}