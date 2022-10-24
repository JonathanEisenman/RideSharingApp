import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import styled from 'styled-components';

const ExampleMessages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../images/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hello, this is a test message for FoxLift.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../images/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey, this is a test message for FoxLift.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../images/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey, this is a test message for FoxLift that takes up two lines.',
  },
  {
    id: '4',
    userName: 'Alex Smith',
    userImg: require('../images/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey, this is a test message for FoxLift that takes up two lines.',
  },
  {
    id: '5',
    userName: 'Emma Johnson',
    userImg: require('../images/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey, this is a test message for FoxLift that takes up two lines.',
  },
];

const Messages = ({navigation}) => {
    return (
      <Container>
        <FlatList 
          data={ExampleMessages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
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