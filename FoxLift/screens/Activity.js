import React, { useEffect, useState } from 'react';
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
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import {newUID} from './Launch';

function Activity({ navigation }) {

	const toUpcoming = () => {
		navigation.navigate('Upcoming Trip Requests');
	}


	const toPast = () => {
		navigation.navigate('Past Trip Requests');
	}

	const toUserSpecific = () => {
		navigation.navigate('Your Trip Requests');
	}
	return (
		<SafeAreaView>
			<TouchableOpacity onPress={toPast}>
				<View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Past Trip Requests`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={toUpcoming}>
				<View style = {stylesheet.styleWrapButtonCopy2}>
					<View style = {stylesheet.styleButtonCopy2}>
						<Text style = {stylesheet.styleText}>
							{`Upcoming Trip Requests`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>

			<TouchableOpacity onPress={toUserSpecific}>
				<View style = {stylesheet.styleWrapButtonCopy1}>
					<View style = {stylesheet.styleButtonCopy1}>
						<Text style = {stylesheet.styleText}>
							{`Your Trips`}
						</Text>
					</View>
				</View>	
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export function UpcomingRides({ navigation }) {

	const [isLoading, setLoading] = useState(true);
  	const [data, setData] = useState([]);

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	  const getTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getopentrips?uid=' + newUID);
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	 }

	 const formatDate = (dateString) => {
		const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"}
		return new Date(dateString).toLocaleDateString(undefined, options)
	  }	

	const handlePress = (data) => {
		//On confirm, add the user to the take table where they will have the same tID as the other user in the trip
		//Then the database is queried to get the users that have the same tID and put in a chat together
		Alert.alert('Confirm Rideshare', 'Do you want to be added to this ride?', [
			{
			  text: 'Cancel', onPress: () => console.log('Cancel') },
			{ text: 'Confirm', onPress: () => addToRideShare(data.tID) },
		  ]);
		  console.log(data.startLocation + " " + data.destination + " " + data.time + " " + data.type + " " + data.tID);
		
	}

	const addToRideShare = (tID) => {
		fetch("http://10.10.9.188:3000/jointrips",{
        method:"post",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          uID: newUID.toString(),
		  tID: tID.toString(),
        }),
      }).then((res)=>{
        if(res.ok){
          console.log("User added to existing trip.");
        }
      })
	}
   
	 useEffect(() => {
	   getTrips();
	 }, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			<Button title='Done'
		onPress={backToActivity}
		/>

		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
				<Text>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type + "\n"}</Text>
			</TouchableOpacity>
          )}
        />
		)}
		</View>
	)
}

export function PastRides({ navigation }) {

	const [isLoading, setLoading] = useState(true);
  	const [data, setData] = useState([]);

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric"}
		return new Date(dateString).toLocaleDateString(undefined, options)
	}	 

	const getTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/gettripsor?isCompleted=1&isCancelled=1');
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	useEffect(() => {
		getTrips();
	  }, []);


	return (
		<SafeAreaView>
			<Button title='Done'
		onPress={backToActivity}
		/>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
			<Text>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type + "\n"}</Text>
          )}
        />
		)}
		</SafeAreaView>
	)
}

export function UserRides({ navigation }) {

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric"}
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	const handlePress = (data) => {
		//On cancel ride, post query to the database to update the existing ride and make cancelled true
		Alert.alert('Cancel Rideshare', 'Do you want to cancel this existing ride?', [
			{
			  text: 'Close', onPress: () => console.log('Close') },
			{ text: 'Cancel Ride', onPress: () => console.log('Cancel Ride') },
		  ]);
		 
		
	}

	//getusertrips endpoint for user specific rides
	const getUserTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getusertrips?uid' + newUID);
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	useEffect(() => {
		getUserTrips();
	  }, []);

	  
	  return (
		<View style={{ flex: 1, padding: 24 }}>
			<Button title='Done'
		onPress={backToActivity}
		/>

		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
				<Text>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type + "\n"}</Text>
			</TouchableOpacity>
          )}
        />
		)}
		</View>
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

 
 
 })
 
export default Activity;