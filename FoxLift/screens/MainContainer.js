import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Launch from "./Launch";
import Home from "./Home";
import Activity, { PastRides, UpcomingRides } from "./Activity";
import Messages from "./Messages";
import Chat from "./Chat";
import Profile, {AccountInformation, Settings, TermsConditions} from "./Profile";


//Screen names
const launchName = 'Launch';
const homeName = 'Home';
const activityName = 'Activity';
const messagesName = 'Messages';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const MessagesStack = createStackNavigator();

const ProfileStackScreen = () => (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name = "Profile" component = {Profile} />
            <ProfileStack.Screen name = "Settings" component = {Settings} />
            <ProfileStack.Screen name = "Account Information" component = {AccountInformation} />
            <ProfileStack.Screen name = "Terms and Conditions" component = {TermsConditions} />
        </ProfileStack.Navigator>
)

const ActivityStackScreen = () => (
        <ActivityStack.Navigator>
            <ActivityStack.Screen name = "Activity" component = {Activity} />
            <ActivityStack.Screen name = "Upcoming Rides" component = {UpcomingRides} />
            <ActivityStack.Screen name = "Past Rides" component = {PastRides} />
        </ActivityStack.Navigator>
)

const MessagesStackScreen = ({navigation}) => {
    <MessagesStack.Navigator>
        <MessagesStack.Screen name = "Messages" component = {Messages} />
        <MessagesStack.Screen name = "Chat" component = {Chat} 
        options={({route}) => ({
        title: route.params.userName,
        })}/>
    </MessagesStack.Navigator>
}

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





                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={activityName} component={ActivityStackScreen} />
                <Tab.Screen name={messagesName} component={Messages} />
                <Tab.Screen name={profileName} component={ProfileStackScreen} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name={launchName} component={Launch} />
                

                
            </Tab.Navigator>




        </NavigationContainer>
    )
}