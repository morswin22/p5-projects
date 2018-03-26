function diastic(seed, words) {
    let phrase = [];
    let currentWord = 0;

    for(let i = 0; i < seed.length; i++) {
        let c = seed.charAt(i);
        for (let j = currentWord; j< words.length; j++) {
            if (words[j].charAt(i) == c) {
                phrase.push(words[j]);
                currentWord = j + 1;
                break;
            }
        }
    }
    return phrase.join(' ');
}

let srctxt;
let words;

function preload() {
    srctxt = loadStrings('rainbow.txt');
}

function setup() {
    noCanvas();
    srctxt = join(srctxt, ' ');
    words = splitTokens(srctxt, ' ,!.?');

    let seed = select('#seed');
    let submit = select('#submit');
    submit.mousePressed(()=>{
        let phrase = diastic(seed.value(), words);
        createP(phrase);
    });
}