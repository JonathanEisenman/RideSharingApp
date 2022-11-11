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
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

function Activity({ navigation }) {

	const toUpcoming = () => {
		navigation.navigate('Upcoming Trip Requests');
	}


	const toPast = () => {
		navigation.navigate('Past Trip Requests');
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
		 const response = await fetch('http://10.10.9.188:3000/gettrips');
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
		<View style={{ flex: 1, padding: 24 }}>
			<Button title='Done'
		onPress={backToActivity}
		/>

		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
            <TouchableOpacity>
				<Text>{item.startLocation + ' ' + item.destination + ' ' + item.time + ' '+ item.type + "\n"}</Text>
			</TouchableOpacity>
          )}
        />
		)}
		</View>
	)
}

export function PastRides({ navigation }) {

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	return (
		<SafeAreaView>
			<Button title='Done'
		onPress={backToActivity}
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
 
 
 })
 
export default Activity;