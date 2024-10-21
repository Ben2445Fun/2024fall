#version 330 core
out vec4 FragColor;
varying vec3 fPos;

void main()
{
    FragColor = vec4(fPos.x,fPos.y,fPos.z, 1.0f);
}