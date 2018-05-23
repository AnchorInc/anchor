import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../common';
import ClassList from '../common/ClassList';

const { width, height } = Dimensions.get('window');

class Classes extends Component {
  onPress = (person) => {
    const action = 'Contact';
    this.props.navigation.navigate('TeacherProfile', { person, action });
  }

  navigate = () => {
    const person = this.props.user;
    const action = 'Edit Profile';
    if (AsyncStorage.getItem('userType') === 'student') {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('TeacherProfile', { person, action });
    }
  }

  render() {
    return (
      <View style={{ width, height }}>
        <Header title='Home' onPress={() => this.navigate()} color='#01152d' mainButtons />
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
