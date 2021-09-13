// routines for creating a ray tracing scene
let sphereList = [];
let lightList = [];
let diskList = [];
let areaLightList = [];
let fov;
let background;
let sample_level = 1;
let ambientLight;
let u;
let v;
let w;
let eye_position;
let n;
let l;
let intersection = null;
let intersectionDisk = null;
let isDiskCloser;
let c_r;
let c_l;
let debug_flag;
let jitterFlag;

// NEW COMMANDS FOR PART B

// create a new disk
function new_disk (x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow) {
  let new_disk = new disk(x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow);
  diskList.push(new_disk);
}

// create a new area light source
function area_light (r, g, b, x, y, z, ux, uy, uz, vx, vy, vz) {
  let area_light = new areaLight(r, g, b, x, y, z, ux, uy, uz, vx, vy, vz);
  areaLightList.push(area_light); 
}

class areaLight {
  constructor(r, g, b, x, y, z, ux, uy, uz, vx, vy, vz) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.z = z;
    this.ux = ux;
    this.uy = uy;
    this.uz = uz;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }
}

function set_sample_level (num) {
  sample_level = num;
}

function jitter_on() {
  jitterFlag = true;
}

function jitter_off() {
  jitterFlag = false;
}


// OLD COMMANDS FROM PART A (some of which you will still need to modify)


// clear out all scene contents
function reset_scene() {
  sphereList = [];
  lightList = [];
  diskList = [];
  areaLightList = [];
  ambientLight = [0, 0, 0];
  fov = null;
  background = null;
  u = null;
  v = null;
  w = null;
  eye_position = null;
  n = null;
  l = null;
  intersection = null;
  intersectionDisk = null;
  c_r = null;
  c_l = null;
}

class Ray {
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
}

class disk {
  constructor(x, y, z, radius, nx, ny, nz, dr, dg, db, k_ambient, k_specular, specular_pow) {
    this.diskpos = createVector(x, y, z);
    this.radius = radius;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.dr = dr;
    this.dg = dg;
    this.db = db;
    this.k_ambient = k_ambient;
    this.k_specular = k_specular;
    this.specular_pow = specular_pow;
  }
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
  ambientLight = [r, g, b];
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

  let eyeRay = new Ray(createVector(eye_position[0], eye_position[1], eye_position[2]), d);

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

function getTDisk(a, b, c, xc, yc, zc, x0, y0, z0, dx, dy, dz) {
  let d = -1 * (a * xc + b * yc + c * zc);
  let t = -(a * x0 + b * y0 + c * z0 + d) / (a * dx + b * dy + c * dz);
  return t;
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

    let t = getT(a, b, c);

    if ((smallestT == null || t < smallestT) && t > 0) {
      smallestT = t;
      intersection = createVector(rayOrigin.x + t * rayDirection.x, rayOrigin.y + t * rayDirection.y, rayOrigin.z + t * rayDirection.z);
      closestSphere = sphereList[i];
    }
  }
  return [smallestT, closestSphere];
}

function diskHit(ray) {
  let rayOrigin = ray.origin;
  let rayDirection = ray.direction;
  let smallestT = null;
  let closestDisk = null;
  
  for (let i = 0; i < diskList.length; i++) {
    let radius = diskList[i].radius;
    let center = diskList[i].diskpos;
    let a = diskList[i].nx;
    let b = diskList[i].ny;
    let c = diskList[i].nz;
    let xc = center.x;
    let yc = center.y;
    let zc = center.z;
    let x0 = rayOrigin.x;
    let y0 = rayOrigin.y;
    let z0 = rayOrigin.z;
    let dx = rayDirection.x;
    let dy = rayDirection.y;
    let dz = rayDirection.z;
    let t = getTDisk(a, b, c, xc, yc, zc, x0, y0, z0, dx, dy, dz);
    if (t != null) {
      let point = p5.Vector.add(rayOrigin, p5.Vector.mult(rayDirection, t)); // point where ray intersects with plane
      let distance = sqrt(sq(xc - point.x) + sq(yc - point.y) + sq(zc - point.z)); // distance between point and disk center
      if (distance < radius && (smallestT == null || t < smallestT) && t > 0) {
        smallestT = t;
        closestDisk = diskList[i];  
        intersectionDisk = point;
      }
    }
  }
  return [smallestT, closestDisk];
}

// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
    
      let r, g, b;
      r = 0;
      g = 0;
      b = 0;
      
      for (let suby = 0; suby < sample_level; suby++) {
        for (let subx = 0; subx < sample_level; subx++) {
          //ray trace for suby and subx
          // create eye ray      
          let subpixelx = ((subx + 1) / (sample_level + 1)) + x;
          let subpixely = ((suby + 1) / (sample_level + 1)) + y;
          let ray = eye_ray_uvw (subpixelx, subpixely);
    
          // maybe print debug information
          debug_flag = 0;
          if (x == 334 && y == 198) { debug_flag = 1;  }  // un-comment to debug center pixel
    
          if (debug_flag) {
            console.log ("debug at: " + x + " " + y);
          }
    
          // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
          //let r,g,b;  // placeholders to store the pixel's color
    
          //list of smallest t and closest circle
          let currenthit = hit(ray);
          let currenthitDisk = diskHit(ray);
          if (currenthitDisk[0] != null && (currenthit[0] == null || currenthitDisk[0] < currenthit[0])) {
            isDiskCloser = true;
          } else {
            isDiskCloser = false;
          }
          if (currenthit[0] == null && currenthitDisk[0] == null) {
            r += background[0];
            g += background[1];
            b += background[2];
          } else {
            if (isDiskCloser) {
              r += currenthitDisk[1].dr * currenthitDisk[1].k_ambient * ambientLight[0];
              g += currenthitDisk[1].dg * currenthitDisk[1].k_ambient * ambientLight[1];
              b += currenthitDisk[1].db * currenthitDisk[1].k_ambient * ambientLight[2];
            } else {
              r += currenthit[1].dr * currenthit[1].k_ambient * ambientLight[0];
              g += currenthit[1].dg * currenthit[1].k_ambient * ambientLight[1];
              b += currenthit[1].db * currenthit[1].k_ambient * ambientLight[2];
            }
            for(let i = 0; i < lightList.length; i++) {
              if (!isDiskCloser) {
                let offset = createVector(0.0001*(lightList[i].x - intersection.x), 0.0001*(lightList[i].y - intersection.y), 0.0001*(lightList[i].z - intersection.z));
                let s_origin = createVector(offset.x + intersection.x, offset.y + intersection.y, offset.z + intersection.z);           
                let s_direction = createVector(lightList[i].x - intersection.x, lightList[i].y - intersection.y, lightList[i].z - intersection.z);
                let s_ray = new Ray(s_origin, s_direction);
                let sphereShadowT = hit(s_ray);
                let diskShadowT = diskHit(s_ray);
                n = createVector(intersection.x - currenthit[1].pos.x, intersection.y - currenthit[1].pos.y, intersection.z - currenthit[1].pos.z);
                l = createVector(lightList[i].x - intersection.x, lightList[i].y - intersection.y, lightList[i].z - intersection.z);
                n.normalize();
                l.normalize();
                if ((sphereShadowT[0] > 0 && sphereShadowT[0] < 1) || (diskShadowT[0] > 0 && diskShadowT[0] < 1)) {
                  c_r = createVector(0, 0, 0);
                  c_l = createVector(0, 0, 0);
                } else {
                  c_r = createVector(currenthit[1].dr, currenthit[1].dg, currenthit[1].db);
                  c_l = createVector(lightList[i].r, lightList[i].g, lightList[i].b);
                }
              } else {
                let offset = createVector(0.0001*(lightList[i].x - intersectionDisk.x), 0.0001*(lightList[i].y - intersectionDisk.y), 0.0001*(lightList[i].z - intersectionDisk.z));
                let s_origin = createVector(offset.x + intersectionDisk.x, offset.y + intersectionDisk.y, offset.z + intersectionDisk.z);           
                let s_direction = createVector(lightList[i].x - intersectionDisk.x, lightList[i].y - intersectionDisk.y, lightList[i].z - intersectionDisk.z);
                let s_ray = new Ray(s_origin, s_direction);
                let sphereShadowT = hit(s_ray);
                let diskShadowT = diskHit(s_ray);
                n = createVector(currenthitDisk[1].nx, currenthitDisk[1].ny, currenthitDisk[1].nz);
                l = createVector(lightList[i].x - intersectionDisk.x, lightList[i].y - intersectionDisk.y, lightList[i].z - intersectionDisk.z);
                n.normalize();
                l.normalize();
                if ((sphereShadowT[0] > 0 && sphereShadowT[0] < 1) || (diskShadowT[0] > 0 && diskShadowT[0] < 1)) {
                  c_r = createVector(0, 0, 0);
                  c_l = createVector(0, 0, 0);
                } else {
                  c_r = createVector(currenthitDisk[1].dr, currenthitDisk[1].dg, currenthitDisk[1].db);
                  c_l = createVector(lightList[i].r, lightList[i].g, lightList[i].b);
                }
              }             
              r += c_r.x * c_l.x * max(0, n.dot(l));
              g += c_r.y * c_l.y * max(0, n.dot(l));
              b += c_r.z * c_l.z * max(0, n.dot(l));
            }
            for(let i = 0; i < areaLightList.length; i++) {
              if (!isDiskCloser) {
                let s;
                let t;
                if (jitterFlag) {
                  s = ((subx + 1 + random(-0.5, 0.5)) / (sample_level + 1)) * 2 - 1;
                  t = ((suby + 1 + random(-0.5, 0.5)) / (sample_level + 1)) * 2 - 1;
                } else {
                  s = ((subx + 1) / (sample_level + 1)) * 2 - 1;
                  t = ((suby + 1) / (sample_level + 1)) * 2 - 1;
                }
                let currLightx = areaLightList[i].x + s * areaLightList[i].ux + t * areaLightList[i].vx;
                let currLighty = areaLightList[i].y + s * areaLightList[i].uy + t * areaLightList[i].vy;
                let currLightz = areaLightList[i].z + s * areaLightList[i].uz + t * areaLightList[i].vz;
                let offset = createVector(0.0001*(currLightx - intersection.x), 0.0001*(currLighty - intersection.y), 0.0001*(currLightz - intersection.z));
                let s_origin = createVector(offset.x + intersection.x, offset.y + intersection.y, offset.z + intersection.z);           
                let s_direction = createVector(currLightx - intersection.x, currLighty - intersection.y, currLightz - intersection.z);
                let s_ray = new Ray(s_origin, s_direction);
                let sphereShadowT = hit(s_ray);
                let diskShadowT = diskHit(s_ray);
                n = createVector(intersection.x - currenthit[1].pos.x, intersection.y - currenthit[1].pos.y, intersection.z - currenthit[1].pos.z);
                l = createVector(currLightx - intersection.x, currLighty - intersection.y, currLightz - intersection.z);
                n.normalize();
                l.normalize();
                if ((sphereShadowT[0] > 0 && sphereShadowT[0] < 1) || (diskShadowT[0] > 0 && diskShadowT[0] < 1)) {
                  c_r = createVector(0, 0, 0);
                  c_l = createVector(0, 0, 0);
                } else {
                  c_r = createVector(currenthit[1].dr, currenthit[1].dg, currenthit[1].db);
                  c_l = createVector(areaLightList[i].r, areaLightList[i].g, areaLightList[i].b);
                }
              } else {
                let s;
                let t;
                if (jitterFlag) {
                  s = ((subx + 1 + random(-0.5, 0.5)) / (sample_level + 1)) * 2 - 1;
                  t = ((suby + 1 + random(-0.5, 0.5)) / (sample_level + 1)) * 2 - 1;
                } else {
                  s = ((subx + 1) / (sample_level + 1)) * 2 - 1;
                  t = ((suby + 1) / (sample_level + 1)) * 2 - 1;
                }
                let currLightx = areaLightList[i].x + s * areaLightList[i].ux + t * areaLightList[i].vx;
                let currLighty = areaLightList[i].y + s * areaLightList[i].uy + t * areaLightList[i].vy;
                let currLightz = areaLightList[i].z + s * areaLightList[i].uz + t * areaLightList[i].vz;        
                let offset = createVector(0.0001*(currLightx - intersectionDisk.x), 0.0001*(currLighty - intersectionDisk.y), 0.0001*(currLightz - intersectionDisk.z));
                let s_origin = createVector(offset.x + intersectionDisk.x, offset.y + intersectionDisk.y, offset.z + intersectionDisk.z);           
                let s_direction = createVector(currLightx - intersectionDisk.x, currLighty - intersectionDisk.y, currLightz - intersectionDisk.z);
                let s_ray = new Ray(s_origin, s_direction);
                let sphereShadowT = hit(s_ray);
                let diskShadowT = diskHit(s_ray);
                n = createVector(currenthitDisk[1].nx, currenthitDisk[1].ny, currenthitDisk[1].nz);
                l = createVector(currLightx - intersectionDisk.x, currLighty - intersectionDisk.y, currLightz - intersectionDisk.z);
                n.normalize();
                l.normalize();
                if ((sphereShadowT[0] > 0 && sphereShadowT[0] < 1) || (diskShadowT[0] > 0 && diskShadowT[0] < 1)) {
                  c_r = createVector(0, 0, 0);
                  c_l = createVector(0, 0, 0);
                } else {
                  c_r = createVector(currenthitDisk[1].dr, currenthitDisk[1].dg, currenthitDisk[1].db);
                  c_l = createVector(areaLightList[i].r, areaLightList[i].g, areaLightList[i].b);
                }
              }       
              r += c_r.x * c_l.x * max(0, n.dot(l));
              g += c_r.y * c_l.y * max(0, n.dot(l));
              b += c_r.z * c_l.z * max(0, n.dot(l));
            }
        
            //intersection = null;
            //fill (255 * r, 255 * g, 255 * b);
          }
        }
      }
        
      let newR = (r) / (sample_level * sample_level);
      let newG = (g) / (sample_level * sample_level);
      let newB = (b) / (sample_level * sample_level);

      // set the pixel color, converting values from [0,1] into [0,255]
      fill (255 * newR, 255 * newG, 255 * newB);

      rect (x, height - y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
}
