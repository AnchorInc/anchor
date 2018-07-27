import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { userTypes } from '../../config';
import { StudentStack, TeacherStack } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    // called when the notification is tapped and the app is in the background
    this.onNotificationOpened = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, senderID, screen } = notificationOpen.notification.data;
      this.openScreen(screen, { uid: senderID, title });
    });

    firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      const { title, senderID, screen } = notificationOpen.notification.data;
      this.openScreen(screen, { uid: senderID, title });
    });
  }

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
    this.onNotificationOpened();
  }

  getStack() {
    if (this.props.type === userTypes.STUDENT) {
      return <StudentStack />;
    } else if (this.props.type === userTypes.TEACHER) {
      return <TeacherStack />;
    }
    return null;
  }

  openScreen = (screen, data = null) => {
    console.log(data);
    if (data) {
      return this.props.navigation.navigate(screen, { chat: data });
    }
    return this.props.navigation.navigate(screen);
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
