document.addEventListener('DOMContentLoaded', () => {
    const backgroundsContainer = document.getElementById('backgroundsContainer');

    // Array of possible backgrounds
    const possibleBackgrounds = [
        { url: 'https://img.freepik.com/free-vector/pride-gradient-1_78370-282.jpg', chance: 0.01 }, // 1% chance
        { url: 'https://removal.ai/wp-content/uploads/2021/05/image9-2.png', chance: 0.02 }, // 2% chance
        { url: 'https://64.media.tumblr.com/c7ac5679680acaaccc82e3d7b28e8d5a/f4539acb036fdffe-ec/s1280x1920/09d3c20c5e1b19a851b33e01a33a43ca2ac2d447.jpg', chance: 0.03 }, // 3% chance
        { url: 'https://riot-us.com/wp-content/uploads/2023/11/intro-1634607238.webp', chance: 0.009 }, // 0.9% chance
        { url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/11/mahito-episode-42.jpg', chance: 0.008 }, // 0.8% chance
        { url: 'https://wallpapers.com/images/featured/water-background-74ofenln6env6puh.jpg', chance: 0.007 }, // 0.7% chance
        { url: 'https://cdn.mos.cms.futurecdn.net/my8AUCgUhKERqBBwdPQuXG.jpg', chance: 0.006 }, // 0.6% chance
        { url: 'https://wallpapers-clan.com/wp-content/uploads/2024/04/jujutsu-kaisen-sukuna-pink-desktop-wallpaper-preview.jpg', chance: 0.005 }, // 0.5% chance
        { url: 'https://i.pinimg.com/originals/3a/69/d9/3a69d932ba89af95d5ca154786b3f84a.png', chance: 0.004 }, // 0.4% chance
        { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNq-BiMoRyAE8lK4dcLuME9hsKMtEpAX9Tw&s', chance: 0.003 } // 0.3% chance
    ];

    // Get the current username
    const username = localStorage.getItem('username');
    if (!username) {
        backgroundsContainer.textContent = 'Please log in to see your special backgrounds.';
        return;
    }

    // Load unlocked backgrounds for the user
    const unlockedBackgrounds = JSON.parse(localStorage.getItem(`backgrounds_${username}`)) || [];

    if (unlockedBackgrounds.length === 0) {
        backgroundsContainer.textContent = 'No special backgrounds unlocked yet.';
    } else {
        possibleBackgrounds.forEach(background => {
            if (unlockedBackgrounds.includes(background.url)) {
                const backgroundDiv = document.createElement('div');
                backgroundDiv.className = 'backgroundOption';
                backgroundDiv.style.backgroundImage = `url(${background.url})`;

                const selectButton = document.createElement('button');
                selectButton.textContent = 'Select';
                selectButton.className = 'selectButton';
                selectButton.addEventListener('click', () => {
                    localStorage.setItem('selectedBackground', background.url);
                    document.body.style.backgroundImage = `url(${background.url})`; // Apply background immediately
                    alert('Background selected! It will be applied across all pages.');
                });

                backgroundDiv.appendChild(selectButton);
                backgroundsContainer.appendChild(backgroundDiv);
            }
        });
    }
});

function goBack() {
    window.location.href = 'babank.html';
}