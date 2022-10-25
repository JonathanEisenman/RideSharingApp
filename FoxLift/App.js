import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Launch from "./screens/Launch";
import Home from "./screens/Home";
import Activity from "./screens/Activity";
import Messages from "./screens/Messages";
import Profile, {AccountInformation, Settings} from "./screens/Profile";
import MainContainer from './screens/MainContainer';
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

//TODO:
//In globals folder create a styles.js file that contains any styles reused in multiple screens
//Also in globals folder create data.js file that contains UI info like messages

function App() {
  return (


    
    <MainContainer></MainContainer>
    
  )
}

export default App;