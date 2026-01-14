// Work 2: Ripple effect following mouse
let ripples = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
}

function draw() {
  background(20, 20, 40);
  
  // Add new ripple at mouse position occasionally
  if (frameCount % 5 === 0 && mouseX > 0 && mouseY > 0) {
    ripples.push(new Ripple(mouseX, mouseY));
  }
  
  // Update and display all ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    
    // Remove ripples that are too big
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }
  
  // Display instruction text
  fill(200, 200, 255);
  textAlign(CENTER);
  textSize(16);
  text('マウスを動かしてください', width / 2, height - 20);
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 0;
    this.maxDiameter = 150;
    this.speed = 3;
    this.alpha = 255;
  }
  
  update() {
    this.diameter += this.speed;
    this.alpha = map(this.diameter, 0, this.maxDiameter, 255, 0);
  }
  
  display() {
    noFill();
    stroke(100, 150, 255, this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.diameter);
    
    // Add inner ripples for more effect
    stroke(150, 200, 255, this.alpha * 0.6);
    strokeWeight(1);
    ellipse(this.x, this.y, this.diameter * 0.7);
  }
  
  isFinished() {
    return this.diameter > this.maxDiameter;
  }
}
