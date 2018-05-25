import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { Header } from '../common';
import ClassList from '../common/ClassList';

const { width, height } = Dimensions.get('window');

class Classes extends Component {
  onPress = (person) => {
    const action = 'Contact';
    this.props.navigation.navigate('TeacherProfile', { person, action });
  }

  navigateProfile = () => {
    const person = this.props.user;
    if (this.props.userType === userTypes.STUDENT) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('TeacherProfile', { person, action: 'Edit Profile' });
    }
  }

  navigateChat = () => {
    this.props.navigation.navigate('ChatsOverview');
  }

  render() {
    return (
      <View style={{ width, height }}>
        <Header title='Home' onPressProfile={() => this.navigateProfile()} onPressChat={() => this.navigateChat()} mainButtons />
        <ClassList onPress={person => this.onPress(person)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let userType;
  if (state.user.user) {
    userType = state.user.user.type;
  }
  return { userType };
};

export default connect(mapStateToProps)(Classes);
