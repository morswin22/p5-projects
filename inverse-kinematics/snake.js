function Snake(x,y, len, size) {

    this.segments = [];
    this.segments[0] = new SnakeSegment(x, y, size, 0, len);
    for (var i = 1; i < len; i++) {
        this.segments[i] = new SnakeSegment(this.segments[i - 1], null, size, i, len);
    }

    this.base = null;

    this.following = createVector(0,0);

    this.follow = function(x,y) {
        this.following.x = x;
        this.following.y = y;
    }

    this.render = function(grabbers) {
        var end = this.segments[this.segments.length-1];
            end.follow(this.following.x,this.following.y);
            end.update();

            for (var i = this.segments.length - 2; i >= 0; i--) {
                this.segments[i].follow(this.segments[i + 1]);
                this.segments[i].update();
            }

        if (this.cached == true) {
            for(var i in grabbers) {
                if (grabbers[i].cached == true) break;
            }

            this.segments[0].setA(createVector(grabbers[i].first().b.x,grabbers[i].first().b.y));
            
            for (var i = 1; i < this.segments.length; i++) {
                this.segments[i].follow(this.segments[i - 1]);
                this.segments[i].update();
            }

        }

        // show 
        
        var last = this.last().a;

        for(var i in grabbers) {
            var grabber = grabbers[i].first().b;
            var d =dist(grabber.x,grabber.y,last.x,last.y);
            if (d <= 3) {
                this.cached = true;
            }
        }

        var last = this.last().a;
        stroke(255,0,0)
        point(last.x, last.y);
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

function SnakeSegment(x,y, length, index, snakeLength) {

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
    this.sw = map(this.index,0,snakeLength,2,10);
    this.clr = map(this.index,0,snakeLength,100,180)
    this.snakeLength = snakeLength;
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
        stroke(0,255-this.clr,0);
        strokeWeight(this.sw);
        line(this.a.x,this.a.y,this.b.x,this.b.y);
        if (this.index == this.snakeLength-1) {
            stroke(255);
            strokeWeight(3);
            
            var y = 2 * cos(TWO_PI - this.angle);
            var x = 2 * sin(TWO_PI - this.angle);

            point(this.b.x-x,this.b.y-y);
            point(this.b.x+x,this.b.y+y);

            stroke(255,100,150);
            strokeWeight(2);
            var y = 5*sin(this.angle);
            var x = 5*cos(this.angle);
            var dy = 2*sin(this.angle);
            var dx = 2*cos(this.angle);
            line(this.b.x+x,this.b.y+y,this.b.x+x+dx,this.b.y+y+dy);
        }
    }

}