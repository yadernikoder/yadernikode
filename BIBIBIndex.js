// login.js
function login() {
    let username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    if (!localStorage.getItem(username + "_score")) {
        localStorage.setItem(username + "_score", 0);
    }
    location.href = "game.html"; 
    let audio = new Audio("ADF.mp3");
    audio.play(); 
}

// game.js
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        const bestScore = localStorage.getItem(username + "_score");
        if (bestScore) {
            alert(`Welcome back, ${username}! Your best score is ${bestScore}`);
        }
    }

    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('jumpButton').addEventListener('click', jump);
});

let player = document.getElementById('player');
let enemy = document.getElementById('enemy');
let scoreElement = document.getElementById('scoreId');

let score = 0;
let isJumping = false;
let checkTouchInterval;

function startGame() {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('scoreId').style.display = 'block';
    document.getElementById('player').style.display = 'block';
    document.getElementById('enemy').style.display = 'block';
    document.getElementById('floor').style.display = 'block';
    document.getElementById('jumpButton').style.display = 'block';

    addEventListener('keydown', checkKey);
    checkTouchInterval = setInterval(checkCollision, 100);
}

function checkKey(e) {
    if (e.key === ' ') {
        jump();
    }
}

function jump() {
    if (isJumping) {
        return;
    }
    isJumping = true;
    player.classList.add('jump');

    // Determine the animation duration based on mobile mode
    const isMobileMode = document.body.classList.contains('mobile-mode');
    const animationDuration = isMobileMode ? 2000 : 1000; // 2s for mobile, 1s for non-mobile

    setTimeout(removeAnimation, animationDuration);
    let jumpSound = new Audio('jump.wav');
    jumpSound.play();
}


function removeAnimation() {
    player.classList.remove('jump');
    isJumping = false;
    score++;
    scoreElement.innerHTML = 'Your score: ' + score;

    if (score >= 100) {
        alert('Congrats, you win!');
        saveScore();
        resetGame();
    }
}

function saveScore() {
    const username = localStorage.getItem('username');
    if (username) {
        let bestScore = localStorage.getItem(username + "_score");
        if (!bestScore || score > bestScore) {
            localStorage.setItem(username + "_score", score);
        }
    }
}

function checkCollision() {
    if (elementsOverlap(player, enemy)) {
        clearInterval(checkTouchInterval);
        saveScore();
        let username = localStorage.getItem('username');
        let best = localStorage.getItem(username + "_score");

        document.body.innerHTML = `
            <p id="overId"> Game Over! </p>  
            <p id="result"> Your score is ${score}  </p> 
            <p id="best"> Your best score is... ${best}  </p> 
        `;
        let overSound = new Audio('game-over.wav');
        overSound.play();

        setTimeout(() => {
            location.reload();
        }, 5000);
    }
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

function resetGame() {
    clearInterval(checkTouchInterval);
    setTimeout(() => {
        location.reload();
    }, 5000);
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



