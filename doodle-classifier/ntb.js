let data;
let total = 1000;
let start;

let outdata = new Uint8Array(total*784);
let outindex = 0;

// let filename = 'cat';
// let filename = 'train';
// let filename = 'rainbow';

function preload() {
    data = loadBytes(`data/npy/${filename}.npy`);
}

function setup() {
    createCanvas(280, 280);

    //background(0);

    for (let n = 0; n < total; n++) {

        start = 80 + n * 784;

        let img = createImage(28,28,RGB);

        img.loadPixels();
        for(let i = 0; i < 784; i++) {
            let index = i + start;
            let val = data.values[index];
            outdata[outindex] = val;
            outindex++;
            img.pixels[i*4 + 0] = 255 - val & 0xff;
            img.pixels[i*4 + 1] = 255 - val & 0xff;
            img.pixels[i*4 + 2] = 255 - val & 0xff;
            img.pixels[i*4 + 3] = 255;
        }
        img.updatePixels();
        let x = 28 * (n % 10);
        let y = 28 * Math.floor(n / 10);
        image(img, x, y);

    }

    var saveByteArray = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            var blob = new Blob(data, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    saveByteArray([outdata], `${filename}.bin`);
}

// function draw() {
//     background(51);
// }