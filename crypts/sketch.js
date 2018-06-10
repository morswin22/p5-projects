const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
const cryptTable = [
    'abcdefghijklmnopqrstuvwxyz'.split(''),
    'bcdefghijklmnopqrstuvwxyza'.split(''),
    'cdefghijklmnopqrstuvwxyzab'.split(''),
    'defghijklmnopqrstuvwxyzabc'.split(''),
    'efghijklmnopqrstuvwxyzabcd'.split(''),
    'fghijklmnopqrstuvwxyzabcde'.split(''),
    'ghijklmnopqrstuvwxyzabcdef'.split(''),
    'hijklmnopqrstuvwxyzabcdefg'.split(''),
    'ijklmnopqrstuvwxyzabcdefgh'.split(''),
    'jklmnopqrstuvwxyzabcdefghi'.split(''),
    'klmnopqrstuvwxyzabcdefghij'.split(''),
    'pqrstuvwxyzabcdefghijklmno'.split(''),
    'opqrstuvwxyzabcdefghijklmn'.split(''),
    'nopqrstuvwxyzabcdefghijklm'.split(''),
    'mnopqrstuvwxyzabcdefghijkl'.split(''),
    'lmnopqrstuvwxyzabcdefghijk'.split(''),
    'klmnopqrstuvwxyzabcdefghij'.split(''),
    'jklmnopqrstuvwxyzabcdefghi'.split(''),
    'ijklmnopqrstuvwxyzabcdefgh'.split(''),
    'hijklmnopqrstuvwxyzabcdefg'.split(''),
    'ghijklmnopqrstuvwxyzabcdef'.split(''),
    'fghijklmnopqrstuvwxyzabcde'.split(''),
    'efghijklmnopqrstuvwxyzabcd'.split(''),
    'defghijklmnopqrstuvwxyzabc'.split(''),
    'cdefghijklmnopqrstuvwxyzab'.split(''),
    'bcdefghijklmnopqrstuvwxyza'.split(''),
]; // need to fix this crypt table

let EinputWord;
let EinputKey;
let Ebutton;
let EoutputWord;

let DinputWord;
let DinputKey;
let Dbutton;
let DoutputWord;

function setup() {
    noCanvas();

    createP('This is crypts. It lets you encrypt message with a keyword');
    EinputWord = createInput();
    EinputKey = createInput();
    Ebutton = createButton('encrypt');
    EoutputWord = createInput();
    EoutputWord.elt.disabled = true;

    Ebutton.mouseClicked(()=>{
        let word = EinputWord.value().toLowerCase();
        EinputWord.value(word);
        word = word.split('');

        let wordKeys = [];
        for (let char of word) {
            wordKeys.push(alph.indexOf(char));
        }

        let key = EinputKey.value().toLowerCase();
        EinputKey.value(key);
        key = key.split('');

        let keyKeys = [];
        for (let char of key) {
            keyKeys.push(alph.indexOf(char));
        }

        let finalWord = [];
        let iterator = 0;
        for (let col of wordKeys) {
            finalWord.push(cryptTable[keyKeys[iterator]][col]);
            iterator = (iterator + 1) % keyKeys.length;
        }

        finalWord = finalWord.join('');
        EoutputWord.value(finalWord);
    })

    createP('This lets you decrypt message with a keyword');
    DinputWord = createInput();
    DinputKey = createInput();
    Dbutton = createButton('decrypt');
    DoutputWord = createInput();
    DoutputWord.elt.disabled = true;

    Dbutton.mouseClicked(()=>{
        let word = DinputWord.value().toLowerCase();
        DinputWord.value(word);
        word = word.split('');

        let wordKeys = [];
        for (let char of word) {
            wordKeys.push(alph.indexOf(char));
        }
        // wordKeys.reverse();

        let key = DinputKey.value().toLowerCase();
        DinputKey.value(key);
        key = key.split('');

        let keyKeys = [];
        for (let char of key) {
            keyKeys.push(alph.indexOf(char));
        }
        keyKeys.reverse();

        let finalWord = [];
        let iterator = 0;
        for (let col of wordKeys) {
            finalWord.push(cryptTable[keyKeys[iterator]][col]);
            iterator = (iterator + 1) % keyKeys.length;
        }

        finalWord = finalWord.join('');
        DoutputWord.value(finalWord);
    }) // need to fix this decrypt button algorithm
}