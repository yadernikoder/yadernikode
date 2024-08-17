let button = document.getElementById('rng-button');
let eventName = document.getElementById('event-name');
let buttonSound = new Audio('lick.mp3');
let jackpotSound = new Audio('777.mp3');
let bloodySound = new Audio('Hollowin.mp3');
let rainbowSound = new Audio('Rainbows.mp3');
let uncommonSound = new Audio('mixkit-modern-technology-select-3124.wav');
let shineSound = new Audio('Wow.mp3');
let epicSound = new Audio('EpicS.mp3');
let sixtyNineSound = new Audio('69.mp3');
let rareSound = new Audio('Discord.mp3');
let discordSound = new Audio('Ultrads.mp3');
let alertSound = new Audio('Alert.mp3');
let RarerSound = new Audio('Epic.mp3');
let RareSound = new Audio('Rare.mp3')

// Retrieve username from localStorage
const username = localStorage.getItem('username') || 'defaultUser';

// Retrieve event counts from local storage based on the username
let eventCounts = JSON.parse(localStorage.getItem(`${username}_eventCounts`)) || {
    nothing: 0,
    uncommon: 0,
    epic: 0,
    sixtyNine: 0,
    rare: 0,
    discord: 0,
    jackpot: 0,
    bloody: 0,
    shine: 0,
    rainbow: 0,
    alert: 0,
    ultraRare: 0 // Initialize ultra rare event count
};

let nothingInRow = 0; // Track consecutive nothing events

function createEffect(effectClass, duration) {
    let effectElement = document.createElement('div');
    effectElement.classList.add('fullscreen-effect', effectClass);
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

function updateEventCounters() {
    let counters = document.getElementById('event-counters');
    if (counters) {
        counters.innerHTML = `
            Nothing: ${eventCounts.nothing}<br>
            Uncommon: ${eventCounts.uncommon}<br>
            Epic: ${eventCounts.epic}<br>
            69 Event: ${eventCounts.sixtyNine}<br>
            Rare: ${eventCounts.rare}<br>
            Ultra Rare: ${eventCounts.ultraRare}<br>
            Discord: ${eventCounts.discord}<br>
            Jackpot: ${eventCounts.jackpot}<br>
            Bloody: ${eventCounts.bloody}<br>
            Shine: ${eventCounts.shine}<br>
            Rainbow: ${eventCounts.rainbow}<br>
            Alert: ${eventCounts.alert}<br>
        `;
    }
}
let spinCount = 0; // Track the number of spins


const originalThresholds = {
    ultraRare: 1 / 32,
    rare: 1 / 16,
    alert: 1 / 50,
    sixtyNine: 1 / 69,
    epic: 1 / 100,
    rainbow: 1 / 1000,
    discord: 1 / 300,
    jackpot: 1 / 777,
    bloody: 1 / 666,
    uncommon: 1 / 8, // This is not multiplied
    nothing: 1 / 2 // Default chance for nothing
};



// Object to store event thresholds
const thresholds = {
    ultraRare: 1 / 32,
    rare: 1 / 16,
    alert: 1 / 50,
    sixtyNine: 1 / 69,
    epic: 1 / 100,
    rainbow: 1 / 1000,
    discord: 1 / 300,
    jackpot: 1 / 777,
    bloody: 1 / 666,
    uncommon: 1 / 8, // This is not multiplied
    nothing: 1 / 2 // Default chance for nothing
};

let isLuckyMessageShown = false; // Track if the lucky message is shown

function handleSpecialEvent() {
    spinCount++;

    const messageElement = document.getElementById('chance-message');

    if (spinCount % 10 === 0) { // Every 10th spin
        button.style.backgroundColor = 'gold'; // Change button color to gold
        displayChanceMessage(); // Show a message about the increased chances
        increaseEventChances(); // Increase the chances for special events
    } else {
        button.style.backgroundColor = ''; // Reset button color if not every 10 spins
        resetEventChances(); // Reset to original chances if it's not the 10th spin
    }

    if (spinCount % 10 === 9) {
        if (messageElement) {
            messageElement.textContent = 'Next spin will be x2 luck!';
            messageElement.classList.add('show');
        }
    } else if (spinCount % 10 === 0 && messageElement) {
        messageElement.classList.remove('show'); // Hide the message immediately before the special event
    }
}

function resetEventChances() {
    Object.assign(thresholds, originalThresholds);
}



// Function to display a message about the increased chances
function displayChanceMessage() {
    const messageElement = document.getElementById('chance-message');
    messageElement.classList.add('show');

    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000); // Remove the message after 3 seconds
}

// Function to increase the chances of events (except "nothing" and "uncommon")
function increaseEventChances() {
    thresholds.ultraRare = (1 / 16) 
    thresholds.rare = (1 / 8) 
    thresholds.alert = (1 / 25) 
    thresholds.sixtyNine = (1 / 34.6)
    thresholds.epic = (1 / 50) 
    thresholds.rainbow = (1 / 500) 
    thresholds.discord = (1 / 150) 
    thresholds.jackpot = (1 / 443.5) 
    thresholds.bloody = (1 / 333)  
}

// Function to create coin drop effect
function createCoinDropEffect() {
    const container = document.createElement('div');
    container.className = 'coin-drop-container';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.left = `${Math.random() * 100}vw`;
        container.appendChild(coin);
    }

    setTimeout(() => {
        document.body.removeChild(container);
    }, 20000); // Remove the container after 20 seconds
}

// Function to trigger an event
function triggerEvent() {
    handleSpecialEvent(); // Check if special event handling is needed

    buttonSound.play();
    button.disabled = true; // Disable button when event is triggered
    button.style.backgroundColor = 'red';

    // Reset all effects
    document.body.style.backgroundColor = '#35797b';
    document.body.classList.remove('animation-fade', 'animation-rainbow', 'animation-spin', 'rainbow-background', 'rainbow-background-fast', 'epic-flash', 'discord-spin', 'discord-background');

    let existingEffect = document.querySelector('.fullscreen-effect');
    if (existingEffect) {
        existingEffect.classList.remove('show');
        setTimeout(() => {
            if (existingEffect.parentNode) {
                existingEffect.parentNode.removeChild(existingEffect);
            }
        }, 500);
    }

    let eventType = 'nothing';
    let delay = 1000; // Default delay

    setTimeout(() => {
        let randomChance = Math.random(); // Generates a random number between 0 and 1
        console.log('Generated Random Chance:', randomChance); // Debugging line to check random chance

        // Adjusted sequential checking
        if (randomChance < thresholds.ultraRare) { // Ultra Rare: 1 in 32
            eventName.textContent = "Ultra Rare! (1 in 32)";
            eventCounts.ultraRare++;
            RarerSound.play();
            delay = 4000; // 4 seconds cooldown
            eventType = 'ultraRare';
            nothingInRow = 0;
            createEffect('star-flash', 200);

        } else if (randomChance < thresholds.rare) { // Rare: 1 in 16
            eventName.textContent = "Rare! (1 in 16)";
            eventCounts.rare++;
            RareSound.play();
            delay = 4000;
            eventType = 'rare';
            nothingInRow = 0;

        } else if (randomChance < thresholds.alert) { // Alert: 1 in 50
            eventName.textContent = "Alert! (1 in 50)";
            document.body.style.backgroundColor = '#ff0000';
            alertSound.play();
            createEffect('alert-effect', 500);
            eventCounts.alert++;
            delay = 5000;
            eventType = 'alert';
            nothingInRow = 0;
            setTimeout(() => {
                alert("!!!");
            }, 1000);

        } else if (randomChance < thresholds.sixtyNine) { // 69 Event: 1 in 69
            eventName.textContent = "69 Event! (1 in 69)";
            document.body.style.backgroundColor = 'pink';
            sixtyNineSound.play();
            createEffect('sixtyNine-effect', 2000);
            eventCounts.sixtyNine++;
            delay = 6900;
            eventType = 'sixtyNine';
            nothingInRow = 0;

        } else if (randomChance < thresholds.epic) { // Epic: 1 in 100
            eventName.textContent = "Epic! (1 in 100)";
            document.body.style.background = 'linear-gradient(to bottom, lightpurple, purple, darkpurple)';
            epicSound.play();
            createEffect('epic-effect', 800);
            eventCounts.epic++;
            delay = 3000;
            eventType = 'epic';
            nothingInRow = 0;

        } else if (randomChance < thresholds.rainbow) { // Rainbow: 1 in 1000
            eventName.textContent = "Rainbow! (1 in 1000)";
            document.body.classList.add('rainbow-background-fast');
            rainbowSound.play();
            createEffect('rainbow-flash', 1000);
            createEffect('Rstar-flash', 40000);
            eventCounts.rainbow++;
            delay = 40000;
            nothingInRow = 0;

            setTimeout(() => {
                document.body.classList.remove('rainbow-background-fast');
                document.body.classList.add('rainbow-background');
            }, 100000);

        } else if (randomChance < thresholds.discord) { // Discord: 1 in 300
            eventName.textContent = "Discord! (1 in 300)";
            document.body.style.backgroundColor = 'DarkBlue';
            createEffect('light-blue-flash', 1000);
            document.body.classList.add('spin-effect');
            discordSound.play();
            eventCounts.discord++;
            delay = 22000;
            nothingInRow = 0;

            setTimeout(() => {
                document.body.style.backgroundImage = '';
            }, 22000);

            setTimeout(() => {
                document.body.classList.remove('spin-effect');
            }, 22000);

        } else if (randomChance < thresholds.jackpot) { // Jackpot: 1 in 777
            eventName.innerHTML = "<span class='jackpot-rainbow-text'>Jackpot! (1 in 777)</span>";
            document.body.classList.add('jackpot-background');
            jackpotSound.play();
            createEffect('jackpot-effect', 2000);
            eventCounts.jackpot++;
            delay = 7770;
            eventType = 'jackpot';
            nothingInRow = 0;

            createCoinDropEffect();

            setTimeout(() => {
                document.body.classList.remove('jackpot-background');
                eventName.classList.remove('jackpot-rainbow-text');
            }, 7700);

        } else if (randomChance < thresholds.uncommon) { // Uncommon: 1 in 8
            eventName.textContent = "Uncommon! (1 in 8)";
            uncommonSound.play();
            eventCounts.uncommon++;
            delay = 2000;
            eventType = 'uncommon';
            nothingInRow = 0;

        } else if (randomChance < thresholds.bloody) { // Bloody: 1 in 666
            eventName.textContent = "Bloody! (1 in 666)";
            document.body.style.backgroundColor = ''; // Reset background color
            document.body.classList.add('bloody-background'); // Add the gradient animation class
            bloodySound.play();
            createEffect('bloody-effect', 500);
            eventCounts.bloody++;
            delay = 6666;
            eventType = 'bloody';
            nothingInRow = 0;

        } else { // Default to Nothing
            eventName.textContent = "Nothing!";
            eventCounts.nothing++;
            nothingInRow++;
            delay = Math.max(100, 1000 - nothingInRow * 50);
        }
        console.log('Cooldown time:', delay);

        setTimeout(() => {
            button.disabled = false;
            button.style.backgroundColor = '';
        }, delay);
    }, 1000);
}





// Function to create the coin drop effect
function createCoinDropEffect() {
    const coinDropContainer = document.createElement('div');
    coinDropContainer.classList.add('coin-drop-container');
    document.body.appendChild(coinDropContainer);

    const totalCoins = 100; // Adjust the number of coins as needed

    for (let i = 0; i < totalCoins; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = Math.random() * window.innerWidth + 'px';
        coin.style.animationDelay = Math.random() * 2 + 's'; // Random delay for each coin
        coinDropContainer.appendChild(coin);
    }

    setTimeout(() => {
        if (coinDropContainer.parentNode) {
            coinDropContainer.parentNode.removeChild(coinDropContainer);
        }
    }, 20000); // Remove coins after 20 seconds
}

// Event listener for the button click
button.addEventListener('click', triggerEvent);

// Initialize event counters on page load
updateEventCounters();

function goBack() {
    window.location.href = 'bank.html'; // Replace with the actual file name of the previous page
}

