import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Tabs } from '../../navigation/Router';
import { Header } from '../common';
import { Preferences } from './';

class Main extends Component {
  onComponentWillMount() {
    this.props.navigation.reset();
  }

  setPreferencesState = (value) => {
    this.props.navigation.setParams({ donePref: value });
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
        <Header title='Anchor' onPress={() => this.props.navigation.navigate('Profile')} color='#01152d' mainButtons />
        {/* {this.renderPreferencesScreen()} */}
        <Tabs />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    donePref: state.user.donePref,
  };
};

export default connect(mapStateToProps)(Main);
