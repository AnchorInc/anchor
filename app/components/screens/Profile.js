import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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
import { ListDetail, PopupMenu } from '../common';
import { MAIN_COLOR } from '../../config';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  render() {
    return (
      <View>
        <StatusBar />
        <View style={styles.modalStyle}>
          <View style={styles.headerStyle}>
            <View style={styles.coverStyle}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width }}>
                <TouchableOpacity style={{ padding: 15, paddingTop: 24 }} onPress={() => this.props.navigation.goBack()}>
                  <Icon name='keyboard-backspace' size={24} color='white' />
                </TouchableOpacity>
                <View style={{ padding: 15, paddingTop: 24 }}>
                  <PopupMenu actions={['Edit']} onPress={() => this.props.navigation.navigate('ProfileEditing')} color='white' />
                </View>
              </View>
            </View>
            <Image source={{ uri: this.props.user.photoURL }} style={styles.profileStyle} />
            <View style={{ height: 90, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
              <Text style={styles.nameStyle}>{this.props.user.displayName}</Text>
            </View>
          </View>
          <ScrollView>
            <ListDetail>
              <Icon name='account' size={25} style={{ paddingLeft: 15, paddingRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15, paddingTop: 5, color: 'black' }}>Contact Information</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.props.user.email}</Text>
                <Text style={{ fontSize: 14, paddingTop: 5 }}>{this.props.user.phone}</Text>
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
    width: 0.24 * width,
    height: 0.24 * width,
    borderRadius: (0.24 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    top: 144,
    position: 'absolute',
  },
  headerStyle: {
    height: 260,
  },
  coverStyle: {
    height: 194,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: MAIN_COLOR,
  },
  nameStyle: {
    fontSize: 25,
    color: 'black',
    paddingTop: 10,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(Profile);
