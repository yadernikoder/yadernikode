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
    } else if (info.key === 'ArrowDown') {
        userPicked = 3;
    } else {
        return; // Not an arrow key? Exit the function
    }

    if (userPicked === picked) {
        updateScore(score + 1);
    } else {
        updateScore(0);
        location.reload(); // Refresh the page without alert
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
        alert('Congratulations! You won!');
        location.reload(); // Refresh the page after winning
    }
}

// Function to simulate key press
function simulateKeyPress(key) {
    checkKey({ key: key });
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
