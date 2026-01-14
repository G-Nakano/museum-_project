// Work 1: Colorful bouncing circles
let circles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');
  
  // Create initial circles
  for (let i = 0; i < 5; i++) {
    circles.push(new Circle());
  }
}

function draw() {
  background(240, 240, 250);
  
  // Update and display all circles
  for (let circle of circles) {
    circle.update();
    circle.display();
  }
  
  // Display instruction text
  fill(100);
  textAlign(CENTER);
  textSize(16);
  text('クリックして円を追加', width / 2, height - 20);
}

function mousePressed() {
  // Add a new circle when mouse is clicked
  circles.push(new Circle(mouseX, mouseY));
}

class Circle {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.diameter = random(30, 80);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.color = color(random(255), random(255), random(255), 150);
  }
  
  update() {
    // Move the circle
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
    
    // Keep within bounds
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.diameter);
  }
}
