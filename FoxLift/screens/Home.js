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
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, animateCamera } from 'react-native-maps';
import * as Location from 'expo-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import  MapViewDirections  from 'react-native-maps-directions';
import Constants from 'expo-constants';

import { mapStyle } from '../globals/MapStyle';

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
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
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
        fetchDetails = {true}
        onPress={(data, details = null) => {
       // 'details' is provided when fetchDetails = true
        onPlaceSelected(details);
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


const origin = {latitude: 41.720970, longitude: -73.935480};
const destination = {latitude: 41.7059237, longitude: -73.9388277};


//https://www.npmjs.com/package/react-native-google-places-autocomplete
//https://www.npmjs.com/package/react-native-maps-directions
//https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/140

function Home({ navigation }) {

  const [latlng, setLatLng] = useState({});

  //These functions are called when the user selects the google autocomplete place
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current.getCamera()
    if (camera) {
      camera.center = position;
      camera.zoom = 15;
      mapRef.current.animateCamera(camera, {duration: 1000});
    }
  };


  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination") => {
      const set = flag === "origin" ? setOrigin : setDestination
      const position = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
        //latitude: parseFloat(details?.geometry.location.lat),
        //longitutde: parseFloat(details?.geometry.location.lng),
      }
      set(position);
      moveTo(position);
    };

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
              
              {origin && destination && <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth = {2}
                strokeColor = "hotpink"
              />}

            </MapView>

            <View style = {stylesheet.search}>
              <InputAutoComplete label = "Origin" onPlaceSelected = {(details) => {
                onPlaceSelected(details, "origin")
              }}/>
              <InputAutoComplete label = "Destination" onPlaceSelected = {(details) => {
                onPlaceSelected(details, "destination")
              }}/>
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
    height: 700,
    marginVertical: 0,
    width:SCREEN_WIDTH*0.92,
  },

  search: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColow: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
  },


})

export default Home;