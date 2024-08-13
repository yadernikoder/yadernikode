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

document.getElementById('openPageButton4').addEventListener('click', function() {
    window.location.href = 'translateindex.html'; // Replace 'newpage.html' with the path to your new HTML file
});

