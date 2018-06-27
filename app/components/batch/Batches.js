import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Header } from '../header';


class Batches extends Component {
  navigateProfile = () => {
    this.props.navigation.navigate('TeacherProfile', { action: 'account-settings-variant' });
  }

  navigateChat = () => {
    this.props.navigation.navigate('ChatsOverview');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Home' onPressProfile={this.navigateProfile} onPressChat={() => this.navigateChat()} mainButtons />
        <Text>Change</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(Batches);
