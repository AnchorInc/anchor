import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes, colors } from '../../config';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // display the notification
        notification
        .android.setChannelId('main-channel')
        .android.setSmallIcon('@drawable/logo')
        .android.setColorized(true)
        .android.setColor(colors.primary.light)
        .android.setAutoCancel(true);
        console.log(notification.android);
        firebase.notifications().displayNotification(notification);
    });
  }

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
    this.notificationListener();
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
