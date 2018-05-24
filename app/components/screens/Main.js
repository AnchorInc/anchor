import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes } from '../../config';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(() => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('notification displayed');
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // display the notification
        notification
        .android.setChannelId('channelId')
        .android.setBadgeIconType();
        firebase.notifications().displayNotification(notification);
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log(action);
        console.log(notification);
    });
    this.appOpenedByNotification();
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
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  appOpenedByNotification = () => {
    firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;

        console.log(action);
        console.log(notification);
      }
    });
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
