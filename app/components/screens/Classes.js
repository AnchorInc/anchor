import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { Header } from '../common';
import ClassList from '../common/ClassList';


class Classes extends Component {
  onPress = (uid) => {
    this.props.navigation.navigate('TeacherProfile', { uid, action: 'forum' });
  }

  navigateProfile = () => {
    if (this.props.user.type === userTypes.STUDENT) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('TeacherProfile', { action: 'account-settings-variant' });
    }
  }

  navigateChat = () => {
    this.props.navigation.navigate('ChatsOverview');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Home' onPressProfile={this.navigateProfile} onPressChat={() => this.navigateChat()} mainButtons />
        <ClassList onPress={person => this.onPress(person)} />
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

export default connect(mapStateToProps)(Classes);
