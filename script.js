window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.key[data-key="${e.key.toUpperCase()}"]`);
    if (!key) return;

    playNote(key);
});

function playNote(key) {
    key.classList.add('playing');
    
    // In a real app, you'd link to small .wav files for each note
    const audio = new Audio(`sounds/${key.dataset.key}.wav`);
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => key.classList.remove('playing'), 100);
}

