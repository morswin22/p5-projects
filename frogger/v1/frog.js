class Frog extends Rectangle {

    constructor(x, y, w) {
        super(x, y, w, w);
    }

    attach(log) {
        this.attached = log;
    }

    detach() {
        this.attach(undefined);
    }

    update() {
        if (this.attached != undefined) {
            this.x += this.attached.speed;
        }

        this.x = constrain(this.x, 0, width- this.w);
    }

    show() {
        stroke(0);
        fill(0,255,0);
        rect(this.x, this.y, this.w, this.w);
    }

    move(xdir, ydir) {
        this.detach();
        this.x += xdir * grid;
        this.y += ydir * grid;
    }

}