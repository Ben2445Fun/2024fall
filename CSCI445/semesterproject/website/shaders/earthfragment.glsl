uniform sampler2D uTexture;
varying vec2 uvCoords;

void main(){
  vec4 textureColor = texture2D(uTexture, uvCoords);
  gl_FragColor = textureColor;
}