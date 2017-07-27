import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>Home</Text>
      </View>
    );
  }
}

export { Home };
