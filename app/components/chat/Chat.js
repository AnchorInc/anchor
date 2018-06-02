import React, { Component } from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { colors } from '../../config';
import { Header } from '../header';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.renderBubble = this.renderBubble.bind(this);
  }

  componentWillMount() {
    this.state = {
      messages: [
        {
          _id: 1,
          text: this.props.navigation.state.params.chat.lastMessage,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: this.props.navigation.state.params.chat.imageURL,
          },
        }, {
          _id: 3,
          text: this.props.navigation.state.params.chat.lastMessage,
          createdAt: new Date(),
          user: {
            _id: 1,
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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          padding: 10,
          left: {
            padding: 10,
            backgroundColor: '#F0F0F0',
            borderBottomLeftRadius: 5,
            borderRadius: 10,
          },
          right: {
            backgroundColor: colors.secondary.normal,
            borderBottomRightRadius: 5,
            borderRadius: 10,
          },
          message: {
            fontFamily: 'avenir_bold',
          },
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title='Chats' />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          user={{
            _id: 2,
          }}
        />
      </View>
    );
  }
}

export { Chat };
