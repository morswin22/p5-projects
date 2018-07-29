class Explosion extends Sprite {
    constructor(x,y,w,h) {
        super(new Texture(textures.explosion, 96, 96), x, y, w, h);
    }

    render() {
        let img = this.texture.get();
        if (img) {
            image (img, this.pos.x, this.pos.y, this.w, this.h);
        }
        if (this.texture.i == this.texture.total) {
            this.finished = true;
        }
    }
}