

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Launch from "./screens/Launch";
import Home from "./screens/Home";
import Activity from "./screens/Activity";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile"
import {AccountInformation, Settings} from "./screens/Profile";


const Stack = createStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: () => null
        // }}
      >
        <Stack.Screen
          name="Launch"
          component={Launch}
        // options={{
        //   header: () => null
        // }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
		<Stack.Screen
		name="Activity"
		component={Activity}
		/>
		<Stack.Screen
		name="Messages"
		component={Messages}
		/>
		<Stack.Screen
		  name="Profile"
		  component={Profile}
		/>
		<Stack.Screen
		  name='Settings'
		  component={Settings}
		/>
		<Stack.Screen
		 name="AccountInformation"
		 component={AccountInformation}
		/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;