import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ClassesStack } from '../../navigation/Router';
import { Header } from '../common';

class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Anchor' onPress={() => this.props.navigation.navigate('Profile')} color='#01152d' mainButtons />
        <ClassesStack />
      </View>
    );
  }
}

export default connect()(Main);
