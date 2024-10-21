#version 330 core
uniform mat4 cameraRotation;
layout(location = 0) in vec3 aPos;
varying vec3 fPos;

void main()
{
    fPos = aPos;
    gl_Position = vec4(aPos.x,aPos.y,aPos.z,1.0)*cameraRotation;
}