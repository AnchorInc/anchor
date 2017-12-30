import React, { Component } from 'react';
import { ScrollView, View, Text, RefreshControl, Dimensions, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ClassDetail } from './';
import { DARK_GRAY, ACCENT_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class ClassList extends Component {
  state = {
    teachers: [],
    refreshing: false,
    noBatches: true,
    isConnected: true,
  };

  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange.bind(this),
    );
  }

  componentWillReceiveProps(props) {
    this.refresh(props.batchList);
  }

  getTeachersFromBatchList = (batchList) => {
    this.setState({ teachers: [] });
    batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
    .once('value')
    .then(Class => firebase.database().ref(`/users/teachers/${Class.val().Teacher}`)
    .once('value')
    .then((teacher) => {
      this.setState({ teachers: this.state.teachers.concat([teacher.val()]), refreshing: false, noBatches: false });
    })));
  }

  refresh = (batchList) => {
    this.setState({ refreshing: true, isConnected: true });
    if (batchList) {
      this.getTeachersFromBatchList(batchList);
    } else {
      this.setState({ refreshing: false, noBatches: true });
    }
  }

  handleConnectionChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected: true });
    } else {
      this.setState({ isConnected: false, refreshing: false, teachers: [] });
    }
  }

  renderNoBatchMessage = () => {
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

  renderConnectionIssueMessage = () => {
    if (this.state.isConnected) {
      return null;
    }
    this.setState({ refreshing: false });
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
        <Icon size={85} name='signal-wifi-off' color='black' />
        <Text style={{ paddingTop: 10, paddingBottom: 0, color: 'black', fontSize: 20, fontFamily: 'avenir_medium' }}>
          Are you still online?
        </Text>
        <Text style={{ padding: 10, color: '#727272', fontSize: 17, fontFamily: 'avenir_book', textAlign: 'center' }}>
          Better check that.
        </Text>
      </View>
    );
  }

  renderTeachers = () => {
    if (this.state.noBatches) {
      return this.renderNoBatchMessage();
    }
    return this.state.teachers.map(teacher => (
      <ClassDetail key={teacher.UID} person={teacher} onPress={this.props.onPress} />
    ));
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh.bind(this, this.props.batchList)}
            colors={[ACCENT_COLOR]}
            tintColor={DARK_GRAY}
          />
        }
      >
        {this.renderTeachers()}
        {this.renderConnectionIssueMessage()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  let batchList = null;
  if (state.user.user && state.user.user.batchList) {
    batchList = state.user.user.batchList;
  }
  return { batchList };
};

export default connect(mapStateToProps)(ClassList);
