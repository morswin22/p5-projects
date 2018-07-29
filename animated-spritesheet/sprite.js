class Sprite {
    constructor(texture, x, y, w, h) {
        this.texture = texture;
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;

        this.finished = false;
    }

    render() {
        let img = this.texture.get();
        if (img) {
            image (img, this.pos.x, this.pos.y, this.w, this.h);
        }
    }
}