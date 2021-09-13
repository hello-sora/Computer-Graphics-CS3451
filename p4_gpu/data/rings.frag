// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER
#define PI 3.1415926535897932384626433832795

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

float sq(float num) {
    return num * num;
}

void main() {
  vec2 coordinate = vec2(vertTexCoord.st);
  vec2 mainCircle = vec2(0.5, 0.5);
  float radius = 0.25;
  float val = .06;
  float mainCircleVal = 0.35;
  float transform = 0.25 + radius;
  float theta = 0;
  vec2 circ1 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ2 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ3 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ4 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ5 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ6 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ7 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));
  theta += (PI / 4);
  vec2 circ8 = vec2(((radius * cos(theta)) + transform), ((radius * sin(theta)) + transform));

    if (sq(coordinate.s - (mainCircle.x)) + sq(coordinate.t - (mainCircle.y)) > sq(mainCircleVal)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ1.x))+ sq(coordinate.t - (circ1.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ2.x )) + sq(coordinate.t - (circ2.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ3.x ))+ sq(coordinate.t - (circ3.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ4.x ))+ sq(coordinate.t - (circ4.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ5.x))+ sq(coordinate.t - (circ5.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ6.x ))+ sq(coordinate.t - (circ6.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ7.x ))+ sq(coordinate.t - (circ7.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (sq(coordinate.s - (circ8.x)) + sq(coordinate.t - (circ8.y)) < sq(val)) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else if (coordinate.s > 0.42 && coordinate.s < 0.59 && coordinate.t > 0.42 && coordinate.t < 0.59) {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    } else {
        gl_FragColor = vec4(0.0, 1.0, 2.0, 1.0);
    }
}

