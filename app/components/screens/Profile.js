import React, { Component } from 'react';
import {
  Modal,
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { STATUS_BAR_COLOR } from '../../config';
import { ListDetail, PopupMenu, LoginSpinner } from '../common';
import { getUser } from '../../models/User';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  state = { user: null };

  componentWillMount() {
    AsyncStorage.getItem('user')
      .then((user) => {
        if (user != null) {
          this.setState({ user: JSON.parse(user) });
        } else {
          getUser()
            .then((currentUser) => {
              if (currentUser != null) {
                const newUser = _.pick(currentUser, ['displayName', 'photoURL', 'email', 'phoneNumber', 'header']);
                this.setState({ user: newUser });
                AsyncStorage.setItem('user', JSON.stringify(newUser, undefined, undefined));
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showProfile = () => {
    if (this.state.user == null) {
      return <LoginSpinner visible title='Loading Profile' />;
    }
    return (
      <View style={styles.modalStyle}>
        <View style={styles.headerStyle}>
          <Image source={{ uri: this.state.user.header }} style={styles.coverStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width }}>
              <TouchableOpacity style={{ padding: 15 }} onPress={this.props.onPress}>
                <Icon name='keyboard-backspace' size={24} color='white' />
              </TouchableOpacity>
              <View style={{ padding: 15 }}>
                <PopupMenu actions={['Edit']} onPress={() => console.log('pressed')} color='white' />
              </View>
            </View>
          </Image>
          <Image source={{ uri: this.state.user.photoURL }} style={styles.profileStyle} />
          <View style={{ height: 90, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
            <Text style={styles.nameStyle}>{this.state.user.displayName}</Text>
          </View>
        </View>
        <ScrollView>
          <ListDetail contentText={this.state.email}>
            <Icon name='account' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
            <View>
              <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Contact Information</Text>
              <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.user.email}</Text>
              <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.state.user.phoneNumber}</Text>
              <View style={{ marginTop: 5, width, height: StyleSheet.hairlineWidth, backgroundColor: '#727272' }} />
            </View>
          </ListDetail>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='slide'
        onRequestClose={() => console.log('Modal has been closed')}
      >
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        {this.showProfile()}
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
    width: 0.24 * width,
    height: 0.24 * width,
    borderRadius: (0.24 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    top: 120,
    position: 'absolute',
  },
  headerStyle: {
    height: 260,
  },
  coverStyle: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameStyle: {
    fontSize: 25,
    color: 'black',
    paddingTop: 10,
  },
};

export { Profile };
