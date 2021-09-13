// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER
#define PI 3.1415926535897932384626433832795

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;


void main() {

  // provided
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  float offset = 60.0 * sin(9 * PI / sqrt(0.5) * distance(vertTexCoord.xy, vec2(0.5, 0.5)));

  gl_Position = transform * (vertex + (offset * vec4(normal, 0)));

  vec2 u = vec2(vertTexCoord.x, vertTexCoord.y + 0.05);
  vec2 d = vec2(vertTexCoord.x, vertTexCoord.y - 0.05);
  vec2 r = vec2(vertTexCoord.x + 0.05, vertTexCoord.y);
  vec2 l = vec2(vertTexCoord.x - 0.05, vertTexCoord.y);

  float uOffset = sin(9 * PI / sqrt(0.5) * distance(u, vec2(0.5, 0.5)));
  float dOffset = sin(9 * PI / sqrt(0.5) * distance(d, vec2(0.5, 0.5)));
  float rOffset = sin(9 * PI / sqrt(0.5) * distance(r, vec2(0.5, 0.5)));
  float lOffset = sin(9 * PI / sqrt(0.5) * distance(l, vec2(0.5, 0.5)));

  vec3 curr = vec3(normal.x - (rOffset - lOffset), normal.y - (uOffset - dOffset), normal.z);
  vertLightDir = normalize(-lightNormal);
  vertNormal = normalize(normalMatrix * curr);

}
