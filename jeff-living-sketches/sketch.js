let scanned = [];
let pacman;
let water;
let ball;

let curPacman = 0;
let pacmanAngle = 0

let curWater = 0;

let curBall = 0;
let ballX = -100;
let ballSpeedX = 0;
let baseSpeed = 3;
let boost = 0;


function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("drawing-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);

  // crop(sourceImage, x, y, width, height)
  pacman = crop(scanned, 0, 15, 450, 400);
  water = crop(scanned, 1900, 0, 500, 1000);
  ball = crop(scanned, 1400, 1200, 1000, 500);
}

function draw() {
  background(255);

  // examples: pacman

  push();
  translate(mouseX, mouseY);
  rotate(pacmanAngle);
  imageMode(CENTER);

  //image(img, x, y, width, height)
  image(
    pacman[curPacman],
    0,
    0,
    pacman[0].width * 0.25,
    pacman[0].height * 0.25
  );
  pop();

  curPacman = floor((frameCount / 20) % pacman.length);

  // ball

  push();
  translate(ballX, height / 2);
  imageMode(CENTER);

  //image(img, x, y, width, height)
  image(
    ball[curBall],
    0,
    100,
    ball[0].width * 0.25,
    ball[0].height * 0.25
  );
  pop();

  // ball animation only has 4 frames
  curBall = floor((frameCount / 10) % 4);

  ballSpeedX = baseSpeed + boost;
  ballX += ballSpeedX;

  boost *= 0.9;

  if (ballX > width + 100) {
    ballX = -100;
  }


  // water, using sin()
  //image(img, x, y, width, height)
  image(
    water[curWater],
    300,
    50,
    water[0].width * 0.5,
    water[0].height * 0.5
  );

  curWater = floor(map(sin(frameCount / 20), -1, 1, 0, water.length));

}

function keyPressed(){
  if (key == ' '){
    boost += 10;
  }
}

function mousePressed() {
  pacmanAngle = random(TWO_PI);
}



// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
