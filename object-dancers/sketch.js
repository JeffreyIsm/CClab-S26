/// <reference types="p5/global" />

/** i added this at the top for the p5js function guide */

/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new JeffDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class JeffDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:

    this.headPointX = 0;
    this.headPointY = 0;

    this.hipPointX = 0;
    this.angle = 0;

    this.kneePointX = 0;
    this.kneeAngle = 0;

    this.elbowPointX = 0;
    this.elbowPointY = 0;
    this.armAngle = 0;

    this.armPointX = 0;
    this.armPointY = 0;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.hipPointX = sin(this.angle) * 30;
    this.angle += 0.10;

    this.kneePointX = sin(this.kneeAngle) * 10;
    this.kneeAngle += 0.10;

    this.headPointX = sin(this.angle) * 5;
    this.headPointY = -40 + sin(this.angle) * 2;

    this.armAngle += 0.10;
    this.elbowPointX = sin(this.angle) * -20;
    this.elbowPointY = sin(this.armAngle) * 15;

    this.armPointX = sin(this.angle) * -40;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    push();
    strokeWeight(12);
    stroke(255);

    //head
    push();
    translate(this.headPointX, this.headPointY);
    rotate(frameCount*0.07);
    rectMode(CENTER);
    rect(0, 0, 50, 50);

    //eyes
    push();
    rotate(-frameCount * 0.07);
    fill(0);
    noStroke();
    circle(-12, -8, 10);
    circle(12, -8, 10);
    pop();
    
    pop();

    //body
    line(0,-30, this.hipPointX, 20);

    //right leg
    line(this.hipPointX, 20, this.kneePointX+20, 50);
    line(this.kneePointX+20, 50, 30, 80);

    //left leg (mirrored)
    line(this.hipPointX, 20, -this.kneePointX-20, 50);
    line(-this.kneePointX-20, 50, -30, 80);

    //right arm
    line(5,-20, this.elbowPointX+30, this.elbowPointY+15)
    line(this.elbowPointX+30,this.elbowPointY+15, this.armPointX+50, this.armPointY)

    //left arm
    line(5,-20, -this.elbowPointX-30, this.elbowPointY+7)
    line(-this.elbowPointX-30, this.elbowPointY+7, this.armPointX-25, this.armPointY+30)

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/