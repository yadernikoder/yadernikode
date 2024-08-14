
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

