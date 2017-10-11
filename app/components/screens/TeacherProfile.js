import React, { Component } from 'react';
import { Modal, StatusBar, Dimensions, View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import { STATUS_BAR_COLOR } from '../../config';
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
  };

  componentWillMount() {
    firebase.database().ref(`/users/teachers/${this.props.uid}`)
    .once('value')
    .then(teacher => this.setState({
      name: teacher.val().Name,
      email: teacher.val().Email,
      profilePictureURL: teacher.val().Profile,
      phoneNumber: teacher.val().Phone,
      header: teacher.val().Header,
      subject: teacher.val().Subject,
      experience: teacher.val().Experience,
      rating: teacher.val().Rating,
      price: teacher.val().Price,
      location: teacher.val().Location,
      batchList: teacher.val().BatchList,
    }));
  }

  // renderBatches() {
  //   return this.state.batchList.map(batch => <BatchDetail key={batch} batch={batch} />);
  // }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='fade'
        onRequestClose={() => console.log(' ')}
        style={styles.modalStyle}
      >
        <View style={styles.modalStyle}>
          <View style={styles.headerStyle}>
            <Image source={{ uri: this.state.header }} style={styles.coverStyle}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width }}>
                <TouchableOpacity style={{ padding: 15 }} onPress={this.props.onPress}>
                  <Icon name='keyboard-backspace' size={24} color='white' />
                </TouchableOpacity>
                <View style={{ padding: 15 }}>
                  <PopupMenu actions={['Contact']} onPress={() => console.log('pressed')} color='white' />
                </View>
              </View>
            </Image>
            <View style={styles.containerStyle}>
              <Image source={{ uri: this.state.profilePictureURL }} style={styles.profileStyle} />
            </View>
            <View style={{ height: 110, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
              <Text style={styles.nameStyle}>{this.state.name}</Text>
              <Text style={styles.classStyle}>{this.state.subject}</Text>
              <StarRating
                disabled
                rating={this.state.rating}
                starSize={25}
                starColor='#ffa000'
                emptyStarColor='#ffa000'
              />
            </View>
          </View>
          <ScrollView>
            <ListDetail contentText={this.state.email}>
              <Icon name='account' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Contact Information</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.email}</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.phoneNumber}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
            <ListDetail contentText={this.state.email}>
              <Icon name='briefcase' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Experience</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.experience}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
            <ListDetail contentText={this.state.email}>
              <Icon name='currency-inr' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Price</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.price}</Text>
                <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
              </View>
            </ListDetail>
          </ScrollView>
        </View>
      </Modal>
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

export { TeacherProfile };
