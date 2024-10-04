#ifndef VEC4_H
#define VEC4_H

class vec4
{
private:
  float vals[4];

public:
  vec4();
  vec4(const float a, const float b, const float c, const float d)
  {
    vals[0] = a;
    vals[1] = b;
    vals[2] = c;
    vals[3] = d;
  }
  vec4(const float array[4])
  {
    for (int i = 0; i < 4; i++)
      vals[i] = array[i];
  }
  ~vec4();
};
#endif