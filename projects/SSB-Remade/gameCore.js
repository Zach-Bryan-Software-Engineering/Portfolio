class GameCore {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.players = [];
        this.keys = {};
        this.lastUpdateTime = 0;
        this.frameRate = 60;

        // Modular health system configuration
        this.healthBars = [];

        // Optional images for health bars and background
        this.healthBarImages = [];
        this.backgroundImage = null;

        window.addEventListener('keydown', (e) => (this.keys[e.key] = true));
        window.addEventListener('keyup', (e) => (this.keys[e.key] = false));
    }

    getCanvas() {
        return this.canvas; // Provide access to the canvas
    }

    addPlayer(player) {
        this.players.push(player);
    }

    update(deltaTime) {
        this.players.forEach((player) => player.update(this.keys, deltaTime));
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background image
        if (this.backgroundImage) {
            this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        }

        // Draw health bars
        this.healthBars.forEach((healthBar) => healthBar.draw(this.context));

        // Draw players
        this.players.forEach((player) => player.draw(this.context));
    }

    setBackgroundImage(imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            this.backgroundImage = img;
        };
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = timestamp;

        this.update(deltaTime);
        this.draw();

        setTimeout(() => requestAnimationFrame(this.gameLoop.bind(this)), 1000 / this.frameRate);
    }

    start() {
        this.lastUpdateTime = performance.now();
        this.gameLoop(this.lastUpdateTime);
    }
}