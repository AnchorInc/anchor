import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Header } from '../header';
import { ClassList } from './';


class Classes extends Component {
  onPress = (uid) => {
    this.props.navigation.navigate('TeacherProfile', { uid, action: 'forum' });
  }

  navigateProfile = () => {
    this.props.navigation.navigate('StudentProfile');
  }

  navigateChat = () => {
    this.props.navigation.navigate('ChatsOverview');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Home' onPressProfile={() => this.navigateProfile()} onPressChat={() => this.navigateChat()} mainButtons />
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
