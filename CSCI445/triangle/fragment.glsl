#version 330 core
out vec4 FragColor;
varying vec3 fPos;
varying vec3 fNormal;
varying vec3 fColor;
uniform vec3 lightLoc;
uniform vec3 lightColor;

void main(){
    //float b=clamp(fPos.z,0.0,1.0);
/*    vec4 color=vec4(0.0,0.0,1.0,1.0);
    if (fPos.z<-0.5) color=vec4(1.0,1.0,0.0,1.0);
    else if (fPos.z<0.5) color=vec4(1.0,1.0,1.0,1.0);
    else color=vec4(fNormal,1.0);
    FragColor = color;*/
    float cosLight=dot(lightLoc/length(lightLoc),fNormal);
    FragColor=vec4(lightColor*cosLight+fColor,1.0);
} 