import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Keyboard, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import {newUID} from './Launch';

export {chatUID};
export {friendName};


var chatUID = 0;
var friendName = "";

function Messages ({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const formatDate = (dateString) => {
		var date = new Date(dateString);
			var currentHelsinkiHoursOffset = -10; 
			var helsenkiOffset = currentHelsinkiHoursOffset*60*60000;
			var userOffset = date.getTimezoneOffset()*60000;
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: 'EST'}
			var helsenkiTime = new Date(date.getTime()+ helsenkiOffset + userOffset).toLocaleDateString(undefined, options);
			return helsenkiTime;
	  };	

  const _listEmptyComponent = () => {
      return (
          <View>
              <Text style = {{padding: 50, alignContent: 'center', textAlign: 'center', fontSize: 18, backgroundColor: '#ffcccb', color: 'black', fontStyle: 'bold'}}>Start a rideshare to connect with other users!</Text>
          </View>
      )
  }
  

  //Query to messages table based on the user id
  //Will return all of the message information, when user clicks on a certain message there will be another query
  //To display only the message and the date
    const getMessages = async () => {
      try {
      const response = await fetch('http://10.10.9.188:3000/getuserstomessage?uID=' + newUID);
      const json = await response.json();
      setData(json);
      } catch (error) {
      console.error(error);
      } finally {
      setLoading(false);
      }
    };
  
    useEffect(() => {
      getMessages();
      const focusedScreen = navigation.addListener('focus', () => {
        getMessages();
        // The screen is focused
        // Call any action
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return focusedScreen;
    }, []);


    // Bug: Why is it taking the previous chatUID instead of the current? (FIXED)
    const chatWithUser = (data) => {
      chatUID = data.uID;
      friendName = data.accountName;
      console.log("Friend ID: " + chatUID + " Name: " + friendName);
      navigation.navigate('Chat');
    }

    return (
      <View>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          data={data}
          //ListEmptyComponent={_listEmptyComponent()}
          keyExtractor={({ uID }, index) => uID}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => chatWithUser(item)}>
				    <Text style = {styles.textTrips}>
                {item.accountName}
            </Text>
			      </TouchableOpacity>
            
          )}
          ListEmptyComponent={_listEmptyComponent()}
        />
        )}
    </View>
    );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  textTrips: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 32,
    backgroundColor: "lightgray"
    }
});

const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
`;

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;

`;

const PostTime = styled.Text`
  font-size: 12px;
  color: #666;

`;

const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;