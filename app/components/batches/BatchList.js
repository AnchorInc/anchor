import React, { Component } from 'react';
import {
    View, Text, Dimensions, FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BatchDetail } from '.';

const { width, height } = Dimensions.get('window');

class BatchList extends Component {
  state = {
      batches: [],
  };

  componentDidMount() {
     this.getBatches();
  }

  getBatches = () => {
    firebase.firestore().collection('batches')
        .where('teacherUID', '==', this.props.teacherUID).get()
        .then((batches) => {
           batches.forEach((batch) => {
               console.log(batch.data());
                this.setState({ batches: this.state.batches.concat([batch.data()]) });
           });
        })
        .catch(err => console.log(err));
  }

  renderNoBatchMessage = () => {
      return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width,
          height: 0.77 * height,
          }}
        >
            <Icon size={85} name='school' color='#727272' />
            <Text style={{
                padding: 10,
                color: '#727272',
                fontSize: 15,
                fontFamily: 'AvenirLTStd-Heavy',
                }}
            >
              {"Teacher Doesn't Have Any Batches"}
            </Text>
        </View>
      );
  }

  renderBatches = ({ item }) => {
   return <BatchDetail batch={item} onPress={this.props.onPress} />;
  }

  render() {
    return (
      <FlatList
        data={this.state.batches}
        renderItem={this.renderBatches}
        keyExtractor={batch => batch.UID}
        ListEmptyComponent={this.renderNoBatchMessage}
        style={{ paddingBottom: 50 }}
      />
    );
  }
}

export { BatchList };
