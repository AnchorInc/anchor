import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { ClassesStack } from '../../navigation/Router';
import { notificationListener, notificationOpenedListener } from './';

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.donePref) {
      if (nextProps.type === userTypes.STUDENT) {
        this.props.navigation.navigate('ProfileEditing');
      } else if(nextProps.type === userTypes.TEACHER) {
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
  let type;
  if (state.user.user) {
    type = state.user.user.type;
    donePref = state.user.user.donePref;
  }
  return { donePref, type };
};

export default connect(mapStateToProps)(Main);
