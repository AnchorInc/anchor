import React, { Component } from 'react';
import { ScrollView, View, Text, RefreshControl, Dimensions, NetInfo } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ClassDetail } from './';
import { getUser } from '../../models/User';
import { DARK_GRAY, ACCENT_COLOR } from '../../config';
import { TeacherProfile } from '../screens';

const { width, height } = Dimensions.get('window');

class ClassList extends Component {
  state = {
    teachers: [],
    refreshing: false,
    messageVisible: false,
    isActivityVisible: false,
    selectedActivity: '',
    isConnected: true,
  };

  componentWillMount() {
    this.getActivityList();
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectionChanged.bind(this),
    );
  }

  getActivityList = () => {
    this.setState({ teachers: [], refreshing: true, isConnected: true });
    const curUser = getUser();
    firebase.database().ref(`/users/students/${curUser.uid}`)
    .once('value')
    .then((response) => {
      return response.val();
    })
    .then((user) => {
      if (user.batchList != null && user.batchList.length >= 1) {
        user.batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
        .once('value')
        .then(Class => firebase.database().ref(`/users/teachers/${Class.val().Teacher}`)
        .once('value')
        .then(teacher => this.setState({ teachers: this.state.teachers.concat([teacher.val()]), refreshing: false, messageVisible: false, isConnected: true }))));
      } else {
        this.setState({ refreshing: false, messageVisible: true, isConnected: true });
      }
    });
  }

  handleConnectionChanged = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected: true });
    } else {
      this.setState({ isConnected: false, refreshing: false, teachers: [] });
    }
  }

  noBatchMessage = () => {
    if (this.state.messageVisible) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
          <Icon size={85} name='library-books' color='black' />
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

  connectionIssueMessage = () => {
    if (!(this.state.isConnected)) {
      this.setState({ refreshing: false });
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
          <Icon size={85} name='signal-wifi-off' color='black' />
          <Text style={{ paddingTop: 10, paddingBottom: 0, color: 'black', fontSize: 20, fontFamily: 'avenir_medium' }}>
            You Are Offline
          </Text>
          <Text style={{ padding: 10, color: '#727272', fontSize: 17, fontFamily: 'avenir_book', textAlign: 'center' }}>
            Please Connect To The Internet And Try Again
          </Text>
        </View>
      );
    }
    return null;
  }

  renderPeople = () => {
    if (this.state.teachers != null && this.state.teachers.length >= 1) {
      return this.state.teachers.map(teacher => (
        <ClassDetail key={teacher.UID} person={teacher} onPress={() => this.setState({ isTeacherVisible: true, selectedTeacher: teacher.UID })} />
      ));
    }
    return null;
  }

  renderTeacher = () => {
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
            onRefresh={() => this.getActivityList()}
            colors={[ACCENT_COLOR]}
            tintColor={DARK_GRAY}
          />
        }
      >
         {this.renderPeople()}
         {this.noBatchMessage()}
         {this.renderTeacher()}
         {this.connectionIssueMessage()}
      </ScrollView>
    );
  }
}

export { ClassList };
