import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Button, 
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Profile({ navigation }) {

	const toSettings = () => {
		navigation.navigate('Settings');
	}


	const toAccountInfo = () => {
		navigation.navigate('AccountInformation');
	}

	const onPressHandlerActivity = () => {
		navigation.navigate('Activity');
	  }
	  const onPressHandlerMessages = () => {
		navigation.navigate('Messages');
	  }
	  const onPressHandlerHome = () => {
		navigation.navigate('Home');
	  }

	return (
		<SafeAreaView>
			<TouchableOpacity onPress={toAccountInfo}>
				<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Account Information`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={toSettings}>
				<View style = {stylesheet.styleWrapButtonCopy2}>
					<View style = {stylesheet.styleButtonCopy2}>
						<Text style = {stylesheet.styleText}>
							{`Settings`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress = {onPressHandlerHome}>
			<View style = {stylesheet.styleHomeIcon}>
				<MaterialCommunityIcons name="home" size={48} color="red" />
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

		<View style = {stylesheet.styleProfileIcon}>
				<MaterialCommunityIcons name="account" size={48} color="red" />
		</View>


		</SafeAreaView>
	
	
		
	)
}

export function Settings({ navigation }) {

	const backToProfile = () => {
		navigation.navigate('Profile');
	}

	return (
		<SafeAreaView>
			<TextInput style={stylesheet.styleInput}
			placeholder="TestSettings"
		/>

		<Button title='Done'
		onPress={backToProfile}
		/>
	</SafeAreaView>


	)



}


export function AccountInformation({ navigation }) {

	const backToProfile = () => {
		navigation.navigate('Profile');
	}

	return (
		<SafeAreaView>
			<TextInput style={stylesheet.styleInput}
			placeholder="TestAccount"
			/>

			<Button title='Done'
			onPress={backToProfile}
			/>
		</SafeAreaView>
		
	)
}


const stylesheet = StyleSheet.create({

   styleText: {
	   flexBasis: 0,
	   flexGrow: 1,
	   width: "auto",
	   color: "rgba(249, 249, 249, 1)",
	   fontSize: 16,
	   letterSpacing: -0.5,
	   fontStyle: "normal",
	   fontWeight: "500",
	   textAlign: "center",
	   height: "auto",
	   lineHeight: 18.8,
   },
   styleButton: {
	   width: "100%",
	   height: "auto",
	   display: "flex",
	   flexDirection: "row",
	   justifyContent: "center",
	   alignItems: "center",
	   padding: 12,
	   borderRadius: 10,
	   backgroundColor: "red",
   },
   styleWrapButton: {
	   position: "absolute",
	   left: 0.3571428571428896,
	   right: -0.3571428571428896,
	   top: 388.42857142857116,
	   width: "auto",
	   height: "auto",
	   display: "flex",
	   flexDirection: "column",
	   justifyContent: "center",
	   alignItems: "center",
	   paddingTop: 12,
	   paddingRight: 16,
	   paddingBottom: 12,
	   paddingLeft: 16,
   },
   styleTextCopy1: {
	   flexBasis: 0,
	   flexGrow: 1,
	   width: "auto",
	   color: "rgba(249, 249, 249, 1)",
	   fontSize: 16,
	   letterSpacing: -0.5,
	   fontStyle: "normal",
	   fontWeight: "500",
	   textAlign: "center",
	   height: "auto",
	   lineHeight: 18.8,
   },
   styleButtonCopy1: {
	   width: "100%",
	   height: "auto",
	   display: "flex",
	   flexDirection: "row",
	   justifyContent: "center",
	   alignItems: "center",
	   padding: 12,
	   borderRadius: 10,
	   backgroundColor: "red",
   },
   styleWrapButtonCopy1: {
	   position: "absolute",
	   left: 0.3571428571428896,
	   right: -0.3571428571428896,
	   top: 321.4285714285712,
	   width: "auto",
	   height: "auto",
	   display: "flex",
	   flexDirection: "column",
	   justifyContent: "center",
	   alignItems: "center",
	   paddingTop: 12,
	   paddingRight: 16,
	   paddingBottom: 12,
	   paddingLeft: 16,
   },
   styleButtonCopy2: {
	width: "100%",
	height: "auto",
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	padding: 12,
	borderRadius: 10,
	backgroundColor: "red",
},
styleWrapButtonCopy2: {
	position: "absolute",
	left: 0.3571428571428896,
	right: -0.3571428571428896,
	top: 254.4285714285712,
	width: "auto",
	height: "auto",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	paddingTop: 12,
	paddingRight: 16,
	paddingBottom: 12,
	paddingLeft: 16,
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

export default Profile;