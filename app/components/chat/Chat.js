import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ChatBubble, Input } from './';

import { Header } from '../header';

class Chat extends Component {
  state={
    messages: [
      {
        text: this.props.navigation.state.params.chat.lastMessage,
        direction: 'left',
        timeStamp: new Date().getTime(),
        id: '666',
        user: {
          displayName: this.props.navigation.state.params.chat.displayName,
        },
      }, {
        text: 'Thanks Nick!',
        timeStamp: new Date().getTime(),
        direction: 'right',
        id: '589',
        user: {
          displayName: 'You',
        },
      },
    ],
  };

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date().getTime(),
      direction: 'right',
      id: (Math.floor((Math.random() * 1000) + 1)).toString(),
      user: {
        displayName: 'You',
      },
    };
    this.setState({
      messages: this.state.messages.concat([messageData]),
    });
    setTimeout(() => this.list.scrollToEnd({ animated: false }), 200);
  }

  renderMessages = ({ item }) => {
    console.log('Item', item);
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={this.props.navigation.state.params.chat.displayName} />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.state.messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'flex-end', flexGrow: 1 }}
          keyExtractor={message => message.id}
          renderItem={this.renderMessages}
          ref={(ref) => { this.list = ref; }}
        />
        <Input onPress={this.onSend} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(Chat);
