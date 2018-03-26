class Rectangle {
    constructor(x,y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    intersects(rect) {
        let left = this.x;
        let right = this.x + this.w;
        let top = this.y;
        let bottom = this.y + this.h;

        let oleft = rect.x;
        let oright = rect.x + rect.w;
        let otop = rect.y;
        let obottom = rect.y + rect.h;

        return !(left >= oright ||
            right <= oleft ||
            top >= obottom ||
            bottom <= otop);
    }
}