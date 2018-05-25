import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Chat extends Component {
  state = {
    chat: this.props.navigation.state.params.chat,
  };

  render() {
    return (
      <View>
        <Text>{this.state.chat.name}</Text>
      </View>
    );
  }
}

export { Chat };
