import React from 'react';
import { Home, Menu, OrderCheckout } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '@/theme/Variables';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      headerTintColor: "black",
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.white,
        borderBottomColor: Colors.white,
        shadowOffset: {
          height: 0,
          width: 0
        }
      }
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="OrderCheckout" component={OrderCheckout} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
