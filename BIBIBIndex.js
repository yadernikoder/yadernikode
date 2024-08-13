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
    setTimeout(removeAnimation, 1000);
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
