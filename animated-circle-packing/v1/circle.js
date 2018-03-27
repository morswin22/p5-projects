class Circle {

    constructor(x,y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.r = 1;
        this.growing = true;
    }

    grow() {
        if (this.growing) {
            this.r += 0.5;
            if (this.egdes()) {
                this.growing = false;
            } else {
                for (let other of circles) {
                    if (this != other) {
                        let d = dist(this.x, this.y, other.x, other.y);
                        if (d < this.r + other.r) {
                            this.growing = false;
                            break;
                        }
                    }
                }

            }
        }
    }

    egdes() {
        return (this.x + this.r > width ||
            this.x - this.r < 0 ||
            this.y + this.r > height ||
            this.y - this.r < 0);
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

}