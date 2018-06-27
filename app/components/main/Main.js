import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { StudentStack, TeacherStack } from '../../navigation/Router';
import { notificationListener, notificationOpenedListener } from './';

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.donePref) {
      if (nextProps.type === userTypes.STUDENT) {
        this.props.navigation.navigate('StudentProfileEditing');
      } else if (nextProps.type === userTypes.TEACHER) {
        this.props.navigation.navigate('TeacherProfileEditing');
      }
    }
  }

  componentWillUnmount() {
    notificationListener();
    notificationOpenedListener();
  }

  getStack() {
    if (this.props.type === userTypes.STUDENT) {
      return <StudentStack />;
    } else if (this.props.type === userTypes.TEACHER) {
      return <TeacherStack />;
    }
    console.log('No user logged in');
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.getStack() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  let type;
  if (state.user.user) {
    type = state.user.user.type;
    donePref = state.user.user.donePref;
  }
  return { donePref, type };
};

export default connect(mapStateToProps)(Main);
