import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Tabs } from '../../navigation/Router';
import { Header } from '../common';
import { Profile, Preferences } from './';

class Main extends Component {
  state = { isProfileVisible: false, donePref: false };

  componentWillMount() {
    // check if the user has already filled their preferences
    AsyncStorage.getItem('first_login')
    .then((result) => {
      if (result) {
        this.setState({ donePref: true });
      }
    });
  }

  setProfileVisibleState = (visible) => {
    this.setState({ isProfileVisible: visible });
  }

  renderProfileScreen = () => {
    if (this.state.isProfileVisible) {
      return <Profile onPress={() => this.setProfileVisibleState(false)} />;
    }
    return null;
  }

  renderPreferencesScreen = () => {
    if (!this.state.donePref) {
      return <Preferences />;
    }
    return null;
  }

  render() {
    console.log(this.state.donePref);
    return (
      <View style={{ flex: 1 }}>
        <Header title='Anchor' onPress={() => this.setProfileVisibleState(true)} color='#01152d' mainButtons />
        {this.renderProfileScreen()}
        {/* {this.renderPreferencesScreen()} */}
        <Tabs />
      </View>
    );
  }
}

export default Main;
