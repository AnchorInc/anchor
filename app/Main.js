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
      return <Profile />;
    }

    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Anchor' onPress={() => { this.setState({ isProfileVisible: true }); }} />
        {/* <ProfileScreen visible={this.state.isProfileVisible} />*/}
        {this.renderProfileScreen()}
        <Tabs />
      </View>
    );
  }
}

export default Main;
