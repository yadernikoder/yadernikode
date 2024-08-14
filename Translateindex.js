let button = document.getElementById('rng-button');
let eventName = document.getElementById('event-name');
let buttonSound = new Audio('lick.mp3');
let jackpotSound = new Audio('777.mp3');
let bloodySound = new Audio('Hollowin.mp3');
let rainbowSound = new Audio('Rainbows.mp3');
let uncommonSound = new Audio('select-sound-121244.mp3');
let shineSound = new Audio('Wow.mp3');
let epicSound = new Audio('EpicS.mp3');
let sixtyNineSound = new Audio('69.mp3');
let rareSound = new Audio('Discord.mp3');
let discordSound = new Audio('Ultrads.mp3');
let alertSound = new Audio('bruh-sound-effect-2-37927.mp3');
let RarerSound = new Audio('Epic.mp3');

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
            Common: ${eventCounts.common}
        `;
    }
}

// Define the new sound for the 'shine' event if needed
// Update the triggerEvent function to include the new 'shine' event
function triggerEvent() {
    buttonSound.play();
    button.disabled = true; // Disable button when event is triggered
    button.style.backgroundColor = 'red';

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

        // Adjust the probabilities for all events
        if (randomChance < 1 / 25) { // 1/25 chance for Shine
            eventName.textContent = "Shine! (1 in 25)";
            document.body.style.backgroundColor = 'yellow';
            shineSound.play(); // Play the shine sound
            createEffect('shine-effect', 300); // Flash effect for 0.3 seconds
            eventCounts.shine++;
            delay = 2000; // 2 seconds cooldown
            eventType = 'shine';
            nothingInRow = 0; // Reset nothingInRow
        } else if (randomChance < 1 / 100) { // 1% chance for Epic
            eventName.textContent = "Epic! (1 in 100)";
            document.body.style.background = 'linear-gradient(to bottom, lightpurple, purple, darkpurple)'; // Update gradient colors
            epicSound.play();
            createEffect('epic-effect', 800); // Flash effect for 0.8 seconds
            eventCounts.epic++;
            delay = 3000; // 3 seconds cooldown
            eventType = 'epic';
            nothingInRow = 0; // Reset nothingInRow
        } else if (randomChance < 1 / 69) { // Additional chance for 69 Event
            eventName.textContent = "69 Event! (1 in 69)";
            document.body.style.backgroundColor = 'pink';
            sixtyNineSound.play();
            createEffect('sixtyNine-effect', 2000);
            eventCounts.sixtyNine++;
            delay = 6900; // 6.9 seconds cooldown
            eventType = 'sixtyNine';
            nothingInRow = 0; // Reset nothingInRow
        } else if (randomChance < 1 / 777) { // Additional chance for Jackpot
            eventName.innerHTML = "<span class='jackpot-rainbow-text'>Jackpot! (1 in 777)</span>";
            document.body.classList.add('jackpot-background');
            jackpotSound.play();
            createEffect('jackpot-effect', 2000);
            eventCounts.jackpot++;
            delay = 7770; // 7.77 seconds cooldown
            eventType = 'jackpot';
            nothingInRow = 0; // Reset nothingInRow
            
            // Create coin drop effect
            createCoinDropEffect();
            
            // Remove the rainbow text effect after 7.7 seconds
            setTimeout(() => {
                document.body.classList.remove('jackpot-background');
                eventName.classList.remove('jackpot-rainbow-text');
            }, 7700); // 7.7 seconds
        } else if (randomChance < 1 / 300) { // Additional chance for Discord
            eventName.textContent = "Discord! (1 in 300)";
            
            // Add the light blue flash effect
            createEffect('light-blue-flash', 1000); // Flash for 1 second
            document.body.style.backgroundColor = 'DarkBlue'
            // Add spinning effect
            document.body.classList.add('spin-effect');
        
            // Set background image and ensure it fits
            document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug")';
            document.body.style.backgroundSize = 'cover'; // Ensure the image covers the whole screen
        
            // Play sound and update counters
            discordSound.play();
            eventCounts.discord++;
            delay = 22000; // 20 seconds cooldown
        
            // Stop spinning and remove the background image after 20 seconds
            setTimeout(() => {
                document.body.style.backgroundImage = ''; // Remove background image
            }, 22000); // 20 seconds
            setTimeout(() => {
                document.body.classList.remove('spin-effect');
            }, 22000);
            nothingInRow = 0; // Reset nothingInRow
        } else if (randomChance < 1 / 1000) { // Additional chance for Rainbow
            eventName.textContent = "Rainbow! (1 in 1000)";
            let rainbowFlash = document.createElement('div');
            rainbowFlash.classList.add('rainbow-flash');
            document.body.appendChild(rainbowFlash);

            document.body.classList.add('rainbow-background-fast'); // Add fast-changing background class
            rainbowSound.play();
            createEffect('rainbow-effect', 1000); // Flash effect for 1 second
            eventCounts.rainbow++;
            delay = 40000; // 40 seconds cooldown

            // Remove the rainbow flash effect after 1 second
            setTimeout(() => {
                if (rainbowFlash.parentNode) {
                    rainbowFlash.parentNode.removeChild(rainbowFlash);
                }
            }, 1000);

            // Remove fast-changing background class after 100 seconds
            setTimeout(() => {
                document.body.classList.remove('rainbow-background-fast');
                document.body.classList.add('rainbow-background');
            }, 100000); // Change back to the longer rainbow background after 100 seconds
            nothingInRow = 0; // Reset nothingInRow
        } else if (randomChance < 1 / 16) { // Additional chance for Rare
            eventName.textContent = "Rare! (1 in 16)";
            eventCounts.rare++;
            RarerSound.play();
            delay = 4000; // 2 seconds cooldown
            eventType = 'rare';
            
            // Change the background color to gold
            document.body.style.backgroundColor = '#33bcc1';
        
            // Revert the background color back after 0.5 seconds
            setTimeout(() => {
                document.body.style.backgroundColor = '#35797b'; // Original background color
            }, 500);
        } else if (randomChance < 1 / 32) { // Additional chance for Ultra Rare
            eventName.textContent = "Ultra Rare! (1 in 32)";
            rareSound.play();
            eventCounts.ultraRare++;
            delay = 3000; // 3 seconds cooldown
            document.body.style.backgroundColor = 'lightblue';
            // Create and add the star flash element
            let starFlash = document.createElement('div');
            starFlash.classList.add('star-flash');
            document.body.appendChild(starFlash);
        
            // Remove the star flash after animation completes
            setTimeout(() => {
                if (starFlash.parentNode) {
                    starFlash.parentNode.removeChild(starFlash);
                }
            }, 200);
        } else if (randomChance < 1 / 50) { // Additional chance for Alert
            eventName.textContent = "Alert! (1 in 50)";
            alert("!!!");
            document.body.style.backgroundColor = 'orange';
            alertSound.play();
            eventCounts.alert++;
            delay = 1000; // 1 second cooldown
            eventType = 'alert';
            nothingInRow = 0; // Reset nothingInRow
           } else if (randomChance < 1 / 8) { // Additional chance for Uncommon
            eventName.textContent = "Uncommon! (1 in 8)";
            uncommonSound.play(); // Play the uncommon sound
            eventCounts.uncommon++;
            delay = 2000; // 2 seconds cooldown
            eventType = 'uncommon';
            nothingInRow = 0; // Reset nothingInRow
        
        
        }else { // Default to Nothing
            eventName.textContent = "Nothing!";
            eventCounts.nothing++;
            nothingInRow++;
            delay = Math.max(1000 - (nothingInRow * 50), 100); // Decrease cooldown by 100ms per "nothing" in a row, minimum 100ms
            eventType = 'nothing';
        }

        // Save updated event counts to localStorage based on the username
        localStorage.setItem(`${username}_eventCounts`, JSON.stringify(eventCounts));
        updateEventCounters();

        console.log('Cooldown time:', delay); // Debugging line to check cooldown time

        // Re-enable the button after the cooldown
        setTimeout(() => {
            button.disabled = false;
            button.style.backgroundColor = ''; // Reset button color
            button.style.visibility = 'visible'; // Ensure the button is visible
        }, delay);

    }, delay); // Delay after the button is clicked
}

// Define the function to create the shine effect
function createEffect(effectName, duration) {
    let effect = document.createElement('div');
    effect.classList.add('fullscreen-effect', effectName);
    document.body.appendChild(effect);

    // Remove effect after the duration
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, duration);
}

// Load event counters on page load
updateEventCounters();

// Add click event listener to the button
button.addEventListener('click', triggerEvent);

function goBack() {
    window.location.href = 'bank.html'; 
}

function createCoinDropEffect() {
    const container = document.getElementById('container'); // Ensure this ID matches your HTML structure

    for (let i = 0; i < 777; i++) { // Increased number of coins
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.innerText = '💰'; // Use emoji or any other symbol/image for coins

        // Randomize initial horizontal position
        coin.style.left = Math.random() * 100 + 'vw'; 
        coin.style.top = Math.random() * -100 + 'px'; // Start above the viewport

        // Randomize animation delay to spread out the drops
        coin.style.setProperty('--random-delay', Math.random());

        // Append the coin to the container
        container.appendChild(coin);
    }
}

// Add the following block inside your `updateEventCounters` function

let counters = document.getElementById('event-counters');
if (counters) {
    counters.innerHTML = `
        Nothing: ${eventCounts.nothing}<br>
        Uncommon: ${eventCounts.uncommon}<br>
        Epic: ${eventCounts.epic}<br>
        69 Event: ${eventCounts.sixtyNine}<br>
        Rare: ${eventCounts.rare}<br>
        Ultra Rare: ${eventCounts.ultraRare}<br> <!-- Add this line -->
        Discord: ${eventCounts.discord}<br>
        Jackpot: ${eventCounts.jackpot}<br>
        Bloody: ${eventCounts.bloody}<br>
        Shine: ${eventCounts.shine}<br>
        Rainbow: ${eventCounts.rainbow}<br>
        Alert: ${eventCounts.alert}<br>
    `;
}

function resetLocalStorage() {
    if (confirm("Are you sure you want to reset all local storage data?")) {
        localStorage.clear();
        alert("Local storage has been reset.");
    } else {
        alert("Reset canceled.");
    }
}

// Call the function to reset local storage
resetLocalStorage();
