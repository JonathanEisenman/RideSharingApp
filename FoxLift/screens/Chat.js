import React, {useState, useEffect, useCallback, Component} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from "react-navigation";
import {newUID} from './Launch';
import { chatUID, friendName } from './Messages';
import { focusProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [value, onChangeText] = React.useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  //Need specific query to fetch messages between current user and other users that are in the same ride
  //Have the same tID in the take table
  const getChat = async () => {
    try {
    const response = await fetch('http://10.10.9.188:3000/getmessagesbetweenusers?uID1=' + newUID + '&uID2=' + chatUID);
    const json = await response.json();
    setData(json);
    } catch (error) {
    console.error(error);
    } finally {
    setLoading(false);
    }

  //   setTimeout(() => {
  //     console.log("5 sec refresh.")
  //     getChat();
  // }, 5000);
  };

  useEffect(() => {
    //getChat();
    const focusedScreen = navigation.addListener('focus', () => {
      getChat();
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return focusedScreen;
  }, []);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
	  };	

    const formatDate2 = (date) => {
			date = date.replace('T',' ').replace('Z','');
      
    return date;
		  }	  
      const formatDate3 = (date) =>{
        var _date = new Date(date);
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: 'EST'}
			var helsenkiTime = new Date(_date.getTime()).toLocaleDateString(undefined, options);
			return helsenkiTime;
      }

  const sendMessage = (messageText) => {
		fetch("http://10.10.9.188:3000/postmessage",{
        method:"post",
        header:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          message: messageText,
          time: formatDate(new Date()),
          senderID: newUID.toString(),
          receiverID: chatUID.toString(),
        }),
      }).then((res)=>{
        if(res.ok){
          console.log("New message created: " + messageText);
          getChat();
          //so the keyboard goes away after clicking send
          Keyboard.dismiss();
          onChangeText('');
        }
      })
	}
  // <TouchableOpacity onPress = {() => sendMessage(value)}> 
  //               <Text> Send </Text>
  //     </TouchableOpacity>	

  const getTextStyle = (message) => {
    if(message.senderID == newUID) {
     return {
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight:10,
      backgroundColor: 'lightblue',
      textAlign: "right"
     }
    } 
    else {
      return {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: "lightgray",
      }
    }
   }


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style = {{textAlign: 'center', fontSize: 18, paddingBottom: 10}}>{friendName}</Text>
      <View style = {{ flexDirection:'row' }}>
      <TextInput style = {stylesheet.input}
               placeholder = ""
               placeholderTextColor = "#9a73ef"
               onChangeText = {text => onChangeText(text)}
			        value={value}
			   />

      <TouchableOpacity onPress = {() => sendMessage(value)}> 
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginTop: 2, marginLeft: 5}}
            size={38}
            color="#2e64e5"
          />
      </TouchableOpacity>	
      </View>

      {isLoading ? <ActivityIndicator/> : (
		<FlatList
          style={{flex: 1}}
          data={data}
          keyExtractor={({ messageID }, index) => messageID}
          renderItem={({ item }) => (
				<Text style = {getTextStyle(item)}>
					{item.message + '\n\n' +  formatDate3(item.time)}
				</Text>
          )}
        />
		)}
    </View>
  )

  //Query will get messages for both users in message object
  //In the user objects: Replace _id: 1 with the message.senderID and _id: 2 with message.recieverID
  //Replace text with message.message
  //Replace createdAt with message.date
  //Will also need to get the user's account name based on their userID for the top of chat
  //And add back button to go back to messages page
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello, this is a test message for FoxLift.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  //Add post query in this function to add each message to the database
  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  // const renderSend = (props) => {
  //   return (
  //     <Send {...props}>
  //       <View>
          // <MaterialCommunityIcons
          //   name="send-circle"
          //   style={{marginBottom: 5, marginRight: 5}}
          //   size={32}
          //   color="#2e64e5"
          // />
  //       </View>
  //     </Send>
  //   );
  // };

  // const renderBubble = (props) => {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         right: {
  //           backgroundColor: '#2e64e5',
  //         },
  //       }}
  //       textStyle={{
  //         right: {
  //           color: '#fff',
  //         },
  //       }}
  //     />
  //   );
  // };

  // const scrollToBottomComponent = () => {
  //   return(
  //     <FontAwesome name='angle-double-down' size={22} color='#333' />
  //   );
  // }

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//     />
//   );
};

export default Chat;

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTrips: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    color: "blue",
  },
  textTrips2: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    color: "gray",
  },
    button: {
      backgroundColor: "gray",
      paddingVertical: 12,
      marginTop: 5,
      borderRadius: 4,
    },

    input: {
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      width: "90%",
     },
});