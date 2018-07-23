import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { StudentStack, TeacherStack } from '../../navigation/Router';
import { onNotifications, notificationOpenedListener, getInitialNotification } from './';

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.donePref) {
      if (nextProps.type === userTypes.STUDENT) {
        this.props.navigation.navigate('StudentProfileEditing');
      } else if (nextProps.type === userTypes.TEACHER) {
        this.props.navigation.navigate('TeacherProfileEditing');
      } else {
        console.log('User is not student or teacher!');
      }
    }
  }

  componentWillUnmount() {
    onNotifications();
    notificationOpenedListener(this.props.navigation);
    getInitialNotification(this.props.navigation);
  }

  getStack() {
    if (this.props.type === userTypes.STUDENT) {
      return <StudentStack />;
    } else if (this.props.type === userTypes.TEACHER) {
      return <TeacherStack />;
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.getStack()}
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
