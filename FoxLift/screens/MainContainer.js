import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Launch from "./Launch";
import Home from "./Home";
import Activity from "./Activity";
import Messages from "./Messages";
import Chat from "./Chat";
import Profile, {AccountInformation, Settings} from "./Profile";


//Screen names
const launchName = 'Launch';
const homeName = 'Home';
const activityName = 'Activity';
const messagesName = 'Messages';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainContainer(){
    
    
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    }
                    else if (routeName === activityName) {
                        iconName = focused ? 'file-document' : 'file-document-outline'
                    }
                    else if (routeName === messagesName) {
                        iconName = focused ? 'message-text' : 'message-text-outline'
                    }
                    else if (routeName === profileName) {
                        iconName = focused ? 'account' : 'account-outline'
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                },
            })}
            
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'grey',
                labelStyle: {paddingBottom: 10, fontSize: 10},
                
            }}

            >
            <Stack.Screen
                name="Settings"
                component={Settings}
                />
                <Stack.Screen
                name="AccountInformation"
                component={AccountInformation}
                />
                <Stack.Screen
                name="Chat"
                component={Chat}

                />


                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={activityName} component={Activity} />
                <Tab.Screen name={messagesName} component={Messages} />
                <Tab.Screen name={profileName} component={Profile} />

                
            </Tab.Navigator>




        </NavigationContainer>
    )
}