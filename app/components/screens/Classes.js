import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Header } from '../common';
import ClassList from '../common/ClassList';

const { width, height } = Dimensions.get('window');

class Classes extends Component {
  onPress = (person) => {
    this.props.navigation.navigate('TeacherProfile', { person });
  }

  render() {
    return (
      <View style={{ width, height }}>
        <Header title='Anchor' onPress={() => this.props.navigation.navigate('Profile')} color='#01152d' mainButtons />
        <ClassList onPress={person => this.onPress(person)} />
      </View>
    );
  }
}

export { Classes };
