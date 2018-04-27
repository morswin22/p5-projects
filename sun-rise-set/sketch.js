class Sun {
    constructor(d, r) {
        this.d = d;
        this.r = r;
        this.drawable = true;
    }

    draw() {
        if (this.drawable) {
            push();
            noFill();
            stroke(primaryColor);
            strokeWeight(4);
            translate(150, 240);

            for (let a = PI/2; a <= PI+PI/2 + 0.1; a += PI/15) {
                point(this.d * sin(a), this.d * cos(a));
            }

            let a = map(new Date().getTime(), new Date(new Date().toString().replace(/\d\d[:]\d\d[:]\d\d/i, riseTime+':00')).getTime(),new Date(new Date().toString().replace(/\d\d[:]\d\d[:]\d\d/i, setTime+':00')).getTime(), PI+PI/2, PI/2);
            fill(secondaryColor);
            strokeWeight(3);
            ellipse(this.d * sin(a), this.d * cos(a), this.r, this.r);
            
            pop();
        }
    }

}

let sun;
let riseTime, setTime;

let dark = true;

let primaryColor = 255;
let secondaryColor = 51;

let Lato;

function preload() {
    Lato = loadFont('Lato-Regular.ttf');
}

function setup() {
    createCanvas(300,350);
    sun = new Sun(120, 15);
    frameRate(15);
    getYahoo();
    textFont(Lato);
}

function draw() {
    if (!dark) {
        primaryColor = 85;
        secondaryColor = 255;
    } else {
        primaryColor = 255;
        secondaryColor = 51;
    }

    if (riseTime && setTime) {
        background(secondaryColor);

        if (new Date(new Date().toString().replace(/\d\d[:]\d\d[:]\d\d/i, riseTime+':00')).getTime() - 20*60*1000 >= new Date().getTime()) {
            sun.drawable = false;
            noStroke();
            fill(primaryColor);
            textSize(28);
            textAlign(CENTER, CENTER);
            text('Sun hasn\'t risen yet', 150, 150);
        } else if (new Date(new Date().toString().replace(/\d\d[:]\d\d[:]\d\d/i, setTime+':00')).getTime() + 20*60*1000 <= new Date().getTime()) {
            sun.drawable = false;
            noStroke();
            fill(primaryColor);
            textSize(28);
            textAlign(CENTER, CENTER);
            text('Sun has set already', 150, 150);
        }

        stroke(primaryColor);
        strokeWeight(2);
        line(10, 240, 290, 240);
        strokeWeight(4);
        point(150, 240);

        sun.draw();

        noStroke();
        fill(primaryColor);
        textSize(15);
        textAlign(LEFT, CENTER);
        text('by Yahoo! Weather', 20, 310);

        textSize(30);
        textAlign(LEFT, TOP);
        text('Sun', 20, 25);

        textSize(25);
        textAlign(RIGHT, TOP);
        text(new Date().getHours()+":"+fixFullTime(new Date().getMinutes()), 270, 25);

        textSize(12);
        textAlign(CENTER, TOP);
        text(riseTime, 30, 252);
        text(setTime, 270, 252);
    } else {
        background(secondaryColor);
        noStroke();
        fill(primaryColor);
        textSize(28);
        textAlign(CENTER, CENTER);
        text('Loading component...', 150, 175);
    }
}

function getYahoo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos=>{
            fetch('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="('+pos.coords.latitude+','+pos.coords.longitude+')")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                .then(res => {
                    res.json().then(res=>{
                        let temp;
                        let astronomy = res.query.results.channel.astronomy;
                        temp = astronomy.sunrise.split(' ')[0].split(':');
                        riseTime = temp[0] + ':' + fixFullTime(temp[1]);
                        temp = astronomy.sunset.split(' ')[0].split(':');
                        setTime = parseInt(temp[0])+12 + ':' + fixFullTime(temp[1]);
                    });
                })
                .catch(res => {
                    console.error(res);
                });
        });
    } else { 
        console.error('navigator.geolocation is disabled');
    }
}

function fixFullTime(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}