class Arc {
    constructor(start, end, dir) {
        this.start = start;
        this.end = end;
        this.dir = dir;
    }

    render() {
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
        stroke(255);
        strokeWeight(0.5);
        noFill();
        if (this.dir == 0) {
            arc(x, 0, diameter, diameter, PI, 0);
        } else {
            arc(x, 0, diameter, diameter, 0, PI);
        }
    }
}