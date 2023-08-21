
set(
    OUTPUT
    KETI_Policy
)
set(
    SOURCE_FILES
    KETI_Policy.cpp
    
    )

add_executable(${OUTPUT} ${SOURCE_FILES})

target_link_libraries( ${OUTPUT}
    pthread
    boost_system
    boost_log
    boost_log_setup
    boost_thread
    sqlite3
    )