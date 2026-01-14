// Work 3: Random geometric patterns
let patterns = [];
let patternCount = 8;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  generatePatterns();
}

function draw() {
  background(250, 250, 255);
  
  // Display all patterns
  for (let pattern of patterns) {
    pattern.display();
  }
  
  // Display instruction text
  fill(100);
  textAlign(CENTER);
  textSize(16);
  text('クリックして新しいパターンを生成', width / 2, height - 20);
}

function mousePressed() {
  generatePatterns();
}

function generatePatterns() {
  patterns = [];
  for (let i = 0; i < patternCount; i++) {
    patterns.push(new GeometricPattern());
  }
}

class GeometricPattern {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.size = random(40, 100);
    this.rotation = random(TWO_PI);
    this.shapeType = floor(random(3)); // 0: square, 1: triangle, 2: hexagon
    this.color = color(random(255), random(255), random(255), 180);
    this.strokeColor = color(random(255), random(255), random(255));
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    
    fill(this.color);
    stroke(this.strokeColor);
    strokeWeight(2);
    
    if (this.shapeType === 0) {
      // Draw square
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
    } else if (this.shapeType === 1) {
      // Draw triangle
      triangle(
        0, -this.size / 2,
        -this.size / 2, this.size / 2,
        this.size / 2, this.size / 2
      );
    } else {
      // Draw hexagon
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = (TWO_PI / 6) * i;
        let x = cos(angle) * this.size / 2;
        let y = sin(angle) * this.size / 2;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    
    // Add inner shape for more detail
    noFill();
    stroke(this.strokeColor);
    strokeWeight(1);
    
    if (this.shapeType === 0) {
      rect(0, 0, this.size * 0.5, this.size * 0.5);
    } else if (this.shapeType === 1) {
      triangle(
        0, -this.size / 4,
        -this.size / 4, this.size / 4,
        this.size / 4, this.size / 4
      );
    } else {
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = (TWO_PI / 6) * i;
        let x = cos(angle) * this.size / 4;
        let y = sin(angle) * this.size / 4;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    
    pop();
  }
}
