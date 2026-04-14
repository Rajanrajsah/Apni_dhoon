// 1. Setup Audio Context
let audioCtx;

// 2. The "Unlock" Logic
document.getElementById('start-btn').addEventListener('click', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    document.getElementById('start-screen').style.display = 'none';
    console.log("Audio Context Started!");
});

// 3. Frequency Map for Piano Keys
const frequencies = {
    'A': 261.63, 'W': 277.18, 'S': 293.66, 'E': 311.13, 'D': 329.63,
    'F': 349.23, 'T': 369.99, 'G': 392.00, 'Y': 415.30, 'H': 440.00,
    'U': 466.16, 'J': 493.88
};

function playNote(keyElement) {
    if (!audioCtx) return; // Wait for Start button

    const keyLabel = keyElement.getAttribute('data-key');
    if (!frequencies[keyLabel]) return;

    // Visual Animation
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 150);

    // Create Sound (The "Synthesizer")
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle'; // Smooth, piano-like tone
    osc.frequency.setValueAtTime(frequencies[keyLabel], audioCtx.currentTime);

    // Sound Envelope (Fade in and Fade out)
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05); // Vol up
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8); // Fade away

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
}

// 4. Input Listeners
window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.key[data-key="${e.key.toUpperCase()}"]`);
    if (key) playNote(key);
});

document.querySelectorAll('.key').forEach(key => {
    // pointerdown works for BOTH finger taps and mouse clicks
    key.addEventListener('pointerdown', (e) => {
        e.preventDefault(); 
        playNote(key);
    });
});
