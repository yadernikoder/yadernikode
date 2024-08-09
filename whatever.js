// Array of possible words
const words = ['house', 'frame', 'gamer', 'money', 'pause', 'grass', 'glass', 'chair', 'table']; // Add more words as needed

// Select a random word from the array
let toGuess = words[Math.floor(Math.random() * words.length)];
let attempts = 0; // Initialize attempts counter

// Elements
let inputElement = document.getElementById('wordId');
let container = document.getElementById('container');
let attemptsElement = document.getElementById('attempts');
let guessSound = document.getElementById('guessSound');

function guess() {
    let inputValue = inputElement.value.trim().toLowerCase();

    if (inputValue.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }

    container.innerHTML = ''; // Clear previous guesses

    for (let i = 0; i < 5; i++) {
        let letter = inputValue.charAt(i);
        let color = check(letter, i);
        container.innerHTML += `
            <div style="background-color: ${color}" class="letter">${letter}</div>
        `;
    }

    attempts++; // Increment attempts
    attemptsElement.innerText = `Attempts: ${attempts}`; // Update attempts display

    // Play sound
    guessSound.play();

    // Check for win or loss
    if (inputValue === toGuess) {
        setTimeout(() => {
            alert('Congratulations! You guessed the word.');
            location.reload(); // Reload the page
        }, 500); // Delay to allow sound to finish
    } else if (attempts >= 10) {
        setTimeout(() => {
            alert(`Sorry, you lost! The word was "${toGuess}".`);
            location.reload(); // Reload the page
        }, 500); // Delay to allow sound to finish
    }
}

function check(letter, index) {
    if (toGuess.charAt(index) === letter) {
        return 'green';
    }
    if (toGuess.includes(letter)) {
        return 'yellow';
    }
    return 'red';
}
