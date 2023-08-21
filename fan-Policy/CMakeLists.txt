# CMake version
cmake_minimum_required(
    VERSION 3.0
)
set(INC_DIR /${ROOT_DIR}/include)
# Project information
# CMake system name must be something like "Linux".
# This is important for cross-compiling.
# Project information
project(
    KETI-Policy
    LANGUAGES CXX
    VERSION 1.0.0
)
set(ROOT_DIR ${CMAKE_CURRENT_SOURCE_DIR})
set(INC_DIR /${ROOT_DIR}/include)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${ROOT_DIR}/output/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${ROOT_DIR}/output/libs)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${ROOT_DIR}/output/libs)
set(CROSS_COMPILE /home/keti/KETI_BMC/KETI-APP/sysroots/x86_64-oesdk-linux/usr/bin/arm-openbmc-linux-gnueabi/arm-openbmc-linux-gnueabi-)
# set( CMAKE_SYSTEM_NAME Linux )
# set( CMAKE_SYSTEM_PROCESSOR arm )
set(GCC ${CROSS_COMPILE}gcc)
set(GPP ${CROSS_COMPILE}g++)
set(CMAKE_C_COMPILER ${GCC})
set(CMAKE_CXX_COMPILER ${GPP})
set(CMAKE_CXX_FLAGS " -Wall -w -DBOOST_LOG_DYN_LINK -Wno-psabi -fpermissive -DMG_ENABLE_SSL -DMG_ENABLE_THREADS -DMG_ENABLE_HTTP_WEBSOCKET=0 -DMG_ENABLE_HTTP_STREAMING_MULTIPART -pthread -std=c++11")
message(STATUS "Compiler")
message(STATUS " - ID       \t: ${CMAKE_CXX_COMPILER_ID}")
message(STATUS " - Version  \t: ${CMAKE_CXX_COMPILER_VERSION}")
message(STATUS " - Path     \t: ${CMAKE_CXX_COMPILER}")
set(POPULATE_SDK_INCLUDE_DIR /home/keti/KETI_BMC/KETI-APP/sysroots/armv7ahf-vfpv4d16-openbmc-linux-gnueabi/usr/include)
set(POPULATE_SDK_LIBRARY_DIR /home/keti/KETI_BMC/KETI-APP/sysroots/armv7ahf-vfpv4d16-openbmc-linux-gnueabi/usr/lib)

set(STATIC_LIBS_DIR ${PROJECT_DIR}/libs)
include_directories(
   ${POPULATE_SDK_INCLUDE_DIR}
   "/home/keti/KETI_BMC/KETI-APP/sysroots/armv7ahf-vfpv4d16-openbmc-linux-gnueabi/usr/include"
   ${INC_DIR}
)

add_subdirectory(src)
