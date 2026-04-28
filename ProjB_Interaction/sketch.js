let robotImg;
let humanImg;

let ball;
let robotGK;
let humanGK;
let humanEnv;
let robotEnv;
let goal;

let mode = "human"; //"human" or "robot"
let shotCount = 0;
let maxShots = 5;
let youScore = 0;
let oppScore = 0;

function preload() {
  robotImg = loadImage("assets/RobotGK.png");
  humanImg = loadImage("assets/HumanGK.png");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  ball = new Ball();
  robotGK = new RobotGK();
  humanGK = new HumanGK();
  goal = new Goal();
  humanEnv = new HumanEnvironment();
  robotEnv = new RobotEnvironment();
}

function draw() {
  if (mode === "human") {
    humanEnv.display();
    humanGK.update(ball);
  } else {
    robotEnv.display();
    robotGK.update(ball);
  }

  ball.update();
  resolveShot();
  ball.display();
  drawScoreboard();

  if (mode === "human") {
    humanGK.display();
  } else {
    robotGK.display();
  }
}

function resolveShot() {
  if (ball.isMoving && ball.shotResolved == false && ball.y <= goal.bottomY) {
    let keeperDirection;

    if (mode === "human") {
      keeperDirection = humanGK.direction;
    } else {
      keeperDirection = robotGK.direction;
    }

    if (ball.direction === keeperDirection) {
      oppScore++;
    } else {
      youScore++;
    }

    ball.shotResolved = true;
  }
}

function drawScoreboard() {
  textAlign(CENTER, CENTER);

  fill(255);
  noStroke();
  textSize(24);
  text("YOU", width * 0.18, 45);
  text("OPP", width * 0.82, 45);

  textSize(36);
  text(youScore, width * 0.18, 80);
  text(oppScore, width * 0.82, 80);
}

function incrementShots() {
  if (mode === "human") {
    shotCount++;

    if (shotCount >= maxShots) {
      mode = "robot";
      shotCount = 0;
    }
  }
}

function keyPressed() {
  let k = key.toLowerCase();

  if (ball.isMoving == false){
    if (k === 'a' || keyCode === LEFT_ARROW) {
      ball.shoot("left");
      incrementShots();
    }

    if (k === 'w' || keyCode === UP_ARROW) {
      ball.shoot("center");
      incrementShots();
    }

    if (k === 'd' || keyCode === RIGHT_ARROW) {
      ball.shoot("right");
      incrementShots();
    }
  }
}

class HumanEnvironment {
  constructor() {
  }

  display() {
    background(135, 200, 255);
    this.drawGrass();
    goal.display(color(255));
  }

  drawGrass() {
    noStroke();
    fill(70, 170, 70);
    rect(0, 203, width, height - 200);

    fill(40, 130, 40);
    for (let x = 0; x < width; x += 20) {
      for (let y = 210; y < height; y += 20) {
        let offsetX = sin(frameCount * 0.05 + x * 0.1);
        let offsetY = sin(frameCount * 0.08 + y * 0.1);
        circle(x + offsetX, y + offsetY, 12);      
      }
    }
    fill(40, 160, 40);
    for (let x = 0; x < width; x += 20) {
      for (let y = 210; y < height; y += 20) {
        let offsetX = sin(frameCount * 0.05 + x * 0.1);
        let offsetY = sin(frameCount * 0.07 + y * 0.1);
        circle(x + 10 + offsetX, y + 8 + offsetY, 12);      
      }
    }
  }
}

class RobotEnvironment {
  constructor() {
  }

  display() {
    background(30);
    this.drawGrass();
    goal.display(color(0, 255, 255));
  }

  drawGrass() {
    noStroke();

    noFill();
    stroke(0, 255, 255);
    strokeWeight(3);
    for (let x = 0; x <= width; x += 65) {
      for (let y = 200; y <= height; y += 65) {
        rect(x, y, 65, 65);
      }
    }
  }
}

class Goal {
  constructor() {
    this.leftX = width * 0.28;
    this.rightX = width * 0.72;
    this.topY = 80;
    this.bottomY = 200;
  }

  display(goalColor) {
    noFill();
    stroke(goalColor);
    strokeWeight(1);
    for (let x = this.leftX; x <= this.rightX; x += 20) {
      for (let y = this.topY; y <= this.bottomY - 20; y += 20) {
        rect(x - 5, y + 3, 19, 19);
      }
    }

    stroke(goalColor);
    strokeWeight(13);
    line(this.leftX, this.topY, this.leftX, this.bottomY);
    line(this.rightX, this.topY, this.rightX, this.bottomY);
    line(this.leftX, this.topY, this.rightX, this.topY);
  }
}


class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.direction = "center";
    this.speed = 10;
    this.isMoving = false;
    this.shotResolved = false;
  }

  shoot(dir) {
    this.direction = dir;
    this.x = width / 2;
    this.y = height - 50;
    this.isMoving = true;
    this.shotResolved = false;
  }

  display() {
    fill(255);
    strokeWeight(5);
    circle(this.x, this.y, 50);
  }

  update() {
    if (this.isMoving) {
      this.y -= this.speed;

      if (this.direction === "left") {
        this.x -= 4;
      } else if (this.direction === "right") {
        this.x += 4;
      }

      // reset the ball back to position
      if (this.y < 110){
        this.x = width / 2;
        this.y = height - 100;
        this.isMoving = false;
        this.shotResolved = false;
      }
    }
  }
}

class RobotGK {
  constructor() {
    this.x = width / 2;
    this.y = 150;
    this.targetX = this.x;
    this.direction = "center";
  }

  display() {
    imageMode(CENTER);
    image(robotImg, this.x, this.y, 70, 70);
  }

  update(ball) {
    if (ball.direction === "left") {
      this.targetX = width * 0.35;
      this.direction = "left";
    } else if (ball.direction === "right") {
      this.targetX = width * 0.65;
      this.direction = "right";
    } else {
      this.targetX = width / 2;
      this.direction = "center";
    }
    this.x = lerp(this.x, this.targetX, 0.2);
  }
}

class HumanGK {
  constructor() {
    this.x = width / 2;
    this.y = 150;
    this.targetX = this.x;
    this.direction = "center";
    this.hasChosen = false;
  }

  update(ball) {
    let choice = floor(random(3));

    if (ball.isMoving && this.hasChosen == false){
      if (choice === 0) {
        this.targetX = width * 0.35;
        this.direction = "left";
      } else if (choice == 1) {
        this.targetX = width * 0.65;
        this.direction = "right";
      } else {
        this.targetX = width / 2;
        this.direction = "center";
      }
      this.hasChosen = true;
    }

    this.x = lerp(this.x, this.targetX, 0.2);

    if (ball.isMoving == false) {
      this.hasChosen = false;
    }  
  }

  display() {
    imageMode(CENTER);
    image(humanImg, this.x, this.y, 70, 70);
  }
}

/** 
 * FEEDBACK
 * give users guide on what keys to press, to clap
 * make the ball look more like a ball
 * scoreboard in both environments. in real world the score is more balanced, but in robot world its like 10-0\
 * score can be on left  n right
 * move the whole thing down abit
 * draw the human, but shapes for robot
 */
