import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import {newUID} from './Launch';



function Profile({ navigation }) {

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const _listEmptyComponent = () => {
		return (
			<View>
				<Text style = {{padding: 50, alignContent: 'center', textAlign: 'center', fontSize: 18, backgroundColor: '#ffcccb', color: 'black', fontStyle: 'bold'}}>Add favorite locations using the Home page!</Text>
			</View>
		)
	}

	const getProfile = async () => {
		try {
			const response = await fetch('http://10.10.9.188:3000/getusers?uid=' + newUID);
		 	const json = await response.json();
		 	setData(json);
		} catch (error) {
			console.error(error);
		  } finally {
			setLoading(false);
		  }
	}

	useEffect(() => {
		const focusedScreen = navigation.addListener('focus', () => {
			getProfile();
		});
		
	}, []);

	const toSettings = () => {
		navigation.navigate('Settings');
	}

	const toLaunch = () => {
		navigation.navigate('Launch');
	}


	const onPressHandlerActivity = () => {
		navigation.navigate('Activity');
	  }
	
	const toFavorites = () => {
		navigation.navigate('Favorites');
	}
	
	const onPressHandlerMessages = () => {
	navigation.navigate('Messages');
	}
	
	const onPressHandlerHome = () => {
	navigation.navigate('Home');
	}

	const convertDriver = (int) => {
		if (int === 0) {
			return "Passenger";
		} else {
			return "Driver";
		}
	}

	const alertUser = () => {
		Alert.alert('Warning', 'FoxLift IS NOT RESPONSIBLE FOR THINGS THAT CAN GO WRONG DURING A RIDE SHARE!', [
			{ text: 'Ok',  },
		  ]);
	}

	return (
		<SafeAreaView>
			<View style = {stylesheet.styleContainer}>
				<FlatList
				data  = {data}
				keyExtractor={({ uID }, index) => uID}
				renderItem={({ item }) => (
					<React.Fragment>
						<Text style = {stylesheet.styleTitle}> {item.name} </Text>
						<Text style = {stylesheet.styleAccountText}>{convertDriver(item.isDriver)}</Text>
						<Text style = {stylesheet.styleAccountText}> {item.accountName} </Text>
						<Text style = {stylesheet.styleAccountText}> {item.email} </Text>
					</React.Fragment>
				)}
				/>
			</View>
			
			<TouchableOpacity onPress={toFavorites}>
				<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Favorites`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={alertUser}>
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

export function Favorites({ navigation }) {

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getFavorites = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getfavorite?uID=' + newUID);
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	useEffect(() => {
		getFavorites();
	  }, []);

	return (
		<SafeAreaView>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
			<Text style = {stylesheet.textFavorites}>{item.location + "\n"}</Text>
          )}
        />
		)}
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

styleButtonCopy4: {
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

styleWrapButtonCopy4: {
	position: "absolute",
	left: 0.3571428571428896,
	right: -0.3571428571428896,
	top: 200,
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
	textAlign: 'center',
},
textFavorites: {
	borderWidth: 1,
	paddingTop: 10,
	paddingBottom: 10,
	
  },

})

export default Profile;
