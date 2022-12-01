import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {newUID} from './Launch';
import { chatUID } from './Messages';

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [value, onChangeText] = React.useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //Need specific query to fetch messages between current user and other users that are in the same ride
  //Have the same tID in the take table
  const getMessages = async () => {
    try {
    const response = await fetch('http://10.10.9.188:3000/getmessagesbetweenusers?uID1=' + newUID + '&uID2=' + chatUID);
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
          getMessages();
          onChangeText('');
        }
      })
	}
  // <TouchableOpacity onPress = {() => sendMessage(value)}> 
  //               <Text> Send </Text>
  //     </TouchableOpacity>	



  return (
    <View style={{ flex: 1, padding: 24 }}>
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
          data={data}
          keyExtractor={({ messageID }, index) => messageID}
          renderItem={({ item }) => (
				<Text style = {stylesheet.textTrips}>
					{"Message: " + item.message + '\nTimeStamp: ' +  formatDate2(item.time)}
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