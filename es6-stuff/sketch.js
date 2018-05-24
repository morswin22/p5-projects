const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI   = "https://api.giphy.com/v1/gifs/search?&rating=G&api_key=dc6zaTOxFJmzC&q=";

const delay = waitTime => {
    return new Promise((resolve, reject) => {
        (isNaN(waitTime)) ? reject(new Error('delay() requires a valid number')) : setTimeout(resolve,waitTime)
    });
};

const wordGIF_NoImage = 'no_image';
const wordGIF = async num => {
    const word = (await (await fetch(wordnikAPI+`&minLength=${num||-1}&maxLength=${num||-1}`)).json()).word;
    const giphy = await (await fetch(giphyAPI + word)).json();

    let img;
    try { img = giphy.data[0].images['fixed_height_small'].url } 
    catch { img = wordGIF_NoImage }

    return { word, img }
}

setup = () => {
    noCanvas();

    // 24-05-2018
    
    // wordGIF(5).then(res=>{
    //     createP(res.word);
    //     createImg(res.img);
    // }).catch(console.error);

    Promise.all([wordGIF(4), wordGIF(5), wordGIF(6)])
    .then(results => {
        for(let res of results) {
            createP(res.word);
            if (res.img !== wordGIF_NoImage) {
                createImg(res.img);
            } else {
                createP(`Sorry, we couldn't find any images about ${res.word}`);
            }
        }
    }).catch(console.error);

    // const delayES8 = async waitTime => {
    //     await delay(waitTime);
    //     return;
    // };

    // delay(1000)
    //     .then(()=>createP('hello'))
    //     .catch(console.error);

    // (async () => {
    //     let res  = await fetch(wordnikAPI);
    //     let json = await res.json();
    //     createP(json.word);
    // })();


    
    // 23-05-2018

    /*
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
    */
    
    // Not so es6 code as it could be
    //
    // loadJSON(wordnikAPI, data => {
    //     createP(data.word);
    //     loadJSON(giphyAPI + data.word, data => {
    //         createImg(data.data[0].images['fixed_height_small'].url);
    //     })
    // });

    // My own Promise.all
    //
    // let promises = [
    //     fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=3&maxLength=3&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"),
    //     fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=4&maxLength=4&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7"),
    //     fetch("https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=5&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7")
    // ];
    // Promise.all(promises)
    //     .then(promises => promises.map(res => res.json()))
    //     .then(promises => promises.forEach(data => {
    //         data.then(data=>{
    //             console.log(data.word);
    //         })
    //     }))
    //     .catch(console.error);

}

draw = () => {
    
}
