// Basic setup information
#include <GL/glew.h>         // Extra data for graphics language
#include <GL/freeglut_std.h> // Keep defined after glew.h
#include <iostream>          // Input/output stream for reading/writing to/from console
#include <sstream>           // String stream
#include <fstream>           // File in/out for shader files
#include <cstring>           // C String
#include "mat4.h"
#ifdef __APPLE_CC__
#include <GLUT/glut.h> //Standard graphics language library for Apple development systems
#else
#include <GL/glut.h> // Standard graphics language for all other machines
#endif
using namespace std; // Make sure to use standard namespace unless otherwise defined

// Global variables
int mouseLoc;
const float PI = 3.1415926;

// Define functions
void display();                                                                    // Refresh the display window
void move(const int x, const int y);                                               // Allow the mouse to move objects in a 3D space
void compileShader(const string shaderFile, int &shader, const GLenum shaderType); // Create a shader with an inputted file

// Runtime
int main(int argc, char **argv)
{
  cout << "Preparing runtime. Please stand by..." << endl;
  // Initialize display window
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB);
  /*The following if/else sets the window's size and position to be as maximized as possible while remaining square.
  33 is the amount of pixels used by the window border vertically and 12 horizontally.
  The position is set to be as centered as possible.
  Most computers won't use the else as most screens are greater in width than height.*/
  if (glutGet(GLUT_SCREEN_WIDTH) > glutGet(GLUT_SCREEN_HEIGHT))
  {
    glutInitWindowSize(glutGet(GLUT_SCREEN_HEIGHT) - 33, glutGet(GLUT_SCREEN_HEIGHT) - 33);
    glutInitWindowPosition((glutGet(GLUT_SCREEN_WIDTH) - glutGet(GLUT_SCREEN_HEIGHT) + 33) / 2, 0);
  }
  else
  {
    glutInitWindowSize(glutGet(GLUT_SCREEN_WIDTH) - 12, glutGet(GLUT_SCREEN_WIDTH) - 12);
    glutInitWindowPosition(0, (glutGet(GLUT_SCREEN_HEIGHT) - glutGet(GLUT_SCREEN_WIDTH) + 12) / 2);
  }
  glutCreateWindow("The Blue Marble"); // Name window
  int exception = glewInit();
  if (exception) // Error handling
  {
    cout << "Error while initializing window" << endl;
    exit(1);
  }
  glutDisplayFunc(display);
  glutMotionFunc(move);
  // Link shaders
  int vertexShader, fragmentShader;
  compileShader("vertex.glsl", vertexShader, GL_VERTEX_SHADER);
  compileShader("fragment.glsl", fragmentShader, GL_FRAGMENT_SHADER);
  const unsigned int shaderProgram = glCreateProgram();
  glAttachShader(shaderProgram, vertexShader);
  //  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);
  glGetProgramiv(shaderProgram, GL_LINK_STATUS, &exception);
  char exceptionLog[512];
  if (!exception)
  {
    glGetProgramInfoLog(shaderProgram, 512, NULL, exceptionLog);
    cout << "Error while linking shaders: " << exceptionLog << endl;
    exit(4);
  }
  // Info to move the camera
  mouseLoc = glGetUniformLocation(shaderProgram, "cameraRotation");
  glUseProgram(shaderProgram);
  cout << "Beginning runtime. Enjoy!" << endl;
  glutMainLoop();
  glDeleteShader(vertexShader);
  glDeleteShader(fragmentShader);
  glDeleteProgram(shaderProgram);
  cout << "Ending runtime. Have a nice day :)" << endl;
  return 0;
}

// Make defined functions functional
void display()
{
  glClear(GL_COLOR_BUFFER_BIT);
  // Render stuff here
  glutWireSphere(0.9, 36, 18);
  glutSwapBuffers();
}
void move(const int x, const int y)
{
  float rotX = ((180 * (float)x / glutGet(GLUT_WINDOW_WIDTH) + 90) * PI) / 180,
        rotY = ((180 * (float)y / glutGet(GLUT_WINDOW_HEIGHT) - 90) * PI) / 180;
  mat4 mouseMat = mat4::rotView(rotY, rotX, .1);
  mouseMat.setUniform(mouseLoc);
  glutPostRedisplay();
}
void compileShader(const string shaderFile, int &shader, const GLenum shaderType)
{
  ifstream shaderIn(shaderFile);      // Open shader file
  int exception = shaderIn.is_open(); // Error handling if file doesn't open
  if (!exception)
  {
    cout << "Error while opening vertex shader file" << endl;
    exit(2);
  }
  stringstream shaderStore;
  shaderStore << shaderIn.rdbuf(); // Read in shader file
  shaderIn.close();                // Close shader file
  string shaderTwo = shaderStore.str();
  const char *shaderSource = shaderTwo.c_str();
  shader = glCreateShader(shaderType);
  glShaderSource(shader, 1, &shaderSource, NULL);
  glCompileShader(shader);
  char exceptionLog[512];
  glGetShaderiv(shader, GL_COMPILE_STATUS, &exception);
  if (!exception)
  {
    glGetShaderInfoLog(shader, 512, NULL, exceptionLog);
    cout << "Error while compiling vertex shader: " << exceptionLog << endl;
    exit(3);
  }
}