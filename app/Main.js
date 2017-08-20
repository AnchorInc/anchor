import React, { Component } from 'react';
import { View } from 'react-native';
import { Tabs } from './navigation/Router';
import { Header } from './components/common';
import { Profile } from './components/screens';

class Main extends Component {
  constructor() {
    super();
    this.state = { isProfileVisible: false };
  }

  renderProfileScreen() {
    if (this.state.isProfileVisible) {
      return <Profile onPress={() => this.setState({ isProfileVisible: false })} />;
    }

    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Anchor' onPress={() => { this.setState({ isProfileVisible: true }); }} color='#01152d' mainButtons />
        {this.renderProfileScreen()}
        <Tabs />
      </View>
    );
  }
}

export default Main;
