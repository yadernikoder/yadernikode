// Get the audio elements
let clickSound = document.getElementById('ClickSound');
let winSound = document.getElementById('ClickSoundw');
let loseSound = document.getElementById('ClickSoundl');

let scoreElement = document.getElementById('scoreId');
let arrowElement = document.getElementById('arrowId');
let score = 0;

let arrows = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Arrow_left.svg/1280px-Arrow_left.svg.png',
    'https://cdn-icons-png.flaticon.com/512/2/2231.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Arrow_right.svg/1280px-Arrow_right.svg.png',
    'https://clipart-library.com/img1/1236729.png',
];

let picked = 0;

setInterval(pickImage, 3000);

function pickImage() {
    picked = randomInteger(0, 3);
    arrowElement.setAttribute('src', arrows[picked]);
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

addEventListener('keydown', checkKey);

function checkKey(info) {
    let userPicked = 0;

    if (info.key === 'ArrowLeft') {
        userPicked = 0;
    } else if (info.key === 'ArrowUp') {
        userPicked = 1;
    } else if (info.key === 'ArrowRight') {
        userPicked = 2;
        clickSound.play(); // Play sound for correct key press
    } else if (info.key === 'ArrowDown') {
        userPicked = 3;
    } else {
        return; // Not an arrow key? Exit the function
    }

    if (userPicked === picked) {
        updateScore(score + 1);
    } else {
        loseSound.play(); // Play lose sound
        setTimeout(() => {
            location.reload(); // Refresh the page after 5 seconds
        }, 1000);
    }
}

function updateScore(newScore) {
    score = newScore;
    scoreElement.innerHTML = 'Score: ' + score;

    let username = localStorage.getItem("username");
    if (username) {
        let bestScore = parseInt(localStorage.getItem(username + "_bestScore"), 10) || 0;
        if (score > bestScore) {
            localStorage.setItem(username + "_bestScore", score);
        }
    }

    if (score >= 10000) {
        winSound.play(); // Play win sound
        setTimeout(() => {
            location.reload(); // Refresh the page after 5 seconds
        }, 5000);
    }
}

// Function to simulate key press
function simulateKeyPress(key) {
    checkKey({ key: key });
    clickSound.play()
}

// Function to display the best score
function displayBestScore() {
    let username = localStorage.getItem("username");
    if (username) {
        let bestScore = localStorage.getItem(username + "_bestScore") || 0;
        document.getElementById('bestScoreId').innerHTML = 'Best Score: ' + bestScore;
    }
}

// Call displayBestScore when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    displayBestScore();
});

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


