#ifndef MAT4_H
#define MAT4_H
#include <iostream>
#include <cmath>
#include <GL/glew.h>
#ifdef __APPLE_CC__
#include <GLUT/glut.h> //Standard graphics language library for Apple development systems
#else
#include <GL/glut.h> // Standard graphics language for all other machines
#endif
class mat4
{
private:
  float vals[4][4];

public:
  // Begin Constructors
  mat4() // Empty constructor
  {
    for (int i = 0; i < 4; i++)
      for (int o = 0; o < 4; o++)
        vals[i][o] = 0;
  }
  mat4(const float a1, const float a2, const float a3, const float a4,
       const float b1, const float b2, const float b3, const float b4,
       const float c1, const float c2, const float c3, const float c4,
       const float d1, const float d2, const float d3, const float d4) // Constructor from 16 separate floats
  {
    vals[0][0] = a1;
    vals[0][1] = a2;
    vals[0][2] = a3;
    vals[0][3] = a4;
    vals[1][0] = b1;
    vals[1][1] = b2;
    vals[1][2] = b3;
    vals[1][3] = b4;
    vals[2][0] = c1;
    vals[2][1] = c2;
    vals[2][2] = c3;
    vals[2][3] = c4;
    vals[3][0] = d1;
    vals[3][1] = d2;
    vals[3][2] = d3;
    vals[3][3] = d4;
  }
  mat4(const float a[4], const float b[4], const float c[4], const float d[4]) // Constructor from 4 separate float arrays
  {
    for (int i = 0; i < 4; i++)
      vals[0][i] = a[i];
    for (int i = 0; i < 4; i++)
      vals[1][i] = b[i];
    for (int i = 0; i < 4; i++)
      vals[2][i] = c[i];
    for (int i = 0; i < 4; i++)
      vals[3][i] = d[i];
  }
  mat4(const mat4 &matrix) // Constructor from another 4 matrix
  {
    for (int i = 0; i < 4; i++)
      for (int o = 0; o < 4; o++)
        vals[i][o] = matrix.vals[i][o];
  }
  ~mat4() {} // Deconstructor
  // End Constructors

  // Begin Getters
  float getVal(const int location) const // Return value from number
  {
    if (location > 15 || location < 0)
      return NAN;
    return vals[location % 4][location / 4];
  }
  float getVal(const int row, const int column) const // Return value from selected row and column
  {
    if (column > 3 || column < 0 || row > 3 || row < 0)
      return NAN;
    return vals[column][row];
  }
  // End Getters

  // Begin Setters
  void setVal(const int location, const float newValue) // Set the value at location to newValue
  {
    if (location > 15 || location < 0)
      return;
    vals[location % 4][location / 4] = newValue;
  }
  void setVal(const int row, const int column, const float newValue) // Set the value at [column][row] to newValue
  {
    if (column > 3 || column < 0 || row > 3 || row < 0)
      return;
    vals[column][row] = newValue;
  }
  // End Setters

  // Begin Overrides
  mat4 &operator*(const float &other) const // Scale a matrix by a float
  {
    static mat4 returnMatrix;
    for (int i = 0; i < 4; i++)
      for (int o = 0; o < 4; o++)
        returnMatrix.setVal(i, o, getVal(i, o) * other);
    return returnMatrix;
  }
  mat4 &operator*(const mat4 &other) const // Multiply 2 matrixes together
  {
    static mat4 returnMatrix;
    float total = 0;
    for (int i = 0; i < 4; i++)
    {
      for (int o = 0; o < 4; o++)
      {
        for (int u = 0; u < 4; u++)
        {
          total += this->getVal(i, u) * other.getVal(u, o);
        }
        returnMatrix.setVal(i, o, total);
        total = 0;
      }
    }
    return returnMatrix;
  }
  mat4 &operator=(const mat4 &other) const // Simply matrix copier
  {
    static mat4 returnMatrix;
    for (int i = 0; i < 4; i++)
      for (int o = 0; o < 4; o++)
        returnMatrix.setVal(i, o, other.getVal(i, o));
    return returnMatrix;
  }
  friend std::ostream &operator<<(std::ostream &out, const mat4 &other) // Output the values of each cell of a matrix
  {
    for (int i = 0; i < 4; i++)
    {
      for (int o = 0; o < 4; o++)
        out << "[" << other.getVal(i, o) << "]";
      out << std::endl;
    }
    return out;
  }
  // End Overrides

  // Begin Other
  static mat4 rotView(const float theta1, const float theta2, const float s) // Calculate the rotation of the camera
  {
    return (mat4::rotX(theta1) * mat4::rotY(theta2)) * s;
  }
  static mat4 rotX(const float theta) // Return a mat4 with calculated x rotation
  {
    return mat4(1, 0, 0, 0,
                0, cos(theta), sin(theta), 0,
                0, -sin(theta), cos(theta), 0,
                0, 0, 0, 1);
  }
  static mat4 rotY(const float theta) // Return a mat4 with calculated y rotation
  {
    return mat4(cos(theta), 0.0, sin(theta), 0.0,
                0.0, 1.0, 0.0, 0.0,
                -sin(theta), 0.0, cos(theta), 0.0,
                0.0, 0.0, 0.0, 1.0);
  }
  void setUniform(const int location)
  {
    glUniformMatrix4fv(location, 1, false, (const float *)&vals);
  }
  // End Other
};
#endif