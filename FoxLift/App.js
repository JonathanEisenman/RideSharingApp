

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  ScrollView,
  Button, 
  Alert, 
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createStackNavigator();

function Launch({ navigation }) {

  const onPressHandler = () => {
    navigation.navigate('Home');
  }

  return (
	<SafeAreaView>
		
		<Button
			title='Home'
			onPress = {onPressHandler}
		/>
		<SafeAreaView>
				<Image style = {stylesheet.styleImage1} source = {require("./images/FoxLift-1.png")} />
				<Image style = {stylesheet.styleImage3} source = {require("./images/googleButton.png")} />
				<Image style = {stylesheet.styleImage2} source = {{uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/4M4lqady9IW4Adm4wKJB2VTP.png"}}/>
		</SafeAreaView>
		<TouchableOpacity onPress={onPressHandler}>
		<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Login`}
						</Text>
					</View>
				</View>	
		</TouchableOpacity>
		
		<TouchableOpacity onPress={onPressHandler}>
							<View style = {stylesheet.styleWrapButtonCopy1}>
					<View style = {stylesheet.styleButtonCopy1}>
						<Text style = {stylesheet.styleTextCopy1}>
							{`Register`}
						</Text>
					</View>
				</View>
		</TouchableOpacity>
	
		</SafeAreaView>
	)

}

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
				<Image style = {stylesheet.styleImage1} source = {require("./images/FoxLift-1.png")} />
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

function Activity({ navigation }) {
	return (
		<SafeAreaView>
			<Text> Activity Screen</Text>
		</SafeAreaView>
	)
}

function Messages({ navigation }) {
	return (
		<SafeAreaView>
			<Text> Messages Screen</Text>
		</SafeAreaView>
	)
}

function Profile({ navigation }) {

	const toSettings = () => {
		navigation.navigate('Settings');
	}

	const toResetPass = () => {
		navigation.navigate('ResetPassword');
	}

	const toAccountInfo = () => {
		navigation.navigate('AccountInformation');
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

			<TouchableOpacity onPress={toResetPass}>
				<View style = {stylesheet.styleWrapButtonCopy1}>
					<View style = {stylesheet.styleButtonCopy1}>
						<Text style = {stylesheet.styleTextCopy1}>
							{`Reset Password`}
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
		</SafeAreaView>
	
	
		
	)
}

function Settings({ navigation }) {

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

function ResetPassword({ navigation }) {

	const backToProfile = () => {
		navigation.navigate('Profile');
	}

	return (
		<SafeAreaView>
			<TextInput style={stylesheet.styleInput}
			placeholder="TestPassword"
			/>

		<Button title='Done'
		onPress={backToProfile}
		/>
	</SafeAreaView>

	)



}

function AccountInformation({ navigation }) {

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
		  name='ResetPassword'
		  component={ResetPassword}
		/>
		<Stack.Screen
		 name="AccountInformation"
		 component={AccountInformation}
		/>
      </Stack.Navigator>
    </NavigationContainer>
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
   styleImage2: {
	   position: "absolute",
	   alignContent: "center",
	   left: 60,
	   top: 550,
	   borderRadius: 0,
	   width: 284,
	   height: 142,
   },
   styleImage3: {
	   position: "absolute",
	   alignContent: "center",
	   top: 460,
	   left: 18,
   },
   styleText: {
	   flexBasis: 0,
	   flexGrow: 1,
	   width: "auto",
	   color: "rgba(249, 249, 249, 1)",
	   fontSize: 16,
	   fontFamily: "SFProDisplay_400Regular",
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
	   fontFamily: "SFProDisplay_400Regular",
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
   styleIcon: {
	   position: "absolute",
	   left: 16,
	   top: 16,
	   textAlign: "center",
   },
   stylePreset: {
	   position: "absolute",
	   left: 1.7142857142857792,
	   right: -1.7142857142857792,
	   top: 208.00000000000006,
	   width: "auto",
	   height: "auto",
	   display: "flex",
	   flexDirection: "column",
	   justifyContent: "center",
	   alignItems: "center",
	   padding: 16,
	   backgroundColor: "rgba(255, 255, 255, 1)",
   },

   styleActivityButton2: {
	width: "70%",
	height: "auto",
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	padding: 12,
	borderRadius: 10,
	backgroundColor: "red",
},
styleWrapActivityButton: {
	position: "absolute",
	left: 0,
	top: 750,
	width: "auto",
	height: "auto",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",

},

styleInput: {
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


})

export default App;