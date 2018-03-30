import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import { Header } from '../common';
import ClassList from '../common/ClassList';

const { width, height } = Dimensions.get('window');

class Classes extends Component {
  onPress = (person) => {
    this.props.navigation.navigate('TeacherProfile', { person });
  }

  navigate = () => {
    const user = this.props.user;
    if (AsyncStorage.getItem('userType') === 'student') {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('TeacherProfile', { user });
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

export { Classes };
