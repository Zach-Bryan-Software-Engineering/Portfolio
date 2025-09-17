// Function to create and animate an image element
function createKillImage(imageUrl) {
    // Create a new image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.position = 'fixed';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%) scale(0)';
    img.style.transition = 'transform 1s ease, opacity 0.5s ease';
    img.style.opacity = '1';
    img.style.zIndex = '1000';

    // Append the image to the body
    document.body.appendChild(img);

    // Trigger the scaling animation
    requestAnimationFrame(() => {
        img.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Set a timeout to remove the image after the animation
    setTimeout(() => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.remove();
        }, 500); // Allow time for the fade-out transition
    }, 1000); // Wait for the scaling animation to complete
}

// Example usage
// createKillImage('path/to/your/image.png');