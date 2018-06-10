import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { ClassesStack } from '../../navigation/Router';
import { notificationListener, notificationOpenedListener } from './';

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.donePref) {
      if (nextProps.userType === userTypes.STUDENT) {
        this.props.navigation.navigate('ProfileEditing');
      } else {
        this.props.navigation.navigate('TeacherSetup');
      }
    }
  }

  componentWillUnmount() {
    notificationListener();
    notificationOpenedListener();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ClassesStack />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  let userType;
  if (state.user.user) {
    userType = state.user.user.type;
    donePref = state.user.user.donePref;
  }
  return { donePref, userType };
};

export default connect(mapStateToProps)(Main);
