// Array of possible words
const words = ['house', 'frame', 'gamer', 'money', 'pause', 'grass', 'glass', 'Daily', 'table', 'About', 'Alert', 'Audio', 'among', 'Basic', 'craft', 'check', 'adult']; // Add more words as needed

// Select a random word from the array
let toGuess = words[Math.floor(Math.random() * words.length)];
let attempts = 0; // Initialize attempts counter

// Elements
let inputElement = document.getElementById('wordId');
let container = document.getElementById('container');
let attemptsElement = document.getElementById('attempts');
let guessSound = document.getElementById('guessSound');
let guessSoundWin = document.getElementById('guessSoundWin');
let guessSoundLoose = document.getElementById('guessSoundLoose');

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
            guessSoundWin.play();

            setTimeout(() => location.reload(), 7000); // Reload the page after 7 seconds
             
            setTimeout(() => alert('Congratulations! You guessed the word.'), 6000);
        }, 500); // Delay to allow sound to finish
    } else if (attempts >= 10) {
        setTimeout(() => {
            guessSoundLoose.play();
            setTimeout(() => location.reload(), 5000); // Reload the page after 7 seconds
            setTimeout(() => alert(`Sorry, you lost! The word was "${toGuess}".`), 5000);
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

function goBack() {
    window.location.href = 'bank.html'; // Replace with the actual file name of the previous page
}

function applyBackgroundColor(color) {
    console.log('Applying background color:', color); // Debug log
    if (isValidHex(color)) {
        if (document.body.classList.contains('dark-mode')) {
            const darkenedColor = darkenColor(color, 50);
            console.log('Dark mode active. Applying darkened color:', darkenedColor); // Debug log
            document.body.style.backgroundColor = darkenedColor;
        } else {
            console.log('Light mode active. Applying color:', color); // Debug log
            document.body.style.backgroundColor = color;
        }
    } else {
        console.error('Invalid color:', color); // Error log
    }
}




(function() {
    // Dynamically load the global preferences script
    const script = document.createElement('script');
    script.src = 'babank.js'; // Update with the correct path
    script.onload = function() {
        console.log('Global preferences script loaded.');
    };
    document.head.appendChild(script);
})();

// global-preferences.js

function applyPreferences() {
    const body = document.body;

    // Load saved preferences from localStorage
    const savedMode = localStorage.getItem('mode');
    const savedColor = localStorage.getItem('color');
    const savedTextSize = localStorage.getItem('textSize') || '16px'; // Default text size if not saved
    const savedMobileMode = localStorage.getItem('mobileMode') === 'true'; // Boolean from string

    if (savedMode) {
        body.classList.add(savedMode);
    }

    if (savedColor) {
        applyBackgroundColor(savedColor);
    } else {
        // Default light mode background color if no color is saved
        applyBackgroundColor('#35797b');
    }

    body.style.fontSize = savedTextSize; // Apply saved text size

    if (savedMobileMode) {
        body.classList.add('mobile-mode');
    }
}

function applyBackgroundColor(color) {
    if (isValidHex(color)) {
        document.body.style.backgroundColor = color;
    }
}

function isValidHex(hex) {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// Run applyPreferences() when this script is loaded
document.addEventListener('DOMContentLoaded', applyPreferences);

function applyBackgroundColor(color) {
    if (isValidHex(color)) {
        document.body.style.backgroundColor = color;
    }
}

function isValidHex(hex) {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// Run applyPreferences() when this script is loaded
document.addEventListener('DOMContentLoaded', applyPreferences);


