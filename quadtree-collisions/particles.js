class Particle extends Circle {
    constructor(x, y) {
        super(x, y, 4);
        this.highlight = false;
    }
    
    move() {
        this.x += random(-1,1);
        this.y += random(-1,1);
    }

    setHighlight(bool) {
        this.highlight = bool;
    }

    render() {
        noStroke();
        if (this.highlight) {
            fill(255);
        } else {
            fill(100);
        }
        ellipse(this.x, this.y, this.r*2);
    }
}