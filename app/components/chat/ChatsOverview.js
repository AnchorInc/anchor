import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ChatDetail } from '.';
import { getChats, hideChatBadge } from '../../actions';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };

    this.props.getChats(this.props.user.uid);
  }

  componentDidMount() {
    if (this.props.showChatBadge) {
      this.props.hideChatBadge();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.chats.length === 0) && nextProps.chats) {
      this.state.chats = nextProps.chats;
      this.state.chats[0] = nextProps.chats[0];
      // console.log(this.state.chats[0].timeStamp.toDate());
      // this.state.chats.sort((x, y) => { return y.latestMessage.timeStamp.toDate() - x.latestMessage.timeStamp.toDate(); });
    } else {
      this.state.chats.forEach((chat) => {
        if (chat.teacherId === nextProps.chats[0].teacherId) {
          const index = this.state.chats.indexOf(chat);
          this.state.chats[index] = nextProps.chats[0];
          // console.log(this.state.chats[index].timeStamp.toDate());
          // this.state.chats.sort((x, y) => { return y.latestMessage.timeStamp.toDate() - x.latestMessage.timeStamp.toDate(); });
        }
      });
    }
  }

  navigateChatScreen = (chat) => {
    this.props.navigation.navigate('Chat', { chat });
  }

  renderChats = ({ item }) => {
    if (item && item.latestMessage) {
      return (
        <ChatDetail
          displayName={item.teacherName}
          dialogbox={this.dialogbox}
          imageURL={item.teacherPhotoURL}
          text={item.latestMessage.text}
          timeStamp={item.latestMessage.timeStamp}
          unread={item.latestMessage.unread}
          teacherUID={item.teacherId}
          studentUID={this.props.user.uid}
          onPress={() => {
            const chat = {
              uid: item.teacherId,
              title: item.teacherName,
            };
            this.navigateChatScreen(chat);
          }}
        />
      );
    }
    return null;
  }

  renderNoChatMessage = () => {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 0.77 * height,
        }}
      >
          <Icon size={85} name='forum' color='#727272' />
          <Text style={{
              padding: 10,
              color: '#727272',
              fontSize: 15,
              fontFamily: 'AvenirLTStd-Heavy',
              }}
          >
              No Ongoing Chats
          </Text>
      </View>
    );
}

  render() {
    return (
      <View style={{ backgroundColor: 'white', width, height }}>
        <Header title='Chats' />
        <FlatList
          data={this.state.chats}
          renderItem={this.renderChats}
          keyExtractor={() => (Math.floor((Math.random() * 100000000) + 1)).toString()}
          ListEmptyComponent={this.renderNoChatMessage}
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
  return { user, chats, showChatBadge: state.global.showChatBadge };
};

export default connect(mapStateToProps, { getChats, hideChatBadge })(ChatsOverview);
