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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {newUID} from './Launch';

const GOOGLE_MAPS_API_KEY = "AIzaSyBVzXhTkavu5eAiixabE7GYvGpg8X2WPOU";

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
	  const [value, onChangeText] = React.useState('');
	  const [isDatePickerVisibleMin, setDatePickerVisibilityMin] = useState(false);
	  const [isDatePickerVisibleMax, setDatePickerVisibilityMax] = useState(false);
		const [dateMin, setDateMin] = useState();
	  const [dateMax, setDateMax] = useState();
		const [userRole, setUserRole] = useState({});
  
		const formatDate = (dateString) => {
			var date = new Date(dateString);
			var currentHelsinkiHoursOffset = -10; 
			var helsenkiOffset = currentHelsinkiHoursOffset*60*60000;
			var userOffset = date.getTimezoneOffset()*60000;
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: 'EST'}
			var helsenkiTime = new Date(date.getTime()+ helsenkiOffset + userOffset).toLocaleDateString(undefined, options);
			return helsenkiTime;
			//return new Date(dateString).toLocaleString();
		  }	  
	
		  const showDatePickerMin = () => {
			setDatePickerVisibilityMin(true);
		  };
	
		  const hideDatePickerMin = () => {
			setDatePickerVisibilityMin(false);
		  };
	
		  const showDatePickerMax = () => {
			setDatePickerVisibilityMax(true);
		  };
	
		  const hideDatePickerMax = () => {
			setDatePickerVisibilityMax(false);
		  };
	
		  const formatDateMin = (dateMin) => {
			dateMin = dateMin.toISOString().replace('T',' ').replace('Z','');
			return dateMin;
		  };
	
		  const formatDateMax = (dateMax) => {
			dateMax = dateMax.toISOString().replace('T',' ').replace('Z','');
			return dateMax;
		  };
	
		const handleConfirmMin = (dateMin) => {
			dateMin = formatDateMin(dateMin);
			console.log("A date has been picked: ", dateMin);    
			setDateMin(dateMin);
			hideDatePickerMin();
		};
	
		const handleConfirmMax = (dateMax) => {
			dateMax = formatDateMax(dateMax);
			console.log("A date has been picked: ", dateMax);    
			setDateMax(dateMax);
			hideDatePickerMax();
		};
		  
		
	
		const initFetchStr = 'http://10.10.9.188:3000/gettrips?isCancelled=0&isCompleted=0';
		var fetchStr = initFetchStr;
		var tempFetchStr = fetchStr;

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	  const getTrips = async () => {
		try {
		 const response = await fetch(fetchStr);
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	 }

	  const filteredTripsDestination = () => {
		if (value != '')
		{
			fetchStr = fetchStr + '&destination=' + value;
		}
		filteredTripsTime();
	 }

	 const filteredTripsTime = () => {
		if (dateMin)
		{
			fetchStr = fetchStr + '&time>=' + dateMin;
		}
		if (dateMax)
		{
			fetchStr = fetchStr + '&time<=' + dateMax;
		}
		getTrips();
		// Set the fetch string back to initial string so that it can be modified again.
		fetchStr = initFetchStr;
		
	 }

	 const resetFilters = () => {
			fetchStr = initFetchStr;
			onChangeText('');
			setDateMax();
			setDateMin();
			getTrips();
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
		  navigation.navigate('Messages');
        }
      })
	}
   
	 useEffect(() => {
	   getTrips();
	 }, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
		<GooglePlacesAutocomplete
		  styles={{textInput: stylesheet.input2}}
		  
		  fetchDetails = {true}
		  onPress={(data, details = null) => {
		 // 'details' is provided when fetchDetails = true
		  onChangeText(data.description);
		  //console.log(data);
		  }}
		  onFail={error => console.error(error)}
		  query={{
		  key: GOOGLE_MAPS_API_KEY, 
		  language: 'en',
		  components: "country:us"
		  }}
		/>

<View style = {{flexDirection:'row'}}>
<TouchableOpacity style = {stylesheet.button} onPress = {showDatePickerMin}>
			<Text style = {{textAlign: 'center'}}> Select Minimum Time </Text>
        </TouchableOpacity>	 

		<TouchableOpacity style = {stylesheet.button} onPress = {showDatePickerMax}>
			<Text style = {{textAlign: 'center'}}> Select Maximum Time </Text>
        </TouchableOpacity>
		</View>

		<DateTimePickerModal
              isVisible={isDatePickerVisibleMin}
              mode="datetime"
              onConfirm={handleConfirmMin}
              onCancel={hideDatePickerMin}
            />
		<DateTimePickerModal
              isVisible={isDatePickerVisibleMax}
              mode="datetime"
              onConfirm={handleConfirmMax}
              onCancel={hideDatePickerMax}
            />	

		<View style = {{flexDirection:'row'}}>
			
		<TouchableOpacity style = {stylesheet.button} onPress = {filteredTripsDestination}> 
                <Text style = {{textAlign: 'center'}}> Filter </Text>
        </TouchableOpacity>	
		<TouchableOpacity style = {stylesheet.button} onPress = {resetFilters}> 
                <Text style = {{textAlign: 'center'}}> Reset Filter </Text>
        </TouchableOpacity>	
		</View>
		<View style = {{height: 330}}>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
				<Text style = {stylesheet.textTrips}>
					{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type}
				</Text>
			</TouchableOpacity>
          )}
        />
		)}
		</View>
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
		var date = new Date(dateString);
			var currentHelsinkiHoursOffset = -10; 
			var helsenkiOffset = currentHelsinkiHoursOffset*60*60000;
			var userOffset = date.getTimezoneOffset()*60000;
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: 'EST'}
			var helsenkiTime = new Date(date.getTime()+ helsenkiOffset + userOffset).toLocaleDateString(undefined, options);
			return helsenkiTime;


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
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
			<Text style = {stylesheet.textTrips}>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type + "\n"}</Text>
          )}
        />
		)}
		</SafeAreaView>
	)
}

export function UserRides({ navigation }) {

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([]);

	const backToActivity = () => {
		navigation.navigate('Activity');
	}

	const formatDate = (dateString) => {
		var date = new Date(dateString);
			var currentHelsinkiHoursOffset = -10; 
			var helsenkiOffset = currentHelsinkiHoursOffset*60*60000;
			var userOffset = date.getTimezoneOffset()*60000;
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: 'EST'}
			var helsenkiTime = new Date(date.getTime()+ helsenkiOffset + userOffset).toLocaleDateString(undefined, options);
			return helsenkiTime;
	}

	const handlePress = (data) => {
		//On cancel ride, put query to the database to update the existing ride and make cancelled true
		//On confirm ride, put query to the database to update existing ride and make completed true
		Alert.alert('Your Rideshare Options', 'What do you want to do with this ride?', [
			{ text: 'Complete Ride', onPress: () => completeRide(data.tID)}, 
			{ text: 'Cancel Ride', onPress: () => cancelRide(data.tID)},
			{ text: 'Close', onPress: () => console.log('Close') },
		  ]); 
		
	}

	const completeRide = (tID) => {
		fetch("http://10.10.9.188:3000/updatetrips?isCompleted=1&tID=" + tID,{
        method:"put",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
      }).then((res)=>{
        if(res.ok){
          console.log("User completed ride.");
		  getUserTrips();
		getCompletedUserTrips();
		getCancelledUserTrips();
        }
      })
	}

	const cancelRide = (tID) => {
		fetch("http://10.10.9.188:3000/updatetrips?isCancelled=1&tID=" + tID,{
        method:"put",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
      }).then((res)=>{
        if(res.ok){
          console.log("User cancelled ride.");
		  getUserTrips();
		getCompletedUserTrips();
		getCancelledUserTrips();
        }
      })
	}

	//getusertrips endpoint for user specific rides
	const getUserTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getusertrips?uID=' + newUID + '&isCompleted=0&isCancelled=0');
		 const json = await response.json();
		 setData(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	const getCompletedUserTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getusertrips?uID=' + newUID + '&isCompleted=1&isCancelled=0');
		 const json = await response.json();
		 setData2(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	const getCancelledUserTrips = async () => {
		try {
		 const response = await fetch('http://10.10.9.188:3000/getusertrips?uID=' + newUID + '&isCompleted=0&isCancelled=1');
		 const json = await response.json();
		 setData3(json);
	   } catch (error) {
		 console.error(error);
	   } finally {
		 setLoading(false);
	   }
	}

	useEffect(() => {
		getUserTrips();
		getCompletedUserTrips();
		getCancelledUserTrips();
		const focusedScreen = navigation.addListener('focus', () => {
			getUserTrips();
		getCompletedUserTrips();
		getCancelledUserTrips();
		  });
	  }, []);

	  
	  return (
		<View style={{ flex: 1, padding: 24 }}>

		<Text>Ongoing Trips:</Text>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
				<Text style = {stylesheet.textTrips}>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type}</Text>
			</TouchableOpacity>
          )}
        />
		)}
		<Text>Completed Trips:</Text>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data2}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
			<Text style = {stylesheet.textTrips}>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type}</Text>
          )}
        />
		)}
		<Text>Cancelled Trips:</Text>
		{isLoading ? <ActivityIndicator/> : (
		<FlatList
          data={data3}
          keyExtractor={({ tID }, index) => tID}
          renderItem={({ item }) => (
			<Text style = {stylesheet.textTrips}>{item.startLocation + ' ' + item.destination + ' ' + formatDate(item.time) + ' '+ item.type}</Text>
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

 input: {
	margin: 15,
	height: 40,
	borderColor: '#7a42f4',
	borderWidth: 1
 },

 button: {
    backgroundColor: "gray",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
	width: '50%',
  },
  textTrips: {
	borderWidth: 1,
	paddingTop: 10,
	paddingBottom: 10,
	
  },
  input2: {
    borderColor: "black",
    borderWidth: 1,
  },

 
 
 })
 
export default Activity;