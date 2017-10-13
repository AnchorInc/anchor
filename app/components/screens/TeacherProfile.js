import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import { ListDetail, PopupMenu } from '../common';

const { width, height } = Dimensions.get('window');

class TeacherProfile extends Component {
  state = {
    name: '',
    email: '',
    phoneNumber: '',
    profilePictureURL: '#fff',
    header: '#fff',
    subject: '',
    experience: '',
    rating: 0,
    price: '',
    location: '',
    batchList: [],
    teacher: this.props.navigation.state.params.person,
  };

  render() {
    return (
      <View>
        <StatusBar hidden />
        <View style={styles.modalStyle}>
          <View style={styles.headerStyle}>
            <Image source={{ uri: this.state.teacher.Header }} style={styles.coverStyle}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width }}>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()}>
                  <Icon name='keyboard-backspace' size={24} color='white' />
                </TouchableOpacity>
                <View style={{ padding: 15 }}>
                  <PopupMenu actions={['Contact']} onPress={() => console.log('pressed')} color='white' />
                </View>
              </View>
            </Image>
            <View style={styles.containerStyle}>
              <Image source={{ uri: this.state.teacher.Profile }} style={styles.profileStyle} />
            </View>
            <View style={{ height: 110, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
              <Text style={styles.nameStyle}>{this.state.teacher.Name}</Text>
              <Text style={styles.classStyle}>{this.state.teacher.Subject}</Text>
              <StarRating
                disabled
                rating={this.state.teacher.Rating}
                starSize={25}
                starColor='#ffa000'
                emptyStarColor='#ffa000'
              />
            </View>
          </View>
          <ScrollView>
            <ListDetail contentText={this.state.teacher.Email}>
              <Icon name='account' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Contact Information</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.teacher.Email}</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.teacher.Phone}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
            <ListDetail contentText={this.state.teacher.Email}>
              <Icon name='briefcase' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Experience</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.experience}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
            <ListDetail contentText={this.state.teacher.Email}>
              <Icon name='currency-inr' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Price</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.teacher.Price}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = {
  modalStyle: {
    width,
    height,
    backgroundColor: 'white',
  },
  profileStyle: {
    height: 0.17 * width,
    width: 0.17 * width,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  containerStyle: {
    width: 0.24 * width,
    height: 0.24 * width,
    borderRadius: (0.24 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 120,
    position: 'absolute',
  },
  headerStyle: {
    height: 290,
  },
  coverStyle: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameStyle: {
    fontSize: 22,
    color: 'black',
    paddingTop: 15,
  },
  classStyle: {
    fontSize: 18,
    color: '#aaa',
    paddingTop: 0,
  },
};

export default connect()(TeacherProfile);
