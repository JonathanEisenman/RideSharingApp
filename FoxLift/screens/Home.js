import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  Button,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, animateCamera } from 'react-native-maps';
import * as Location from 'expo-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import  MapViewDirections  from 'react-native-maps-directions';
import Constants from 'expo-constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Modal, ModalContent } from 'react-native-modals';
import { mapStyle } from '../globals/MapStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {newUID} from './Launch';

const GOOGLE_MAPS_API_KEY = "AIzaSyBVzXhTkavu5eAiixabE7GYvGpg8X2WPOU";

const SCREEN_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 41.720970,
  longitude: -73.935480,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
  
};

type InputAutoCompleteProps = {
  label: string;
  placeholder: string;
  onPlaceSelected: (data: GooglePlaceData | null, details: GooglePlaceDetail | null) => void;
};

function InputAutoComplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutoCompleteProps) {

  return (
    <>
      <Text> {label} </Text>
      <GooglePlacesAutocomplete
        styles={{textInput: stylesheet.input}}
        placeholder= {placeholder}
        keyboardShouldPersistTaps='always'
        fetchDetails = {true}
        onPress={(data, details = null) => {
       // 'details' is provided when fetchDetails = true
        onPlaceSelected(data, details);
        //console.log(data);
        }}
        onFail={error => console.error(error)}
        query={{
        key: GOOGLE_MAPS_API_KEY, 
        language: 'en',
        components: "country:us"
        }}
      />

    </>
  )
}



//https://www.npmjs.com/package/react-native-google-places-autocomplete
//https://www.npmjs.com/package/react-native-maps-directions
//https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/140

function Home({ navigation }) {

  const [latlng, setLatLng] = useState({});

  //These functions are called when the user selects the google autocomplete place
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [originName, setOriginName] = useState({});
  const [destinationName, setDestinationName] = useState({});

  //Called when user clicks the calculate route button
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();

  const [userRole, setUserRole] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const formatDate = (date) => {
    date = date.toISOString().replace('T',' ').replace('Z','');
    return date;
  };

  const handleConfirm = (date) => {
    date = formatDate(date);
    console.log("A date has been picked: ", date);    
    setDate(date);
    hideDatePicker();
  };

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef?.current.getCamera()
    if (camera) {
      camera.center = position;
      camera.zoom = 15;
      mapRef?.current.animateCamera(camera, {duration: 1000});
    }
  };


  const onPlaceSelected = (
    data: GooglePlaceData | null,
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination") => {
      const set = flag === "origin" ? setOrigin : setDestination
      const setName = flag === "origin" ? setOriginName : setDestinationName
      const position = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      }
      const placeName = data.description
      set(position);
      setName(placeName);
      moveTo(position);
    };

    const edgePaddingValue = 20;

    const edgePadding = {
      top: edgePaddingValue + 300,
      bottom: edgePaddingValue,
      left: edgePaddingValue,
      right: edgePaddingValue,
    }

    const traceRoute = () => {
      if (origin && destination) {
        setShowDirections(true)
        mapRef.current.fitToCoordinates([origin, destination], {edgePadding})
      }
    }

    const traceRouteOnReady = (args: any) => {
      if (args) {
        setDistance(args.distance);
        setDuration(args.duration);
      }
    }


    const createRideShare = () =>  {
      //Only allow to create a ride share when origin and destination are selected
      if (showDirections && date) {
        navigation.navigate('Activity', {
          //screen: 'Upcoming Trip Requests',
        });
        
      //Call to add trip into the database
        postTrips();

      }
      else if (showDirections) {
        Alert.alert('No Date Selected', 'You must select a date before confirm ride.', [
          { text: 'Ok',  },
        ]);
      }
      else if (date) {
        Alert.alert('Route Not Traced', 'You must trace your route before confirming ride.', [
          { text: 'Ok',  },
        ]);
      }
      else {
        Alert.alert('Cannot Confirm Ride', 'You must trace your route and select a date before confirming ride.', [
          { text: 'Ok',  },
        ]);
      }

    }
    
    const postTrips = async()=>{
      fetch("http://10.10.9.188:3000/posttrips",{
        method:"post",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          uID: newUID.toString(),
          destination: destinationName,
          startLocation: originName,
          time: date,
          type: "Ride Share",
        }),
      }).then((res)=>{
        if(res.ok){
          console.log("Trip added to database");
        }
      })
    }

    const postFavorites = async() => {
      if (destination) {
        fetch("http://10.10.9.188:3000/postfavorite",{
        method:"post",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          uID: newUID.toString(),
          location: destinationName,
        }),
      }).then((res)=>{
        if(res.ok){
          console.log("Favorite added to database");
        }
      })
      }
      else {
        Alert.alert('Cannot Add to Favorite', 'You must select a destination in order to add to favorites', [
          { text: 'Ok',  },
        ]);
      }

    }

  const checkPermission =async()=>{
      const hasPermission = await Location.requestForegroundPermissionsAsync();
      if(hasPermission.status === 'granted') {
          const permission = await askPermission();
          return permission
      }
      return true
  };
  
  
  const askPermission = async()=>{
      const permission = await Location.requestForegroundPermissionsAsync()
      return permission.status === 'granted';
  };
  
  
  const getLocation = async()=>{
      try{
          const {granted} = await Location.requestForegroundPermissionsAsync();
          if(!granted)return;
          const {
              coords:{latitude,longitude},
          } = await Location.getCurrentPositionAsync();
          setLatLng({latitude:latitude, longitude:longitude})
      }catch(err){
  
      }
  }

  
const mapRef = useRef(1)

useEffect(()=>{
  checkPermission();
  getLocation()
,[]})

  
    return (
      <SafeAreaView>
        <View style = {{alignItems: "center", justifyContent: "center"}}>
          <MapView
            ref = {mapRef}
            provider = {PROVIDER_GOOGLE}
            style = {stylesheet.map}
            showsUserLocation = {true}
            followsUserLocation = {true}
            rotateEnabled = {true}
            zoomEnabled = {true}
            toolbarEnabled = {true}
            initialRegion = {INITIAL_POSITION}
            >
              {origin && <Marker coordinate={origin} />}
              {destination && <Marker coordinate={destination} />}
              
              {showDirections && origin && destination && <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth = {4}
                strokeColor = "red"
                onReady = {traceRouteOnReady}
              />}

            </MapView>

            <View style = {stylesheet.search}>
              <InputAutoComplete label = "Origin" onPlaceSelected = {(data, details) => {
                onPlaceSelected(data, details, "origin")
              }}/>
                
                <InputAutoComplete label = "Destination" onPlaceSelected = {(data, details) => {
                  onPlaceSelected(data, details, "destination")
                }}/>
                
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress = {showDatePicker}>
                  <Text> Select a Date</Text>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={38}
                    color="red"
                  />
                  </TouchableOpacity>

                  {distance && duration ? (
                  <View> 
                    <Text style = {stylesheet.distanceText}> Distance: {distance.toFixed(2)} miles </Text>
                    <Text style = {stylesheet.durationText}> Duration: {Math.ceil(duration)} min </Text>
                  </View>
                  ): null}

                  <TouchableOpacity onPress = {() => {postFavorites()}}>
                    <Text> Add to Favorites</Text>
                    <MaterialCommunityIcons
                      name="star-circle"
                      size={38}
                      color="red"
                    />
                  </TouchableOpacity>	




              </View>
 


              <View style = {{flexDirection: "row"}}>
              <TouchableOpacity style = {stylesheet.button} onPress = {traceRoute}> 
                <Text style = {stylesheet.buttonText}> Trace Route</Text>
              </TouchableOpacity>



            <TouchableOpacity style = {stylesheet.button} onPress = { () => {createRideShare()}}>
                <Text style = {stylesheet.buttonText}> Confirm Ride</Text>
            </TouchableOpacity>
            </View>   


            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            
            </View>



        </View>

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

  map:{
    //top: 265,
    height: 770,
    marginVertical: 0,
    width:SCREEN_WIDTH,
  },

  search: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    shadowColow: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 0,
    borderWidth: 1,
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
  },

  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    marginTop: 16,
    borderRadius: 4,
    borderWidth: 1,
    width: "50%",
  },

  buttonText: {
    textAlign: "center",
  },

  distanceText: {
    paddingTop: 10,
    textAlign: "center",
  },

  durationText: {
    textAlign: "center",
  }

})

export default Home;