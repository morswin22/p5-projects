class Texture {
    constructor(img, w, h, loop = false, interval = 1) {
        if (w && h) {
            // this is sprite sheet
            this.i = 0;
            // get rows and cols
            this.cols = img.width / w;
            this.rows = img.height / h;
            // get total iterations
            this.total = this.cols*this.rows;

            // set interval
            this.j = 0;
            this.interval = interval;

            //crop image into separated images?
            this.image = [];
            let x = 0, y = 0;
            for(let i = 0; i < this.total; i++) {
                 this.image.push(img.get(
                    x * w,
                    y * h,
                    w,
                    h
                ));
                x++;
                if (x >= this.cols) {
                    x = 0;
                    y++;
                    if (y >= this.rows) {
                        y = 0;
                    }
                }
            }

            this.isStatic = false;
            this.doLoop = loop;
        } else {
            this.image = img;
            this.isStatic = true;
        }
    } 

    get() {
        if (this.isStatic) {
            return this.image;
        } else {
            this.j++;
            if (this.j >= this.interval) {
                this.j = 0;
                // interval stuff up
                
                let i = this.i;
                
                if (this.doLoop) {
                    this.i = (this.i + 1) % this.total;
                } else {
                    this.i = constrain(this.i + 1, 0, this.total);
                }
                
                return this.image[i];
            } else {
                return this.image[this.i];
            }
        }
    }

    resize(w, h) {
        if (this.isStatic) {
            if (h === true) {
                // aspect ration = true
                let ratio = this.image.width / this.image.height;
                h = w / ratio;
            }
            this.image.resize(w, h);
        }
    }
}