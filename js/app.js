// Enemies our player must avoid
class Enemy {
    constructor() {
        const x = Math.floor(Math.random());
        const stoneRows = [60, 145, 234];
        const y = stoneRows[Math.floor(Math.random() * 3)];
        const speed = 50 + Math.random() * 100;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'img/Rock.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = 1;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'img/Rock.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        const speed = 100;
        const x = 200;
        const y = 400;
        this.x = x;
        this.y = y;
        this.speed = speed;
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
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keyPress) {
        switch (keyPress) {
            case "up":
                this.y -= 83;
                break;
            case "down":
                this.y += 83;
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
    const enemy = new Enemy;
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
