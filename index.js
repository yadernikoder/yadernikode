function login() {
    let username = document.getElementById("username")
    localStorage.setItem("username", username.value)
    location.href = "bank.html"
    let audio = new Audio("ADF.mp3");
    audio.play(); 
}
document.addEventListener("DOMContentLoaded", function() {
    const goToPage2Button = document.getElementById('goToPage2');
    const backToPage1Button = document.getElementById('backToPage1');

    if (goToPage2Button) {
        goToPage2Button.addEventListener('click', function() {
            window.location.href = 'page2.html';
        });
    }

    if (backToPage1Button) {
        backToPage1Button.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
