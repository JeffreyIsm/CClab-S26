let robotImg;
//let humanImg;

let ball;
let robotGK;
//let humanGK;

function preload() {
  robotImg = loadImage("assets/RobotGK.png");
  //humanImg = loadImage("assets/HumanGK.png");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  ball = new Ball();
  robotGK = new RobotGK();
  //humanGK = new HumanGK();
}

function draw() {
  background(220);

  ball.update();
  ball.display();

  //switch which GK to test
  // humanGK.update();
  // humanGK.display();

  robotGK.update(ball);
  robotGK.display();
}

function keyPressed() {
  let k = key.toLowerCase();

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

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
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

  update() {
    if (this.isMoving) {
      this.y -= this.speed;

      if (this.direction === "left") {
        this.x -= 3;
      } else if (this.direction === "right") {
        this.x += 3;
      }
    }
  }

  display() {
    fill(0);
    circle(this.x, this.y, 20);
  }
}

class RobotGK {
  constructor() {
    this.x = width / 2;
    this.y = 100;
    this.targetX = this.x;
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

  display() {
    imageMode(CENTER);
    image(robotImg, this.x, this.y, 80, 80);
  }
}


/*
// this is for later, not used yet. Havent tested, just random.
// the main focus of the complex GK is the robot
class HumanGK {
  constructor() {
    this.x = width / 2;
    this.y = 100;
  }

  update() {
    //random movement every 30 frames
    if (frameCount % 30 === 0) {
      this.x = random(100, width - 100);
    }
  }

  display() {
    imageMode(CENTER);
    image(humanImg, this.x, this.y, 80, 80);
  }
}
  * */