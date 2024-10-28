// Values shared from script.js
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D heightmap;
uniform float heightmapScale;
uniform float minLayers;
uniform float maxLayers;

// Values shared with the vertex shader
varying vec2 vUV;
varying vec3 viewPosition;
varying vec3 vNormal;

vec2 parallaxMap( in vec3 V ) {
  // Determine number of layers from angle between V and N
  float numLayers = mix(maxLayers, minLayers, abs(dot(vec3(0.0, 0.0, 1.0), V)));
  float layerHeight = 1.0 / numLayers;
  float currentLayerHeight = 0.0;
  
  // Shift of texture coordinates for each iteration
  vec2 dtex = heightmapScale * V.xy / V.z / numLayers;

  vec2 currentTextureCoords = vUV;

  float heightFromTexture = texture2D(heightmap, currentTextureCoords).r;

  // while ( heightFromTexture > currentLayerHeight )
  for (int i = 0; i == 0; i += 0) {
    if (heightFromTexture <= currentLayerHeight) {
      break;
    }
    currentLayerHeight += layerHeight;
    // Shift texture coordinates along vector V
    currentTextureCoords -= dtex;
    heightFromTexture = texture2D(heightmap, currentTextureCoords).r;
  }
  vec2 deltaTexCoord = dtex / 2.0;
  float deltaHeight = layerHeight / 2.0;

  // Return to the mid point of previous layer
  currentTextureCoords += deltaTexCoord;
  currentLayerHeight -= deltaHeight;

  // Binary search to increase precision of Steep Parallax Mapping
  const int numSearches = 5;
  for (int i = 0; i < numSearches; i += 1){
    deltaTexCoord /= 2.0;
    deltaHeight /= 2.0;
    heightFromTexture = texture2D(heightmap, currentTextureCoords).r;
    // Shift along or against vector V
    if(heightFromTexture > currentLayerHeight) { // Below the surface
      currentTextureCoords -= deltaTexCoord;
      currentLayerHeight += deltaHeight;
    } else { // above the surface
      currentTextureCoords += deltaTexCoord;
      currentLayerHeight -= deltaHeight;
    }
  }
  return currentTextureCoords;
}

vec2 perturbUv(vec3 surfPosition, vec3 surfNormal, vec3 viewPosition) {
  vec2 texDx = dFdx( vUV );
  vec2 texDy = dFdy( vUV );

  vec3 vSigmaX = dFdx( surfPosition );
  vec3 vSigmaY = dFdy( surfPosition );
  vec3 vR1 = cross( vSigmaY, surfNormal );
  vec3 vR2 = cross( surfNormal, vSigmaX );
  float fDet = dot( vSigmaX, vR1 );

  vec2 vProjVscr = ( 1.0 / fDet ) * vec2( dot( vR1, viewPosition ), dot( vR2, viewPosition ) );
  vec3 vProjVtex;
  vProjVtex.xy = texDx * vProjVscr.x + texDy * vProjVscr.y;
  vProjVtex.z = dot( surfNormal, viewPosition );

  return parallaxMap( vProjVtex );
}

void main(){
  vec2 mapUV = perturbUv(-viewPosition, normalize( vNormal ), normalize( viewPosition ));
  gl_FragColor = texture2D(dayTexture, mapUV);
}