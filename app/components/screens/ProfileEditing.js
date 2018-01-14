import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InputForm } from '../common';
import { colors } from '../../config';
import { updateUser } from '../../actions';

const { width, height } = Dimensions.get('window');

class ProfileEditing extends Component {
  updateUser = (user) => {
    this.props.updateUser(user);
  }

  showPhotoEditMenu() {
  }

  render() {
    const {
      headerContainerStyle,
      headerStyle,
      headerTextStyle,
      profileStyle,
      profileContainerStyle,
      buttonContainerStyle,
      nameStyle,
      nameContainerStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={headerContainerStyle}>
          <View style={headerStyle}>
            <View style={buttonContainerStyle}>
              <TouchableOpacity style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-left' size={24} color='white' />
              </TouchableOpacity>
              <Text style={headerTextStyle}>
                Profile
              </Text>
              <TouchableOpacity style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name='check' size={24} color='white' />
              </TouchableOpacity>
            </View>
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
        <InputForm updateUser={user => this.updateUser(user)} user={this.props.user} />
      </View>
    );
  }
}

const styles = {
  headerContainerStyle: {
    alignItems: 'center',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
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
    paddingBottom: 10,
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

export default connect(mapStateToProps, { updateUser })(ProfileEditing);
