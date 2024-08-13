let button = document.getElementById('rng-button');
let eventName = document.getElementById('event-name');
let buttonSound = new Audio('lick.mp3');
let jackpotSound = new Audio('777.mp3');
let bloodySound = new Audio('Hollowin.mp3');
let rainbowSound = new Audio('Rainbows.mp3');
let uncommonSound = new Audio('select-sound-121244.mp3');
let shineSound = new Audio('Wow.mp3');
let epicSound = new Audio('Epic.mp3');
let sixtyNineSound = new Audio('69.mp3');
let rareSound = new Audio('Discord.mp3');
let discordSound = new Audio('Ultrads.mp3');
let alertSound = new Audio('bruh-sound-effect-2-37927.mp3');

function createEffect(effectClass, duration, backgroundColor) {
    let effectElement = document.createElement('div');
    effectElement.classList.add('fullscreen-effect', effectClass);
    effectElement.style.backgroundColor = backgroundColor;
    document.body.appendChild(effectElement);
    setTimeout(() => {
        effectElement.classList.add('show');
    }, 100);

    setTimeout(() => {
        effectElement.classList.remove('show');
        setTimeout(() => {
            if (effectElement.parentNode) {
                effectElement.parentNode.removeChild(effectElement);
            }
        }, 500);
    }, duration);
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
        }, 500);
    }

    setTimeout(() => {
        let randomNumber = Math.random(); // Random number between 0 and 1

        if (randomNumber <= 1 / 100) {
            // Epic event
            eventName.textContent = "Epic! (1 in 100)";
            document.body.style.backgroundColor = 'purple';
            epicSound.play();
            createEffect('epic-effect', 2000, 'purple');
            setTimeout(resetButton, 6000);

        } else if (randomNumber <= 1 / 69) {
            // 69 event
            eventName.textContent = "69 Event! (1 in 69)";
            document.body.style.backgroundColor = 'pink';
            sixtyNineSound.play();
            setTimeout(resetButton, 6000);

        } else if (randomNumber <= 1 / 32) {
            // Rare event
            eventName.textContent = "Rare! (1 in 32)";
            document.body.style.backgroundColor = 'blue';
            rareSound.play();
            setTimeout(resetButton, 2500);

        } else if (randomNumber <= 1 / 300) {
            // Discord event
            eventName.textContent = "Discord! (1 in 300)";
            document.body.style.backgroundColor = 'lightblue';
            document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug")';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            discordSound.play();
            createEffect('discord-effect', 500, 'lightblue');
            setTimeout(() => {
                resetButton();
                document.body.style.backgroundColor = '#35797b';
                document.body.style.backgroundImage = '';
            }, 25000);

        } else if (randomNumber <= 1 / 777) {
            // Jackpot event
            eventName.textContent = "Jackpot! (1 in 777)";
            document.body.style.backgroundColor = 'gold';
            jackpotSound.play();
            createEffect('jackpot-effect', 2000, 'gold');
            setTimeout(resetButton, 7777);

        } else if (randomNumber <= 1 / 666) {
            // Bloody event
            eventName.textContent = "Bloody! (1 in 666)";
            document.body.style.backgroundColor = 'red';
            bloodySound.play();
            setTimeout(resetButton, 3500);

        } else if (randomNumber <= 1 / 25) {
            // Shine event
            eventName.textContent = "Shine! (1 in 25)";
            shineSound.play();
            createEffect('shine-effect', 1000, 'yellow');
            document.body.style.backgroundColor = 'yellow';
            setTimeout(resetButton, 2500);

        } else if (randomNumber <= 1 / 1000) {
            // Rainbow event
            eventName.textContent = "Rainbow! (1 in 1000)";
            document.body.classList.add('animation-rainbow');
            rainbowSound.play();
            setTimeout(resetButton, 35000);

        } else if (randomNumber <= 1 / 8) {
            // Uncommon event
            eventName.textContent = "Uncommon! (1 in 8)";
            uncommonSound.play();
            setTimeout(resetButton, 1500);

        } else if (randomNumber <= 1 / 32) {
            // Alert event
            eventName.textContent = "Alert! (1 in 32)";
            alertSound.play();
            document.body.style.backgroundColor = 'Orange';
            setTimeout(resetButton, 500);

        } else {
            // Nothing event
            eventName.textContent = "Nothing (1 in 2)";
            document.body.style.backgroundColor = '#35797b';
            setTimeout(resetButton, 500);
        }
    }, 1000);
}

button.addEventListener('click', triggerEvent);

function goBack() {
    window.location.href = 'bank.html'; 
}
