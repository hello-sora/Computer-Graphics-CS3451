// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec2 a = 3 * vertTexCoord.xy - 1.5;
    vec2 b = vec2(cx, cy);
    vec4 color = vec4(vertColor);
    for (int i = 0; i < 20; i++) {
        float curr = a.x * a.x * a.x - 3 * a.x * a.y * a.y + b.x;
        a.y = 3 * a.x * a.x * a.y - a.y * a.y * a.y + b.y;
        a.x = curr;
    }
  if (abs(a.x * a.x + a.y * a.y) <= 16) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    color = vec4(1.0, 0.0, 0.0, 1.0);
  }
  gl_FragColor = vec4(color);
}

