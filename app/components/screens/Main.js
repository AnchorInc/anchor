import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        console.log(notification.android);
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // display the notification
        notification.android.setChannelId('main-channel');
        firebase.notifications().displayNotification(notification);
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const notification = notificationOpen.notification;
      // console.log(notification.android.channelId);
      console.log(notification.body);
      console.log(notification.android);
      console.log(notification.data);
      console.log(notification.android.channelId);
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
    this.notificationOpenedListener();
    this.notificationDisplayedListener();
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
