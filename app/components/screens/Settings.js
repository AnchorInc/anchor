import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Settings extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>Settings</Text>
      </View>
    );
  }
}

export { Settings };
