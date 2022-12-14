import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Button, 
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { CurrentRenderContext } from '@react-navigation/native';

export {newUID};

WebBrowser.maybeCompleteAuthSession();

//https://docs.expo.dev/guides/authentication/#google
//https://docs.expo.dev/versions/latest/sdk/auth-session/
//https://developers.google.com/identity/sign-in/web/server-side-flow

/*
	TODO: 
	(DONE) Chat and Messages functionality: For specifically the current user.
	(Message now displays account names you currently have trips in common with)
	(Chat needs more work. Getting messages, and a text input that also posts messages, I can use a timeout to refresh the get every 5 seconds.)
	(DONE) Filtering upcoming trips by time range.
	Adding favorite destinations: Google autocomplete api viewable and addable by Profile screen. (post in home, get in profile)
	(DONE) Activity Page History: Show specifically the currents user's rides. Touchable opacity: complete ride or cancel ride.
	(DONE) Fix up the weird bugs on launch (double alert message)
	(I think ok) Google places autocomplete weird bug

	Okay so fixing bugs and making it look pretty and adding favorite destinations needs to be done then we good!
	(DONE) Filter button for location should be google places autocomplete so user doesn't have to type in everything.
	(DONE) Your trips update to have two separate gets: Current Rides: Ones not completed or cancelled Past Rides: Ones completed or cancelled.
	Something about mode of transportations.
	(DONE) Add a star icon next to the destination for the button rather than just a set favorite button.
	(DONE) Chat doesn't re-get on open
	(DONE) Inline buttons to remove cluttered screen space


	(DONE) Chat shows account name on top maybe
	Launch make it look better after signing in
	(DONE) set isDriver in launch after logging in
	Home make it look a little better
	Destination post check
	getMessages reload after 5 seconds without blowing up server
*/

var newUID = 0;
var emailDupe = false;
var isIdSet = false;

function Launch({ navigation }) {
	const [accessToken, setAccessToken] = React.useState();
  	const [userInfo, setUserInfo] = React.useState();
  	const [message, setMessage] = React.useState();
	const [data, setData] = useState([]);
	

	const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@jake.vissicchio1/foxlift' };
	const NATIVE_REDIRECT_PARAMS = { native: "com.foxlift.foxlift://" };
	const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;

	//var newUID;
	//var isIdSet = false;

	const [request, response, promptAsync] = Google.useAuthRequest({
		//androidClientId: "",
		iosClientId: "136934915450-20roe1ao7nc18jhu9mk0p6oln3si3n5c.apps.googleusercontent.com",
		expoClientId: "136934915450-4mf17sotm04kp7lflij1ldlnk0im269o.apps.googleusercontent.com",
		redirectUri: AuthSession.makeRedirectUri({ 
			REDIRECT_PARAMS,
			useProxy: true
		}), 
	},
	{ useProxy: true }
	);

	React.useEffect(() => {
		setMessage(JSON.stringify(response));
		if (response?.type === "success") {
		  setAccessToken(response.authentication.accessToken);
		}
	  }, [response]);

	React.useEffect(() => {
		if (emailDupe == false)
		{
		if (userInfo)
		{ 
			//doesEmailExist();
			postUser();
			//getCurrUser();
		}
		}
	  }, []);  
	
	  async function getUserData() {
		let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
		  headers: { Authorization: `Bearer ${accessToken}`}
		});
	
		userInfoResponse.json().then(data => {
		  setUserInfo(data);
		  //doesEmailExist();
		});
	  }

	//   const doesEmailExist = async()=>{
	// 	if (emailDupe == false){
	// 	if (userInfo){
	// 		const response = await fetch('http://10.10.9.188:3000/getusers?email=' + userInfo.email);
	// 	 	const json = await response.json();
	// 		if (json[0].email !== userInfo.email)
	// 		{
	// 			// that email already exists
	// 			emailDupe = true;
	// 			getCurrUser();
	// 		}
	// 		else
	// 		{
    //       		// setData(json[0].email);
	// 			// console.log(data);
	// 	  		// if (data == userInfo.email)
	// 			// {
	// 			// 	emailDupe = true;
	// 			// }
	// 			// else{
	// 			// 	emailDupe = false;
	// 			// }
	// 			emailDupe = false;
	// 			postUser();
	// 		}
    //   	}
	// }
	//}
		

	  const postUser = async()=>{
		if (emailDupe == false){
		if (userInfo){
		const randomName = uniqueNamesGenerator({ dictionaries: [colors, animals] }); // red_donkey for example
		fetch("http://10.10.9.188:3000/postusers",{
		  method:"post",
		  header:{
			Accept:"application/json",
			"Content-Type":"application/json",
		  },
		  body:JSON.stringify({
			name: userInfo.name,
			accountName: randomName,
			isDriver: "0",
			email: userInfo.email,
		  }),
		})
		.then((res)=>{
		  if(res.ok){
			console.log("User added to database");
			getCurrUser();
		  }
		  
		})
	  }}
	  else{}
	}

	  const getCurrUser = async()=>{
		if (isIdSet == false){
		if (userInfo){
			const response = await fetch('http://10.10.9.188:3000/getusers?email=' + userInfo.email);
		 	const json = await response.json();
          	newUID = json[0].uID;
			console.log(newUID);
			//isIdSet = true;
      	}
		  isIdSet = true;
	}
			//navigation.navigate('Home');
			//alert('Welcome' + ' ' + userInfo.email);
		}
		
		const onPressHandler = () => {
			navigation.navigate('Home');
		  }

		const handleUserRole = () => {
			Alert.alert('Select User Role', 'Do you have a car to use for this app?', [
				{ text: 'No',  onPress: () => setUserRole(0)},
				{ text: 'Yes', onPress: () => setUserRole(1)},
			  ]);
		}

		const setUserRole = (num) => {
			if (num == 0) {
				fetch("http://10.10.9.188:3000/updateusers?isDriver=0&uID=" + newUID,{
					method:"put",
					header:{
					  Accept:"application/json",
					  "Content-Type":"application/json",
					},
				  }).then((res)=>{
					if(res.ok){
					  console.log("Not a driver updated.");
					}
				  })
			}
			else {
				fetch("http://10.10.9.188:3000/updateusers?isDriver=1&uID=" + newUID,{
					method:"put",
					header:{
					  Accept:"application/json",
					  "Content-Type":"application/json",
					},
				  }).then((res)=>{
					if(res.ok){
					  console.log("Is a driver updated.");
					}
				  })
			}
		}
		

	  const showUserInfo = () => {
		if (userInfo) {
		postUser();
		//getCurrUser();
		// 	if(isIdSet == false){
		// 	//doesEmailExist();
		// 	//getCurrUser();	
		// 	//if (emailDupe == false)
		// 	//{
		// 		//postUser();
		// 	//}
		// 	//else{}
		// 	//console.log(newUID);
		// 	// return (
		// 	// 	<View>
		// 	// 	  <Image source={{uri: userInfo.picture}} style={stylesheet.profilePic} />
		// 	// 	  <Text>Welcome {userInfo.name}</Text>
		// 	// 	  <Text>{userInfo.email}</Text>
		// 	// 	</View>
		// 	//   );
		// 	// navigation.navigate('Home');
		// 	// alert('Welcome' + ' ' + userInfo.email);
		// }
		return(
			<SafeAreaView>
				<View>
				<Text style = {{padding: 60, alignContent: 'center', textAlign: 'center', fontSize: 18}}>Welcome {userInfo.email}!</Text>
				</View>
				<View style = {{paddingTop: 50, backgroundColor: 'lightgreen'}}>
				<Button title = "Select User Role"
					onPress={handleUserRole}
				/>
				</View>
				<View style = {{padding: 50, backgroundColor: 'lightgreen'}}>
				<Button title='Start Ridesharing!'
					onPress={onPressHandler}
				/>
				</View>
			</SafeAreaView>
		)
		}
		else{
			return(
				<View>
						<Image style = {stylesheet.styleImage1} source = {require("../images/FoxLift-1.png")} />
						  <TouchableOpacity onPress={accessToken ? getUserData : () => { promptAsync({useProxy: true, showInRecents: true}) }}>
								<Image style = {stylesheet.styleImage3} source = {require("../images/signin-button.png")} />
							</TouchableOpacity>
						  <Image style = {stylesheet.styleImage2} source = {{uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/4M4lqady9IW4Adm4wKJB2VTP.png"}}/>
						  </View>
			);
						}
	  }


    return (
      	<SafeAreaView>
                
			{showUserInfo()}

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
	   top: 330,
	   left: 45,
	   borderWidth: 3,
	   borderTopLeftRadius: 15,
	   borderTopRightRadius: 15,
	   borderBottomLeftRadius: 15,
	   borderBottomRightRadius: 15,
	   borderColor: "red",
   },
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
   profilePic: {
    width: 50,
    height: 50,
	alignItems: 'center',
    justifyContent: 'center',
  }


})


export default Launch;