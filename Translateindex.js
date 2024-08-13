let button = document.getElementById('rng-button');
let eventName = document.getElementById('event-name');
let buttonSound = new Audio('lick.mp3');
let jackpotSound = new Audio('777.mp3');
let alertSound = new Audio('Alert.mp3');
let bloodySound = new Audio('Hollowin.mp3');
let rainbowSound = new Audio('Rainbows.mp3');
let uncommonSound = new Audio('select-sound-121244.mp3');
let shineSound = new Audio('Wow.mp3');
let epicSound = new Audio('epic.mp3'); // Replace with your actual sound file
let sixtyNineSound = new Audio('69.mp3'); // Replace with your actual sound file
let rareSound = new Audio('Discord.mp3'); // Replace with your actual sound file
let discordSound = new Audio('Ultrads.mp3'); // Replace with your actual sound file

function createEffect(effectClass, duration, backgroundColor) {
    let effectElement = document.createElement('div');
    effectElement.classList.add('fullscreen-effect', effectClass);
    effectElement.style.backgroundColor = backgroundColor; // Apply background color
    document.body.appendChild(effectElement);
    setTimeout(() => {
        effectElement.classList.add('show');
    }, 100); // Short delay before showing

    setTimeout(() => {
        effectElement.classList.remove('show');
        setTimeout(() => {
            if (effectElement.parentNode) {
                effectElement.parentNode.removeChild(effectElement);
            }
        }, 500); // Allow time for fade out
    }, duration); // Duration before starting fade out
}

function resetButton() {
    button.disabled = false;
    button.style.backgroundColor = '#4CAF50';
}

function triggerEvent() {
    buttonSound.play();
    button.disabled = true;
    button.style.backgroundColor = 'red';

    document.body.style.backgroundColor = '#35797b';
    document.body.classList.remove('animation-fade', 'animation-rainbow', 'animation-spin');

    let existingEffect = document.querySelector('.fullscreen-effect');
    if (existingEffect) {
        existingEffect.classList.remove('show');
        setTimeout(() => {
            if (existingEffect.parentNode) {
                existingEffect.parentNode.removeChild(existingEffect);
            }
        }, 500); // Allow time for fade out
    }

    setTimeout(() => {
        let randomNumber = Math.random() * 100; // Random number between 0 and 100

        if (randomNumber <= 1) {
            // Epic event
            eventName.textContent = "Epic! (1 in 100)";
            document.body.style.backgroundColor = 'purple';
            epicSound.play();
            createEffect('epic-effect', 2000, 'purple'); // Purple effect for 2 seconds
            setTimeout(resetButton, 6000); // Button re-enable after 5 seconds

        } else if (randomNumber <= 1.45) {
            // 69 event
            eventName.textContent = "69 Event! (1 in 69)";
            document.body.style.backgroundColor = 'pink';
            sixtyNineSound.play();
            setTimeout(resetButton, 6000); // Button re-enable after 1.5 seconds

        } else if (randomNumber <= 3.125) {
            // Rare event
            eventName.textContent = "Rare! (1 in 32)";
            document.body.style.backgroundColor = 'blue';
            rareSound.play();
            setTimeout(resetButton, 2500); // Button re-enable after 1.5 seconds

        } else if (randomNumber <= 0.333) {
            // Discord event
            eventName.textContent = "Discord! (1 in 300)";
            document.body.style.backgroundColor = 'lightblue';
            document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug")'; // Replace with your actual image URL
            document.body.style.backgroundSize = 'cover'; // Ensure the image covers the entire background
            document.body.style.backgroundPosition = 'center'; // Center the image
            discordSound.play();
            createEffect('discord-effect', 500, 'lightblue'); // Light blue effect for 0.5 seconds
            setTimeout(resetButton, 25000); // Button re-enable after 1 second

        } else if (randomNumber <= 0.13) {
            // Jackpot event
            eventName.textContent = "Jackpot! (1 in 777)";
            document.body.style.backgroundColor = 'gold';
            jackpotSound.play();
            createEffect('jackpot-effect', 2000, 'gold'); // Gold effect for 2 seconds
            setTimeout(resetButton, 7777); // Button re-enable after 2 seconds

        } else if (randomNumber <= 0.15) {
            // Bloody event
            eventName.textContent = "Bloody! (1 in 666)";
            document.body.style.backgroundColor = 'red';
            bloodySound.play();
            setTimeout(resetButton, 3500); // 1.5 seconds cooldown for bloody event

        } else if (randomNumber <= 4) {
            // Shine event
            eventName.textContent = "Shine! (1 in 25)";
            shineSound.play();
            createEffect('shine-effect', 1000, 'yellow'); // Yellow effect for 1 second
            document.body.style.backgroundColor = 'yellow';
            setTimeout(resetButton, 2500); // Button re-enable after 1 second

        } else if (randomNumber <= 0.1) {
            // Rainbow event
            eventName.textContent = "Rainbow! (1 in 1000)";
            document.body.classList.add('animation-rainbow');
            rainbowSound.play();
            setTimeout(resetButton, 35000); // 10 seconds cooldown for rainbow event

        } else if (randomNumber <= 12.5) {
            // Uncommon event
            eventName.textContent = "Uncommon! (1 in 8)";
            uncommonSound.play();
            setTimeout(resetButton, 1500); // 1.5 seconds cooldown for uncommon event

        } else {
            // Nothing event
            eventName.textContent = "Nothing (1 in 2)";
            document.body.style.backgroundColor = '#35797b';
            setTimeout(resetButton, 500); // Ensure button is reset even for "Nothing"
        }
    }, 1000); // Delay for animation
}

button.addEventListener('click', triggerEvent);

function goBack() {
    window.location.href = 'bank.html'; 
}
