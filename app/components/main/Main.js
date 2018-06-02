import React, { Component } from 'react';
import firebase, { } from 'react-native-firebase';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { userTypes, colors } from '../../config';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // set up the notification
        notification
        .android.setSmallIcon('@drawable/logo')
        .android.setColorized(true)
        .android.setColor(colors.primary.light)
        .android.setAutoCancel(true);

        if (!notification.android.channelId) {
          notification.android.setChannelId('misc-channel');
        } else {
          const remoteInput = new firebase.notifications.Android.RemoteInput('input');
          remoteInput.setLabel('Reply');

          const action = new firebase.notifications.Android.Action('reply', 'check-mark', 'reply');
          action
          .setSemanticAction(firebase.notifications.Android.SemanticAction.Reply)
          .addRemoteInput(remoteInput);

          notification
          .android.addAction(action);
        }

        // display the notification
        firebase.notifications().displayNotification(notification);
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // get the user input
      const results = notificationOpen.results;
      console.log(results.input);

      // action that is being triggered
      const action = notificationOpen.action;
      console.log(action);

      // get the notification info
      const notification = notificationOpen.notification;
      console.log(notification.android);
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
