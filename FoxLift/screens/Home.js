import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Home({ navigation }) {

    const onPressHandlerActivity = () => {
      navigation.navigate('Activity');
    }
    const onPressHandlerMessages = () => {
      navigation.navigate('Messages');
    }
    const onPressHandlerProfile = () => {
      navigation.navigate('Profile');
    }
  
  
    return (
      <SafeAreaView>
          <SafeAreaView>
                  <Image style = {stylesheet.styleImage1} source = {require("../images/FoxLift-1.png")} />
          </SafeAreaView>
          <TouchableOpacity onPress = {onPressHandlerProfile}>
              <View style = {stylesheet.styleProfileIcon}>
                  <MaterialCommunityIcons name="account" size={48} color="red" />
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress = {onPressHandlerActivity}>
              <View style = {stylesheet.styleActivityIcon}>
                  <MaterialCommunityIcons name="file-document" size={48} color="red" />
              </View>
          </TouchableOpacity>
  
          <TouchableOpacity onPress = {onPressHandlerMessages}>
              <View style = {stylesheet.styleMessagesIcon}>
                  <MaterialCommunityIcons name="android-messages" size={48} color="red" />
              </View>
          </TouchableOpacity>
          
  
          
              <View style = {stylesheet.styleHomeIcon}>
                  <MaterialCommunityIcons name="home" size={48} color="red" />
              </View>
  
  
          </SafeAreaView>
      )
  }
  
  const stylesheet = StyleSheet.create({
	styleImage1: {
	   position: "absolute",
	   alignContent: "center",
	   right: 30,
	   top: 0,
	   borderRadius: 0,
	   width: 400,
	   height: 200,
   },
 
styleProfileIcon: {
	position: "absolute",
	top: 750,
	right: 0,

},

styleActivityIcon: {
	position: "absolute",
	top: 750,
	left: 50,

},

styleHomeIcon: {
	position: "absolute",
	top: 750,
	left: 0,

},

styleMessagesIcon: {
	position: "absolute",
	top: 750,
	right: 50,

},


})

export default Home;