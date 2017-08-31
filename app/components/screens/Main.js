import React, { Component } from 'react';
import { View } from 'react-native';
import { Tabs } from '../../navigation/Router';
import { Header } from '../common';
import Profile from './Profile';
import Preferences from './Preferences';

class Main extends Component {
  state = {
    isProfileVisible: false,
    donPref: this.props.navigation.state.params.donPref,
    profile: this.props.navigation.state.params.profile,
  }

  setProfileVisibleState = (visible) => {
    this.setState({ isProfileVisible: visible });
  }

  setPreferencesState = (value) => {
    this.props.navigation.setParams({ donePref: value });
  }

  renderProfileScreen = () => {
    if (this.state.isProfileVisible) {
      return <Profile onPress={() => this.setProfileVisibleState(false)} profile={this.state.profile} />;
    }
    return null;
  }

  renderPreferencesScreen = () => {
    if (!this.state.navProps.donePref) {
      return <Preferences onPress={() => this.setPreferencesState(true)} profile={this.state.profile} />;
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Anchor' onPress={() => this.setProfileVisibleState(true)} color='#01152d' photoURL={this.state.profile.photoURL} mainButtons />
        {this.renderProfileScreen()}
        {/* {this.renderPreferencesScreen()} */}
        <Tabs />
      </View>
    );
  }
}

export { Main };
