import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Button, 
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';


function Profile({ navigation }) {

	const toSettings = () => {
		navigation.navigate('Settings');
	}

	const toLaunch = () => {
		navigation.navigate('Launch');
	}

	const toTermsConditions = () => {
		navigation.navigate('Terms and Conditions');
	}

	const toAccountInfo = () => {
		navigation.navigate('Account Information');
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
			<View style = {stylesheet.styleContainer}>
				<Text style = {stylesheet.styleTitle}> Sean Ginsberg </Text>
				<Text style = {stylesheet.styleAccountText}>Driver</Text>
				<Text style = {stylesheet.styleAccountText}> seanyg </Text>
				<Text style = {stylesheet.styleAccountText}> seanygberg@gmail.com </Text>
			</View>
			<TouchableOpacity onPress={toAccountInfo}>
				<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Account Information`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={toTermsConditions}>
				<View style = {stylesheet.styleWrapButtonCopy2}>
					<View style = {stylesheet.styleButtonCopy2}>
						<Text style = {stylesheet.styleText}>
						{`Terms and Conditions`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={toLaunch}>
				<View style = {stylesheet.styleWrapButtonCopy3}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Logout`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>


		</SafeAreaView>
	
	
		
	)
}

export function Settings({ navigation }) {

	const backToProfile = () => {
		navigation.navigate('Profile');
	}

	const toLaunch = () => {
		navigation.navigate('Launch');
	}

	const toTermsConditions = () => {
		navigation.navigate('Terms and Conditions');
	}

	return (
		// <SafeAreaView>
		// 	<TextInput style={stylesheet.styleInput}
		// 	placeholder="TestSettings"
		// />
		<SafeAreaView>
		<TouchableOpacity onPress={toTermsConditions}>
				<View style = {stylesheet.styleWrapButtonCopy2}>
					<View style = {stylesheet.styleButtonCopy2}>
						<Text style = {stylesheet.styleText}>
							{`Terms and Conditions`}
						</Text>
					</View>
				</View>	
		</TouchableOpacity>

		<TouchableOpacity onPress={toLaunch}>
				<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Logout`}
						</Text>
					</View>
				</View>	
		</TouchableOpacity>


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

	

	//https://reactnative.dev/docs/handling-text-input
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	return (
		<SafeAreaView>
			<Text>First Name:</Text>
			<TextInput style={stylesheet.styleInput}
			placeholder="First Name"
			/>

			<Text>Last Name:</Text>
			<TextInput style={stylesheet.styleInput}
			placeholder="Last Name"
			/>

			<Text>Email:</Text>
			<TextInput style={stylesheet.styleInput}
			placeholder="Email Address"
			/>

			<Text>Account Name:</Text>
			<TextInput style={stylesheet.styleInput}
			placeholder="Account Name"
			/>

			<Text>Do you have a car?</Text>
			<Switch
        	trackColor={{ false: "#767577", true: "#81b0ff" }}
        	thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        	ios_backgroundColor="#3e3e3e"
        	onValueChange={toggleSwitch}
        	value={isEnabled}
      	/>
			<Button title='Done'
			onPress={backToProfile}
			/>
		</SafeAreaView>
		
	)
}

export function TermsConditions({ navigation }) {
	const backToProfile = () => {
		navigation.navigate('Profile');	
	}
	return (
		<SafeAreaView>
			<Text>WE ARE NOT RESPONSIBLE FOR THINGS THAT CAN GO WRONG DURING A RIDE SHARE!</Text>
			
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
	   top: 300,
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
	top: 400,
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

styleWrapButtonCopy3: {
	position: "absolute",
	left: 0.3571428571428896,
	right: -0.3571428571428896,
	top: 500,
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

styleInput: {
	height: 40,
	margin: 12,
	borderWidth: 1,
	padding: 10
},

styleInput2: {
	height: 40,
	margin: 12,
	borderWidth: 1,
	padding: 10
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

styleContainer: {
	marginTop: 10,
	position: "absolute",
	alignSelf: "center",
	alignItems: "center"
},

styleTitle: {
	fontFamily: "HelveticaNeue",
	fontSize: 36,
	flexWrap: "wrap",
	marginTop: 20,
},

styleAccountText: {
	fontFamily: "HelveticaNeue",
	fontSize: 16,
	flexWrap: "wrap",
	marginBottom: 20,
},

})

export default Profile;
