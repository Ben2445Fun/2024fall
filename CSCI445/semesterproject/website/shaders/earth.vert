// Values shared with the fragment shader
varying vec2 vUV;
varying vec3 viewPosition;
varying vec3 vNormal;

void main(){
  vUV = uv; // The program knows what uv is, glsl lint doesn't
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  viewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mvPosition;
}