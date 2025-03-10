// var gameID = randomIntFromInterval(0, json.length - 1);
// var gamePointers = Array.from(json.keys());

// let gameID = getCookie("gameNumbers");

// if (gameID == "") {
    gameID = checkCookie();
// }

var thisGame = json[gameID];

// let zz = checkCookie();
// console.log(zz);
// debugger;

const squareContainer = document.querySelector('.square-container');
let activeCount = 0; // number of selected squares
let guesses = 4; // number of remaining guesses
let nextRow = 1; // next row for solved group
let guessInProgress = false; // flag whether guess in progress
let gameRecord = []; // records guesses made
let wordList = []; // list of words to populate squares

// Create list of word and difficulty
for (const difficulty in thisGame) {
    const group = thisGame[difficulty][1];
    for (const posOfWord in group) {
        wordList.push([difficulty, group[posOfWord]]);
    }
}

// Create 16 buttons for words
for (let i = 1; i <= 16; i++) {
    const randomWord = randomSelection(wordList);
    const square = document.createElement('button');
    square.className = 'square';
    if (window.innerWidth > 550 ) {
        if (randomWord[1].length >= 12) {
            square.style.fontSize = '90%';
        } else if (randomWord[1].length >= 10) {
            square.style.fontSize = '95%';
        } else if (randomWord[1].length >= 7) {
            square.style.fontSize = '100%';
        } else {
            square.style.fontSize = '110%';
        }
    } else {
        if (randomWord[1].length >= 10) {
            square.style.fontSize = '75%';
        } else if (randomWord[1].length >= 7) {
            square.style.fontSize = '80%';
        } else {
            square.style.fontSize = '100%';
        }
    }
    square.setAttribute('group', randomWord[0]);
    square.setAttribute('position', i);
    square.classList.add('unsolved');
    square.textContent = randomWord[1];
    indexToRemove = wordList.indexOf(randomWord);
    wordList.splice(indexToRemove, 1);
    squareContainer.appendChild(square);
}


let activeButtons = [];
// Animations for button clicks, set buttons to active
const buttons = document.querySelectorAll('.square');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (!guessInProgress && (activeCount < 4 || button.classList.contains('active'))) {
            button.classList.toggle('active');
            activeCount += button.classList.contains('active') ? 1 : -1;
            button.classList.toggle('shrink');
            setTimeout(() => button.classList.toggle('shrink'), 150);
        }
    });
});

updateGuesses();