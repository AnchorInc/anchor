import React, { Component } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { Header } from '../common';

class Chat extends Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.state = {
      messages: [
        {
          _id: 1,
          text: this.props.navigation.state.params.chat.lastMessage,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: this.props.navigation.state.params.chat.imageURL,
          },
        },
      ],
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Chats' />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 2,
          }}
        />
      </View>
    );
  }
}

export { Chat };
