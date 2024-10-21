# Compiler name
CXX = clang++
CXXFLAGS = -std=c++17 -Wall -g

# Auto-compile any cpp file located in current folder
SOURCES = $(wildcard ./*.cpp)

# Object file generation
OBJECTS = $(SOURCES:.cpp=.o)

# Executable file name
EXECUTABLE = main

# Generate files
$(EXECUTABLE): $(OBJECTS)
	$(CXX) $(CXXFLAGS) -o $@ $(OBJECTS) -lGL -lglut -lGLEW
	rm $(OBJECTS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $<

clean:
	rm -f $(EXECUTABLE) $(OBJECTS) *.log

run:
	./$(EXECUTABLE)