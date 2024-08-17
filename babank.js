document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const colorPicker = document.getElementById('colorPicker');
    const applyColorButton = document.getElementById('applyColorButton');
    const randomColorButton = document.getElementById('randomColorButton');
    const mobileModeButton = document.getElementById('mobileModeButton');
    const textSizeRange = document.getElementById('textSizeRange');
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
        colorPicker.value = savedColor; // Update color picker to reflect saved color
    } else {
        // Default light mode background color if no color is saved
        applyBackgroundColor('#35797b');
    }

    body.style.fontSize = savedTextSize; // Apply saved text size
    textSizeRange.value = parseInt(savedTextSize, 10); // Update slider to reflect saved text size

    if (savedMobileMode) {
        body.classList.add('mobile-mode');
    }

    // Log initial dark mode status
    console.log('Initial dark mode status:', body.classList.contains('dark-mode'));

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('mode', currentMode);
        updateButtonText(currentMode);
        applyBackgroundColor(localStorage.getItem('color') || '#35797b');

        // Log dark mode status on toggle
        console.log('Dark mode toggled. Current status:', body.classList.contains('dark-mode'));
    });

    mobileModeButton.addEventListener('click', () => {
        body.classList.toggle('mobile-mode');
        const isMobileMode = body.classList.contains('mobile-mode');
        localStorage.setItem('mobileMode', isMobileMode); // Save mobile mode status
    });

    applyColorButton.addEventListener('click', () => {
        const chosenColor = colorPicker.value;
        localStorage.setItem('color', chosenColor);
        applyBackgroundColor(chosenColor);
    });

    randomColorButton.addEventListener('click', () => {
        const randomColor = getRandomColor();
        colorPicker.value = randomColor; // Update color picker to reflect the random color
        applyBackgroundColor(randomColor);
        localStorage.setItem('color', randomColor); // Save the random color
    });

    textSizeRange.addEventListener('input', () => {
        const newSize = `${textSizeRange.value}px`;
        body.style.fontSize = newSize;
        localStorage.setItem('textSize', newSize); // Save the new text size
    });

    function applyBackgroundColor(color) {
        console.log('Applying background color:', color); // Debug log
        if (isValidHex(color)) {
            if (body.classList.contains('dark-mode')) {
                // Apply darkened color in dark mode
                const darkenedColor = darkenColor(color, 50); // Darken by 50%
                console.log('Dark mode active. Applying darkened color:', darkenedColor); // Debug log
                body.style.backgroundColor = darkenedColor;
            } else {
                // Apply color in light mode
                console.log('Light mode active. Applying color:', color); // Debug log
                body.style.backgroundColor = color;
            }
        } else {
            console.error('Invalid color:', color); // Error log
        }
    }

    function darkenColor(hex, percent) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.max(0, Math.min(255, r * (1 - percent / 100)));
        g = Math.max(0, Math.min(255, g * (1 - percent / 100)));
        b = Math.max(0, Math.min(255, b * (1 - percent / 100)));

        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function isValidHex(hex) {
        return /^#[0-9A-Fa-f]{6}$/.test(hex);
    }

    function updateButtonText(mode) {
        toggleButton.textContent = mode === 'dark-mode' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    }
});


function goBack() {
    window.history.back();
}
