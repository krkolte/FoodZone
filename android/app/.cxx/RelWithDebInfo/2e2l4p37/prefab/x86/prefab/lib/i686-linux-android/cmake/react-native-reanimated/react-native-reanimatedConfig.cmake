if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated INTERFACE IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    INTERFACE_INCLUDE_DIRECTORIES "/Users/apple/Documents/Projects/RN_PROJECTS/SenseHawk/FoodZone/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

