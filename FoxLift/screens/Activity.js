import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Button, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function Activity({ navigation }) {

	const onPressHandlerProfile = () => {
		navigation.navigate('Profile');
	  }
	  const onPressHandlerMessages = () => {
		navigation.navigate('Messages');
	  }
	  const onPressHandlerHome = () => {
		navigation.navigate('Home');
	  }

	return (
		<SafeAreaView>

			<TouchableOpacity onPress = {onPressHandlerHome}>
			<View style = {stylesheet.styleHomeIcon}>
				<MaterialCommunityIcons name="home" size={48} color="red" />
			</View>
		</TouchableOpacity>
		
		<TouchableOpacity onPress = {onPressHandlerMessages}>
			<View style = {stylesheet.styleMessagesIcon}>
				<MaterialCommunityIcons name="android-messages" size={48} color="red" />
			</View>
		</TouchableOpacity>

		<TouchableOpacity onPress = {onPressHandlerProfile}>
			<View style = {stylesheet.styleProfileIcon}>
				<MaterialCommunityIcons name="account" size={48} color="red" />
			</View>
		</TouchableOpacity>

		<View style = {stylesheet.styleActivityIcon}>
				<MaterialCommunityIcons name="file-document" size={48} color="red" />
		</View>


		</SafeAreaView>
	)
}


const stylesheet = StyleSheet.create({

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

export default Activity;