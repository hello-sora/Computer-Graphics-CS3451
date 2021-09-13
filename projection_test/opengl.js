// Matrix and Drawing Library

// Begin by using the matrix transformation routines from part A of this project.
// You should modify the new routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.

var matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
var myArray;
var routine = "";
var orthogonal = new Array(4);
var p;
var t;
var b;
var l;
var r;

//starting the shape
function BeginShape(dummy_value) {
  myArray = [];  // making a literal array
}

//done drawing
function EndShape(dummy_value) {
  for (i = 0; i < myArray.length / 2; i++) {
    line(myArray[i*2][0], myArray[i*2][1], myArray[i*2 + 1][0], myArray[i*2 + 1][1]);
  }
  //console.log(myArray);
}

function Vertex(x, y, z) {
  //let v = [];
  //let newX = 0;
  //let newY = 0;
  //let x2 = matrix[0][0]*x + matrix[0][1]*y + matrix[0][2]*z + matrix[0][3];
  //let y2 = matrix[1][0]*x + matrix[1][1]*y + matrix[1][2]*z + matrix[1][3];
  //let z2 = matrix[2][0]*x + matrix[2][1]*y + matrix[2][2]*z + matrix[2][3];

  //if (routine == "orthogonal") {
  //  newX = ((x2 - orthogonal[0]) * width / (orthogonal[1] - orthogonal[0]));
  //  newY = ((y2 - orthogonal[3]) * height / (orthogonal[2] - orthogonal[3]));
  //} else {
  //  newX = (((x2 / abs(z2) + p) * width) / (2 * p));
  //  newY = (((y2 / abs(z2) - p) * width) / (-2 * p));
  //}
  //v = [newX, newY, z2, 1];
  //myArray.push(v);
  let v = [x, y, z, 1];
  let arr = matrix;
  let newMatrix = vectorMatrixMultiplication(arr, v);
  //console.log(newMatrix);
  let mapping = [newMatrix[0], newMatrix[1], newMatrix[2]];
  
  if (routine == "perspective") {
    mapping[0] = (mapping[0] / (abs(mapping[2])));
    mapping[1] = (mapping[1] / mapping[2]);
    mapping[0] = (mapping[0] + p) * (width / (2 * p));
    mapping[1] = (mapping[1] + p) * (height / (2 * p));
  } else {
    mapping[0] = (mapping[0] - l) * (width / (r - l));
    mapping[1] = (mapping[1] - t) * (height / (b - t));
  }
  myArray.push(mapping);
}

function vectorMatrixMultiplication(matrix, vector) {
  let vec = [];
  for (i = 0; i < 4; i++) {
    vec[i] = (matrix[i][0] * vector[0] + matrix[i][1] * vector[1] + matrix[i][2] * vector[2] + matrix[i][3] * vector[3]); 
  }
  return vec;
}

function Perspective(field_of_view, near, far) {
  routine = "perspective";
  p = tan(radians(field_of_view)/2);
}

function Ortho (left, right, botton, top, near, far) {
  routine = "orthogonal";
  t = top;
  b = botton;
  l = left;
  r = right;
  //orthogonal = [t, b, l, r];
}

function Init_Matrix()
{
  matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; 
}

function matrixMultiplication(a, b) {
  let temp = [];
  for (i = 0; i < a.length; i++) {
    temp[i] = [];
    for (n = 0; n < b[0].length; n++) {
      let num = 0;
      for (j = 0; j < a[0].length; j++) {
        num += a[i][j] * b[j][n];
      }
      temp[i][n] = num;
    }
  }
  return temp;
}

function Translate(x, y, z)
{
  var translationMatrix = [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
  matrix = matrixMultiplication(matrix, translationMatrix);
}

function Scale(x, y, z)
{
  var scaleMatrix = [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
  matrix = matrixMultiplication(matrix, scaleMatrix);  
}

function RotateX(theta)
{
  var rotationMatrixX = [[1, 0, 0, 0], [0, cos(radians(theta)), -sin(radians(theta)), 0], [0, sin(radians(theta)), cos(radians(theta)), 0], [0, 0, 0, 1]];
  matrix = matrixMultiplication(matrix, rotationMatrixX);
}

function RotateY(theta)
{
  var rotationMatrixY = [[cos(radians(theta)), 0, sin(radians(theta)), 0], [0, 1, 0, 0], [-sin(radians(theta)), 0, cos(radians(theta)), 0], [0, 0, 0, 1]];
  matrix = matrixMultiplication(matrix, rotationMatrixY);  
}

function RotateZ(theta)
{
  var rotationMatrixZ = [[cos(radians(theta)), -sin(radians(theta)), 0, 0], [sin(radians(theta)), cos(radians(theta)), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  matrix = matrixMultiplication(matrix, rotationMatrixZ);
}

function Print_Matrix()
{
  console.log("Current Matrix:\n");
  for (i = 0; i < 4; i++) {
    string = "";
    for(n = 0; n < 4; n++) {
      if(n == 3) {
        string+=matrix[i][n];
      } else {
        string+=matrix[i][n] + ", ";
      }
    }
    console.log(string);
  }
}
