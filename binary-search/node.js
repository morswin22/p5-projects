class Node {
    constructor(val, x, y) {
        this.value = val;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }

    addNode(n) {
        if (n.value < this.value) {
            if (this.left == null) {
                this.left = n;
                this.left.x = this.x - 50;
                this.left.y = this.y + 20;
            } else {
                this.left.addNode(n);
            }
        } else if(n.value > this.value) {
            if (this.right == null) {
                this.right = n;
                this.right.x = this.x + 50;
                this.right.y = this.y + 20;
            } else {
                this.right.addNode(n);
            }
        }
    }

    visit(arr, parent) {
        if (this.left) this.left.visit(arr, this);
        fill(255);
        noStroke();
        textAlign(CENTER);
        text(this.value, this.x , this.y);
        noFill();
        stroke(255);
        line(parent.x, parent.y, this.x, this.y);
        ellipse(this.x, this.y, 22, 22);
        arr.push(this.value);
        if (this.right) this.right.visit(arr, this);
        return arr;
    }

    search(val, res) {
        if ( this.value == val ) {
            res = this; 
        } else if (val < this.value && this.left) {
            res = this.left.search(val, res);
        } else if (val > this.value && this.right) {
            res = this.right.search(val, res);
        }

        return res;
    }

    searchOne(val, res) {
        if ( this.value == val ) {
            this._animationFinished = true;
            res = this; 
        } else if (val < this.value && this.left) {
            res = this.left;
        } else if (val > this.value && this.right) {
            res = this.right;
        }
        return res;
    }
}