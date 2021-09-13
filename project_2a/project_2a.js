// Sample code for Project 2
// Draws 3D Primitives (sphere, box, cylinder, cone, torus)


let time = 0;  // records the passage of time, used to move the objects

// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);

  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to create new per-frame images
function draw() {

  background(161, 226, 153);  // light blue background

  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up

  // include a little bit of light even in shadows
  ambientLight(60, 60, 60);

  // set the light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines

  //rotation around axis
  let box_axis = createVector(0, 1, 0);
  rotate(-time, box_axis);

  //MINECRAFT COW :)

  //cow middle body
  fill(95, 60, 37);
  // ambientMaterial(100, 63, 39);
  // specularColor(250);
  // shininess(1);
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
  ambientMaterial(33, 33, 9);
  shininess(1);
  push();
  translate(18.55, -9, 4);
  box(3, 1, 3);
  pop();

  fill(0, 0, 0);
  ambientMaterial(33, 33, 9);
  shininess(1);
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
  box(2, 2, 2)
  pop();



  // let delta = 25;

  // fill(250);
  // push();
  // translate(0, 0);
  // translate (-5.0 * sin(time), 0.0, 0.0);
  // sphere(15);
  // pop();

  // fill(50, 200, 100);
  // push();
  // translate(-delta, -delta);
  // let box_axis = createVector (0.0, 1.0, 0.0);
  // rotate (-time, box_axis);
  // box(20);
  // pop();

  // fill(100, 150, 250);
  // push();
  // translate(-delta, delta);
  // rotateX(PI)
  // let cone_axis = createVector (1.0, 0.0, 0.0);
  // rotate (-time, cone_axis);
  // cone(10, 25);
  // pop();

  // fill(250, 50, 100);
  // push();
  // translate(delta, -delta);
  // let cyl_axis = createVector (0.0, 0.0, 1.0);
  // rotate (-time, cyl_axis);
  // cylinder(10, 20);
  // pop();

  // fill(150, 0, 150);
  // push();
  // translate(delta, delta);
  // scale (0.3 * (sin (time) + 2.5));
  // torus(12, 6, 32, 20);
  // pop();

  time += 0.010;  // update time
}
