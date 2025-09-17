class GameCore {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.players = [];
        this.keys = {};
        this.lastUpdateTime = 0;
        this.frameRate = 60;

        // Health bar dimensions and position
        this.healthBarWidth = 300;
        this.healthBarHeight = 30;
        this.healthBarOffsetY = 20; // Distance from top of canvas

        // Health bar images for player 1 and 2 (optional)
        this.healthBarImage1 = null;  // Image to overlay on Player 1's health bar
        this.healthBarImage2 = null;  // Image to overlay on Player 2's health bar

        // Image positioning and sizing options (optional)
        this.healthBarImage1Pos = { x: 0, y: 0, width: this.healthBarWidth, height: this.healthBarHeight };
        this.healthBarImage2Pos = { x: 0, y: 0, width: this.healthBarWidth, height: this.healthBarHeight };

        // Background image (optional)
        this.backgroundImage = null; // This will hold the background image

        // Leaf properties
        this.leaves = [];
        this.leafArea = { x: 0, y: 0, width: this.canvas.width, height: this.canvas.height }; // Area where leaves will fall
        this.leafSize = { min: 5, max: 15 }; // Minimum and maximum leaf size
        this.leafSpeed = { min: 1, max: 3 }; // Speed range of falling leaves
        this.leafImage = null; // Default leaf image

        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    addPlayer(player) {
        this.players.push(player);
    }

    update(deltaTime) {
        this.players.forEach(player => player.update(this.keys, deltaTime));
        this.updateLeaves(deltaTime);
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background image if available
        if (this.backgroundImage) {
            this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);  // Fill the whole canvas with background
        }

        // Draw leaves
        this.drawLeaves();

        // Draw health bars
        this.drawHealthBar(1);
        this.drawHealthBar(2);

        // Draw players
        this.players.forEach(player => player.draw(this.context));
    }

    // Add a new falling leaf with a random image
    addLeaf() {
        if (this.leafImages.length > 0) {  // Check if images are loaded
            const leaf = {
                x: Math.random() * this.leafArea.width + this.leafArea.x,
                y: this.leafArea.y,
                size: Math.random() * (this.leafSize.max - this.leafSize.min) + this.leafSize.min,
                speed: Math.random() * (this.leafSpeed.max - this.leafSpeed.min) + this.leafSpeed.min,
                rotation: Math.random() * 360, // Random rotation for some variety
                image: this.getRandomLeafImage(), // Assign a random leaf image
            };
            this.leaves.push(leaf);
        }
    }

    // Get a random leaf image from the leaf images array
    getRandomLeafImage() {
        const randomIndex = Math.floor(Math.random() * this.leafImages.length);
        return this.leafImages[randomIndex];
    }

    // Update leaf positions
    updateLeaves(deltaTime) {
        // Remove leaves that have fallen off-screen
        this.leaves = this.leaves.filter(leaf => leaf.y < this.canvas.height);

        // Update position for each leaf
        this.leaves.forEach(leaf => {
            leaf.y += leaf.speed * deltaTime; // Make leaves fall
            leaf.rotation += 0.5; // Rotate leaves slightly
        });
    }

    // Draw all leaves
    drawLeaves() {
        this.leaves.forEach(leaf => {
            this.context.save();
            this.context.translate(leaf.x, leaf.y);
            this.context.rotate(leaf.rotation * Math.PI / 180); // Apply rotation

            if (this.leafImage) {
                // Use the custom leaf image
                this.context.drawImage(this.leafImage, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size); // Center the image
            } else {
                // Draw the leaf as a circle (can be replaced with image or shape)
                this.context.beginPath();
                this.context.arc(0, 0, leaf.size, 0, 2 * Math.PI); 
                this.context.fillStyle = "green"; // Leaf color, can be customized or made dynamic
                this.context.fill();
            }

            this.context.restore();
        });
    }

    drawHealthBar(playerNumber) {
        const player = this.players[playerNumber - 1]; // Player 1 or Player 2
        const barX = playerNumber === 1 ? (this.canvas.width / 2 - this.healthBarWidth / 2 - 450) : (this.canvas.width / 2 - this.healthBarWidth / 2 + 450);
        const healthPercent = player.health / player.maxHealth;

        // Calculate the color based on health percentage (from green to red)
        const red = Math.floor((1 - healthPercent) * 255); // Red increases as health decreases
        const green = Math.floor(healthPercent * 255);     // Green decreases as health decreases
        const color = `rgb(${red}, ${green}, 0)`; // RGB format

        // Draw health bar background
        this.context.fillStyle = "#23cd30";
        this.context.fillRect(barX, this.healthBarOffsetY, this.healthBarWidth, this.healthBarHeight);

        // Draw health bar foreground with dynamic color
        this.context.fillStyle = color;
        this.context.fillRect(barX, this.healthBarOffsetY, this.healthBarWidth * healthPercent, this.healthBarHeight);

        // Overlay health bar image if available
        if (playerNumber === 1 && this.healthBarImage1) {
            const { x, y, width, height } = this.healthBarImage1Pos;
            this.context.drawImage(this.healthBarImage1, barX + x, this.healthBarOffsetY + y, width, height);
        } else if (playerNumber === 2 && this.healthBarImage2) {
            const { x, y, width, height } = this.healthBarImage2Pos;
            this.context.drawImage(this.healthBarImage2, barX + x, this.healthBarOffsetY + y, width, height);
        }

        // Draw player label text
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "18px Arial";
        this.context.textAlign = "center";
        this.context.fillText(`Player ${playerNumber}`, barX + this.healthBarWidth / 2, this.healthBarOffsetY - 10);
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = timestamp;

        this.update(deltaTime);
        this.draw();

        setTimeout(() => {
            requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / this.frameRate);
    }

    start() {
        this.lastUpdateTime = performance.now();
        this.gameLoop(this.lastUpdateTime);
    }

    takeHealth(playerNumber, amount) {
        const player = this.players[playerNumber - 1];
        player.health -= amount;
        if (player.health < 0) player.health = 0;
    }

    // Set custom health bar images (optional) with position and size
    setHealthBarImage(playerNumber, imageUrl, posX = 0, posY = 0, width = this.healthBarWidth, height = this.healthBarHeight) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            if (playerNumber === 1) {
                this.healthBarImage1 = img;
                this.healthBarImage1Pos = { x: posX, y: posY, width: width, height: height };
            } else if (playerNumber === 2) {
                this.healthBarImage2 = img;
                this.healthBarImage2Pos = { x: posX, y: posY, width: width, height: height };
            }
        };
    }

    // Set custom background image (optional)
    setBackgroundImage(imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            this.backgroundImage = img;
        };
    }

    // Set the area where leaves fall
    setLeafArea(x, y, width, height) {
        this.leafArea = { x, y, width, height };
    }

    // Set the size range for the leaves
    setLeafSize(minSize, maxSize) {
        this.leafSize = { min: minSize, max: maxSize };
    }

    // Set the speed range for the leaves
    setLeafSpeed(minSpeed, maxSpeed) {
        this.leafSpeed = { min: minSpeed, max: maxSpeed };
    }

    // Set custom leaf images
    setLeafImages(imageUrls) {
        this.leafImages = [];
        let imagesLoaded = 0;  // Counter for loaded images
    
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            
            img.onload = () => {
                this.leafImages.push(img);
                imagesLoaded++;
    
                // Once all images are loaded, you can start adding leaves
                if (imagesLoaded === imageUrls.length) {
                    this.startAddingLeaves();  // Start adding leaves once images are ready
                }
            };
        });
    }
    
    // Helper method to add leaves after images are loaded
    startAddingLeaves() {
        setInterval(() => {
            this.addLeaf();  // Continuously add leaves after images are loaded
        }, 1000); // Adjust time between leaf additions if needed
    }
}