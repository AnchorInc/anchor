import React, { Component } from 'react';
import ClassList from '../common/ClassList';

class Classes extends Component {
  onPress = (uid) => {
    this.props.navigation.navigate('TeacherProfile', { uid });
  }

  render() {
    return (
      <ClassList onPress={uid => this.onPress(uid)} />
    );
  }
}

export { Classes };
