import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Input } from '../common';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  render() {
    return (
      <View style={{ width, height, alignItems: 'center' }}>
        <Input icon="search" label="Search" />
      </View>
    );
  }
}

export { Search };
