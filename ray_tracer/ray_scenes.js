// routines for creating a ray tracing scene
var sphereList = [];
var lightList = [];
var fov;
var background;
var u;
var v;
var w;
var eye_position;
var n;
var l;
var intersection = null;
var c_r;
var c_l;
let debug_flag;


// clear out all scene contents
function reset_scene() {
  sphereList = [];
  lightList = [];
  fov = null;
  background = null;
  u = null;
  v = null;
  w = null;
  eye_position = null;
  n = null;
  l = null;
  intersection = null;
  c_r = null;
  c_l = null;
}

class ray {
  constructor(origin, direction) {
  this.origin = origin; // always where the eye/camera is
  this.direction = direction; // direction of ray
 }
}

class sphere1 {
  constructor(x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
    this.pos = createVector(x, y, z);
    this.radius = radius;
    this.dr = dr;
    this.dg = dg;
    this.db = db;
    this.k_ambient = k_ambient;
    this.k_specular = k_specular;
    this.specular_pow = specular_pow;
  }
  
  //set radius(r) {
  //  this.radius = r;
  //}
  
  //set center(c) {
  //  this.center = c;
  //}
  
  //get radius() {
  //  return this.radius;
  //}
  
  //get center() {
  //  return this.center();
  //}
}

class light {
  constructor(r, g, b, x, y, z) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

// create a new point light source
function new_light (r, g, b, x, y, z) {
  let new_light = new light(r, g, b, x, y, z);
  lightList.push(new_light);
  
}

// set value of ambient light source
function ambient_light (r, g, b) {
  
}

// set the background color for the scene
function set_background (r, g, b) {
  background = [r, g, b];
}

// set the field of view
function set_fov (theta) {
  fov = theta;
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  eye_position = [x, y, z];

}

// set the virtual camera's viewing direction
function set_uvw(x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  u = createVector(x1, y1, z1);
  v = createVector(x2, y2, z2);
  w = createVector(x3, y3, z3);
  
}

// create a new sphere
function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let new_sphere = new sphere1(x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow);
  sphereList.push(new_sphere);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
  let u_s = -1 + (2 * i) / width;
  let v_s = -1 + (2 * j) / height;
  let w_s = -1 / tan(radians(fov) / 2);
  
  let d = p5.Vector.add(p5.Vector.add(p5.Vector.mult(u, u_s), p5.Vector.mult(v, v_s)), p5.Vector.mult(w, w_s));
 
  let eyeRay = new ray(createVector(eye_position[0], eye_position[1], eye_position[2]), d);
  
  return eyeRay;
  
  
}

// obtains the closest t for the intersections
function getT(a, b, c) {
  let qe = (sq(b) - (4 * a * c));
  //console.log(qe);
  if (qe >= 0) {
    let t1 = (-b + sqrt(qe)) / (2 * a);
    let t2 = (-b - sqrt(qe)) / (2 * a);
    let temp = min(t1, t2);
    if (temp > 0) {
      return temp;
    } else if (max(t1, t2) > 0) {
      return max(t1, t2);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function hit(ray) {
  let rayOrigin = ray.origin;
  let rayDirection = ray.direction;
  let smallestT = null;
  let closestSphere = null;
  let x0 = rayOrigin.x;
  let y0 = rayOrigin.y;
  let z0 = rayOrigin.z;
  
  
  for (let i = 0; i < sphereList.length; i++) {
    let radius = sphereList[i].radius;
    let center = sphereList[i].pos;
    

    // circle eq
    let a = sq(rayDirection.x) + sq(rayDirection.y) + sq(rayDirection.z);
    let b = -2 * (rayDirection.x * center.x + rayDirection.y * center.y + rayDirection.z * center.z - x0 * rayDirection.x - y0 * rayDirection.y - z0 * rayDirection.z);
    let c = sq(x0) - (2 * x0 * center.x) + sq(center.x) + sq(y0) - (2 * y0 * center.y) + sq(center.y) + sq(z0) - (2 * z0 * center.z) + sq(center.z) - sq(radius);
    
    //console.log(a, b, c);
    
    let t = getT(a, b, c);
    
    //if(debug_flag) { 
    //  //console.log(a, b, c);
    //  console.log(t);
    //  console.log(smallestT);
    //  //console.log(rayDirection);
    //}

    if ((smallestT == null || t < smallestT) && t > 0) {
      smallestT = t;
      intersection = createVector(rayOrigin.x + t * rayDirection.x, rayOrigin.y + t * rayDirection.y, rayOrigin.z + t * rayDirection.z);
      closestSphere = sphereList[i];
    }
  }
  if(debug_flag) {
    console.log(smallestT);
    console.log(closestSphere);
    console.log(intersection);
  }
  return [smallestT, closestSphere];
}


// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      // create eye ray
      let ray = eye_ray_uvw (x, y);
      
      // maybe print debug information
      debug_flag = 0;
      if (x == 334 && y == 198) { debug_flag = 1;  }  // un-comment to debug center pixel
      
      if (debug_flag) {
        console.log ("debug at: " + x + " " + y);
      }
      
      // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
      let r,g,b;  // placeholders to store the pixel's color
      
      //list of smallest t and closest circle
      let currenthit = hit(ray);
      if (currenthit[0] == null) {
        r = background[0];
        g = background[1];
        b = background[2];
      } else {
        r = 0;
        g = 0;
        b = 0;
        for(let i = 0; i < lightList.length; i++) {
          n = createVector(intersection.x - currenthit[1].pos.x, intersection.y - currenthit[1].pos.y, intersection.z - currenthit[1].pos.z);
          l = createVector(lightList[i].x - intersection.x, lightList[i].y - intersection.y, lightList[i].z - intersection.z);
          n.normalize();
          l.normalize();
          c_r = createVector(currenthit[1].dr, currenthit[1].dg, currenthit[1].db);
          c_l = createVector(lightList[i].r, lightList[i].g, lightList[i].b);
          r += c_r.x * c_l.x * max(0, n.dot(l));
          g += c_r.y * c_l.y * max(0, n.dot(l));
          b += c_r.z * c_l.z * max(0, n.dot(l));
        }
        //intersection = null;
        //fill (255 * r, 255 * g, 255 * b);
      }
      
      
      
      // set the pixel color, converting values from [0,1] into [0,255]
      fill (255 * r, 255 * g, 255 * b);
      
      rect (x, height - y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
  
}
