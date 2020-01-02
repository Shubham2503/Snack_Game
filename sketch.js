let s;
let scl = 20;
let food;
var gameState = 'init';

function setup() {
  createCanvas(1200, 700);
  //s = new Snake();
  frameRate(10);
  pickLocation();
}

function initGame(){
  background(51);
  var name = 'Snake Game';
  textSize(50);
  fill(255);
  nameWidht = textWidth(name);
  text(name, (width - nameWidht)/2, height/2 - 40);
  startBtn = createButton('Start Game');
  startBtn.position(width/2 - startBtn.width/2, height/2);
  startBtn.mousePressed(startGame);
  noLoop();
}

function startGame(){
  removeElements();
  s = new Snake();
  gameState = 'play';
  loop();
}


function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {

  if(gameState == 'init'){
    initGame();
  }
  else if(gameState == 'play'){
    background(51);
    if (s.eat(food)) {
      pickLocation();
    }
    s.death();
    s.update();
    s.show();
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
  }
  else if(gameState == 'end'){
    endGame();
  }
}

function endGame(){
  background(51);
  textSize(32);
  var msg = 'Game Over';
  var score = 'Your Score is ' + s.tail.length;
  msgWidht = textWidth(msg);
  scoreWidht = textWidth(score);
  fill(255);
  text(msg, (width - msgWidht)/2, height/2 - 40);
  text(score, (width - scoreWidht)/2, height/2);
  startBtn = createButton('Restart Game');
  startBtn.position(width/2 - startBtn.width/2, height/2 + 40);
  startBtn.mousePressed(startGame);
  noLoop();
}

function keyPressed() {
  if (keyCode === UP_ARROW && (s.xspeed != 0)) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && (s.xspeed != 0)) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && (s.yspeed != 0)) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && (s.yspeed != 0)) {
    s.dir(-1, 0);
  }
}