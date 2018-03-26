function Segment(x,y, length, index) {

    this.follow = function(tx, ty) {
        if (typeof tx != 'number') {
            var targetX = tx.a.x;
            var targetY = tx.a.y;
            this.follow(targetX,targetY);
        } else {
            var target = createVector(tx,ty);
            var dir = p5.Vector.sub(target, this.a);
            this.angle = dir.heading();
    
            dir.setMag(this.length);
            dir.mult(-1);
    
            this.a = p5.Vector.add(target, dir);
        }
    }

    this.index = index;
    this.angle = 0;
    this.length = length;

    if (typeof x != 'number') {
        this.a = x.b.copy();
    } else {
        this.a = createVector(x,y);
    }

    this.calculateB = function() {
        var dx = this.length * cos(this.angle);
        var dy = this.length * sin(this.angle);
        return createVector(this.a.x + dx, this.a.y + dy);
    }

    this.setA = function(pos) {
        this.a = pos.copy();
        this.b = this.calculateB();
    }

    this.b = this.calculateB();

    this.update = function() {
        this.b = this.calculateB();
    }

    this.show = function() {
        stroke(255);
        strokeWeight(4);
        line(this.a.x,this.a.y,this.b.x,this.b.y);
    }

}