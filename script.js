const keys = document.querySelectorAll('.key');

function playNote(keyElement) {
    const keyLabel = keyElement.getAttribute('data-key');
    
    // Visual Feedback
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 150);

    // Audio Logic
    // Make sure you have audio files named A.mp3, W.mp3, etc. in a 'sounds' folder
    const audio = new Audio(`sounds/${keyLabel}.mp3`);
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play blocked until user interacts."));
}

// 💻 Desktop Keyboard Support
window.addEventListener('keydown', (e) => {
    const code = e.key.toUpperCase();
    const key = document.querySelector(`.key[data-key="${code}"]`);
    if (key) playNote(key);
});

// 📱 Mobile & Mouse Support
keys.forEach(key => {
    // 'pointerdown' triggers immediately on touch or click
    key.addEventListener('pointerdown', (e) => {
        e.preventDefault(); // Prevents double-triggering
        playNote(key);
    });
});
