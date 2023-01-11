// link to HTML elements and set canvas as 2D

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const h1 = document.getElementById("gameover");

class Player {
    constructor(x, y, color, direction, key) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.startX = x;
        this.startY = y;
        // track current state of player
        this.alive = true;
        this.direction = direction;
        this.key = key;

        this.constructor.counter = (this.constructor.counter || 0) + 1;
        this.id = this.constructor.counter;

        Player.allInstances.push(this);
    }   
}

Player.allInstances = [];

// create a subclass for 2 players

let player1 = new Player(50, 50, "yellow", "", "");
let player2 = new Player(440, 440, "fuchsia", "", "");

/* switch/if statements for each player's controls/direction (up, down, left, right)
    open with a function, setDirection. The controls will be different for each player
*/



// event listener to listen for keys being pressed



// set the size of each box in canvas and the size of the grid

const box = 20;
canvas.height = 32 * box;
canvas.width = 32 * box;

// set an array for the snake

let yellow = [];
yellow[0] = {
    x: 7 * box,
    y: 15 * box,
}

// declare a variable for the direction of the snake

let direction;

// create a variable for the food element

let pink = [];
pink[0] = {
    x: 24 * box,
    y: 15 * box,
}

// declare a variable for the score (0)

let score = 0;

function setDirection(player, up, down, left, right, currentKey) {
    Player.direction = currentKey;
    switch (currentKey) {
        case up:
            if (Player.direction !== 'down') {
                player.key = 'up';
            }
            console.log(setDirection.up)
            console.log(Player.direction)
            console.log(Player.key)
            break;
        case down:
            if (Player.direction !== 'up') {
                Player.key = 'down';
            }
            console.log(Player.direction)
            console.log(Player.key)
            break;
        case left:
            if (Player.direction !== 'right') {
                Player.key = 'left';
            }
            break;
        case right:
            if (Player.direction !== 'left') {
                Player.key = 'right';
            }
            break;
            default:
            break;
    };
};

document.addEventListener('keydown', function(event) {
    let currentKey = event.keyCode;
    event.preventDefault();
    setDirection(player1, 38, 40, 37, 39, currentKey);
    setDirection(player2, 87, 65, 83, 68, currentKey);
    // console.log(currentKey)
});

// document.addEventListener('keydown', function(e) {
//     let key = e.keyCode
//     if(key === 37 && direction != 'right'){
//         direction = 'left'
//     } else if( key == 38 && direction != 'down'){
//         direction = 'up'
//     } else if(key == 39 && direction != 'left'){
//         direction = 'right'
//     } else if(key == 40 && direction != 'up'){
//         direction = 'down'
//     }
// })

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true
        }
    }
    return false
}

// function for the game

function game(){

// setInterval function. Game executes everything within the function at a set interval

    let draw = setInterval(function() {

// initialise the 'clearRect' function

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score} Johnny Points!`, 10, 30);

// for loop
        
        for(let i = 0; i < yellow.length ; i++){
            ctx.fillStyle = "yellow";
            ctx.fillRect(yellow[i].x, yellow[i].y, box, box);
        }

        for(let i = 0; i < pink.length ; i++){
            ctx.fillStyle = "fuchsia";
            ctx.fillRect(pink[i].x, pink[i].y, box, box);
        }

        // ctx.fillStyle = "fuchsia"
        // ctx.fillRect(food.x, food.y, box, box)

        let yellowX = yellow[0].x;
        let yellowY = yellow[0].y;
        let pinkX = pink[0].x;
        let pinkY = pink[0].y;

        if( Player.key == 'left') yellowX -= box;
        if( Player.key == 'up') yellowY -= box;
        if( Player.key == 'right') yellowX += box;
        if( Player.key == 'down') yellowY += box;
        if( Player.key == 'left') pinkX -= box;
        if( Player.key == 'up') pinkY -= box;
        if( Player.key == 'right') pinkX += box;
        if( Player.key == 'down') pinkY += box;

/* if snake eats the food then the food respawns at a random location on the grid and 1 point is added to the score
    add snake.pop to the else statement so that if the snake eats food then it will bypass this part and it will get longer
*/
        // if(snakeX == food.x && snakeY ==food.y){
        //     food = {
        //         x: Math.floor(Math.random()*15+1) * box,
        //         y: Math.floor(Math.random()*15+1) * box
        //     }
        //     score += 1
        // } else{
        //     snake.pop()
        // }
        

        let newHeadYellow = {
            x: yellowX,
            y: yellowY
        }
        let newHeadPink = {
            x: pinkX,
            y: pinkY
        }

// if/else to detect if the snake hits a wall.

        if(yellowX < 0 || yellowX > 15 * box || yellowY < 0 || yellowY > 15 * box || collision(newHeadYellow, yellow)){
            clearInterval(draw);
            h1.textContent = `Game Over, you loser.`;
        }
        if(pinkX < 0 || pinkX > 15 * box || pinkY < 0 || pinkY > 15 * box || collision(newHeadPink, pink)){
            clearInterval(draw);
            h1.textContent = `Game Over, you loser.`;
        }
        yellow.unshift(newHeadYellow);
        pink.unshift(newHeadPink);
    }, 100)
}

game()