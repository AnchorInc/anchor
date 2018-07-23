import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';

import { ChatDetail } from './';
import { getChats } from '../../actions';
import { userTypes } from '../../config';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };

    this.props.getChats(this.props.user.uid);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ chats: this.state.chats.concat(nextProps.chats) });
  }

  navigateChatScreen = (chat) => {
    this.props.navigation.navigate('Chat', { chat });
  }

  renderChats = ({ item }) => {
    return (
      <ChatDetail
        displayName={(this.props.user.type === userTypes.STUDENT) ? item.teacherName : item.studentName}
        dialogbox={this.dialogbox}
        imageURL={(this.props.user.type === userTypes.STUDENT) ? item.teacherPhotoURL : item.studentPhotoURL}
        text={item.latestMessage.text}
        timeStamp={item.latestMessage.timeStamp}
        unread={item.latestMessage.unread}
        teacherUID={item.teacherId}
        studentUID={item.studentId}
        onPress={() => {
          const chat = {
            uid: (this.props.user.type === userTypes.STUDENT) ? item.teacherId : item.studentId,
            title: (this.props.user.type === userTypes.STUDENT) ? item.teacherName : item.studentName,
          };
          this.navigateChatScreen(chat);
        }}
      />
    );
  }

  render() {
    console.log(this.state.chats);
    return (
      <View style={{ backgroundColor: 'white', width, height }}>
        <Header title='Chats' />
        <FlatList
          data={this.state.chats}
          renderItem={this.renderChats}
          keyExtractor={() => (Math.floor((Math.random() * 100000000) + 1)).toString()}
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }

}


const mapStateToProps = (state) => {
  let user;
  let chats;
  if (state.user.user) {
    user = state.user.user;
  }
  if (state.chat.chats) {
    chats = state.chat.chats;
  }
  return { user, chats };
};

export default connect(mapStateToProps, { getChats })(ChatsOverview);
