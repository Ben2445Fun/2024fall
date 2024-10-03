#include <GL/glew.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <cstring>
#include <cmath>
#include <iomanip>

#ifdef __APPLE_CC__
#include <GLUT/glut.h>
#else
#include <GL/glut.h>
#endif

float PI = 3.1415926;

using namespace std;

class Vector
{
private:
  float values[4];

public:
  Vector(float x = 0.0, float y = 0.0, float z = 0.0, float w = 0.0)
  {
    values[0] = x;
    values[1] = y;
    values[2] = z;
    values[3] = w;
  }
  float operator*(const Vector &other)
  {
    float total = 0.0;
    for (int i = 0; i < 4; i++)
      total += values[i] * other.values[i];
    return total;
  }
  float x() { return values[0]; }
  float y() { return values[1]; }
  float z() { return values[2]; }
  float w() { return values[3]; }
};

void addTriangle(Vector alpha, Vector bravo, Vector charlie, Vector color)
{
  glBegin(GL_POLYGON);
  glColor3f(color.x(), color.y(), color.z());
  glVertex3f(alpha.x(), alpha.y(), alpha.z());
  glColor3f(color.x(), color.y(), color.z());
  glVertex3f(bravo.x(), bravo.y(), bravo.z());
  glColor3f(color.x(), color.y(), color.z());
  glVertex3f(charlie.x(), charlie.y(), charlie.z());
  glEnd();
}

class Matrix
{
  float values[4][4];

public:
  Matrix(float a = 0.0, float b = 0.0, float c = 0.0, float d = 0.0,
         float e = 0.0, float f = 0.0, float g = 0.0, float h = 0.0,
         float i = 0.0, float j = 0.0, float k = 0.0, float l = 0.0,
         float m = 0.0, float n = 0.0, float o = 0.0, float p = 0.0)
  {
    values[0][0] = a;
    values[0][1] = b;
    values[0][2] = c;
    values[0][3] = d;
    values[1][0] = e;
    values[1][1] = f;
    values[1][2] = g;
    values[1][3] = h;
    values[2][0] = i;
    values[2][1] = j;
    values[2][2] = k;
    values[2][3] = l;
    values[3][0] = m;
    values[3][1] = n;
    values[3][2] = o;
    values[3][3] = p;
  }
  static Matrix rotView(float alpha, float gamma, float s)
  {
    return s * Matrix::rotX(alpha) * Matrix::rotY(gamma);
  }
  void setUniform(int loc)
  {
    glUniformMatrix4fv(loc, 1, false, (const float *)&values);
  }
  static Matrix rotX(float angle)
  {
    return Matrix(1.0, 0.0, 0.0, 0.0,
                  0.0, cos(angle), sin(angle), 0.0,
                  0.0, -sin(angle), cos(angle), 0.0,
                  0.0, 0.0, 0.0, 1.0);
  }
  static Matrix rotY(float angle)
  {
    return Matrix(cos(angle), 0.0, sin(angle), 0.0,
                  0.0, 1.0, 0.0, 0.0,
                  -sin(angle), 0.0, cos(angle), 0.0,
                  0.0, 0.0, 0.0, 1.0);
  }
  static Matrix rotZ(float angle)
  {
    return Matrix(); // To be completed by student
  }
  static Matrix shift(float dx = 0.0, float dy = 0.0, float dz = 0.0)
  {
    return Matrix(); // To be completed by student
  }
  Matrix &operator*(float s) const
  {
    static Matrix res;
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        res.values[i][j] = s * values[i][j];
    return res;
  }
  friend Matrix &operator*(float s, const Matrix &m)
  {
    return m * s;
  }
  Vector row(int i) const
  {
    if (i < 0 || i >= 4)
      return Vector();
    return Vector(values[i][0], values[i][1], values[i][2], values[i][3]);
  }
  Vector col(int j) const
  {
    if (j < 0 || j >= 4)
      return Vector();
    return Vector(values[0][j], values[1][j], values[2][j], values[3][j]);
  }
  Matrix &operator*(const Matrix &other) const
  {
    static Matrix res;
    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        res.values[i][j] = row(i) * other.col(j);
    return res;
  }
  friend ostream &operator<<(ostream &out, const Matrix &m)
  {
    for (int i = 0; i < 4; i++)
    {
      for (int j = 0; j < 4; j++)
      {

        out << "[" << m.values[i][j] << "]";
      }
      out << endl;
    }
    return out;
  }
};

float zs[80][80];

void randomize()
{
  for (float x = -2.0; x <= 2.0; x += .1)
  {
    int i = x / .1 + 20;
    for (float y = -2.0; y <= 2.0; y += .1)
    {
      int j = y / .1 + 20;
      float t = ((float)(rand() % 200 - 100) / 100.0);
      zs[i][j] = t * -.2 + .1;
    }
  }
}

void sinRipple()
{
  for (float x = -2.0; x <= 2.0; x += .1)
  {
    int i = x / .1 + 20;
    for (float y = 02.0; y <= 2.0; y += .1)
    {
      int j = y / .1 + 20;
      zs[i][j] = sin(2 * x) * sin(2 * y);
    }
  }
}

void addTiles()
{
  for (float x = -2.0; x <= 2.0; x += .1)
  {
    int i = x / .1 + 20;
    for (float y = -2.0; y <= 2.0; y += .1)
    {
      int j = y / .1 + 20;
      float z = zs[i][j];
      addTriangle(Vector(x, y, z), Vector(x + .05, y, z), Vector(x, y + .05, z), Vector(1, 0, 0));
    }
  }
}

// Clears window and draw
void display()
{
  // Set every pixel in the frame buffer to the current clear color.
  glClear(GL_COLOR_BUFFER_BIT);

  addTiles();
  // Flush drawing command buffer to make drawing happen as soon as possible.
  glFlush();
}

int Loc3;

void move(const int x, const int y)
{
  float rotX = ((180 * (float)x / glutGet(GLUT_WINDOW_WIDTH) + 90) * PI) / -180,
        rotY = ((-180 * (float)y / glutGet(GLUT_WINDOW_HEIGHT) - 90) * PI) / 180;
  Matrix m = Matrix::rotView(rotY, rotX, 0.1);
  m.setUniform(Loc3);
  cout << "m.rotView: " << endl
       << m << endl;
  glutPostRedisplay();
}

int main(int argc, char **argv)
{
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);

  // Resize the window based off the full screen size
  int screenX = glutGet(GLUT_SCREEN_WIDTH) - 50, screenY = glutGet(GLUT_SCREEN_HEIGHT) - 50;
  if (screenX >= screenY)
  {
    glutInitWindowPosition((screenX - screenY) / 2, 0);
    glutInitWindowSize(screenY, screenY);
  }
  else
  {
    glutInitWindowPosition(0, (screenY - screenX) / 2);
    glutInitWindowSize(screenX, screenX);
  }
  glutCreateWindow("A Simple Triangle");

  GLenum err = glewInit();
  if (err != GLEW_OK)
    exit(1); // Error handling

  // Begin Displaying
  // randomize();
  sinRipple();
  glutDisplayFunc(display);
  //  Change vertex locations based off mouse position
  glutMotionFunc(move);

  ifstream inFile("vertex.glsl");             // Open the vertex shader
  stringstream strStream;                     // Create a string stream that'll hold the data from vertex.glsl
  strStream << inFile.rdbuf();                // Read the file into the string stream
  string s = strStream.str();                 // Copy the string stream into a stream
  inFile.close();                             // Close the vertex shader
  const char *vertexShaderSource = s.c_str(); // Copy the string data into a character array
  unsigned int vertexShader;
  vertexShader = glCreateShader(GL_VERTEX_SHADER);            // Create a vertex shader
  glShaderSource(vertexShader, 1, &vertexShaderSource, NULL); // Modify the vertex shader to be what was found in the vertex shader file
  glCompileShader(vertexShader);                              // Compile the shader
  int success;
  char infoLog[512];
  glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
  if (!success)
  {
    glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
    cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n"
         << infoLog << endl;
  }
  unsigned int fragmentShader;
  fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  inFile.open("fragment.glsl"); // open the input file
  strStream.str("");
  strStream << inFile.rdbuf(); // read the file
  s = strStream.str();
  inFile.close();
  const char *fragmentShaderSource = s.c_str();
  // read from fragment.glsl
  glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
  glCompileShader(fragmentShader);
  glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
  if (!success)
  {
    glGetShaderInfoLog(fragmentShader, 512, NULL, infoLog);
    cout << "ERROR::SHADER::FRAGMENT::COMPILATION_FAILED\n"
         << infoLog << endl;
  }
  unsigned int shaderProgram;
  shaderProgram = glCreateProgram();
  glAttachShader(shaderProgram, vertexShader);
  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);
  glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);
  if (!success)
  {
    glGetProgramInfoLog(shaderProgram, 512, NULL, infoLog);
    cout << "ERROR::SHADER::Linking::COMPILATION_FAILED\n"
         << infoLog << endl;
  }
  Loc3 = glGetUniformLocation(shaderProgram, "viewMat");
  glUseProgram(shaderProgram);

  glutMainLoop();

  glDeleteShader(vertexShader);
  glDeleteShader(fragmentShader);
}