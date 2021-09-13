var bg;
let time = 0;
let flicker = 10;
var fire;
var steak;

// instancing: the cows

function setup() {
  createCanvas(1366, 706, WEBGL);
  //background(255);
}

function draw() {
  imageMode(CENTER);
  image(bg, 0, 0);
  
  time += 0.01;
  
  noStroke();  
  
  scene1();
  scene2();
  scene3();
  scene4();
  scene5();
  scene6();
  
}

function scene1() {
  if (Math.round(time * 100) % 8 == 0) {
    flicker = flicker == 10 ? 13 : 10;
  }
  if (time < 5.5) {
    let fov = 50.0; 
    var scale = 0.08;
    push();
    translate(0, 0, flicker);
    image(fire, 70, 100, scale * width, scale * fire.height*width / fire.width);
    pop();
  }
}

function scene2() {
  if (time < 1) {
    directionalLight (102, 102, 102, -0.7, -0.7, -1);
    ambientLight(180, 180, 180);
    push();
    cowInstantiate(-450, 200, 100, 2.5, 0);
    cowInstantiate(-150, 100, 50, 1.8, 0);
    pop();
  } 
}

function scene3() {
  if (time > 1 && time < 4.5) {
    directionalLight (102, 102, 102, -0.7, -0.7, -1);
    ambientLight(180, 180, 180);
    push();
    cowInstantiate(-470 + (time * 50), 200, 100, 2.5, 0);
    cowInstantiate(-170 + (time * 40), 100, 50, 1.8, 0);
    pop();
  }
}

function scene4() {
  if (time > 4.5 && time < 7) {
    camera(0, 0, 550, 0, 0, 0, 0, 1, 0);
    directionalLight (102, 102, 102, -0.7, -0.7, -1);
    ambientLight(255, 255, 255);
    push();
    cowInstantiate(-420 + (time * 40), 200, 100, 2.5, 0);
    cowInstantiate(70, 140, 0, 2, 10 + (time * 8));
    translate(0, 0, flicker);
    image(fire, 70, 100, scale * width, scale * fire.height*width / fire.width);
    //camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
    pop();
  }
}

function scene5() {
  if (time > 7 && time < 12) {
    camera(0, 0, 540, 0, 0, 0, 0, 1, 0);
    directionalLight (102, 102, 102, -0.7, -0.7, -1);
    ambientLight(150, 150, 158);
    let fov = 50.0; 
    var scale = 0.05;
    push();
    cowInstantiate(-600 + (time * 100), 150, 100, 2.5, 0);
    translate(0, 0, flicker);
    image(steak, 70, 100, scale * width, scale * steak.height*width / steak.width);
    pop();
  }
}

function scene6() {
  if (time > 12) {
    camera(0, 0, 290, 0, 0, 0, 0, 1, 0);
    let fov = 0.7;
    var scale = 0.08;
    push();
    translate(0, 0, flicker);
    image(steak, 70, 100, scale * width, scale * steak.height*width / steak.width);
    pop();
  } 
}

function cowInstantiate(x, y, z, s, r) {
  push();
  
  translate(x, y, z);
  scale(s);
  rotate(r);
  
  fill(95, 60, 37);
  push();
  translate(0, 0);
  box(25, 20);
  pop();

  //cow head
  fill(95, 60, 37);
  push();
  translate(16, -8, 1);
  box(8, 13);
  pop();

  //nose & nostrils
  fill(255, 220, 220);
  push();
  translate(17.78, -3.8, 1);
  box(4.5, 4.5);
  pop();

  fill(0, 0 ,0);
  push();
  translate(19.75, -4.2, 2);
  rotateZ(radians(90));
  cylinder(0.7, 0.7);
  pop();

  fill(0, 0, 0);
  push();
  translate(19.75, -4.2, -0.1);
  rotateZ(radians(90));
  cylinder(0.7, 0.7);
  pop();

  //eyes
  fill(0, 0, 0);
  push();
  translate(18.55, -9, 4);
  box(3, 1, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(18.55, -9, -1.8);
  box(3, 1, 3);
  pop();

  //cow left ear
  fill(34, 31, 29);
  push();
  translate(16.5, -11, 8.5);
  box(2, 2);
  pop();

  fill(61, 58, 56);
  push();
  translate(16.5, -13, 8.5);
  box(2, 2);
  pop();

  fill(85, 84, 82);
  push();
  translate(16.5, -15, 8.5);
  box(2, 2);
  pop();

  //cow right ear
  fill(34, 31, 29);
  push();
  translate(16.5, -11, -6.5);
  box(2, 2);
  pop();

  fill(61, 58, 56);
  push();
  translate(16.5, -13, -6.5);
  box(2, 2);
  pop();

  fill(85, 84, 82);
  push();
  translate(16.5, -15, -6.5);
  box(2, 2);
  pop();

  //cow legs
  fill(95, 60, 37);
  push();
  translate(9, 16, 5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(-9, 16, 5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(9, 16, -5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(-9, 16, -5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  //cow hoofs
  fill(0, 0, 0);
  push();
  translate(9, 24, 5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(-9, 24, 5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(9, 24, -5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(-9, 24, -5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  //head spots
  fill(245, 245, 245);
  push();
  translate(19.5, -12.5, 1);
  box(1.1, 4, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -13, -0.7);
  box(1.1, 3, 1.7);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -13.5, 2.2);
  box(1.1, 2, 1.7);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -2.5, -4.4);
  box(1.1, 1.8, 1.7);
  pop();

  //big body spot on left
  fill(245, 245, 245);
  push();
  translate(-5, -6.5, 8.55);
  box(3, 7, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(-2, -4.5, 8.55);
  box(3, 11, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(2, -3.3, 8.55);
  box(5, 13.5, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(5, -4, 8.55);
  box(3, 12, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(7, -5.5, 8.55);
  box(3, 9, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(9, -7, 8.55);
  box(3, 6, 3);
  pop();

  //small body spots on left
  fill(245, 245, 245);
  push();
  translate(-11.2, 3.5, 9.6);
  box(2.5, 13, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10, 6.35, 9.6);
  box(2.5, 7.2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(11.2, 7, 9.6);
  box(2, 6, 1);
  pop();

  //front body spots
  fill(245, 245, 245);
  push();
  translate(12.1, 6.95, 8.9);
  box(1, 6, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 8.2, 7.6);
  box(1, 3.5, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 0.5, 3.5);
  box(1, 4.2, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 1.5, 2.5);
  box(1, 6.5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 2.5, 0);
  box(1, 8, 4);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 0.5, -2.3);
  box(1, 4, 2.7);
  pop();

  //body spots on right
  fill(245, 245, 245);
  push();
  translate(7, 9, -9.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(5, 8.5, -9.6);
  box(2, 3, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(3, 8, -9.6);
  box(3, 4, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(0, 7.5, -9.6);
  box(4, 5, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-3, 9, -9.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-2, 4, -9.6);
  box(8, 3, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-0.5, 1, -9.6);
  box(1, 4, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-1, -5.5, -9.6);
  box(5, 9, 1);
  pop();

  //back spots
  fill(245, 245, 245);
  push();
  translate(-11.6, -6.5, -5);
  box(2, 7, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -5, -1);
  box(2, 10, 5);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -5.75, 2);
  box(2, 8.5, 4);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -3.5, 6.15);
  box(2, 7);
  pop();

  //utters
  fill(255, 150, 150);
  push();
  translate(-11.6, 9, 0);
  box(2, 2, 7.5);
  pop();

  fill(255, 150, 150);
  push();
  translate(-11.6, 8, 0);
  box(2, 1, 11);
  pop();

  //leg spots
  fill(245, 245, 245);
  push();
  translate(11.6, 15, 2.8);
  box(1, 5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(11.6, 15, -7.2);
  box(1, 5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(-9.5, 15, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-7.5, 15, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-7.5, 17, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.1, 15, -3.1);
  box(2, 4.5, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10, 17, -7.1);
  box(3.5, 2, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10.75, 18, -7.1);
  box(2, 2, 2);
  pop();   
  
  
  pop();

}

function cow() {

  fill(95, 60, 37);
  push();
  translate(0, 0);
  box(25, 20);
  pop();

  //cow head
  fill(95, 60, 37);
  push();
  translate(16, -8, 1);
  box(8, 13);
  pop();

  //nose & nostrils
  fill(255, 220, 220);
  push();
  translate(17.78, -3.8, 1);
  box(4.5, 4.5);
  pop();

  fill(0, 0 ,0);
  push();
  translate(19.75, -4.2, 2);
  rotateZ(radians(90));
  cylinder(0.7, 0.7);
  pop();

  fill(0, 0, 0);
  push();
  translate(19.75, -4.2, -0.1);
  rotateZ(radians(90));
  cylinder(0.7, 0.7);
  pop();

  //eyes
  fill(0, 0, 0);
  push();
  translate(18.55, -9, 4);
  box(3, 1, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(18.55, -9, -1.8);
  box(3, 1, 3);
  pop();

  //cow left ear
  fill(34, 31, 29);
  push();
  translate(16.5, -11, 8.5);
  box(2, 2);
  pop();

  fill(61, 58, 56);
  push();
  translate(16.5, -13, 8.5);
  box(2, 2);
  pop();

  fill(85, 84, 82);
  push();
  translate(16.5, -15, 8.5);
  box(2, 2);
  pop();

  //cow right ear
  fill(34, 31, 29);
  push();
  translate(16.5, -11, -6.5);
  box(2, 2);
  pop();

  fill(61, 58, 56);
  push();
  translate(16.5, -13, -6.5);
  box(2, 2);
  pop();

  fill(85, 84, 82);
  push();
  translate(16.5, -15, -6.5);
  box(2, 2);
  pop();

  //cow legs
  fill(95, 60, 37);
  push();
  translate(9, 16, 5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(-9, 16, 5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(9, 16, -5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  fill(95, 60, 37);
  push();
  translate(-9, 16, -5);
  scale(2, 1, 2);
  box(3, 15, 3);
  pop();

  //cow hoofs
  fill(0, 0, 0);
  push();
  translate(9, 24, 5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(-9, 24, 5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(9, 24, -5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  fill(0, 0, 0);
  push();
  translate(-9, 24, -5);
  scale(2, 1, 2);
  box(3, 2, 3);
  pop();

  //head spots
  fill(245, 245, 245);
  push();
  translate(19.5, -12.5, 1);
  box(1.1, 4, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -13, -0.7);
  box(1.1, 3, 1.7);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -13.5, 2.2);
  box(1.1, 2, 1.7);
  pop();

  fill(245, 245, 245);
  push();
  translate(19.5, -2.5, -4.4);
  box(1.1, 1.8, 1.7);
  pop();

  //big body spot on left
  fill(245, 245, 245);
  push();
  translate(-5, -6.5, 8.55);
  box(3, 7, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(-2, -4.5, 8.55);
  box(3, 11, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(2, -3.3, 8.55);
  box(5, 13.5, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(5, -4, 8.55);
  box(3, 12, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(7, -5.5, 8.55);
  box(3, 9, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(9, -7, 8.55);
  box(3, 6, 3);
  pop();

  //small body spots on left
  fill(245, 245, 245);
  push();
  translate(-11.2, 3.5, 9.6);
  box(2.5, 13, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10, 6.35, 9.6);
  box(2.5, 7.2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(11.2, 7, 9.6);
  box(2, 6, 1);
  pop();

  //front body spots
  fill(245, 245, 245);
  push();
  translate(12.1, 6.95, 8.9);
  box(1, 6, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 8.2, 7.6);
  box(1, 3.5, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 0.5, 3.5);
  box(1, 4.2, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 1.5, 2.5);
  box(1, 6.5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 2.5, 0);
  box(1, 8, 4);
  pop();

  fill(245, 245, 245);
  push();
  translate(12.1, 0.5, -2.3);
  box(1, 4, 2.7);
  pop();

  //body spots on right
  fill(245, 245, 245);
  push();
  translate(7, 9, -9.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(5, 8.5, -9.6);
  box(2, 3, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(3, 8, -9.6);
  box(3, 4, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(0, 7.5, -9.6);
  box(4, 5, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-3, 9, -9.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-2, 4, -9.6);
  box(8, 3, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-0.5, 1, -9.6);
  box(1, 4, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-1, -5.5, -9.6);
  box(5, 9, 1);
  pop();

  //back spots
  fill(245, 245, 245);
  push();
  translate(-11.6, -6.5, -5);
  box(2, 7, 3);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -5, -1);
  box(2, 10, 5);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -5.75, 2);
  box(2, 8.5, 4);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.6, -3.5, 6.15);
  box(2, 7);
  pop();

  //utters
  fill(255, 150, 150);
  push();
  translate(-11.6, 9, 0);
  box(2, 2, 7.5);
  pop();

  fill(255, 150, 150);
  push();
  translate(-11.6, 8, 0);
  box(2, 1, 11);
  pop();

  //leg spots
  fill(245, 245, 245);
  push();
  translate(11.6, 15, 2.8);
  box(1, 5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(11.6, 15, -7.2);
  box(1, 5, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(-9.5, 15, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-7.5, 15, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-7.5, 17, 7.6);
  box(2, 2, 1);
  pop();

  fill(245, 245, 245);
  push();
  translate(-11.1, 15, -3.1);
  box(2, 4.5, 2.5);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10, 17, -7.1);
  box(3.5, 2, 2);
  pop();

  fill(245, 245, 245);
  push();
  translate(-10.75, 18, -7.1);
  box(2, 2, 2);
  pop();   

}

function preload() {
  bg = loadImage('background.png');
  fire = loadImage('fire.png');
  steak = loadImage('steak.png');

}
