const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(keyElement) {
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 150);

    // This creates a "Crazy" electronic piano sound without needing MP3 files!
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; // Piano-like soft tone
    
    // Map of keys to Frequencies (Hz)
    const frequencies = {
        'A': 261.6, 'W': 277.2, 'S': 293.7, 'E': 311.1, 'D': 329.6,
        'F': 349.2, 'T': 370.0, 'G': 392.0, 'Y': 415.3, 'H': 440.0,
        'U': 466.2, 'J': 493.9
    };

    const keyLabel = keyElement.getAttribute('data-key');
    oscillator.frequency.setValueAtTime(frequencies[keyLabel], audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Fade out effect (Professional touch)
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}
