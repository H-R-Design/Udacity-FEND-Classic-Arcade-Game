// Enemies our player must avoid
/*the Enemy class (the bugs) has a 
1. constructor that holds the properties for the enemy object
2. an update() and render() method
*/
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        //setting the speed of the enemy motion 
        // the x position of the enemy = its position + its speed times dt//
        this.x += this.speed * dt;
        //if the enemy is positioned beyond 510 on the x-axis (beyond the canvas width) then replicate it to -50 on the x-axis.
        if(this.x >510){
            this.x = -50;
            //speed + shuffle function to randomise speed for each enemy instance.
            this.speed= 100 + Math.floor(Math.random () * 200);
        }
        //check for collision
        // 80 allows for the width of the enemy object and 55 allows for the height of the enemy 
        //if the player is on the same x or y axis as the enemy (+ its width and height), the player is reset to its original x & y.
        if (player.x < this.x + 80 && 
            player.x +80 > this.x &&
            player.y< this.y +55 &&
            player.y +55>this.y ){
            player.x = 202;
            player.y= 405;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
/*the Player class has a 
1. constructor that holds the properties for the player object
2. an update(), reset(), handleInput() and render() method
*/
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    update() {
    }
    reset() {
        this.x = x;
        this.y = y;
    }
    // Allows the player to move using the arrow keys. 
    handleInput(keyPress) {
        /*if the left arrow is pressed on the keyboard and the player's x position is greater than 0 (in the canvas)
        then allow movement negative 105 (a whole block) on the x axis (left)*/
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 105;
        }
        /*if the right arrow is pressed on the keyboard and the player's x position is less than 405 (in the canvas)
        then allow movement positive 105 (a whole block) on the x axis (right)*/
        if (keyPress == 'right' && this.x < 405) {
            this.x += 105;
        }
        /*if the up arrow is pressed on the keyboard and the player's y position is greater than 0 (in the canvas)
        then allow movement negative 83 (a whole block) on the y axis (upwards)*/
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        }
        /*if the down arrow is pressed on the keyboard and the player's y position is less than 405 (in the canvas)
        then allow movement positive 83 (a whole block) on the y axis (downwards)*/
        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
        }
        //once the player is in the water, reset to starting position - after a 0.5 seconds 
        if (this.y < 0) {
            //once player has reached the water they are shown a well done modal and can play again.
            showModal()
            setTimeout(function () {
                player.x = 202;
                player.y = 405;
            }, 500);
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//new variable allEnemies holds and array of enemy objects  
const allEnemies =[] ;
// set the locations for the enemy objects to row 2, 3 &4
const enemyLocation = [63, 147, 230];
// player variable holds a new player object and places it on the bottom row in the centre of the canvas. 
const player = new Player ( 202, 405);

/*each new instance of the enemy object starts at x=0 the Y location as stated in the enemyLocation array, with a starting speed of 200.
after this the Enemy.update() method randomises the speed.  
*/
enemyLocation.forEach(function (locationY){
    enemy= new Enemy (0, locationY, 250);
    allEnemies.push(enemy);
});
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Well done modal is displayed once the game is finished:
const modal= document.getElementById('simple-modal');
const closeBtn= document.getElementsByClassName('closeBtn')[0];
const playAgain = document.getElementsByClassName('play-again')[0];

function showModal(){
    modal.style.display='block';
}
playAgain.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function closeModal(){
    modal.style.display='none';
}
function outsideClick(){
    if (event.target == modal){
        modal.style.display='none';
    }
}