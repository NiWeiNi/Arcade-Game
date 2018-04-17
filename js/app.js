// Canvas width, height and other references
const canvasWidth = Number(document.querySelector("canvas").getAttribute("width"));
const canvasHeight = Number(document.querySelector("canvas").getAttribute("height"));

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
        if (player.x < this.x + 75 && player.x + 65 > this.x && player.y < this.y + 50 && player.y + 70 > this.y) {
            player.x = 200;
            player.y = 400;
            squashed.render(this.x, this.y);
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// class squashed
class Squashed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "img/Star.png";
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

const squashed = new Squashed();

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
    update() {
        if (this.x > 402) 
            this.x = 402;
        if (this.x < 0)
            this.x = 0;
        if (this.y > 400)
            this.y = 400;
        if (this.y < 30) {
            this.y = 400;
            this.x = 200;
            this.getPoints();
            document.querySelector(".score").textContent = this.score;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
for (let i = 0; i < 6; i++) {
    const enemy = new Enemy(Math.floor(Math.random()), Array(63, 146, 229)[Math.floor(Math.random() * 3)] , 50 + Math.random() * 100);
    allEnemies.push(enemy);
}

const player = new Player(200, 400);
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
