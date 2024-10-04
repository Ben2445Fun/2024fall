#version 330 core
uniform mat4 viewMat;
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 Color;
layout (location = 2) in vec3 aNormal;

varying vec3 fPos;
varying vec3 fNormal;
varying vec3 fColor;

void main() {
    vec4 point=vec4(aPos.x, aPos.y, aPos.z, 1.0); 
    fPos=aPos;   
    fNormal=aNormal;
    fColor=Color;
    gl_Position = point *viewMat;
}