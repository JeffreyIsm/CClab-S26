let robotImg;
let humanImg;

let ball;
let robotGK;
let humanGK;

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
}

function draw() {
  background(220);

  ball.update();
  ball.display();

  robotGK.update(ball);
  robotGK.display();

  //humanGK.update(ball);
  //humanGK.display();
}

function keyPressed() {
  let k = key.toLowerCase();

  if (ball.isMoving == false){
    if (k === 'a' || keyCode === LEFT_ARROW) {
      ball.shoot("left");
    }

    if (k === 'w' || keyCode === UP_ARROW) {
      ball.shoot("center");
    }

    if (k === 'd' || keyCode === RIGHT_ARROW) {
      ball.shoot("right");
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.direction = "center";
    this.speed = 10;
    this.isMoving = false;
  }

  shoot(dir) {
    this.direction = dir;
    this.x = width / 2;
    this.y = height - 50;
    this.isMoving = true;
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
        this.x -= 3;
      } else if (this.direction === "right") {
        this.x += 3;
      }

      // reset the ball back to position
      if (this.y < 0-50){
        this.x = width / 2;
        this.y = height - 100;
        this.isMoving = false;
      }
    }
  }
}

class RobotGK {
  constructor() {
    this.x = width / 2;
    this.y = 100;
    this.targetX = this.x;
  }

  display() {
    imageMode(CENTER);
    image(robotImg, this.x, this.y, 80, 80);
  }

  update(ball) {
    if (ball.direction === "left") {
      this.targetX = width * 0.35;
    } else if (ball.direction === "right") {
      this.targetX = width * 0.65;
    } else {
      this.targetX = width / 2;
    }
    this.x = lerp(this.x, this.targetX, 0.2);
  }
}

class HumanGK {
  constructor() {
    this.x = width / 2;
    this.y = 100;
    this.targetX = this.x;
  }

  update(ball) {
    let choice = floor(random(3));

    if (ball.isMoving && this.hasChosen == false){
      if (choice === 0) {
        this.targetX = width * 0.35;
      } else if (choice == 1) {
        this.targetX = width * 0.65;
      } else {
        this.targetX = width / 2;
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
    image(humanImg, this.x, this.y, 80, 80);
  }
}