if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/apple/.gradle/caches/transforms-3/c8b3893ae038971f0bdad83a7eb8b705/transformed/jetified-hermes-android-0.72.1-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/apple/.gradle/caches/transforms-3/c8b3893ae038971f0bdad83a7eb8b705/transformed/jetified-hermes-android-0.72.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

