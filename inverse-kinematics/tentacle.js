function Tentacle (x,y,tlen, len) {

    this.segments = [];
    this.segments[0] = new TentacleSegment(x, y, len, 0, tlen);
    for (var i = 1; i < tlen; i++) {
        this.segments[i] = new TentacleSegment(this.segments[i-1], null, len, i, tlen);
    }

    this.base = createVector(x,y);

    this.following = createVector(0,0);

    this.follow = function(x,y) {
        this.following.x = x;
        this.following.y = y;
    }

    this.cached = false;

    this.render = function(snake) {
        var end = this.segments[this.segments.length-1];
        end.follow(this.following.x,this.following.y);
        end.update();

        for (var i = this.segments.length - 2; i >= 0; i--) {
            this.segments[i].follow(this.segments[i + 1]);
            this.segments[i].update();
        }

        if (this.cached == true) {
            this.base.y += 1;
        }

        this.segments[0].setA(this.base);

        for (var i = 1; i < this.segments.length; i++) {
            this.segments[i].setA(this.segments[i-1].b);
        }

        var snake = snake.last().a;
        var grabber = this.first().b;
        var d = dist(grabber.x,grabber.y,snake.x,snake.y);
        if (d <= 3) {
            this.cached = true;
        }

        for (var i = 0; i<this.segments.length; i++) {
            this.segments[i].show();
        }
    }
    
    this.last = function() {
        return this.segments[0];
    }

    this.first = function() {
        return this.segments[this.segments.length -1];
    }

}

function TentacleSegment(x,y, length, index, tlen) {

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
    this.sw = map(this.index,0,tlen,9,3);
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
        stroke(100,150,255);
        strokeWeight(this.sw);
        line(this.a.x,this.a.y,this.b.x,this.b.y);
    }

}