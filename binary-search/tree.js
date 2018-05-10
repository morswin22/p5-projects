class Tree {
    constructor() {
        this.root = null;
    }

    addValue(val) {
        if (this.root == null) {
            this.root = new Node(val, width / 2, 16);
        } else {
            this.root.addNode(new Node(val, 0 ,0));
        }
    }

    traverse() {
        return this.root.visit([], this.root);
    }

    search(val) {
        return this.root.search(val, undefined);
    }

    searchAnimation(val) {
        if (this._animationCurrent) {
            this._animationCurrent = this._animationCurrent.searchOne(val, 1);
        } else {
            this._animationCurrent = this.root.searchOne(val, 1);
        }
        fill(0,255,255);
        stroke(0,255,255);
        ellipse(this._animationCurrent.x, this._animationCurrent.y, 22, 22);
        return this._animationCurrent._animationFinished === true;
    }
}