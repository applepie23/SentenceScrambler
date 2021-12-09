const inputForm = document.querySelector(".userInputForm");
const button = document.querySelector(".submit");
const results = document.querySelector(".new-sentence");
const thesaurusKey = "fa60e26d-e6aa-4954-b8a4-1b21c21b98a3";

button.addEventListener('click', () => {
    //returnSynonym("umpire");
    const userInput = inputForm.value;
    inputForm.value = "";
    returnSentence(userInput);
})


async function returnSynonym(word) {
    const config = {
        headers: {
          Accept: 'application/json',
        },
    }
    let response = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`, config)
    
    let user = await response.json();

    let synonyms = user[0].meta.syns[0];
    let arrayLength = synonyms.length;

    results.innerHTML = synonyms[random(arrayLength)];
}


function random(num){
    let dec = Math.random();
    let number = num * dec;
    let randomNum = Math.trunc(number);
    if (randomNum == num) {
        randomNum -= 1;
        return randomNum;
    }
    return Math.trunc(number);
}

async function returnSentence(sentence) {
    const config = {
        headers: {
          Accept: 'application/json',
        },
    }

    const words = sentence.split(" ");
    const newWords = new Array(words.length - 1);

    for (var i = 0; i < words.length; i++) {
        const ignore = ["the", "a", "of", "and", "to", "my", "your", "our", "their", "i", "I"];
        let word = words[i];
        let response = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`, config);
        let user = await response.json();
        let synonyms = user[0].meta.syns[0];
        let arrayLength = synonyms.length;
        let randomWord = synonyms[random(arrayLength)];
        if (ignore.includes(word)) {
            newWords[i] = word;
        } else {
            newWords[i] = synonyms[random(arrayLength)];
        }
    }

    const scrambled = newWords.join(" ");
    results.innerHTML = scrambled;

}