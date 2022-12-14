import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Launch from "./Launch";
import Home from "./Home";
import Activity, { PastRides, UpcomingRides, UserRides } from "./Activity";
import Messages from "./Messages";
import Chat from "./Chat";
import Profile, {Settings, TermsConditions, Favorites} from "./Profile";


//Screen names
const launchName = 'Launch';
const homeName = 'Home';
const activityName = 'Activity';
const messagesName = 'Messages';
const chatName = 'Chat';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const MessagesStack = createStackNavigator();

const ProfileStackScreen = () => (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name = "Profile2" component = {Profile} options={{ headerShown: false }}/>
            <ProfileStack.Screen name = "Favorites" component = {Favorites} />
        </ProfileStack.Navigator>
)

const ActivityStackScreen = () => (
        <ActivityStack.Navigator>
            <ActivityStack.Screen name = "Activity2" component = {Activity} options={{ headerShown: false }}/>
            <ActivityStack.Screen name = "Upcoming Trip Requests" component = {UpcomingRides} />
            <ActivityStack.Screen name = "Past Trip Requests" component = {PastRides} />
            <ActivityStack.Screen name = "Your Trip Requests" component = {UserRides} />
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
            initialRouteName={launchName}
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
                    else if (routeName === chatName) {
                        iconName = focused ? 'message-text' : 'message-text-outline'
                    }
                    else if (routeName === profileName) {
                        iconName = focused ? 'account' : 'account-outline'
                    }
                    else if (routeName === launchName) {
                        iconName = focused ? 'rocket-launch' : 'rocket-launch-outline'
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "grey",
                tabBarLabelStyle: {
                  paddingBottom: 10,
                  fontSize: 10
                },
                tabBarStyle: [
                  {
                    display: "flex"
                  },
                  null
                ]
            })}


            >




                <Tab.Screen name={launchName} component={Launch} />
                <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }}/>
                <Tab.Screen name={activityName} component={ActivityStackScreen} />
                <Tab.Screen name={messagesName} component={Messages} />
                <Tab.Screen name={chatName} component={Chat} />
                <Tab.Screen name={profileName} component={ProfileStackScreen} />

                
                

                
            </Tab.Navigator>




        </NavigationContainer>
    )
}