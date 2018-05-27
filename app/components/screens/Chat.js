import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Chat extends Component {
  state = {
    chat: this.props.navigation.state.params.chat,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{this.state.chat.displayName}</Text>
      </View>
    );
  }
}

export { Chat };
