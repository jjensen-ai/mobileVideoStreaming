import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './layout/Home';
import Room from './layout/Room';
import OpenRoom from './layout/OpenRoom';

function Navigation() {
  const Stack = createStackNavigator();
  return (

    // Developed the routing system to navigate between pages
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Home}>
        {/* Nav Option to goto Home Screen */}
        <Stack.Screen name='Home' component={Home} options={{
        headerShown: false}}/>
        {/* Nav Option to initialize a meeting */}
        <Stack.Screen name='Room' component={Room} options={{
        title: "Start a Stream",
        headerStyle: {
            backgroundColor: "#1e1e1e",
            shadowOpacity: .5,
            shadowColor: "black",
            shadowOffset: {
              width: 1,
              height: 2
            },
            shadowRadius: 5
        },
        headerTintColor: "#efe"}}/>
        <Stack.Screen name='OpenRoom' component={OpenRoom}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
