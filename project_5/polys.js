// polygon mesh routines that you should write
let vertexList;
let quadList;

class Polygon {
  constructor(v1, v2, v3, v4) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v4 = v4;
  }
}

class Vertex {
  constructor(x, y, z, nx, ny, nz) {
    this.pos = createVector(x, y, z);
    this.norm = createVector(nx, ny, nz);
  }
}

function init_polys()
{
  vertexList = [];
  quadList = [];
}

function new_vertex (x, y, z, nx, ny, nz)
{
  let vertex = new Vertex(x, y, z, nx, ny, nz);
  vertexList.push(vertex);
}

function new_quad (i1, i2, i3, i4)
{  
  let quad = new Polygon(vertexList[i1], vertexList[i2], vertexList[i3], vertexList[i4]);
  quadList.push(quad);
}

function draw_polys() {  
  if (show_vertices_flag) {
    for (let i = 0; i < vertexList.length; i++) {
      push();
      translate(vertexList[i].pos);
      sphere(0.75);
      pop();
    }
  } else {
    for (let j = 0; j < quadList.length; j++) {
      if (normal_flag) {
        normalMaterial();
      }
      //console.log(quadList[j]);
      beginShape();
      vertexNormal (quadList[j].v1.norm.x, quadList[j].v1.norm.y, quadList[j].v1.norm.z);
      vertex (quadList[j].v1.pos.x, quadList[j].v1.pos.y, quadList[j].v1.pos.z);
      vertexNormal (quadList[j].v2.norm.x, quadList[j].v2.norm.y, quadList[j].v2.norm.z);
      vertex (quadList[j].v2.pos.x, quadList[j].v2.pos.y, quadList[j].v2.pos.z);
      vertexNormal (quadList[j].v3.norm.x, quadList[j].v3.norm.y, quadList[j].v3.norm.z);
      vertex (quadList[j].v3.pos.x, quadList[j].v3.pos.y, quadList[j].v3.pos.z);
      vertexNormal (quadList[j].v4.norm.x, quadList[j].v4.norm.y, quadList[j].v4.norm.z);
      vertex (quadList[j].v4.pos.x, quadList[j].v4.pos.y, quadList[j].v4.pos.z);
      endShape (CLOSE);
    }
  }
}

function create_cylinder(rad,x1,y1,z1,x2,y2,z2)
{  
  let p1 = createVector(x1, y1, z1);
  let p2 = createVector(x2, y2, z2);
  let tangentVector = p5.Vector.sub(p2, p1);
  tangentVector.normalize();
  let up = createVector(0, 1, 0); // non parallel vector
  let u = p5.Vector.cross(tangentVector, up);
  let v = p5.Vector.cross(u, tangentVector);
  u.normalize();
  v.normalize();
  //console.log(u, v);
  for (let i = 0; i < 16; i++) {
    let theta = 360 / 16;
    theta = theta * i;
    theta = radians(theta);
    let ruc = p5.Vector.mult(u, rad);
    ruc.mult(cos(theta));
    let rvs = p5.Vector.mult(v, rad);
    rvs.mult(sin(theta));
    let q = p5.Vector.add(p1, ruc);
    q.add(rvs);
    let newNormal = p5.Vector.sub(q, p1);
    newNormal.normalize();
    new_vertex(q.x, q.y, q.z, newNormal.x, newNormal.y, newNormal.z);
  }
    for (let i = 0; i < 16; i++) {
    let theta = 360 / 16;
    theta = theta * i;
    theta = radians(theta);
    let ruc = p5.Vector.mult(u, rad);
    ruc.mult(cos(theta));
    let rvs = p5.Vector.mult(v, rad);
    rvs.mult(sin(theta));
    let q = p5.Vector.add(p2, ruc);
    q.add(rvs);
    let newNormal = p5.Vector.sub(q, p2);
    newNormal.normalize();
    new_vertex(q.x, q.y, q.z, newNormal.x, newNormal.y, newNormal.z);
  }
  for (let i = 0; i < 15; i++) {
    new_quad(i, i + 1, i + 16 + 1, i + 16);
  }
  new_quad(0, 15, 31, 16);
}

function bezierMath(p1, p2, p3, p4, t) {
  let b1 = (1 - t) * (1 - t) * (1 - t);
  let b2 = 3 * t * ((1 - t) * (1 - t));
  let b3 = 3 * (1 - t) * (t * t);
  let b4 = t * t * t;
  let qt1 = p5.Vector.mult(p1, b1);
  let qt2 = p5.Vector.mult(p2, b2);
  let qt3 = p5.Vector.mult(p3, b3);
  let qt4 = p5.Vector.mult(p4, b4);
  let qt = p5.Vector.add(qt1, qt2);
  qt.add(qt3);
  qt.add(qt4);
  return qt;
}

function bezierDerivative(p1, p2, p3, p4, t) {
   //dP(t) / dt =  -3(1-t)^2 * p1 + 3(1-t)^2 * p2-6t(1-t) * p2 -3t^2 * p3+6t(1-t) * p3 + 3t^2 * p4
  let d1 = -3 * ((1 - t) * (1 - t));
  let d2 = 3 * ((1 - t) * (1 - t));
  let d3 = -6 * t * (1 - t);
  let d4 = -3 * (t * t);
  let d5 = 6 * t * (1 - t);
  let d6 = 3 * (t * t);
  let bD1 = p5.Vector.mult(p1, d1);
  let bD2 = p5.Vector.mult(p2, d2);
  let bD3 = p5.Vector.mult(p2, d3);
  let bD4 = p5.Vector.mult(p3, d4);
  let bD5 = p5.Vector.mult(p3, d5);
  let bD6 = p5.Vector.mult(p4, d6);
  let bD = p5.Vector.add(bD1, bD2);
  bD.add(bD3);
  bD.add(bD4);
  bD.add(bD5);
  bD.add(bD6);
  return bD.normalize();
}

function bezier_tube(x1,y1,z1, x2,y2,z2, x3,y3,z3, x4,y4,z4, rad, num_around, num_length, nx, ny, nz)
{
  let start = vertexList.length;
  let p1 = createVector(x1, y1, z1);
  let p2 = createVector(x2, y2, z2);
  let p3 = createVector(x3, y3, z3);
  let p4 = createVector(x4, y4, z4);
  let u = createVector(nx, ny, nz);
  u.normalize();
  for (let i = 0; i < num_length; i++) {
    let t = i / (num_length - 1);
    let tangentVector = bezierDerivative(p1, p2, p3, p4, t);
    let v = p5.Vector.cross(u, tangentVector);
    v.normalize();
    u = p5.Vector.cross(tangentVector, v).normalize();
    for (let j = 0; j < num_around; j++) {
      let theta = 360 / num_around;
      theta = theta * j;
      theta = radians(theta);
      let rings = bezierMath(p1, p2, p3, p4, t);
      let ruc = p5.Vector.mult(u, 1);
      ruc.mult(rad * cos(theta));
      let rvs = p5.Vector.mult(v, 1);
      rvs.mult(rad * sin(theta));
      let q = p5.Vector.add(rings, ruc);
      q.add(rvs);
      new_vertex(q.x, q.y, q.z, rvs.x + ruc.x, rvs.y + ruc.y, rvs.z + ruc.z);
    }
  }
  for (let j = 0; j < num_length - 1; j++) {
    for (let i = 0; i < num_around - 1; i++) {
      new_quad(start + (j * num_around) + i, start + (j * num_around) + i + 1, start + (j * num_around) + i + num_around + 1, start + (j * num_around) + i + num_around);
    }
    new_quad(start + j * num_around, start + j * num_around + num_around - 1, start + j * num_around + num_around * 2 - 1, start + j * num_around + num_around);
  }
  return u;
}
