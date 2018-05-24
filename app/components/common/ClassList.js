import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { ClassDetail } from './';

const { width, height } = Dimensions.get('window');

class ClassList extends Component {
  state = {
    teachers: [],
    refreshing: false,
    initialRefresh: false,
  };

  componentWillReceiveProps(props) {
    if (this.state.initialRefresh) return;
    this.refresh(props.batchList);
  }

  getTeachersFromBatchList = (batchList) => {
    this.setState({ teachers: [] });
    batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
    .once('value')
    .then(Class => firebase.database().ref(`/users/teachers/${Class.val().teacher}`)
    .once('value')
    .then((teacher) => {
      this.setState({ teachers: this.state.teachers.concat([teacher.val()]), refreshing: false });
    })));
  }

  refresh = (batchList) => {
    const list = batchList || this.props.batchList;
    this.setState({ refreshing: true });
    if (list) {
      this.getTeachersFromBatchList(list);
    } else {
      this.setState({ refreshing: false });
    }
    if (!this.state.initialRefresh) this.setState({ initialRefresh: true });
  }

  renderNoBatchMessage = () => {
    if (!this.props.batchList) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
          <Icon size={85} name='school' color='#727272' />
          <Text style={{ padding: 10, color: '#727272', fontSize: 15, fontFamily: 'avenir_heavy' }}>
            Sign Up For Classes, To See Them Here
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
        keyExtractor={teacher => teacher.UID}
        ListEmptyComponent={this.renderNoBatchMessage}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
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
