# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/local/bin/cmake

# The command to remove a file.
RM = /usr/local/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy

# Include any dependencies generated for this target.
include src/CMakeFiles/KETI_Policy.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include src/CMakeFiles/KETI_Policy.dir/compiler_depend.make

# Include the progress variables for this target.
include src/CMakeFiles/KETI_Policy.dir/progress.make

# Include the compile flags for this target's objects.
include src/CMakeFiles/KETI_Policy.dir/flags.make

src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o: src/CMakeFiles/KETI_Policy.dir/flags.make
src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o: src/KETI_Policy.cpp
src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o: src/CMakeFiles/KETI_Policy.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o"
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src && /home/keti/KETI_BMC/KETI-APP/sysroots/x86_64-oesdk-linux/usr/bin/arm-openbmc-linux-gnueabi/arm-openbmc-linux-gnueabi-g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o -MF CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o.d -o CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o -c /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src/KETI_Policy.cpp

src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.i"
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src && /home/keti/KETI_BMC/KETI-APP/sysroots/x86_64-oesdk-linux/usr/bin/arm-openbmc-linux-gnueabi/arm-openbmc-linux-gnueabi-g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src/KETI_Policy.cpp > CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.i

src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.s"
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src && /home/keti/KETI_BMC/KETI-APP/sysroots/x86_64-oesdk-linux/usr/bin/arm-openbmc-linux-gnueabi/arm-openbmc-linux-gnueabi-g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src/KETI_Policy.cpp -o CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.s

# Object files for target KETI_Policy
KETI_Policy_OBJECTS = \
"CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o"

# External object files for target KETI_Policy
KETI_Policy_EXTERNAL_OBJECTS =

output/bin/KETI_Policy: src/CMakeFiles/KETI_Policy.dir/KETI_Policy.cpp.o
output/bin/KETI_Policy: src/CMakeFiles/KETI_Policy.dir/build.make
output/bin/KETI_Policy: src/CMakeFiles/KETI_Policy.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable ../output/bin/KETI_Policy"
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/KETI_Policy.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
src/CMakeFiles/KETI_Policy.dir/build: output/bin/KETI_Policy
.PHONY : src/CMakeFiles/KETI_Policy.dir/build

src/CMakeFiles/KETI_Policy.dir/clean:
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src && $(CMAKE_COMMAND) -P CMakeFiles/KETI_Policy.dir/cmake_clean.cmake
.PHONY : src/CMakeFiles/KETI_Policy.dir/clean

src/CMakeFiles/KETI_Policy.dir/depend:
	cd /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src /home/keti/KETI_BMC/KETI-APP/hj/ki/KETI-Policy/src/CMakeFiles/KETI_Policy.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : src/CMakeFiles/KETI_Policy.dir/depend
