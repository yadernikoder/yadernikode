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

let usernameFromStorage = localStorage.getItem('username')

if (!usernameFromStorage) {
    location.href = 'index.html'
}

let title = document.getElementById('title')
title.innerHTML = 'welcome ' + usernameFromStorage

let total = 0
let amount = document.getElementById('amount')
let totalFromStorage = localStorage.getItem('total')

if (totalFromStorage) {
    total = Number(totalFromStorage)
    amount.innerHTML = total
}

function change(num) {
    total = total + num
    amount.innerHTML = total
    localStorage.setItem('total', total)
}
document.getElementById('openPageButton').addEventListener('click', function() {
    window.location.href = 'bindex.html'; // Replace 'newpage.html' with the path to your new HTML file
});
document.getElementById('openPageButton1').addEventListener('click', function() {
    window.location.href = 'bibindex.html'; // Replace 'newpage.html' with the path to your new HTML file
});
document.getElementById('openPageButton2').addEventListener('click', function() {
    window.location.href = 'BIBIBIndex.html'; // Replace 'newpage.html' with the path to your new HTML file
});

document.getElementById('openPageButton3').addEventListener('click', function() {
    window.location.href = 'BaBaBaBindex.html'; // Replace 'newpage.html' with the path to your new HTML file
});



function goBack2() {
    window.location.href = 'babank.html'; 
}

