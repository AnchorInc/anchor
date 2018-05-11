import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ListDetail } from './';

const { width } = Dimensions.get('window');

class BatchDetail extends Component {
  state = {
    location: '',
    timing: '',
    spaceAvailable: '',
  };

  componentWillMount() {
    firebase.database().ref(`/batches/${this.props.batch}`)
      .once('value')
      .then(batch => this.setState({
        location: batch.val().Location,
        timing: batch.val().Timing,
        spaceAvailable: batch.val().SpaceAvailable,
      }));
  }

  render() {
    return (
      <ListDetail contentText={this.state.email}>
          <Icon name='clock' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
          <View>
            <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.timing}</Text>
            <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
          </View>
      </ListDetail>
    );
  }
}

export { BatchDetail };
