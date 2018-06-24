import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { ChatDetail, NewChatButton } from './';
import { getChats } from '../../actions';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  componentWillMount() {
    this.props.getChats();
  }

  // navigateChatScreen = (chat) => {
  //   this.props.navigation.navigate('Chat', { chat });
  // }

  renderChats = ({ item }) => {
    return <ChatDetail displayName={item.user.displayName} imageURL={item.user.imageURL} text={item.latestMessage.text} timeStamp={item.latestMessage.timestamp} unread={item.latestMessage.unread} />
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
  return { user, chats };
};

export default connect(mapStateToProps, { getChats })(ChatsOverview);
