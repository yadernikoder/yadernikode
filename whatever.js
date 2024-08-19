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

// Function to guess the word
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
            setTimeout(() => location.reload(), 5000); // Reload the page after 5 seconds
            setTimeout(() => alert(`Sorry, you lost! The word was "${toGuess}".`), 5000);
        }, 500); // Delay to allow sound to finish
    }
}

// Function to check the letter and return color
function check(letter, index) {
    if (toGuess.charAt(index) === letter) {
        return 'green';
    }
    if (toGuess.includes(letter)) {
        return 'yellow';
    }
    return 'red';
}

// Function to navigate back
function goBack() {
    window.location.href = 'bank.html'; // Replace with the actual file name of the previous page
}

// Function to apply background color
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

// Function to apply background image
function applyBackgroundImage(url) {
    console.log('Applying background image:', url); // Debug log
    document.body.style.backgroundImage = `url(${url})`;
    document.body.style.backgroundSize = 'cover'; // Ensure the background covers the whole page
    document.body.style.backgroundRepeat = 'no-repeat'; // Prevent tiling
    document.body.style.backgroundAttachment = 'fixed'; // Fix the image to the viewport
}

// Function to darken a color
function darkenColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, r * (1 - percent / 100)));
    g = Math.max(0, Math.min(255, g * (1 - percent / 100)));
    b = Math.max(0, Math.min(255, b * (1 - percent / 100)));

    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// Function to check if a color is a valid hex code
function isValidHex(hex) {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// Function to check if a color is a valid RGB code
function isValidRGB(rgb) {
    return /^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/.test(rgb);
}

// Function to apply preferences from localStorage
function applyPreferences() {
    const body = document.body;

    // Load saved preferences from localStorage
    const savedMode = localStorage.getItem('mode');
    const savedColor = localStorage.getItem('color');
    const savedBackground = localStorage.getItem('selectedBackground');
    const savedTextSize = localStorage.getItem('textSize') || '16px'; // Default text size if not saved
    const savedMobileMode = localStorage.getItem('mobileMode') === 'true'; // Boolean from string

    if (savedMode) {
        body.classList.add(savedMode);
    }

    if (savedBackground) {
        if (savedBackground.startsWith('rgb') || savedBackground.startsWith('#')) {
            applyBackgroundColor(savedBackground);
        } else {
            applyBackgroundImage(savedBackground);
        }
    } else if (savedColor) {
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

// Apply preferences when the script is loaded
document.addEventListener('DOMContentLoaded', applyPreferences);

// Dynamically load the global preferences script
(function() {
    const script = document.createElement('script');
    script.src = 'babank.js'; // Update with the correct path
    script.onload = function() {
        console.log('Global preferences script loaded.');
    };
    document.head.appendChild(script);
})();
