const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI   = "http://api.giphy.com/v1/gifs/search?&rating=G&api_key=dc6zaTOxFJmzC&q=";

setup = () => {
    noCanvas();
    
    fetch(wordnikAPI)
        .then(res => res.json())
        .then(data => {
            createP(data.word);
            return fetch(giphyAPI + data.word)
        })
        .then(res=> res.json())
        .then(data=>{
            createImg(data.data[0].images['fixed_height_small'].url);
        })
        .catch(console.error);
    
    // Not so es6 code as it could be
    //
    // loadJSON(wordnikAPI, data => {
    //     createP(data.word);
    //     loadJSON(giphyAPI + data.word, data => {
    //         createImg(data.data[0].images['fixed_height_small'].url);
    //     })
    // });

    let promises = [
        fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=3&maxLength=3&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"),
        fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=4&maxLength=4&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"),
        fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=5&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7")
    ];
    Promise.all(promises)
        .then(promises => promises.map(res => res.json()))
        .then(promises => promises.forEach(data => {
            data.then(data=>{
                console.log(data.word);
            })
        }))
        .catch(console.error);
}

draw = () => {
    
}
