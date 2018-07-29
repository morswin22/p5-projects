class Barrel extends Sprite {
    constructor(x,y) {
        super(new Texture(textures.barrel), x, y, 75, 0);
        this.texture.resize(75, true);
        this.h = this.texture.image.height;
    }

    explode() {
        this.finished = true;
        particles.push(new Explosion(this.pos.x + (this.w/2 - 82/2), this.pos.y + (this.h/2 - 82/2), 82, 82));
    }
}