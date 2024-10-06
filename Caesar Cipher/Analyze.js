const fs = require('fs');
const ru_file = 'C:\\Users\\21954\\Documents\\VSCode\\JS\\NotaeCaesarianae\\WarAndPeace.txt';
const en_file = 'C:\\Users\\21954\\Documents\\VSCode\\JS\\NotaeCaesarianae\\MartinEden.txt';
let letters = 0;

function ru_AlphabetCounter() {
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const counter = {};
    for (const letter of alphabet) {
        counter[letter] = 0;
    }
    return counter;
}

function en_AlphabetCounter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const counter = {};
    for (const letter of alphabet) {
        counter[letter] = 0;
    }
    return counter;
}

function updateLetterCount(text, counter) {
    letters = 0;
    for (const char of text.toLowerCase()) {
        if (char in counter) {
            counter[char]++;
        }
        letters++;
    }
    frequencies(counter);
}

function frequencies(counter) {
    for (i in counter) {
        counter[i] = counter[i] / letters;
    }
}

const ru_counter = ru_AlphabetCounter();
const ru_data = fs.readFileSync(ru_file, 'utf8');
updateLetterCount(ru_data, ru_counter);
console.log('Letter counts:', ru_counter);

const en_counter = en_AlphabetCounter();
const en_data = fs.readFileSync(en_file, 'utf8');
updateLetterCount(en_data, en_counter);
console.log('Letter counts:', en_counter);