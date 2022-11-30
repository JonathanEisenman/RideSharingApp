import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import styled from 'styled-components';
import {newUID} from './Launch';




function Messages ({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const formatDate = (dateString) => {
		const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"}
		return new Date(dateString).toLocaleDateString(undefined, options)
	  };	

  //Query to messages table based on the user id
  //Will return all of the message information, when user clicks on a certain message there will be another query
  //To display only the message and the date
    const getMessages = async () => {
      try {
      const response = await fetch('http://10.10.9.188:3000/getuserstomessage?uid' + newUID);
      const json = await response.json();
      setMessages(json);
      } catch (error) {
      console.error(error);
      } finally {
      setLoading(false);
      }
    };
  
    useEffect(() => {
      getMessages();
    }, []);

    return (
      <Container>
        <FlatList 
          data={messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.senderID})}>
              <UserInfo>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.senderID}</UserName>
                    <PostTime>{formatDate(item.date)}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.message}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
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