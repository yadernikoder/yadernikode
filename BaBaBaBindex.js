
const clickSound = new Audio('mixkit-modern-technology-select-3124.wav');

function playSound() {
    clickSound.currentTime = 0; 
    clickSound.play();
}

function clearDisplay() {
    playSound();
    document.getElementById("display").value = "";
}

function deleteLast() {
    playSound();
    let currentDisplay = document.getElementById("display").value;
    document.getElementById("display").value = currentDisplay.slice(0, -1);
}

function appendValue(value) {
    playSound();
    document.getElementById("display").value += value;
}

function calculateResult() {
    playSound();
    let currentDisplay = document.getElementById("display").value;
    try {
        document.getElementById("display").value = eval(currentDisplay);
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

// Function to append a random number between 1 and 9
function appendRandomNumber() {
    playSound();
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    document.getElementById("display").value += randomNumber;
}

function goBack() {
    window.location.href = 'bank.html'; 
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




