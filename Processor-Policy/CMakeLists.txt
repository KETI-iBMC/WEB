cmake_minimum_required(VERSION 3.25.3)
project(Myapp)


# include 디렉토리 지정
set(INCLUDE_DIRECTORIES "/home/keti/KETI_BMC/KETI-APP/hj/c++_example/include/")

# 소스 파일이 있는 디렉토리 경로 지정
set(SOURCES_DIR "/home/keti/KETI_BMC/KETI-APP/hj/c++_example/src/")
# 소스 파일들을 저장할 변수
set(SOURCES
    ${SOURCES_DIR}main.cpp
    ${SOURCES_DIR}PolicyManager.cpp
    ${SOURCES_DIR}ProcessorPolicy.cpp
    ${SOURCES_DIR}Policy.cpp
)
# 실행 파일 생성 및 소스 파일 추가
add_executable(Myapp ${SOURCES})

# 프로젝트 내의 모든 타겟에 대해 헤더파일 디렉토리 경로 추가
include_directories(${INCLUDE_DIRECTORIES})
