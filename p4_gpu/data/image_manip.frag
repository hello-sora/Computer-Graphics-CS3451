// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D other_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  float offset = 0.01;
  vec4 diffuseColor = texture2D(my_texture, vertTexCoord.xy);
  vec4 topLeft = texture2D(my_texture, vec2(vertTexCoord.x - offset, vertTexCoord.y + offset));
  vec4 topRight = texture2D(my_texture, vec2(vertTexCoord.x + offset, vertTexCoord.y + offset));
  vec4 center = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y + offset));
  vec4 left = texture2D(my_texture, vec2(vertTexCoord.x - offset, vertTexCoord.y));
  vec4 right = texture2D(my_texture, vec2(vertTexCoord.x + offset, vertTexCoord.y));
  vec4 bottomLeft = texture2D(my_texture, vec2(vertTexCoord.x - offset, vertTexCoord.y - offset));
  vec4 bottomRight = texture2D(my_texture, vec2(vertTexCoord.x + offset, vertTexCoord.y - offset));
  vec4 bottom = texture2D(my_texture, vec2(vertTexCoord.x, vertTexCoord.y - offset));
  vec4 totalColor = diffuseColor +  topLeft + topRight + center + left + right + bottomLeft + bottomRight + bottom;
  vec4 diffuseColor2 = totalColor / 9;

  if (vertTexCoord.s < 0.5 && vertTexCoord.t < 0.5) {
    vec4 dogeboy = texture2D(other_texture, vec2(vertTexCoord.x * 8 * 0.25, vertTexCoord.y * 8 * 0.25));
    if (dogeboy.g < 0.9) {
        diffuseColor2 = dogeboy;
    }
  }

  float diffuse = clamp(dot(vertNormal, vertLightDir), 0.0, 1.0);
  gl_FragColor = vec4(diffuse * diffuseColor2.rgb, 1.0);

}
