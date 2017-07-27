import React, { Component } from 'react';
import { ScrollView, View, Text, RefreshControl, Dimensions } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ActivityDetail } from './';
import { getCurrentUser } from '../../models/User';
import { ACCENT_COLOR } from '../../config';
import { TeacherProfile } from '../screens';

const { width, height } = Dimensions.get('window');

class ActivityList extends Component {
  constructor() {
    super();
    this.state = {
      activities: [],
      refreshing: false,
      messageVisible: false,
      isActivityVisible: false,
      selectedActivity: '',
    };
  }

  componentWillMount() {
    this.getActivityList();
  }

  getActivityList() {
    this.setState({ teachers: [], refreshing: true });
    getCurrentUser()
    .then((currentUser) => {
      if (currentUser.batchList != null && currentUser.batchList.length >= 1) {
        currentUser.batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
        .once('value')
        .then(Class => firebase.database().ref(`/users/teachers/${Class.val().Teacher}`)
        .once('value')
        .then(teacher => this.setState({ teachers: this.state.teachers.concat([teacher.val()]), refreshing: false, messageVisible: false }))));
      } else {
        this.setState({ refreshing: false, messageVisible: true });
      }
    });
  }

  renderPeople() {
    if (this.state.teachers != null && this.state.teachers.length >= 1) {
      return this.state.teachers.map(teacher => (
        <ActivityDetail key={teacher.UID} person={teacher} onPress={() => this.setState({ isTeacherVisible: true, selectedTeacher: teacher.UID })} />
      ));
    }
    return null;
  }

  renderMessage() {
    if (this.state.messageVisible) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
          <Icon size={85} name='notebook' color='black' />
          <Text style={{ paddingTop: 10, paddingBottom: 0, color: 'black', fontSize: 20, fontFamily: 'avenir_medium' }}>
            You Are Not Enrolled In Any Class
          </Text>
          <Text style={{ padding: 10, color: '#727272', fontSize: 17, fontFamily: 'avenir_book' }}>
            Search For Tutors Near You
          </Text>
        </View>
      );
    }
    return null;
  }

  renderTeacher() {
    if (this.state.isTeacherVisible) {
      return (
        <TeacherProfile visible={this.state.isTeacherVisible} uid={this.state.selectedTeacher} onPress={() => this.setState({ isTeacherVisible: false })} />
      );
    }
    return null;
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getActivityList.bind(this)}
            colors={[ACCENT_COLOR]}
            tintColor={ACCENT_COLOR}
          />
        }
      >
         {this.renderPeople()}
         {this.renderMessage()}
         {this.renderTeacher()}
      </ScrollView>
    );
  }
}

export { ActivityList };
