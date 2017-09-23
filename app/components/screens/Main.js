import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '../../navigation/Router';
import { Header } from '../common';
import { Profile, Preferences } from './';

class Main extends Component {
  state = { isProfileVisible: false }

  setProfileVisibleState = (visible) => {
    this.setState({ isProfileVisible: visible });
  }

  setPreferencesState = (value) => {
    this.props.navigation.setParams({ donePref: value });
  }

  renderProfileScreen = () => {
    if (this.state.isProfileVisible) {
      return <Profile onPress={() => this.setProfileVisibleState(false)} profile={this.props.user} />;
    }
    return null;
  }

  renderPreferencesScreen = () => {
    if (!this.props.donePref) {
      return <Preferences onPress={() => this.setPreferencesState(true)} profile={this.props.user} />;
    }
    return null;
  }

  render() {
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

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    donePref: state.user.donePref,
  };
};

export default connect(mapStateToProps)(Main);
