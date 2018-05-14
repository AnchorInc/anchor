import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../config';
import { ClassDetail } from './';

const { width, height } = Dimensions.get('window');

class ClassList extends Component {
  state = {
    teachers: [],
    refreshing: false,
    noBatches: false,
  };

  componentWillReceiveProps(props) {
    this.refresh(props.batchList);
  }

  getTeachersFromBatchList = (batchList) => {
    this.setState({ teachers: [], refreshing: true });
    batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
    .once('value')
    .then(Class => firebase.database().ref(`/users/teachers/${Class.val().teacher}`)
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

  renderNoBatchMessage = () => {
    if (this.state.noBatches) {
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

  renderTeachers = ({ item }) => {
    return <ClassDetail person={item} onPress={this.props.onPress} />;
  }

  render() {
    return (
      <FlatList
        data={this.state.teachers}
        renderItem={this.renderTeachers}
        keyExtractor={item => item.UID}
        ListEmptyComponent={this.renderNoBatchMessage}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh.bind(this, this.props.batchList)}
            colors={[colors.secondary.normal]}
          />
        }
      />
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
