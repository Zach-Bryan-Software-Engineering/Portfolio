// Object to keep track of playing audio
const playingSounds = {};

function playSound(url, duration, volume = 1, loop = false, stop = false, fadeOutDuration = 1) {
    // Check if 'stop' is true and the sound is already playing
    if (stop && playingSounds[url]) {
        const audio = playingSounds[url];

        // Fade out the sound before stopping
        let currentVolume = audio.volume;
        const fadeOutInterval = setInterval(() => {
            if (currentVolume > 0) {
                currentVolume -= 0.05; // Decrease the volume gradually
                audio.volume = currentVolume;
            } else {
                // Stop the sound once it has faded out
                clearInterval(fadeOutInterval);
                audio.pause();
                audio.currentTime = 0; // Reset to the start of the sound
                delete playingSounds[url]; // Remove from the tracking object
            }
        }, fadeOutDuration * 1000 / 20); // Fade out in the specified duration (divided into 20 steps)

        return; // Exit the function after fading out
    }

    // Create a new Audio object if it's not stopping an existing sound
    const audio = new Audio(url);

    // Set the volume (default is 1, which is full volume)
    audio.volume = volume;

    // Set whether the sound should loop
    audio.loop = loop;

    // Play the sound
    audio.play();

    // If a duration is provided, stop the sound after the specified time
    if (duration) {
        setTimeout(() => {
            audio.pause(); // Stop the sound
            audio.currentTime = 0; // Reset to the start of the sound
            delete playingSounds[url]; // Remove from the tracking object
        }, duration * 1000); // Duration is in seconds, convert to milliseconds
    }

    // Track the playing audio
    playingSounds[url] = audio;
}