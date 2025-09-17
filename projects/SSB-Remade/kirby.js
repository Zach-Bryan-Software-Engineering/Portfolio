class Kirby {
    constructor(x, y, leftKey, rightKey, jumpKey, playerNumber, move1key, move2key, move3key) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.color = 'blue';
        this.speed = 400;
        this.jumpStrength = 300;
        this.isJumping = false;
        this.velocityY = 0;
        this.facingLeft = false;

        this.controls = { left: leftKey, right: rightKey, jump: jumpKey, move1: move1key, move2: move2key, move3: move3key};

        this.playerNumber = playerNumber; // Assign player number during instantiation

        this.state = 'resting'; // Default state
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameSpeed = 10;

        this.animations = {
            resting: { 
                src: 'https://codehs.com/uploads/b94236db4b6e2ceeb93795732932ba85', 
                frameCount: 4, 
                frameWidth: 125, 
                frameHeight: 110, 
                frameSpeed: 10,
                offsetX: 0
            },
            running: { 
                src: 'https://codehs.com/uploads/364202ae0e0ffd4662d6dd0879d7a62d', 
                frameCount: 4, 
                frameWidth: 125,
                frameHeight: 110, 
                frameSpeed: 10,
                offsetX: 0 
            },
            jumping: { 
                src: 'https://codehs.com/uploads/98d961a55e56fd0b43f6e4b0f3505b74', 
                frameCount: 8, 
                frameWidth: 125, 
                frameHeight: 110, 
                frameSpeed: 12,
                offsetX: 0
            },
            moving1: { 
                src: 'https://codehs.com/uploads/b550f4247f7a184c6abc2ffe4c24a7af', 
                frameCount: 3, 
                frameWidth: 125, 
                frameHeight: 220, 
                frameSpeed: 10,
                offsetX: 10
            },
            moving2: { 
                src: 'https://codehs.com/uploads/cc8e9e63e35727a054b72bf29b50bee5', 
                frameCount: 5, 
                frameWidth: 125, 
                frameHeight: 110, 
                frameSpeed: 5,
                offsetX: -10
            },
            moving3Part1: { 
                src: 'https://codehs.com/uploads/485318f7b9b0cff587e5aaa68965f765', 
                frameCount: 7, 
                frameWidth: 125, 
                frameHeight: 110, 
                frameSpeed: 3,
                offsetX: 0
            },
            moving3Part2: { 
                src: 'https://codehs.com/uploads/114aeb6a4301605124a63bd522c7a856', 
                frameCount: 4, 
                frameWidth: 52, 
                frameHeight: 50, 
                frameSpeed: 5,
                offsetX: 0,
            },
        };
        this.sprite = new Image();
        this.sprite.src = this.animations.resting.src;

        this.platforms = [
            { x: 200, y: 430, width: 1000, height: 20 },
            { x: 320, y: 260, width: 170, height: 20 },
            { x: 930, y: 260, width: 160, height: 20 },
            { x: 620, y: 98, width: 170, height: 20 }
        ];
        this.previousHealth = checkHealth(this.playerNumber); // Initialize with current health
        this.redOverlay = new Image();
        this.redOverlay.src = 'https://codehs.com/uploads/99cab86d6ddccd8cf733917c7c860ed8'; // Replace with a red-tinted version of the sprite
        this.isRedOverlayActive = false; // Track if the overlay is active
        this.jumpCount = 0; // Track number of jumps (max 2)
        this.jumpCooldown = 0; // Cooldown time for jumps
        this.amountOfLifes = 3;
        this.move1CoolDown = 0;
        this.move2CoolDown = 0;
        this.move3CoolDown = 0;
        this.currentlyInMove = false;
        this.stateLock = false; // Lock to prevent state changes during locked actions
    }

    update(keys, deltaTime) {
        const gravity = 500;

        // Prevent state changes if locked
        if (this.stateLock && this.state !== 'moving1' && this.state !== 'moving2' && this.state !== 'moving3Part1' && this.state !== 'moving3Part2') return;

        // Handle movement
        if (keys[this.controls.left] && !this.stateLock) {
            this.x -= this.speed * deltaTime;
            if (!this.isJumping) {
                if (this.state !== 'moving3Part1' && this.state !== 'moving2') {
                    this.state = 'running'; // Ensure running animation while grounded
                }
            }
            this.facingLeft = true;
        } else if (keys[this.controls.right] && !this.stateLock) {
            this.x += this.speed * deltaTime;
            if (!this.isJumping) {
                if (this.state !== 'moving3Part1' && this.state !== 'moving2') {
                    this.state = 'running'; // Ensure running animation while grounded
                }
            }
            this.facingLeft = false;
        } else if (this.state !== 'jumping' && !this.isJumping && !this.stateLock) {
            if (this.state !== 'moving3Part1' && this.state !== 'moving2') {
                this.state = 'resting'; // Ensure running animation while grounded
            }
        }

        // Handle jumping with cooldown and double jump
        if (keys[this.controls.jump] && this.jumpCooldown <= 0 && !this.stateLock) {
            if (this.jumpCount < 2 || (this.jumpCount === 1 && this.isJumping)) {
                this.isJumping = true;
                this.velocityY = -this.jumpStrength;
                if (this.state !== 'moving3Part1' && this.state !=='moving2') {
                    this.state = 'jumping';
                }
                this.jumpCount++; // Increment jump count
                this.jumpCooldown = 0.4; // 0.4 seconds cooldown
            }
        }

        // Check if health reaches zero
        if (checkHealth(this.playerNumber) <= 0) {
            console.log("dead");
            this.amountOfLifes -= 1;
            createKillImage('https://codehs.com/uploads/db85518de1bb03d982c2b18c7d3eee18');
            takeHealth(this.playerNumber, -300, healthBars);
            this.x = 650;
            this.y = 300;
            
            if (this.amountOfLifes === 0) {
                const oppositePlayerNumber = this.playerNumber === 1 ? 2 : 1;
                
                const character = this.playerNumber === 1 ? characterName2 : characterName1;
                console.log(character)
                createPlayerScreen(oppositePlayerNumber, 1, character);
                console.log("GAME OVER");
            }
        }
        // Check if health has changed
        const currentHealth = checkHealth(this.playerNumber);
        if (currentHealth !== this.previousHealth) {
            this.isRedOverlayActive = true; // Enable red overlay
            setTimeout(() => {
                this.isRedOverlayActive = false; // Disable red overlay after 1 second
            }, 1000); // 1 second delay
        }
        this.previousHealth = currentHealth; // Update previous health

        // Main shooting logic
        if (keys[this.controls.move1] && !this.stateLock && this.currentlyInMove === false) {
            if (this.move1CoolDown === 0) {
                this.currentlyInMove = true;
                this.state = 'moving1';
                this.stateLock = true; // Lock state changes
                this.move1CoolDown = 1;
               
                // Fire the projectile

                // Release lock and reset cooldown after 2 seconds
                setTimeout(() => {
                    this.stateLock = false; // Unlock state changes
                    const direction = this.facingLeft ? -1 : 1;
                    superKick(this.playerNumber, direction);
                }, 250); // 2000ms = 2 seconds
               
                setTimeout(() => {
                    this.state = 'resting'; // Reset to resting after action
                    const direction = this.facingLeft ? -1 : 1;
                    
                    this.currentlyInMove = false;
                }, 500); // 2000ms = 2 seconds
                setTimeout(() => {
                    this.move1CoolDown = 0;
                }, 2000); // 2000ms = 2 seconds
            }
        }
        //  shooting logic
        if (keys[this.controls.move2] && !this.stateLock && this.currentlyInMove === false) {
            if (this.move2CoolDown === 0) {
                this.currentlyInMove = true;
                this.state = 'moving2';
                this.stateLock = false; // Lock state changes
                this.move2CoolDown = 1;
                playSound('https://codehs.com/uploads/4a0db683bafc2ada70f048fca46aab98', 4, .2, false);
                // Fire the projectile
                this.speed = 250;
                // Release lock and reset cooldown after 2 seconds
                setTimeout(() => {
                    this.stateLock = false; // Unlock state changes
                }, 250); // 2000ms = 2 seconds'
                const interval = setInterval(() => {
                    const direction = this.facingLeft ? -1 : 1;
                    inverseFan(this.playerNumber, direction);
                    
                }, 100);
            
                // Stop the interval after 7000ms (7 seconds)
                setTimeout(() => {
                    clearInterval(interval);
                    
                }, 4000);
                
                setTimeout(() => {
                    this.state = 'resting'; // Reset to resting after action
                    const direction = this.facingLeft ? -1 : 1;
                   
                    this.currentlyInMove = false;
                    this.speed = 400;
                }, 4500); // 2000ms = 2 seconds
                setTimeout(() => {
                    this.move2CoolDown = 0;
                }, 6000); // 2000ms = 2 seconds
            }
        }
        //  shooting logic
        if (keys[this.controls.move3] && !this.stateLock && this.currentlyInMove === false) {
            if (this.move3CoolDown === 0) {
                this.currentlyInMove = true;
                this.state = 'moving3Part1';
                this.stateLock = false; // Lock state changes
                this.move3CoolDown = 1;
                playSound('https://codehs.com/uploads/0aced71049fe2caaa15cc5a8329d78d4', 7, .2, false);
                // Fire the projectile
                this.speed = 250;
                // Release lock and reset cooldown after 2 seconds
                setTimeout(() => {
                    this.stateLock = false; // Unlock state changes
                }, 250); // 2000ms = 2 seconds'
                const interval = setInterval(() => {
                    const direction = this.facingLeft ? -1 : 1;
                    tornado(this.playerNumber, direction);
                    
                }, 100);
            
                // Stop the interval after 7000ms (7 seconds)
                setTimeout(() => {
                    clearInterval(interval);
                    
                }, 7000);
                
                setTimeout(() => {
                    this.state = 'resting'; // Reset to resting after action
                    const direction = this.facingLeft ? -1 : 1;
                   
                    this.currentlyInMove = false;
                    this.speed = 400;
                }, 7000); // 2000ms = 2 seconds
                setTimeout(() => {
                    this.move3CoolDown = 0;
                }, 10000); // 2000ms = 2 seconds
            }
        }
        if (beganKnockBack === 1 && playerNumberForKnockBack === this.playerNumber) {
            beganKnockBack = 0;
            const targetX = this.x + distanceKnockBackX; // Assuming distanceKnockBack is an object with x and y properties
            const targetY = this.y + distanceKnockBackY; // Same for the Y-axis
            const knockbackDuration = 0.1; // Duration in seconds for smooth movement
            const startX = this.x;
            const startY = this.y;
            const startTime = performance.now();
        
            // Animate the knockback movement smoothly
            const animateKnockback = () => {
                const elapsedTime = (performance.now() - startTime) / 1000; // in seconds
                const progress = Math.min(elapsedTime / knockbackDuration, 1);
                
                this.x = startX + (targetX - startX) * progress;
                this.y = startY + (targetY - startY) * progress;
        
                // Continue the animation until the knockback duration is over
                if (progress < 1) {
                    requestAnimationFrame(animateKnockback);
                }
            };
        
            // Start the animation
            animateKnockback();
        }
        

        
        currentPos(this.playerNumber, this.x, this.y); // Save position for player

        // Apply gravity
        this.velocityY += gravity * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check collision with platforms
        let isGrounded = false;
        this.platforms.forEach(platform => {
            if (
                this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y + this.height >= platform.y &&
                this.y + this.height <= platform.y + platform.height
            ) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isJumping = false;
                if (this.state === 'jumping') {
                    if (this.state !== 'moving3Part1' && this.state !== 'moving2') {
                        this.state = 'resting'; // Ensure running animation while grounded
                    }
                }
                this.jumpCount = 0;
                this.jumpCooldown = 0;
                isGrounded = true;
            }
        });


       
        if (!isGrounded && this.y + this.height >= 900) {
            this.y = 900 - this.height;
            takeHealth(this.playerNumber, 100, healthBars);
            this.velocityY = 0;
            this.isJumping = false;
            this.jumpCount = 0;
            this.jumpCooldown = 0;
        }

        // Update jump cooldown
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= deltaTime;
        }

        // Update sprite for the current state
        this.sprite.src = this.animations[this.state].src;

        // Update frame based on state
        const currentAnimation = this.animations[this.state];
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
            this.frameIndex = (this.frameIndex + 1) % currentAnimation.frameCount;
            this.frameTimer = 0;
        }
    }

    draw(context) {

        const animation = this.animations[this.state];
        const spriteWidth = animation.frameWidth;
        const spriteHeight = animation.frameHeight;
    
        context.save();
    
        // Flip horizontally if facing left
        if (this.facingLeft) {
            context.scale(-1, 1);
        } 
        
    
        // Draw the regular sprite
        context.drawImage(
            this.sprite,
            this.frameIndex * spriteWidth + animation.offsetX,
            0,
            spriteWidth,
            spriteHeight,
            this.facingLeft ? -this.x - this.width : this.x, // Handle horizontal flipping
            this.y,
            this.width,
            this.height
        );
    
        // If the red overlay is active, draw it over the sprite
        if (this.isRedOverlayActive) {
            context.drawImage(
                this.redOverlay,
                this.facingLeft ? -this.x - this.width : this.x, // Handle horizontal flipping
                this.y,
                this.width,
                this.height
            );
        }
    
        context.restore();
    
        // Draw player number text above the sprite
        context.save();
        context.fillStyle = 'white'; // Set text color
        context.font = '20px Arial'; // Set font size and style
        context.textAlign = 'center'; // Align text to the center
        const textX = this.x + this.width / 2; // Center text above the sprite
        const textY = this.y - 10; // Position text slightly above the sprite
        const playerText = this.playerNumber === 1 ? 'PLAYER 1' : 'PLAYER 2';
        context.fillText(playerText, textX, textY);
        context.restore();
    
        // Draw platforms (optional, for debug)
        this.platforms.forEach(platform => {
            context.fillStyle = 'transparent';
            context.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
    }
}