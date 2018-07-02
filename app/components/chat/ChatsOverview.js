import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { ChatDetail, NewChatButton } from './';
import { getChats } from '../../actions';
import { userTypes } from '../../config';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  componentWillMount() {
    this.props.getChats(this.props.user.uid);
  }

  // navigateChatScreen = (chat) => {
  //   this.props.navigation.navigate('Chat', { chat });
  // }

  renderChats = ({ item }) => {
    return (
      <ChatDetail
        displayName={(this.props.user.type === userTypes.STUDENT) ? item.teacherName : item.studentName}
        imageURL={(this.props.user.type === userTypes.STUDENT) ? item.teacherPhotoURL : item.studentPhotoURL}
        text={'hello'}
        timeStamp={Date.now()}
        unread
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', width, height }}>
        <Header title='Chats' />
        <FlatList
          data={this.props.chats}
          renderItem={this.renderChats}
          keyExtractor={chat => chat.id}
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        />
        <NewChatButton icon='plus' />
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
  console.log(chats);
  return { user, chats };
};

export default connect(mapStateToProps, { getChats })(ChatsOverview);
