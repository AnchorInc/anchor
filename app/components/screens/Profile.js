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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUS_BAR_COLOR } from '../../config';
import { ListDetail, PopupMenu } from '../common';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='slide'
        onRequestClose={() => console.log('Modal has been closed')}
      >
        <StatusBar backgroundColor={STATUS_BAR_COLOR} />
        <View style={styles.modalStyle}>
          <View style={styles.headerStyle}>
            <View style={styles.coverStyle}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width }}>
                <TouchableOpacity style={{ padding: 15 }} onPress={this.props.onPress}>
                  <Icon name='keyboard-backspace' size={24} color='black' />
                </TouchableOpacity>
                <View style={{ padding: 15 }}>
                  <PopupMenu actions={['Edit']} onPress={() => console.log('pressed')} color='black' />
                </View>
              </View>
            </View>
            <Image source={{ uri: this.props.profile.photoURL }} style={styles.profileStyle} />
            <View style={{ height: 90, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
              <Text style={styles.nameStyle}>{this.props.profile.displayName}</Text>
            </View>
          </View>
          <ScrollView>
            <ListDetail contentText={this.props.profile.email}>
              <Icon name='account' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Contact Information</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.props.profile.email}</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.props.profile.phoneNumber}</Text>
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
