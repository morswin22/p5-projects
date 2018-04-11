class Shape {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.type = 'shape';
    }
}

class Rectangle extends Shape {
    constructor(x,y,w,h) {
        super(x, y);
        this.w = w;
        this.h = h;
        this.type = 'rectangle';
    }

    contains(shape) {
        switch(shape.type) {
            case 'circle':
                return (shape.x >= this.x - this.w &&
                    shape.x <= this.x + this.w &&
                    shape.y >= this.y - this.h &&
                    shape.y <= this.y + this.h);
                break;
            case 'rectangle':
                break;
            case 'shape':
                return (shape.x >= this.x - this.w &&
                    shape.x <= this.x + this.w &&
                    shape.y >= this.y - this.h &&
                    shape.y <= this.y + this.h);
                break;
        }
    }

    intersects(rectangle) {
        return !(rectangle.x - rectangle.w > this.x + this.w ||
            rectangle.x + rectangle.w < this.x - this.w ||
            rectangle.y - rectangle.h > this.y + this.h ||
            rectangle.y + rectangle.h < this.y - this.h);
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
        this.type = 'circle';
    }

    contains(shape) {
        let d;
        switch(shape.type) {
            case 'circle':
                d = Math.pow((shape.x - this.x), 2) + Math.pow(shape.y - this.y, 2);
                return (d <= Math.pow(this.r+shape.r,2));
                break;
            case 'rectangle':
                break;
            case 'shape':
                d = Math.pow((shape.x - this.x), 2) + Math.pow(shape.y - this.y, 2);
                return (d <= Math.pow(this.r,2));
                break;
        }
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;let y = this.boundary.y;let w = this.boundary.w;let h = this.boundary.h;
        let nw = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(x - w/2, y - h/2, w/2, h/2)
        this.northeast = new QuadTree(ne, this.capacity);
        let sw = new Rectangle(x + w/2, y + h/2, w/2, h/2)
        this.southwest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x - w/2, y + h/2, w/2, h/2)
        this.southeast = new QuadTree(se, this.capacity);
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }
            if (this.northwest.insert(point)) {
                return true;
            } else if (this.northeast.insert(point)) {
                return true;
            } else if (this.southwest.insert(point)) {
                return true;
            } else if (this.southeast.insert(point)) {
                return true;
            } else {
                return false;
            }
        }
    }

    query(range, found) {
        found = found || [];
        if (!this.boundary.intersects(range)) {
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }

            return found;
        }
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
        for(let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }
    }
}