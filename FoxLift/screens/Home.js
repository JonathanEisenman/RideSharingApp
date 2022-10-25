import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { mapStyle } from '../globals/MapStyle';

const SCREEN_WIDTH = Dimensions.get('window').width;


function Home({ navigation }) {

  const [latlng,setLatLng] = useState({})

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
          const {granted} =await Location.requestForegroundPermissionsAsync();
          if(!granted)return;
          const {
              coords:{latitude,longitude},
          } = await Location.getCurrentPositionAsync();
          setLatLng({latitude:latitude,longitude:longitude})
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
            customMapStyle = {mapStyle}
            showsUserLocation = {true}
            followsUserLocation = {true}
            rotateEnabled = {true}
            zoomEnabled = {true}
            toolbarEnabled = {true}
            >

          </MapView>
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
    height: 250,
    marginVertical: 0,
    width:SCREEN_WIDTH*0.92
  },


})

export default Home;