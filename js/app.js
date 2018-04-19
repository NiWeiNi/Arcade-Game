// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'img/Rock.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = 1;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 120;
        this.score = "";
        this.sprite = "img/char-boy.png"
    }
    update(dt) {
        if (this.x > 402) 
            this.x = 402;
        if (this.x < 0)
            this.x = 0;
        if (this.y > 402)
            this.y = 402;
        if (this.y < 30) {
            this.y = 402;
            this.x = 200;
            this.getPoints();
            document.querySelector(".score").textContent = this.score;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Method to add points 
    getPoints() {
        this.score += "*";
    }
    handleInput(keyPress) {
        switch (keyPress) {
            case "up":
                this.y -= 84;
                break;
            case "down":
                this.y += 84;
                break;
            case "left":
                this.x -= 101;
                break;
            case "right":
                this.x += 101;
                break;
        }
    }
}

// Class squashed, when player gets hit
class Squashed {
    constructor() {
        this.x = player.x;
        this.y = player.y;
        this.hospital = "";
        this.sprite = "img/char-boy-down.png";
    }
    getPoints() {
        this.hospital += "*";
    }
    update() {
        this.x = player.x;
        this.y = player.y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the squashed player in a variable called squashed
const allEnemies = [];
for (let i = 0; i < 6; i++) {
    const enemy = new Enemy(Math.floor(Math.random()), Array(63, 146, 229)[Math.floor(Math.random() * 3)] , 50 + Math.random() * 100);
    allEnemies.push(enemy);
}
const player = new Player(200, 400);
const squashed = new Squashed();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});