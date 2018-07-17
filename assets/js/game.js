//IT WORKS!!!!

//Words
var carNames =
    [
        "FORD",
        "HONDA",
        "JEEP",
        "BENTLEY",
        "ACURA",
        "CHRYSLER",
        "AUDI",
        "LINCOLN",
        "MERCEDES",
        "INFINITI",
        "TESLA",
        "PORSCHE",
        "LEXUS",
    ];


var userGuess = [];             // Keeps track of letters Guessed
var carWordIndex;               // Index of the array
var lettersGuessed = [];        // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var hasCompleted = false;       // Brings up 'press any key to try again'    
var wins = 0;                   // Number of wins
const maxChances = 11;

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxChances;

    // Use Math.floor to round the random number down to the nearest whole.
    carWordIndex = Math.floor(Math.random() * (carNames.length));

    // Clears arrays
    lettersGuessed = [];
    userGuess = [];

    // Build the word and clear it out
    for (var i = 0; i < carNames[carWordIndex].length; i++) {
        userGuess.push("_");
    }

    // Hides game over and win text
    document.getElementById("pressKeyRestart").style.cssText = "display: none";
    document.getElementById("youWin").style.cssText = "display: none";
    document.getElementById("youLose").style.cssText = "display: none";

    // reset display at end game
    resetDisplay();
};

//  Updates HTML Page display
function resetDisplay() {

    document.getElementById("allWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    var userGuessText = "";
    for (var i = 0; i < userGuess.length; i++) {
        userGuessText += userGuess[i];
    }

    // connecting anchors to HTML
    document.getElementById("currentWord").innerText = userGuessText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
};


// links game
function updateHangmanGame() {
    document.getElementById("hangmangame");
};


function evaluateGuess(letter) {
    var place = [];

    for (var i = 0; i < carNames[carWordIndex].length; i++) {
        if (carNames[carWordIndex][i] === letter) {
            place.push(i);
        }
    }

    if (place.length <= 0) {
        remainingGuesses--;
        updateHangmanGame();
    } else {
        for (var i = 0; i < place.length; i++) {
            userGuess[place[i]] = letter;
        }
    }
};
function checkWin() {
    if (userGuess.indexOf("_") === -1) {
        document.getElementById("youWin").style.cssText = "display: block";
        document.getElementById("pressKeyRestart").style.cssText = "display: block";
        wins++;
        hasCompleted = true;
    }
};
// loss?
function checkLoss() {
    if (remainingGuesses <= 0) {
        document.getElementById("youLose").style.cssText = "display: block";
        document.getElementById("pressKeyRestart").style.cssText = "display:block";
        hasCompleted = true;
    }
}
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }
};
document.onkeyup = function (event) {
    if (hasCompleted) {
        resetGame();
        hasCompleted = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            resetDisplay();
            checkWin();
            checkLoss();
        }
    }
};