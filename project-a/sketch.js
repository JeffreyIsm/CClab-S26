
function setup() {
      let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
  triangleSetup();
}

function drawLavaBg(){
  
  background(10,0,0); //dark base

  noStroke();

  let cellSize = 80;

  for(let x = 0; x < width+50; x += cellSize){
    for(let y = 0; y < height; y += cellSize){

      let n = noise(x*0.01, y*0.01, frameCount*0.01);

      let r = map(n,0,1,120,255);
      let g = map(n,0,1,20,80);
      let b = map(n,0,1,0,20);

      fill(r,g,b,200);

      let offsetX = map(noise(x, y, frameCount*0.02),0,1,-20,20);
      let offsetY = map(noise(x+100, y+100, frameCount*0.02),0,1,-20,20);

      circle(x + offsetX, y + offsetY, cellSize*1.4);
    }
  }
}


function draw() {
  drawLavaBg();

  drawCreature(width/2, height/2);
}


let Cx = 0;
let Cy = 0;
let targetX = 0;
let targetY = 0;

//circlecount, size, radius from middle
let CircleCount = 3;
function CircleAmount(){
    CircleCount = floor(random(2, 7));
}

function drawCreature(x, y) {
  push();
  translate(x, y);

  // YOUR CODE GOES HERE
  // introduce additional functions
  // for parts of your creature that
  // are repeated, and call them from
  // here
  
  
  noStroke();
  
  ColorChanger();
  
  
  //CHANGEABLE
  //circle size
  wigglyCircle(170);
  
  //CHANGEABLE
  //3rd parameter is changeSpeed, the lower the faster
  drawLimbs(Cx,Cy,20);
  
  //CHANGEABLE
  //these are passed as parameters into function call
  let Size = 20;
  let Radius = 50;
  
  for (let i = 0; i < CircleCount; i++) {
    let angle = radians(360 / CircleCount * i);
    drawCircle(Cx, Cy, Radius, angle, Size);
  }

  Cx = lerp(Cx, targetX, 0.05);
  Cy = lerp(Cy, targetY, 0.05);

  if (dist(Cx, Cy, targetX, targetY) < 10) {
    targetX = random(-width/2 +230, width/2 -230);
    targetY = random(-height/2 +155, height/2 -155);
  }
  
  pop();
}


//
//SWIGGLY CIRCLE
//
function wigglyCircle(radius) {
  push();
  
  fill(0);
  stroke(255);
  strokeWeight(2);

  beginShape();
  //u can change the 0.1
  for (let a = 0; a < TWO_PI; a += 0.1) {

    let noiseOffset = noise(a, frameCount * 0.02) * 20;
    let r = radius + noiseOffset;
    let x = r * cos(a);
    let y = r * sin(a);
    let d = dist(x, y, Cx, Cy);
    
    //can change how far it reacts
    let influenceRadius = 100;

    if (d < influenceRadius) {
      
      //the parameter after influence radius controls strength
      let strength = map(d, 0, influenceRadius, 70, 0);
      let dx = x - Cx;
      let dy = y - Cy;
      let mag = sqrt(dx * dx + dy * dy);
      
      dx /= mag;
      dy /= mag;
      x += dx * strength;
      y += dy * strength;
    }

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}


//CHANGEABLE
//change this to affect how much the triangle offsets
let limbRange = 45;

//
//TRIANGLE SETUP
//
let lx1, ly1, lx2, ly2, lx3, ly3;
let lx1m, ly1m, lx2m, ly2m, lx3m, ly3m;
function triangleSetup(){
  lx1 = random(-limbRange, limbRange);
  ly1 = random(-limbRange, limbRange);
  lx2 = random(-limbRange, limbRange);
  ly2 = random(-limbRange, limbRange);
  lx3 = random(-limbRange, limbRange);
  ly3 = random(-limbRange, limbRange);

  lx1m = random(-limbRange, limbRange);
  ly1m = random(-limbRange, limbRange);
  lx2m = random(-limbRange, limbRange);
  ly2m = random(-limbRange, limbRange);
  lx3m = random(-limbRange, limbRange);
  ly3m = random(-limbRange, limbRange);
}

//
// LIMBS/TRIANGLE
//
function drawLimbs(x, y, changeSpeed) {
  push();
  translate(x, y);

  triangle(lx1, ly1, lx2, ly2, lx3, ly3);

  //smooth movement towards target
  lx1 = lerp(lx1, lx1m, 0.15);
  ly1 = lerp(ly1, ly1m, 0.15);
  lx2 = lerp(lx2, lx2m, 0.15);
  ly2 = lerp(ly2, ly2m, 0.15);
  lx3 = lerp(lx3, lx3m, 0.15);
  ly3 = lerp(ly3, ly3m, 0.15);

  //pick new targets occasionally
  if (frameCount % changeSpeed == 0) {
    lx1m = random(-limbRange, limbRange);
    ly1m = random(-limbRange, limbRange);
    lx2m = random(-limbRange, limbRange);
    ly2m = random(-limbRange, limbRange);
    lx3m = random(-limbRange, limbRange);
    ly3m = random(-limbRange, limbRange);
  }
  
  pop();
}



//
//CIRCLE SETUP
//
let speed =1;
function drawCircle(x,y,radius,baseangle,size){
  push();
  translate(x,y);
  
  if (mouseIsPressed){
    targetspeed = 4;
  } else{
    targetspeed = 1;
  }
  speed = lerp(speed,targetspeed,0.03);
  
  rotate(baseangle + frameCount/20 * speed);
  circle(radius,0,size);
  pop();
  
}

//
//NEW - color
//
function ColorChanger(){
  let d = dist(mouseX,mouseY, width/2+Cx, height/2+Cy)
  if (d<90){
    fill(map(sin(frameCount/10),1,-1,0,255),0,0);
  } else{
    fill(255,200,0);
  }

}

function mousePressed() {
  CircleAmount();
}