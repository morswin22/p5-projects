let img;
let sorted;
let index = 0;
let finished = false;
let action;
let imgname;

function preload() {
    let get = getParameterByName('image');
    if (get) {
        localStorage.image = get;
    }
    imgname = localStorage.image || 'sunflower.jpg';
    img = loadImage(imgname);
}

function setup() {
    createCanvas(400, 200);

    img.resize(120, 120);
    sorted = img.get();
    
    let get = getParameterByName('action');
    if (get) {
        switch(get) {
            case 'brightness':
                action = brightness;
                break;
            case 'hue':
                action = hue;
                break;
            default:
                finished = true;
                action = undefined;
                break;
        }
    } else {
        finished = true;
    }

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function sortPixel(fn = brightness) {
    sorted.loadPixels();

    // Selection sort!
    let i = index;
    
    let record = -1;
    let selectedPixel = i;
    for (let j = i; j < sorted.pixels.length; j+=4) {
        let pix = color(
            sorted.pixels[j+0],
            sorted.pixels[j+1],
            sorted.pixels[j+2],
            sorted.pixels[j+3]
        );
        // Sort by hue
        let b = fn(pix);
        if (b > record) {
            selectedPixel = j;
            record = b;
        }
    }
    
    // Swap selectedPixel with i
    let temp0 = sorted.pixels[i+0];
    let temp1 = sorted.pixels[i+1];
    let temp2 = sorted.pixels[i+2];
    let temp3 = sorted.pixels[i+3];
    sorted.pixels[i+0] = sorted.pixels[selectedPixel+0];
    sorted.pixels[i+1] = sorted.pixels[selectedPixel+1];
    sorted.pixels[i+2] = sorted.pixels[selectedPixel+2];
    sorted.pixels[i+3] = sorted.pixels[selectedPixel+3];
    sorted.pixels[selectedPixel+0] = temp0;
    sorted.pixels[selectedPixel+1] = temp1;
    sorted.pixels[selectedPixel+2] = temp2;
    sorted.pixels[selectedPixel+3] = temp3;

    if (index<sorted.pixels.length -1 ) {
        index+=4;
    } else {
        finished = true;
    }

    sorted.updatePixels();
}


function draw() {

    if (!finished) {
        for(let i = 0; i < 5; i++) {
            sortPixel(action);
        }
    }
        
    background(51);
    image(img, 0, 0, 200, 200);
    image(sorted, 200, 0, 200, 200);
}