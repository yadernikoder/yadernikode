document.addEventListener('DOMContentLoaded', () => {
    const hatchButton = document.getElementById('hatchButton');
    const resultMessage = document.getElementById('resultMessage');
    const clickSound = document.getElementById('Lick');
    const unlockSound = document.getElementById('WOW');

    const possibleBackgrounds = [
        { url: 'https://img.freepik.com/free-vector/pride-gradient-1_78370-282.jpg', chance: 0.01 }, // 1% chance
        { url: 'https://removal.ai/wp-content/uploads/2021/05/image9-2.png', chance: 0.02 }, // 2% chance
        { url: 'https://64.media.tumblr.com/c7ac5679680acaaccc82e3d7b28e8d5a/f4539acb036fdffe-ec/s1280x1920/09d3c20c5e1b19a851b33e01a33a43ca2ac2d447.jpg', chance: 0.03 }, // 3% chance
        { url: 'https://riot-us.com/wp-content/uploads/2023/11/intro-1634607238.webp', chance: 0.009 },  // 3% chance
        { url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/11/mahito-episode-42.jpg', chance: 0.008 },  // 3% chance
        { url: 'https://wallpapers.com/images/featured/water-background-74ofenln6env6puh.jpg', chance: 0.007},  // 3% chance
        { url: 'https://cdn.mos.cms.futurecdn.net/my8AUCgUhKERqBBwdPQuXG.jpg', chance: 0.006},  // 3% chance
        { url: 'https://wallpapers-clan.com/wp-content/uploads/2024/04/jujutsu-kaisen-sukuna-pink-desktop-wallpaper-preview.jpg', chance: 0.005},  // 3% chance
        { url: 'https://i.pinimg.com/originals/3a/69/d9/3a69d932ba89af95d5ca154786b3f84a.png', chance: 0.004},  // 3% chance
        { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNq-BiMoRyAE8lK4dcLuME9hsKMtEpAX9Tw&s', chance: 0.003 },  // 3% chance
    ];

    let isCoolingDown = false; // Track if the button is in cooldown

    hatchButton.addEventListener('click', () => {
        if (isCoolingDown) {
            return; // Exit if button is in cooldown
        }

        clickSound.play(); // Play click sound

        isCoolingDown = true;
        hatchButton.style.backgroundColor = 'red'; // Change button color to red
        hatchButton.disabled = true; // Disable the button

        setTimeout(() => {
            hatchButton.style.backgroundColor = ''; // Reset button color
            hatchButton.disabled = false; // Enable the button
            isCoolingDown = false; // Reset cooldown state
        }, 1500); // 0.5 seconds cooldown

        // Calculate if a special background is unlocked
        const overallChance = Math.random();
        let accumulatedChance = 0;
        let unlockedBackground = null;

        for (const background of possibleBackgrounds) {
            accumulatedChance += background.chance;
            if (overallChance <= accumulatedChance) {
                unlockedBackground = background.url;
                break;
            }
        }

        if (unlockedBackground) {
            unlockSound.play(); // Play unlock sound

            // Get the current username
            const username = localStorage.getItem('username');
            if (username) {
                // Load existing backgrounds for the user
                let userBackgrounds = JSON.parse(localStorage.getItem(`backgrounds_${username}`)) || [];
                if (!userBackgrounds.includes(unlockedBackground)) {
                    userBackgrounds.push(unlockedBackground);
                    localStorage.setItem(`backgrounds_${username}`, JSON.stringify(userBackgrounds));
                }

                resultMessage.textContent = `You unlocked a special background`;
                localStorage.setItem('selectedBackground', unlockedBackground);
                document.body.style.backgroundImage = `url(${unlockedBackground})`; // Apply the background image
                document.body.style.backgroundSize = 'cover'; // Ensure the background covers the whole page
            }
        } else {
            const randomColor = getRandomRGBColor();
            resultMessage.textContent = `No background hatched. Here's a random color: ${randomColor}`;
            localStorage.setItem('selectedBackground', randomColor);
            document.body.style.backgroundColor = randomColor; // Apply the random color to the background
        }
    });

    function getRandomRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
});

function applyBackgroundColor(color) {
    console.log('Applying background color:', color); // Debug log
    if (isValidHex(color)) {
        document.body.style.backgroundColor = color;
    } else {
        console.error('Invalid color:', color); // Error log
    }
}

function isValidHex(hex) {
    return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

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

    // Apply the selected background if exists
    const selectedBackground = localStorage.getItem('selectedBackground');
    if (selectedBackground) {
        if (selectedBackground.startsWith('rgb')) {
            document.body.style.backgroundColor = selectedBackground; // Apply the random color
        } else {
            document.body.style.backgroundImage = `url(${selectedBackground})`; // Apply the image
            document.body.style.backgroundSize = 'cover'; // Ensure the background covers the whole page
        }
    }
}

document.addEventListener('DOMContentLoaded', applyPreferences);


function goBack() {
    window.location.href = 'babank.html';
}