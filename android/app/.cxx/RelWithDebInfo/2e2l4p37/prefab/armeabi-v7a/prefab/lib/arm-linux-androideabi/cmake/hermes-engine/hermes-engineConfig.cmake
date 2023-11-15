if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/apple/.gradle/caches/transforms-3/8b29f19bb67b80646e86b5a003e5c90f/transformed/jetified-hermes-android-0.72.1-release/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/apple/.gradle/caches/transforms-3/8b29f19bb67b80646e86b5a003e5c90f/transformed/jetified-hermes-android-0.72.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

