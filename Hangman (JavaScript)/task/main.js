const input = require('sync-input');
let countWin = 0;
let countLose = 0;

function getRandomWordAndHints(words) {
    const word = words[Math.floor(Math.random() * words.length)];
    const hints = '-'.repeat(word.length).split("");
    return [word, hints];
}

function checkUserInput(userInput, word, hints, attempts, guessedLetters) {
    if (userInput.length === 0) {
        console.log("Please, input a single letter.");
    } else if (guessedLetters.includes(userInput)) {
        console.log(`You've already guessed this letter.`);
    } else if (userInput.length !== 1) {
        console.log("Please, input a single letter.");
    } else if (!/[a-z]/.test(userInput)) {
        console.log("Please, enter a lowercase letter from the English alphabet");
    } else {
        guessedLetters.push(userInput);

        if (word.includes(userInput) && !hints.includes(userInput)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === userInput) {
                    hints[i] = userInput;
                }
            }
        } else {
            attempts--;
            console.log(`${hints.includes(userInput) ? 'No improvements.' : `That letter doesn't appear in the word.`}`);
        }
    }
    return [guessedLetters, attempts, hints];
}

function playGame() {
    const words = ['python', 'java', 'swift', 'javascript'];
    let [word, hints] = getRandomWordAndHints(words);
    let attempts = 8;
    let guessedLetters = [];

    while (attempts > 0) {
        console.log(hints.join(""));
        let userInput = input(`Input a letter: `);
        [guessedLetters, attempts, hints] = checkUserInput(userInput, word, hints, attempts, guessedLetters);
        console.log();

        if (hints.join("") === word) {
            console.log(hints.join(""));
            console.log(`You guessed the word ${word}!`);
            console.log("You survived!");
            countWin++;
            break;
        }

        if (attempts === 0) {
            console.log("You lost!");
            countLose++;
        }
    }
}

console.log('H A N G M A N');

while (true) {
    let selectedMenu = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
    console.log();
    if (selectedMenu === "exit") {
        break;
    } else if (selectedMenu === "results") {
        console.log(`You won: ${countWin} times.`);
        console.log(`You lost: ${countLose} times.`);
    } else if (selectedMenu === "play") {
        playGame();
    } else {
        console.log(`Invalid choice!`);
    }
}
