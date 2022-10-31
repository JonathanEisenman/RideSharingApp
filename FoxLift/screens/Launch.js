import React, { useState } from 'react';
import reactDom from 'react-dom';
import {
  StyleSheet,
  View,
  Text,
  Image, 
  Button, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

//https://docs.expo.dev/guides/authentication/#google

function Launch({ navigation }) {

	const [accessToken, setAccessToken] = React.useState();
  	const [userInfo, setUserInfo] = React.useState();
  	const [message, setMessage] = React.useState();

	const [request, response, promptAsync] = Google.useAuthRequest({
		//androidClientId: "",
		iosClientId: "136934915450-20roe1ao7nc18jhu9mk0p6oln3si3n5c.apps.googleusercontent.com",
		expoClientId: "136934915450-4mf17sotm04kp7lflij1ldlnk0im269o.apps.googleusercontent.com"
	});

	React.useEffect(() => {
		setMessage(JSON.stringify(response));
		if (response?.type === "success") {
		  setAccessToken(response.authentication.accessToken);
		}
	  }, [response]);
	
	  async function getUserData() {
		let userInfoResponse = await fetch("", {
		  headers: { Authorization: `Bearer ${accessToken}`}
		});
	
		userInfoResponse.json().then(data => {
		  setUserInfo(data);
		});
	  }

	  function showUserInfo() {
		if (userInfo) {
		  return (
			<View style={styles.userInfo}>
			  <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
			  <Text>Welcome {userInfo.name}</Text>
			  <Text>{userInfo.email}</Text>
			</View>
		  );
		}
	  }

    const onPressHandler = () => {
      navigation.navigate('Home');
    }

    return (
      <SafeAreaView>
                <Image style = {stylesheet.styleImage1} source = {require("../images/FoxLift-1.png")} />
				<TouchableOpacity onPress={accessToken ? getUserData : () => { promptAsync({useProxy: false, showInRecents: true}) }}>
					  <Image style = {stylesheet.styleImage3} source = {require("../images/signin-button.png")} />
			  	</TouchableOpacity>
                <Image style = {stylesheet.styleImage2} source = {{uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/4M4lqady9IW4Adm4wKJB2VTP.png"}}/>
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


})


export default Launch;