import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { ClassDetail } from '.';

const { width, height } = Dimensions.get('window');

class ClassList extends Component {
  state = {
    teachers: [],
    refreshing: false,
  };

  componentWillReceiveProps(nextProps) {
      this.refresh(nextProps);
  }

  getTeachersFromBatchList = (batchList) => {
    this.setState({ teachers: [] });
    batchList.map((batch) => {
      return firebase.firestore().collection('batches').doc(batch).get()
      .then((teacher) => {
        this.setState({ teachers: this.state.teachers.concat([teacher.data()]), refreshing: false });
      });
    });
  }

  refresh = (props) => {
    const list = (props) ? props.batchList : this.props.batchList;
    console.log(list);
    this.setState({ refreshing: true });
    if (list) {
      this.getTeachersFromBatchList(list);
    } else {
      this.setState({ refreshing: false });
    }
  }

  renderNoBatchMessage = () => {
    if (!this.props.batchList) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width, height: 0.77 * height }}>
          <Icon size={85} name='school' color='#727272' />
          <Text style={{ padding: 10, color: '#727272', fontSize: 15, fontFamily: 'AvenirLTStd-Heavy' }}>
            Sign Up For Classes, To See Them Here
          </Text>
        </View>
      );
    } return null;
  }

  renderTeachers = ({ item }) => {
    return <ClassDetail batch={item} onPress={this.props.onPress} onPressContact={this.props.onPressContact} />;
  }

  render() {
    return (
      <FlatList
        data={this.state.teachers}
        renderItem={this.renderTeachers}
        keyExtractor={teacher => teacher.UID}
        ListEmptyComponent={this.renderNoBatchMessage}
        style={{ paddingBottom: 50 }}
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
