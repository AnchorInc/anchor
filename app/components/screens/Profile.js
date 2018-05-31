import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StatusBar,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { ListDetail, TouchableDebounce } from '../common';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  render() {
    const {
      headerContainerStyle,
      headerStyle,
      headerTextStyle,
      profileStyle,
      profileContainerStyle,
      nameStyle,
      nameContainerStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={headerContainerStyle}>
          <View style={headerStyle}>
            <TouchableOpacity style={{ padding: 15, height: 0.08 * height }} onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
            <Text style={headerTextStyle}>
              Profile
            </Text>
            <TouchableDebounce style={{ padding: 15, height: 0.08 * height }} onPress={() => this.props.navigation.navigate('ProfileEditing')}>
              <Icon name='account-settings-variant' size={24} color='white' />
            </TouchableDebounce>
          </View>
          <View style={profileContainerStyle}>
            <Image source={{ uri: this.props.user.photoURL }} style={profileStyle} />
          </View>
        </View>
        <View style={nameContainerStyle}>
          <Text style={nameStyle}>
            {this.props.user.displayName}
          </Text>
        </View>
        <ScrollView>
          <ListDetail
            title={'First Name'}
            value={this.props.user.displayName.substr(0, this.props.user.displayName.indexOf(' '))}
          />
          <ListDetail
            title={'Last Name'}
            value={this.props.user.displayName.substr(this.props.user.displayName.indexOf(' ') + 1, this.props.user.displayName.length)}
          />
          <ListDetail
            title={'Email'}
            value={this.props.user.email}
          />
          <ListDetail
            title={'Phone Number'}
            value={`+91 ${this.props.user.phone}`}
          />
          <ListDetail
            title={'Location'}
            value={this.props.user.location}
          />
          <ListDetail
            title={'Age'}
            value={this.props.user.age}
          />
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
  },
  headerTextStyle: {
    fontFamily: 'avenir_heavy',
    fontSize: 20,
    color: 'white',
    padding: 15,
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
    paddingBottom: 0.0625 * width,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'avenir_medium',
    color: 'black',
    padding: 5,
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
