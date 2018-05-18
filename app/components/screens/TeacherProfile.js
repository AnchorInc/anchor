import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { ListDetail, PopupMenu } from '../common';

const { width, height } = Dimensions.get('window');

class TeacherProfile extends Component {
  state = {
    teacher: this.props.navigation.state.params.person,
    batches: [],
    messages: [],
    time: 'time',
    place: 'place',
  };

  componentWillMount() {
    this.getBatches();
  }

  getBatches() {
    this.state.teacher.batchList.map(batch => firebase.database().ref(`/batches/${batch}`)
      .once('value')
      .then(Batch => this.setState({ time: Batch.val().time, place: Batch.val().place })),
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.headerContainerStyle}>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTextStyle}>
              {this.state.teacher.displayName}
            </Text>
            <PopupMenu actions={['Contact']} color='white' onPress={() => console.log('contact')} />
          </View>
          <View style={styles.profileContainerStyle}>
            <Image source={{ uri: this.state.teacher.photoURL }} style={styles.profileStyle} />
          </View>
        </View>
        <View style={styles.nameContainerStyle}>
          <Text style={styles.nameStyle}>
            {this.state.teacher.subject}
          </Text>
          <StarRating
            disabled
            halftarEnabled
            iconSet='MaterialCommunityIcons'
            emptyStar='star-outline'
            halfStar='star-half'
            starColor='#ffb300'
            emptyStarColor='#ffb300'
            starSize={25}
            rating={this.state.teacher.rating}
          />
        </View>
        <ScrollView>
          <ListDetail
            title={'Name'}
            value={this.state.teacher.displayName}
          />
          <ListDetail
            title={'Subject'}
            value={this.state.teacher.subject}
          />
          <ListDetail
            title={'Email'}
            value={this.state.teacher.email}
          />
          <ListDetail
            title={'Phone Number'}
            value={`+91 ${this.state.teacher.phone}`}
          />
          <ListDetail
            title={'Price'}
            value={`\u20b9 ${this.state.teacher.price} Per Class`}
          />
          <ListDetail
            title={'Timings'}
            value={`From ${this.state.time} at ${this.state.place}`}
          >
            <TouchableOpacity>
              <Text>See More</Text>
            </TouchableOpacity>
          </ListDetail>
        </ScrollView>
      </View>
    );
  }
}
const styles = {
  headerContainerStyle: {
    alignItems: 'center',
  },
  headerStyle: {
    height: 0.3 * height,
    backgroundColor: colors.primary.normal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    padding: 15,
  },
  headerTextStyle: {
    fontFamily: 'avenir_heavy',
    fontSize: 20,
    color: 'white',
  },
  profileContainerStyle: {
    position: 'absolute',
    top: (height * 0.3) - ((0.27 * width) / 2),
    width: width * 0.26,
    height: width * 0.26,
    backgroundColor: colors.other.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 100,
  },
  nameContainerStyle: {
    paddingTop: 0.125 * width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0.03125 * width,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'avenir_medium',
    color: 'black',
    padding: 5,
  },
  classStyle: {
    fontSize: 14,
    fontFamily: 'avenir_heavy',
    color: '#909094',
    paddingTop: 8,
  },
};

export default connect()(TeacherProfile);
